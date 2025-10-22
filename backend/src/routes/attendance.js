const express = require('express');
const Attendance = require('../models/attendance.model');
const Schedule = require('../models/schedule.model');
const auth = require('../middlewares/auth');
const router = express.Router();

// teacher or student can post a check-in (depends on rules)
router.post('/checkin', auth, async (req, res) => {
  const { scheduleId, studentId, method, status } = req.body;
  try {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });

    const student = studentId || req.user._id;
    // basic rule: allow teacher to mark any, student can only mark themselves
    if (req.user.role === 'student' && student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Students can only mark themselves' });
    }

    const attendance = new Attendance({
      schedule: schedule._id,
      student,
      method: method || 'qr',
      status: status || 'present',
      meta: {}
    });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get attendance by schedule
router.get('/schedule/:id', auth, async (req, res) => {
  const { id } = req.params;
  const list = await Attendance.find({ schedule: id }).populate('student', 'name email');
  res.json(list);
});

module.exports = router;
