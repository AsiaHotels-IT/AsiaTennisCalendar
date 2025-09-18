const express = require('express');
const { readdirSync } = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const session = require('express-session');

const app = express();

// เชื่อมต่อฐานข้อมูล
connectDB();

app.use(morgan('dev'));
app.use(cors({
  origin: true,
  credentials: true // ให้ browser ส่ง cookie ไปกับ request
}));
app.use(express.json({ limit: '10mb' }));

// Start server ใช้แค่ app.listen
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



const Reservation = require("./model/ReservationStadium");

// API ส่ง JSON (ไว้ frontend ใช้ fetch ได้)
app.get("/api/calendar", async (req, res) => {
  try {
    const reservations = await Reservation.find({}, "reservDate startTime endTime").sort({ reservDate: 1, startTime: 1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// หน้าเว็บ Calendar (แสดง React Calendar)
app.get('/calendar', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/', 'index.html'));
});
