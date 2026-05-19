import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name must be less than 50 characters long'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
