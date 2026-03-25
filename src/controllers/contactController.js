import Contact from '../models/Contact.js';

// POST /api/contact — customer sends a message
export const createContact = async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();
    res.status(201).json({
      message: 'Message received! We will get back to you shortly.',
      contact: saved,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/contact — admin views all messages
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};