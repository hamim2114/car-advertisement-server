import linkModel from "../models/link.model.js";


export const createLink = async (req, res) => {
  const { slug, destinationUrl } = req.body;
  try {
    const link = new linkModel({ slug, destinationUrl });
    await link.save();
    res.status(201).json(link);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllLinks = async (req, res) => {
  const links = await linkModel.find();
  res.json(links);
};

export const getLinkBySlug = async (req, res) => {
  const { slug } = req.params;
  const link = await linkModel.findOne({ slug });
  if (!link) return res.status(404).json({ error: 'Link not found' });
  res.json(link);
};