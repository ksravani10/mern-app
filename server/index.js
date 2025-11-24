import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import { connectToDatabase } from './db/db.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import settingRouter from './routes/setting.js';
import dashboardRouter from './routes/dashboard.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "https://employee-frontend-tau-drab.vercel.app",
    credentials: true
}));
app.use(express.json());

// Lazy DB middleware (connect only when request comes)
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).send("Database connection error");
  }
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);
app.use('/api/dashboard', dashboardRouter);

// Static files
app.use(express.static('public/uploads'));

// Export app for Vercel
export default app;
