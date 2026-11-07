const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  itemCode: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  condition: { type: String, required: true, enum: ['Mint', 'Good', 'Fair'] },
  status: { type: String, required: true, enum: ['In Stock', 'Out of Stock', 'Maintenance'], default: 'In Stock' },
  imageUrl: { type: String }
});

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);