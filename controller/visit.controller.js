import linkModel from "../models/link.model.js";
import visitModel from "../models/visit.model.js";


export const recordVisit = async (req, res) => {
  const { slug } = req.params;
  const { email } = req.body;
  const link = await linkModel.findOne({ slug });
  if (!link) return res.status(404).send('Invalid slug');
  
  // Always create a visit record
  const visit = new visitModel({ link: link._id });

  // Only save email if it doesn't exist yet
  if (email) {
    const existingVisit = await visitModel.findOne({ link: link._id, email });
    if (!existingVisit) {
      visit.email = email;
    }
  }

  await visit.save();
  res.status(201).send('Visit recorded');
};

export const getVisitsBySlug = async (req, res) => {
  const { slug } = req.params;
  const link = await linkModel.findOne({ slug });
  if (!link) return res.status(404).json({ error: 'Invalid slug' });
  const visits = await visitModel.find({ link: link._id }).sort({ visitedAt: -1 });
  res.json(visits);
};