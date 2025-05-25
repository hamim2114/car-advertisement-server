import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  destinationUrl: { type: String, required: true },
  visits: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Link', linkSchema);