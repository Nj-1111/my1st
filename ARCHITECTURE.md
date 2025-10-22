# Architecture Overview

Components
- Backend API (Node + Express): business logic, authentication, attendance ingestion, schedule management, reporting.
- Database (MongoDB): stores users, schedules, attendance logs, suggested activities.
- Frontend (React): teacher and student web UIs.
- Mobile client (future): native-like app for students and teachers.
- Optional services: Notification service, Analytics/BI, Calendar sync.

Data model (high level)
- User: { role: [student|teacher|admin], name, email, profile }
- Schedule: { course/class, teacherId, students[], start, end, location }
- Attendance: { scheduleId, studentId, timestamp, status: [present, late, absent], method: [manual, qr, auto] }
- ActivitySuggestion: { studentId, timeslot, suggestion, completed }

Attendance capture methods
- QR code scan by students or teacher-scanned QR (fast check-in)
- QR scan by device mapped to class/time
- Location/geofence (with privacy and opt-in)
- Manual override in teacher UI
- Auto rules: mark absent after X minutes past start unless checked-in

Privacy & compliance
- Minimize location retention; only store check-in status and approximate metadata
- Allow exports and role-based access control

Scaling considerations
- Use pagination and indexes for attendance queries
- Aggregate rollups for reporting (daily/weekly/monthly)
- Background jobs for suggestion generation and report exports

Security
- Use HTTPS, JWT with refresh tokens, role-based access control.
