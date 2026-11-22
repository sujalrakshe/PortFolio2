const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const projectsFilePath = path.join(__dirname, '..', 'server', 'data', 'projects.json');
const skillsFilePath = path.join(__dirname, '..', 'server', 'data', 'skills.json');
const messagesFilePath = path.join(__dirname, '..', 'server', 'data', 'messages.json');

const readData = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
};

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch(e) {}
};

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/projects', (req, res) => {
  res.json(readData(projectsFilePath));
});

app.get('/api/skills', (req, res) => {
  res.json(readData(skillsFilePath));
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newMessage = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString()
  };

  const messages = readData(messagesFilePath);
  messages.push(newMessage);
  writeData(messagesFilePath, messages);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been received.',
    data: newMessage
  });
});

module.exports = app;
