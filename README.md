#  Booking Appointment Service

A backend API for scheduling appointments between clients and providers, featuring authentication, slot management, booking system, and real-time notifications using Socket.IO.

---

##  Features

-  JWT Authentication (Register/Login)
-  Role-based access (Client / Provider)
-  Provider time slot creation
-  Appointment booking system
-  Cancel appointments
-  Real-time notifications (Socket.IO)
-  PostgreSQL database
-  Swagger API documentation
-  Jest testing

---

## 🏗 Tech Stack

- Node.js (ES Modules)
- Express.js
- PostgreSQL
- Socket.IO
- JWT
- Jest
- Swagger

---

##  Project Structure
booking-appointment-services/
├── bin/
├── config/
├── controllers/
├── models/
├── services/
├── routes/
├── middlewares/
├── sockets/
├── swagger/
├── test/
├── app.js
└── package.json


---

##  Installation

### 1. Clone project
```bash
git clone https://github.com/nyapblesso-a11y/appointment-booking-app.git
cd booking-appointment-services

npm install

npm run dev

 Database

Tables auto-created on startup:

users
providers
time_slots
appointments

 Authentication
Register
POST /auth/register
{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "123456",
  "role": "client"
}
Login
POST /auth/login
{
  "email": "john@test.com",
  "password": "123456"
}

Response:

{
  "token": "JWT_TOKEN"
}

 ## Slots API
Create slot (Provider only)

POST /slot
Authorization: Bearer <token>
{
  "start_time": "2025-05-07T10:00:00Z",
  "end_time": "2025-05-07T11:00:00Z"
}
Get provider slots
GET /slot/me
Public slots
GET /slot/:providerId
📌 Appointments API
Book appointment
POST /app
Authorization: Bearer <token>
{
  "slotId": 1
}
Client appointments
GET /app/client
Provider appointments
GET /app/provider
Cancel appointment
PATCH /app/:id/cancel

 Socket.IO Notifications
Client connects
const socket = io("http://localhost:3000");
Event
notification
Payload
{
  "message": "You have a new appointment booking"
}
   Deployment (Render)
Required env vars
DATABASE_URL=postgresql://...
JWT_SECRET=........


Use ONLY DATABASE_URL on Render.

 Testing
npm test

Uses Jest + Supertest for:

Auth
Slots
Appointments

 Common Issues
DATABASE_URL missing

→ Add it in Render environment variables

PostgreSQL connection failed

→ Wrong DB URL or missing SSL config

Socket not working

→ Ensure socket.io is initialized in server

Author
NYAP BLESS

Backend system for appointment booking with real-time features.


