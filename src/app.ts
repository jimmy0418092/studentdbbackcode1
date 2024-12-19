import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 2083; // 後端運行的端口

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/410630445')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Mongoose Schema and Model
const studentSchema = new mongoose.Schema({
  userName: String,
  sid: String,
  name: String,
  department: String,
  grade: String,
  class: String,
  Email: String,
  absences: Number,
});

const Student = mongoose.model('Student', studentSchema);

// API Endpoints
// 1. Get All Students (Read)
app.get('/api/v1/user/findAll', async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ code: 200, body: students });
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Internal server error' });
  }
});

// 2. Create Student (Create)
app.post('/api/v1/user/create', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json({ code: 200, body: newStudent });
  } catch (error) {
    res.status(400).json({ code: 400, message: 'Failed to create student', error });
  }
});

// 3. Update Student (Update)
app.put('/api/v1/user/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedStudent) {
      res.json({ code: 200, body: updatedStudent });
    } else {
      res.status(404).json({ code: 404, message: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ code: 400, message: 'Failed to update student', error });
  }
});

// 4. Delete Student (Delete)
app.delete('/api/v1/user/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (deletedStudent) {
      res.json({ code: 200, message: 'Student deleted' });
    } else {
      res.status(404).json({ code: 404, message: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ code: 400, message: 'Failed to delete student', error });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
