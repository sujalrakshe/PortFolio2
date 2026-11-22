const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load static json data
const projectsFilePath = path.join(__dirname, 'data', 'projects.json');
const skillsFilePath = path.join(__dirname, 'data', 'skills.json');
const messagesFilePath = path.join(__dirname, 'data', 'messages.json');

// Helper to read JSON
const readData = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading file:', filePath, err);
    return [];
  }
};

// Helper to write JSON
const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Configure Nodemailer Transporter
const createTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass || pass === 'your_gmail_app_password_here') {
    return null; // Not configured yet
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: user,
      pass: pass
    }
  });
};

// Routes
// 1. Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 2. Get all projects
app.get('/api/projects', (req, res) => {
  const projects = readData(projectsFilePath);
  res.json(projects);
});

// 3. Get all skills
app.get('/api/skills', (req, res) => {
  const skills = readData(skillsFilePath);
  res.json(skills);
});

// 4. Contact message submission with Nodemailer email delivery
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const newMessage = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString()
  };

  // Always save message to local JSON backup
  const messages = readData(messagesFilePath);
  messages.push(newMessage);
  writeData(messagesFilePath, messages);

  console.log('📬 New contact message saved:', newMessage);

  // Send Email Notification
  const transporter = createTransporter();
  let emailSent = false;

  if (transporter) {
    try {
      const receiver = process.env.NOTIFICATION_RECEIVER || process.env.EMAIL_USER;
      
      const mailOptions = {
        from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
        to: receiver,
        replyTo: email,
        subject: `💼 New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
            <h2 style="color: #2563eb; margin-top: 0;">New Contact Inquiry Received</h2>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
            <p style="margin: 8px 0;"><strong>Sender Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Date:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            <div style="margin-top: 15px; padding: 15px; background-color: #ffffff; border-radius: 6px; border-left: 4px solid #2563eb;">
              <h4 style="margin: 0 0 10px 0; color: #1e293b;">Message Content:</h4>
              <p style="margin: 0; white-space: pre-wrap; color: #334155; line-height: 1.6;">${message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #64748b;">This message was generated from your Portfolio Website.</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log(`✅ Email notification sent to ${receiver}`);
    } catch (mailError) {
      console.error('❌ Failed to send email via SMTP:', mailError.message);
    }
  } else {
    console.log('ℹ️ Email credentials not configured in server/.env. Message saved to messages.json');
  }

  res.status(201).json({
    success: true,
    message: emailSent
      ? 'Thank you! Your message was sent directly to Sujal\'s email.'
      : 'Thank you! Your message has been received and saved.',
    emailSent: emailSent,
    data: newMessage
  });
});

// 5. Get all contact messages (Admin review)
app.get('/api/contact/messages', (req, res) => {
  const messages = readData(messagesFilePath);
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend server running on http://localhost:${PORT}`);
});
