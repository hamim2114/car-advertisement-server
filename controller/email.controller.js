import linkModel from '../models/link.model.js';
import emailModel from '../models/email.model.js';

export const recordEmail = async (req, res) => {
  const { slug } = req.params;
  const { email } = req.body;
  const link = await linkModel.findOne({ slug });
  if (!link) return res.status(404).send('Invalid slug');

  const existingEmail = await emailModel.findOne({ link: link._id, email });
  if (!existingEmail) {
    return res.status(400).send('Email already exists');
  }

  const emailRecord = new emailModel({ link: link._id });

  await emailRecord.save();
  res.status(201).send('Email recorded');
};

export const getEmailsBySlug = async (req, res) => {
  const { slug } = req.params;
  const link = await linkModel.findOne({ slug });
  if (!link) return res.status(404).json({ error: 'Invalid slug' });
  const emails = await emailModel
    .find({ link: link._id })
    .sort({ visitedAt: -1 });
  res.json(emails);
};
