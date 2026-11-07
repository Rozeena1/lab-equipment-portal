// backend/models/BorrowRequest.js
const mongoose = require('mongoose');

const borrowRequestSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
  itemTitle: { type: String, required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  purpose: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Returned'], default: 'Pending' },
  requestDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BorrowRequest', borrowRequestSchema);