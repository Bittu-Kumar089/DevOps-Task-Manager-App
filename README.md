# 🚀 DevOps Task Manager App

[![CI/CD Pipeline](https://github.com/Bittu-Kumar089/DevOps-Task-Manager-App/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Bittu-Kumar089/DevOps-Task-Manager-App/actions)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://hub.docker.com)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/atlas)

> A **production-ready, full-stack DevOps Task Manager** built to demonstrate real-world DevOps practices — GitHub Actions CI/CD, Docker containerization, AWS EC2 deployment, Nginx reverse proxy, JWT auth, and a stunning React frontend.

---

## 🏗️ Architecture

```
                        ┌─────────────────────────────────┐
                        │        GitHub Actions CI/CD       │
                        │  Test → Build → Docker → Deploy  │
                        └──────────────┬──────────────────┘
                                       │ SSH Deploy
                        ┌──────────────▼──────────────────┐
                        │          AWS EC2 Instance         │
                        │                                   │
                        │  ┌──────────────────────────┐    │
                        │  │    Nginx Reverse Proxy    │    │
                        │  │    Port 80 / 443          │    │
                        │  └────┬──────────────┬───────┘    │
                        │       │              │             │
                        │  ┌────▼───┐    ┌────▼────┐       │
                        │  │Frontend│    │ Backend  │       │
                        │  │ React  │    │ Node.js  │       │
                        │  │ :80    │    │  :5000   │       │
                        │  └────────┘    └────┬─────┘       │
                        │                     │             │
                        │              ┌──────▼──────┐      │
                        │              │ MongoDB Atlas│      │
                        │              └─────────────┘      │
                        └────────────────────────────────────┘
```

---

## ✨ Features

### 🎨 Frontend
- ⚡ **React 18** + **Vite** for blazing-fast development
- 🎨 **Tailwind CSS** with custom dark/light theme
- 🌙 **Dark/Light Mode** toggle with localStorage persistence
- 📊 **Dashboard** with real-time stats, progress bars, charts
- ✅ **Task Management**: Create, Edit, Delete, Filter, Search
- 🏷️ **Task Attributes**: Status (Pending/In Progress/Done), Priority (Low/Medium/High), Tags, Due dates
- 🔍 **Search & Filter** with debouncing
- 👤 **User Profile** with avatar, bio, security tab
- 🔔 **Toast Notifications** for all actions
- 💫 **Loading Animations** and micro-interactions
- 📱 **Fully Responsive** — mobile first

### 🔧 Backend
- 🟢 **Node.js** + **Express.js** REST API
- 🔐 **JWT Authentication** with bcrypt password hashing (12 rounds)
- 📦 **CRUD** endpoints for tasks and users
- 🔍 Search and filter support with pagination
- ✅ **Input validation** with express-validator
- 🛡️ **Protected routes** middleware
- 📊 **Real-time stats** aggregation
- 🏥 Health check endpoint

### 🗄️ Database
- **MongoDB Atlas** with Mongoose ODM
- Indexed queries for performance
- Full-text search support

### 🐳 Docker
- **Multi-container** architecture (frontend, backend, nginx)
- **Multi-stage builds** for optimized image sizes
- **docker-compose** for local development
- Health checks on all containers
- Non-root user in backend container

### ⚙️ CI/CD (GitHub Actions)
- ✅ Automated testing on every push/PR
- 🏗️ Build validation for frontend
- 🐳 Docker image build & push to Docker Hub
- 🚀 Auto-deploy to AWS EC2 via SSH
- 🔄 Image caching for faster builds

### ☁️ AWS
- **EC2** instance for hosting
- **Nginx** reverse proxy with rate limiting
- **S3** ready for file/avatar uploads (IAM scaffolded)
- **CloudWatch** ready (add your own alarms)

---

## 📁 Project Structure

```
DevOps-Task-Manager-App/
├── 📂 frontend/                    # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskModal.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/                # React Context (Auth, Theme)
│   │   ├── pages/                  # Route pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── Profile.jsx
│   │   ├── utils/api.js            # Axios instance
│   │   └── App.jsx
│   ├── Dockerfile                  # Multi-stage build
│   └── nginx.conf
│
├── 📂 backend/                     # Node.js + Express
│   ├── config/db.js                # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/auth.js          # JWT middleware
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── tests/api.test.js
│   ├── server.js
│   └── Dockerfile
│
├── 📂 nginx/                       # Reverse proxy
│   ├── nginx.conf
│   └── Dockerfile
│
├── 📂 .github/workflows/
│   └── ci-cd.yml                   # GitHub Actions pipeline
│
├── docker-compose.yml              # Multi-container orchestration
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/Bittu-Kumar089/DevOps-Task-Manager-App.git
cd DevOps-Task-Manager-App
```

### 2. Configure environment variables

**Backend** — Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/devops-tasks
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000

# Optional AWS S3
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

### 3. Run with Docker Compose
```bash
docker-compose up --build
```
App will be available at **http://localhost:80**

### 4. Run locally (without Docker)

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 🔌 API Reference

### Auth Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login and get JWT | ❌ |
| GET | `/api/auth/me` | Get current user profile | ✅ |
| PUT | `/api/auth/profile` | Update profile | ✅ |

### Task Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| GET | `/api/tasks` | Get all tasks (with filter/search) | ✅ |
| GET | `/api/tasks/:id` | Get single task | ✅ |
| POST | `/api/tasks` | Create new task | ✅ |
| PUT | `/api/tasks/:id` | Update task | ✅ |
| DELETE | `/api/tasks/:id` | Delete task | ✅ |

### Query Parameters (GET /api/tasks)
| Param | Values | Description |
|-------|--------|-------------|
| `status` | `Pending`, `In Progress`, `Done` | Filter by status |
| `priority` | `Low`, `Medium`, `High` | Filter by priority |
| `search` | any string | Search title/description/tags |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 50) |

---

## ⚙️ GitHub Actions Secrets

Add these secrets to your GitHub repository (`Settings → Secrets → Actions`):

| Secret | Description |
|--------|-------------|
| `DOCKER_USERNAME` | Docker Hub username |
| `DOCKER_PASSWORD` | Docker Hub password or access token |
| `EC2_HOST` | AWS EC2 public IP or hostname |
| `EC2_USER` | EC2 SSH username (e.g., `ubuntu`) |
| `EC2_SSH_KEY` | Private SSH key for EC2 access |

---

## 🖥️ AWS EC2 Setup

### 1. Install Docker on EC2
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install docker.io docker-compose git -y
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

### 2. Clone and configure
```bash
git clone https://github.com/Bittu-Kumar089/DevOps-Task-Manager-App.git
cd DevOps-Task-Manager-App
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and secrets
nano backend/.env
```

### 3. Run
```bash
docker-compose up -d
```

### 4. Security Groups (AWS Console)
Open these ports in your EC2 Security Group:
- **Port 80** (HTTP) — public
- **Port 443** (HTTPS) — public  
- **Port 22** (SSH) — your IP only

---

## 🐳 Docker Commands

```bash
# Build and start all containers
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild specific service
docker-compose up --build backend

# Check running containers
docker ps

# Enter a container shell
docker exec -it devops-backend sh
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT + bcrypt |
| Container | Docker, docker-compose |
| Proxy | Nginx |
| CI/CD | GitHub Actions |
| Cloud | AWS EC2 |
| Storage | AWS S3 (scaffolded) |
| Version Control | Git + GitHub |

---

## 👤 Author

**Bittu Kumar**
- GitHub: [@Bittu-Kumar089](https://github.com/Bittu-Kumar089)

---

## 📄 License

This project is licensed under the MIT License.

---

> ⭐ Star this repo if it helped you! Built for DevOps learning and resume projects.
