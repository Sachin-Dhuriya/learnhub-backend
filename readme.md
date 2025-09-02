# 📚 LMS Backend (Express + Prisma + PostgreSQL)

A backend API for a **Learning Management System (LMS)** built using **Node.js, Express, Prisma ORM, and PostgreSQL**.  
This project provides user authentication, course management, lessons, quizzes, and leaderboard features.  

---

## 🚀 Features
- User Authentication (Register/Login/Profile) with **JWT**
- Password hashing using **bcrypt**
- Input validation with **Joi**
- PostgreSQL database with **Prisma ORM**
- Role-based users: `Admin`, `Teacher`, `Student`
- Middleware for request validation and authentication
- Error handling with proper status codes
- **Planned Features**:
  - Course & Lesson Management
  - Quiz & Submission System
  - Leaderboard (Redis caching)
  - Real-time Notifications with Socket.io
  - Background Jobs with Bull
  - API Documentation with Swagger

---

## 🛠 Tech Stack
- **Node.js** + **Express** → API framework  
- **Prisma ORM** → Database modeling & queries  
- **PostgreSQL** → Relational database  
- **Joi** → Validation library  
- **bcrypt** → Password hashing  
- **JWT** → Authentication  
- **dotenv** → Environment variables  
- **Helmet**, **Rate Limiter** → Security (planned)  
- **Bull + Redis** → Job queues & caching (planned)  
- **Socket.io** → Realtime notifications (planned)  

---



