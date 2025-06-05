import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  link: { type: mongoose.Schema.Types.ObjectId, ref: 'Link', required: true },
  email: { type: String, required: true },
  birthDay: { type: Object },
  visitedAt: { type: Date, default: Date.now },
});

// Add compound index to ensure email uniqueness per link
emailSchema.index({ link: 1, email: 1 }, { unique: true });

export default mongoose.model('Email', emailSchema);