import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  link: { type: mongoose.Schema.Types.ObjectId, ref: 'Link', required: true },
  email: String,
  visitedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Visit', visitSchema);