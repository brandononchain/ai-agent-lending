const express = require('express');
const router = express.Router();

// Enhanced mock data for AI agents
let agents = [
  {
    id: 1,
    name: "Neural Trader Pro",
    status: "active",
    value: "2,500",
    successRate: "94.2%",
    lendingRate: "18.5%",
    category: "trading",
    description: "Advanced cryptocurrency trading algorithm with 94% success rate",
    performance: "+127.5%",
    stats: {
      trades: "12,847",
      profit: "+127.5%",
      volume: "$2.1M"
    },
    traits: [
      { trait: "Accuracy", value: "High", rarity: "85%" },
      { trait: "Speed", value: "Fast", rarity: "92%" },
      { trait: "Risk", value: "Medium", rarity: "78%" }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "DeFi Optimizer",
    status: "lending",
    value: "1,800",
    successRate: "89.1%",
    lendingRate: "22.3%",
    category: "defi",
    description: "Automated yield farming and liquidity optimization",
    performance: "+89.3%",
    stats: {
      farms: "156",
      profit: "+89.3%",
      volume: "$890K"
    },
    traits: [
      { trait: "Yield", value: "High", rarity: "76%" },
      { trait: "Gas Efficiency", value: "Optimized", rarity: "88%" },
      { trait: "Risk", value: "Low", rarity: "91%" }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Market Oracle",
    status: "active",
    value: "3,200",
    successRate: "96.7%",
    lendingRate: "25.1%",
    category: "analysis",
    description: "Predictive analytics and market intelligence AI",
    performance: "+234.1%",
    stats: {
      predictions: "8,934",
      profit: "+234.1%",
      volume: "$4.2M"
    },
    traits: [
      { trait: "Accuracy", value: "Very High", rarity: "95%" },
      { trait: "Speed", value: "Ultra Fast", rarity: "98%" },
      { trait: "Data Sources", value: "Multiple", rarity: "87%" }
    ],
    createdAt: new Date().toISOString()
  }
];

// Mock data for DeFi vault
let vaultPositions = [
  {
    id: 1,
    type: "staking",
    asset: "ETH",
    amount: "2.5",
    value: "4,250",
    apy: "12.5%",
    earned: "127.50",
    duration: "30 days",
    status: "active"
  },
  {
    id: 2,
    type: "farming",
    asset: "USDC-COMP",
    amount: "1,000",
    value: "1,000",
    apy: "45.2%",
    earned: "45.20",
    duration: "7 days",
    status: "active"
  }
];

// Mock data for NFT marketplace
let nfts = [
  {
    id: 1,
    name: "Neural Trader Pro",
    description: "Advanced cryptocurrency trading algorithm with 94% success rate",
    price: "2.5",
    currency: "ETH",
    usdPrice: "$4,250",
    rarity: "Epic",
    category: "trading",
    stats: {
      successRate: "94.2%",
      trades: "12,847",
      profit: "+127.5%",
      volume: "$2.1M"
    },
    traits: [
      { trait: "Accuracy", value: "High", rarity: "85%" },
      { trait: "Speed", value: "Fast", rarity: "92%" },
      { trait: "Risk", value: "Medium", rarity: "78%" }
    ]
  },
  {
    id: 2,
    name: "DeFi Optimizer",
    description: "Automated yield farming and liquidity optimization",
    price: "1.8",
    currency: "ETH",
    usdPrice: "$3,060",
    rarity: "Rare",
    category: "defi",
    stats: {
      successRate: "89.1%",
      farms: "156",
      profit: "+89.3%",
      volume: "$890K"
    },
    traits: [
      { trait: "Yield", value: "High", rarity: "76%" },
      { trait: "Gas Efficiency", value: "Optimized", rarity: "88%" },
      { trait: "Risk", value: "Low", rarity: "91%" }
    ]
  }
];

// GET all agents
router.get('/', (req, res) => {
  res.json(agents);
});

// GET agent by ID
router.get('/:id', (req, res) => {
  const agent = agents.find(a => a.id === parseInt(req.params.id));
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  res.json(agent);
});

// POST new agent (minting)
router.post('/', (req, res) => {
  const { name, status, category, description, traits } = req.body;
  const newAgent = {
    id: agents.length + 1,
    name,
    status: status || 'active',
    category: category || 'general',
    description: description || '',
    traits: traits || [],
    value: "2,500",
    successRate: "94.2%",
    lendingRate: "18.5%",
    performance: "+12.5%",
    stats: {
      trades: "0",
      profit: "+0%",
      volume: "$0"
    },
    createdAt: new Date().toISOString()
  };
  agents.push(newAgent);
  res.status(201).json(newAgent);
});

// Update agent status
router.patch('/:id', (req, res) => {
  const agentIndex = agents.findIndex(a => a.id === parseInt(req.params.id));
  if (agentIndex === -1) {
    return res.status(404).json({ error: 'Agent not found' });
  }

  const { status, ...updates } = req.body;
  agents[agentIndex] = { ...agents[agentIndex], ...updates, status };
  res.json(agents[agentIndex]);
});

// Delete agent
router.delete('/:id', (req, res) => {
  const agentIndex = agents.findIndex(a => a.id === parseInt(req.params.id));
  if (agentIndex === -1) {
    return res.status(404).json({ error: 'Agent not found' });
  }

  const deletedAgent = agents.splice(agentIndex, 1)[0];
  res.json(deletedAgent);
});

module.exports = router;
