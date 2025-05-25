import linkModel from '../models/link.model.js';
import emailModel from '../models/email.model.js';

export const recordEmail = async (req, res) => {
  const { slug } = req.params;
  const { email } = req.body;

  const link = await linkModel.findOne({ slug });
  if (!link) return res.status(404).send('Invalid slug');

  link.visits++;
  await link.save();

  const existingEmail = await emailModel.findOne({ email });
  if (existingEmail) {
    return res.status(200).send('Email already recorded');
  }

  const emailRecord = new emailModel({
    link: link._id,
    email: email,
  });

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
