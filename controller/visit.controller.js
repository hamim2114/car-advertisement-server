import linkModel from "../models/link.model.js";
import visitModel from "../models/visit.model.js";


export const recordVisit = async (req, res) => {
  const { slug } = req.params;
  const { email } = req.body;
  const link = await linkModel.findOne({ slug });
  if (!link) return res.status(404).json({ error: 'Invalid slug' });
  const visit = new visitModel({ link: link._id, email });
  await visit.save();
  res.status(201).json({ message: 'Visit recorded' });
};

export const getVisitsBySlug = async (req, res) => {
  const { slug } = req.params;
  const link = await linkModel.findOne({ slug });
  if (!link) return res.status(404).json({ error: 'Invalid slug' });
  const visits = await visitModel.find({ link: link._id }).sort({ visitedAt: -1 });
  res.json(visits);
};