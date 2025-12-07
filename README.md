🚗 Vehicle Rental System 

A backend REST API for managing vehicles, user authentication, and rental bookings. This system is built using Node.js, Express, TypeScript, and PostgreSQL.

📌 Live URL:


🌟 Features

✔ User Registration & Login
✔ Role-based Access Control (Admin & Customer)
✔ CRUD for Vehicles
✔ Booking System with Price Calculation
✔ Auto Vehicle Availability Update
✔ Prevent Deletion if Active Booking Exists
✔ Secure Password Hashing
✔ Clean Error Handling & DB Validation


🛠 Technology Stack

Node.js + TypeScript
Express.js (web framework)
PostgreSQL (database)
bcrypt (password hashing)
jsonwebtoken (JWT authentication)


📦 Setup & Usage Instructions

 🔧 Installation


git clone repo-url
cd Level-2-assignment-02
npm install

▶️ Run the Project

Development Mode:

npm run dev

Production Build:

npm run build
npm start


 📎 Project Folder Structure


src/
 ├─ config/
 ├─ middleware/
 ├─ modules/
 │   ├─ auth/
 │   ├─ users/
 │   ├─ vehicles/
 │   └─ bookings/
 ├─ app.ts
 └─ server.ts


This project follows clean coding practices, modular architecture, and secure authentication with proper Role-Based Access Control.



