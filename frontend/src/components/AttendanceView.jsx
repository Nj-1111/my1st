import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export default function AttendanceView() {
  const [schedules, setSchedules] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // For demo purposes: fetch schedules (requires auth in real app)
    axios.get(API + '/schedules')
      .then(r => setSchedules(r.data))
      .catch(() => setSchedules([]));
  }, []);

  const checkin = async (scheduleId) => {
    try {
      await axios.post(API + '/attendance/checkin', { scheduleId });
      alert('Checked in (demo)');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <h2>Today's classes</h2>
      {schedules.length === 0 && <div>No schedules (requires login)</div>}
      <ul>
        {schedules.map(s => (
          <li key={s._id} style={{ marginBottom: 8 }}>
            <strong>{s.title || s.courseCode}</strong> — {new Date(s.startTime).toLocaleString()}
            <div>
              <button onClick={() => checkin(s._id)} style={{ marginTop: 6 }}>Check-in (QR/demo)</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}