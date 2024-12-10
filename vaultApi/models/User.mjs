import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: [true, "User ID is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [/.+@.+\..+/, "Please provide a valid email address"], // Validate email format
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Middleware: Hash password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password is not modified
  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds); // Hash password
    next();
  } catch (error) {
    next(error); // Pass errors to the next middleware
  }
});

// Export the User model
const User = mongoose.model('User', UserSchema);

export default User;
