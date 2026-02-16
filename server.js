const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Mock data
const topics = [
  { id: 1, name: 'Account Opening' },
  { id: 2, name: 'Loan Inquiry' },
  { id: 3, name: 'Card Services' }
];

const branches = [
  { id: 1, topicId: 1, name: 'Downtown Branch' },
  { id: 2, topicId: 1, name: 'Uptown Branch' },
  { id: 3, topicId: 2, name: 'Main Branch' },
  { id: 4, topicId: 3, name: 'Westside Branch' }
];

// In-memory bookings: { branchId: Number, appointmentTime: ISOString, name, email, topicId }
const bookings = [];

function generateSlotsForDate(dateStr) {
  // produce 30-minute slots between 09:00 and 16:30 local time for given date
  const slots = [];
  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date)) return slots;

  for (let hour = 9; hour <= 16; hour++) {
    for (const minute of [0, 30]) {
      const s = new Date(date);
      s.setHours(hour, minute, 0, 0);
      slots.push(s.toISOString());
    }
  }
  return slots;
}

app.get('/api/topics', (req, res) => {
  res.json(topics);
});

app.get('/api/branches', (req, res) => {
  const topicId = parseInt(req.query.topicId || '0', 10);
  if (topicId) {
    res.json(branches.filter(b => b.topicId === topicId));
  } else {
    res.json(branches);
  }
});

app.get('/api/appointments/available', (req, res) => {
  const branchId = parseInt(req.query.branchId || '0', 10);
  const date = req.query.date;
  if (!branchId || !date) return res.status(400).json({ error: 'branchId and date required' });

  const allSlots = generateSlotsForDate(date);
  const bookedSlots = bookings
    .filter(b => b.branchId === branchId && b.appointmentTime.startsWith(date))
    .map(b => b.appointmentTime);

  const available = allSlots.filter(s => !bookedSlots.includes(s));
  res.json(available);
});

app.post('/api/appointments', (req, res) => {
  const { name, email, branchId, topicId, appointmentTime } = req.body;
  if (!name || !email || !branchId || !topicId || !appointmentTime) {
    return res.status(400).json({ error: 'missing fields' });
  }

  // check if slot already booked
  if (bookings.some(b => b.branchId === branchId && b.appointmentTime === appointmentTime)) {
    return res.status(409).json({ error: 'time slot already booked' });
  }

  const appt = { id: bookings.length + 1, name, email, branchId, topicId, appointmentTime };
  bookings.push(appt);

  res.status(201).json(appt);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
