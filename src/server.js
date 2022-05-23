const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello from nodeJS');
});

app.use('/', authRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
