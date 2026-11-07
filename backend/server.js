// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const InventoryItem = require('./models/InventoryItem');
const BorrowRequest = require('./models/BorrowRequest');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/lab_equipment_db')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Register API (Handles user registration with role support)
app.post('/api/register', async (req, res) => {
  try {
    const { name, studentId, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      name, 
      studentId, 
      email, 
      password: hashedPassword, 
      role: role || 'student' 
    });
    
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration", error });
  }
});

// Login API (Authenticates user and returns role details)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "Account not found. Please register first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    res.status(200).json({ 
      message: "Login successful", 
      user: { name: user.name, email: user.email, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login", error });
  }
});

// Add Inventory Item API (Staff operations)
app.post('/api/items', async (req, res) => {
  try {
    const newItem = new InventoryItem(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding inventory item", error });
  }
});

// Fetch Inventory Items API (For student catalogue)
app.get('/api/items', async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory items", error });
  }
});

// Save Student Loan Request API (Updates item status to Out of Stock)
app.post('/api/borrow-requests', async (req, res) => {
  try {
    const { itemId, itemTitle, studentName, studentEmail, purpose } = req.body;
    
    const newRequest = new BorrowRequest({
      itemId,
      itemTitle,
      studentName,
      studentEmail,
      purpose
    });
    await newRequest.save();

    // Automatically set item status to Out of Stock upon request submission
    await InventoryItem.findByIdAndUpdate(itemId, { status: 'Out of Stock' });

    res.status(201).json({ message: "Loan request submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error while saving borrow request", error });
  }
});

// Fetch All Borrow Requests API (For staff management queue)
app.get('/api/borrow-requests', async (req, res) => {
  try {
    const requests = await BorrowRequest.find().sort({ requestDate: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrow requests", error });
  }
});

// Update Borrow Request Status (Handles Approval, Rejection, Handover/Issued, and Return with title fallback)
app.put('/api/borrow-requests/:id', async (req, res) => {
  try {
    const { status, itemId } = req.body;
    
    // Find the existing request in database
    const existingRequest = await BorrowRequest.findById(req.params.id);
    if (!existingRequest) {
      return res.status(404).json({ message: "Borrow request not found" });
    }

    // Update request status
    const updatedRequest = await BorrowRequest.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );

    // If equipment is returned, restore its inventory status to 'In Stock'
    if (status === 'Returned') {
      let targetItemId = itemId || existingRequest.itemId;

      if (targetItemId) {
        await InventoryItem.findByIdAndUpdate(targetItemId, { status: 'In Stock' });
      } else if (existingRequest.itemTitle) {
        // Fallback: If itemId is missing, find inventory item by title and make it In Stock
        await InventoryItem.findOneAndUpdate(
          { title: existingRequest.itemTitle }, 
          { status: 'In Stock' }
        );
      }
    }

    res.status(200).json({ message: `Request status updated to ${status}`, updatedRequest });
  } catch (error) {
    res.status(500).json({ message: "Error updating request status", error });
  }
});

// Fetch Student Specific Requests API (Using email parameter)
app.get('/api/borrow-requests/student/:email', async (req, res) => {
  try {
    const studentEmail = req.params.email;
    const requests = await BorrowRequest.find({ studentEmail }).sort({ requestDate: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student request history", error });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));