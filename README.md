# Smart Curriculum Activity & Attendance App

Problem
-------
Many educational institutions still use manual attendance systems. This project provides an integrated solution for attendance automation, daily schedule management, and student micro-planning for idle periods.

Goals
-----
- Fast, low-friction attendance marking (QR / geofencing + automatic heuristics).
- Link daily schedule to student activity suggestions and micro-tasks.
- Provide teacher dashboard and student app with reminders and analytics.
- Support export and integration with institutional schedules.

Tech stack (starter)
--------------------
- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend (web): React
- Mobile: later (Flutter or React Native)
- Containerization: Docker + docker-compose

Quick start (development)
-------------------------
1. Clone repo
2. Copy environment examples: `cp backend/.env.example backend/.env`
3. Start services:
   - Locally with Node & MongoDB, or
   - `docker-compose up --build` (requires Docker)
4. Backend API: `http://localhost:4000/api`
5. Frontend dev: `cd frontend && npm install && npm start`

What I included
----------------
- Basic architecture and ER models
- Backend: auth, attendance, schedule routes, Mongoose models
- Frontend: sample React components for teacher/student views
- Docker compose for local dev

Next steps
----------
- Secure authentication (JWT + refresh tokens or SSO)
- Add real-time attendance (WebSocket) and QR generation
- Integrate calendar imports and automated suggestions engine
- Add automated tests and CI
