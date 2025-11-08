const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// POST - Create new contact inquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !phone || !message) {
      return res.status(400).json({ 
        error: 'Name, phone, and message are required fields' 
      });
    }

    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone,
      service,
      message
    });

    await contact.save();

    // Send email notification if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();

        // Email to admin
        const adminMailOptions = {
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Contact Inquiry - ${service || 'General'}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${service || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
          `
        };

        await transporter.sendMail(adminMailOptions);

        // Confirmation email to customer (if email provided)
        if (email) {
          const customerMailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting Kanhaiya Krushi',
            html: `
              <h2>Thank you for reaching out!</h2>
              <p>Dear ${name},</p>
              <p>We have received your inquiry and will get back to you as soon as possible.</p>
              <p><strong>Your message:</strong></p>
              <p>${message}</p>
              <br>
              <p>Best regards,<br>Kanhaiya Krushi Seva Kendra</p>
              <p>Phone: +91 97670 38479<br>Email: info@kanhaiyakrushi.com</p>
            `
          };

          await transporter.sendMail(customerMailOptions);
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({ 
      message: 'Contact inquiry received successfully',
      contact: {
        id: contact._id,
        name: contact.name,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ 
      error: 'Failed to process contact inquiry',
      message: error.message 
    });
  }
});

// GET - Get all contacts (for admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ 
      error: 'Failed to fetch contacts',
      message: error.message 
    });
  }
});

// GET - Get contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ 
      error: 'Failed to fetch contact',
      message: error.message 
    });
  }
});

// PUT - Update contact status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ 
      error: 'Failed to update contact',
      message: error.message 
    });
  }
});

module.exports = router;
