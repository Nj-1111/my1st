const express = require('express');
const Schedule = require('../models/schedule.model');
const auth = require('../middlewares/auth');
const router = express.Router();

// create schedule (teacher/admin)
router.post('/', auth, async (req, res) => {
  if (req.user.role === 'student') return res.status(403).json({ error: 'Not allowed' });
  const s = new Schedule({ ...req.body });
  await s.save();
  res.status(201).json(s);
});

router.get('/:id', auth, async (req, res) => {
  const s = await Schedule.findById(req.params.id).populate('teacher', 'name').populate('students', 'name');
  res.json(s);
});

router.get('/', auth, async (req, res) => {
  // simple filter: upcoming schedules
  const q = {};
  if (req.user.role === 'student') q.students = req.user._id;
  if (req.user.role === 'teacher') q.teacher = req.user._id;
  const schedules = await Schedule.find(q).sort({ startTime: 1 }).limit(100);
  res.json(schedules);
});

module.exports = router;
