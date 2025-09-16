const express = require('express');
const router = express.Router();

// Example mock data
let agents = [
  { id: 1, name: "Agent One", status: "available" },
  { id: 2, name: "Agent Two", status: "lent" }
];

// GET all agents
router.get('/', (req, res) => {
  res.json(agents);
});

// POST new agent
router.post('/', (req, res) => {
  const { name, status } = req.body;
  const newAgent = { id: agents.length + 1, name, status };
  agents.push(newAgent);
  res.status(201).json(newAgent);
});

module.exports = router;
