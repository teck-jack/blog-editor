const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    // Remove unique: true if it exists
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Only email should be unique
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Remove any existing name index if it exists
userSchema.pre('save', async function(next) {
  const collection = this.constructor.db.collection(this.constructor.collection.name);
  const indexes = await collection.indexes();
  
  // Remove name index if it exists
  const nameIndex = indexes.find(index => index.key.name);
  if (nameIndex) {
    await collection.dropIndex('name_1');
  }
  
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);