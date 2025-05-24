import linkModel from "../models/link.model.js";


export const createLink = async (req, res, next) => {
  const { slug, destinationUrl } = req.body;
  try {
    const link = new linkModel({ slug, destinationUrl });
    await link.save();
    res.status(201).send('Link created successfully');
  } catch (err) {
    next(err);
  }
};

export const getAllLinks = async (req, res) => {
  const links = await linkModel.find();
  res.json(links);
};

export const getLinkBySlug = async (req, res) => {
  const { slug } = req.params;
  const link = await linkModel.findOne({ slug });
  if (!link) return res.status(404).send('Link not found');
  res.json(link);
};

export const updateLink = async (req, res,next) => {
  const { id } = req.params;
  try {
    const link = await linkModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!link) return res.status(404).send('Link not found');
    res.send('Link updated successfully');
  } catch (err) {
    next(err);
  }
};

export const deleteLink = async (req, res,next) => {
  const { id } = req.params;
  try {
    const link = await linkModel.findByIdAndDelete( id );
    if (!link) return res.status(404).send('Link not found');
    res.send('Link deleted successfully');
  } catch (err) {
    next(err);
  }
};  