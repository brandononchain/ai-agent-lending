const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const agentsRouter = require('./routes/agents');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/agents', agentsRouter);

app.get('/', (req, res) => {
  res.send('AI Agent Lending Backend is running!');
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
