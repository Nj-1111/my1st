const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['present','late','absent'], default: 'present' },
  method: { type: String, enum: ['manual','qr','auto'], default: 'manual' },
  meta: Object
}, { timestamps: true });

AttendanceSchema.index({ schedule: 1, student: 1, timestamp: -1 });

module.exports = mongoose.model('Attendance', AttendanceSchema);
