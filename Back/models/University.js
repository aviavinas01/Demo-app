const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const universitySchema = new Schema({
  name: { 
    type: String, 
    required: true 
  }, // e.g., "KIIT University"
  domain: { 
    type: String, 
    required: true, 
    unique: true 
  }, // e.g., "kiit.ac.in"
  isActive: { 
    type: Boolean, 
    default: true 
  }, // Allows you to suspend a university network without deleting data
}, {
  timestamps: true,
});

module.exports = mongoose.model('University', universitySchema);