import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true // Optional: Ensures there are no leading or trailing spaces
    },
    img: {
      type: String,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'] // Optional: Email validation
    },
    role: { type: String, enum: [ "admin"], default: '', required: true },
    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
