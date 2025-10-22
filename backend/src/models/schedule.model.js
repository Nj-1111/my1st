const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  title: String,
  courseCode: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  startTime: Date,
  endTime: Date,
  location: String,
  meta: Object
}, { timestamps: true });

module.exports = mongoose.model('Schedule', ScheduleSchema);
