import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  destinationUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Link', linkSchema);