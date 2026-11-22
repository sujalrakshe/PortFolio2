# Sujal Rakshe - Full-Stack Portfolio (React.js + Node.js)

A modern, responsive full-stack developer portfolio built with **React.js** (Frontend) and **Node.js / Express** (Backend).

---

## 📁 Project Structure

```
├── client/                     # React.js (Vite + JavaScript)
│   ├── public/                 # Static assets, images, and resume PDF
│   │   ├── images/
│   │   └── Sujal_Rakshe_Resume_Updated.pdf
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx     # Profile card, contacts & social links
│   │   │   ├── Header.jsx      # Navigation bar, mobile drawer, theme toggle
│   │   │   ├── Hero.jsx        # Dynamic typewriter effect & quick stats
│   │   │   ├── About.jsx       # Professional overview & core pillars
│   │   │   ├── Skills.jsx      # Tech stack with category filter & API data
│   │   │   ├── Projects.jsx    # Projects showcase with live links & github
│   │   │   ├── Education.jsx   # Timeline of academic qualifications
│   │   │   ├── Contact.jsx     # Interactive contact form connected to Node API
│   │   │   └── Footer.jsx      # Footer with resume download & social handles
│   │   ├── App.jsx             # Main layout, scrollspy, theme & toast alerts
│   │   ├── index.css           # Modern CSS variables, glassmorphism & responsive styles
│   │   └── main.jsx
│   └── package.json
│
├── server/                     # Node.js + Express.js Backend
│   ├── data/
│   │   ├── projects.json       # Projects database
│   │   ├── skills.json         # Skills database
│   │   └── messages.json       # Contact messages storage
│   ├── server.js               # Express server & REST API endpoints
│   ├── .env                    # Environment config
│   └── package.json
│
└── package.json                # Root package configuration
```

---

## 🚀 How to Run the Project

### 1. Start the Node.js Backend Server
Open a terminal in the project root:
```bash
cd server
npm start
```
> Server runs at: `http://localhost:5000`
> Health Check: `http://localhost:5000/api/health`

### 2. Start the React.js Frontend
Open a second terminal in the project root:
```bash
cd client
npm run dev
```
> React App runs at: `http://localhost:5173`

---

## ⚡ Backend REST API Endpoints

- `GET /api/health` - Check backend status
- `GET /api/projects` - Get all projects list
- `GET /api/skills` - Get technical skills list
- `POST /api/contact` - Submit a message from the contact form (validates & saves to `data/messages.json`)
- `GET /api/contact/messages` - View all submitted contact messages
