import linkModel from '../models/link.model.js';
import visitModel from '../models/visit.model.js';
import { Parser } from 'json2csv';

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
  const links = await linkModel.find().sort({ createdAt: -1 });
  res.json(links);
};

// export const getLinkBySlug = async (req, res) => {
//   const { slug } = req.params;
//   const link = await linkModel.findOne({ slug });
//   if (!link) return res.status(404).send('Link not found');
//   res.json(link);
// };

// export const getLinkBySlug = async (req, res,next) => {
//   try {
//     const { slug } = req.params;

//     const link = await linkModel.findOne({ slug });
//     if (!link) return res.status(404).send('Link not found');

//     const visits = await visitModel.find({ linkId: link._id }).sort({ timestamp: -1 });

//     const emailList = visits.map((v) => ({
//       email: v.email,
//       timestamp: v.timestamp,
//     }));

//     const uniqueEmails = [...new Set(visits.map((v) => v.email))];

//     res.json({
//       slug: link.slug,
//       destinationUrl: link.destinationUrl,
//       totalVisits: visits.length,
//       uniqueEmails: uniqueEmails.length,
//       emailList,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const getLinkBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { from, to, exportAs } = req.query;

    const link = await linkModel.findOne({ slug });
    if (!link) return res.status(404).send('Link not found');
   
    // Build query filter
    const filter = { link: link._id };
    if (from || to) {
      filter.timestamp = {};
      if (from) filter.timestamp.$gte = new Date(from);
      if (to) filter.timestamp.$lte = new Date(to);
    }

    const visits = await visitModel.find(filter).sort({ visitedAt: -1 });

    const emailList = visits.map((v) => ({
      email: v.email,
      visitedAt: v.visitedAt,
    }));

    if (exportAs === 'csv') {
      const csvFields = ['email', 'visitedAt'];
      const parser = new Parser({ fields: csvFields });
      const csv = parser.parse(emailList);

      res.header('Content-Type', 'text/csv');
      res.attachment(`${slug}_visits.csv`);
      return res.send(csv);
    }

    const uniqueEmails = [...new Set(visits.map((v) => v.email))];

    return res.json({
      _id: link._id,
      slug: link.slug,
      destinationUrl: link.destinationUrl,
      totalVisits: visits.length,
      uniqueEmails: uniqueEmails.length,
      emailList,
    });
  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
};

export const updateLink = async (req, res, next) => {
  const { id } = req.params;
  try {
    const link = await linkModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!link) return res.status(404).send('Link not found');
    res.send('Link updated successfully');
  } catch (err) {
    next(err);
  }
};

export const deleteLink = async (req, res, next) => {
  const { id } = req.params;
  try {
    const link = await linkModel.findByIdAndDelete(id);
    if (!link) return res.status(404).send('Link not found');
    res.send('Link deleted successfully');
  } catch (err) {
    next(err);
  }
};
