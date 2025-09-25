const express = require('express');
const router = express.Router();

// Mock data for vault operations
let vaultStats = {
  totalStaked: '2847391',
  totalYield: '127543',
  activeUsers: '12847',
  avgAPY: '18.7'
};

let stakingPools = [
  {
    id: 'eth',
    name: 'Ethereum Pool',
    symbol: 'ETH',
    apy: '12.5',
    tvl: '1247391',
    risk: 'Low',
    duration: 'Flexible',
    minStake: '0.1',
    participants: 3421
  },
  {
    id: 'usdc',
    name: 'USD Coin Pool',
    symbol: 'USDC',
    apy: '15.8',
    tvl: '892147',
    risk: 'Low',
    duration: '7 days',
    minStake: '100',
    participants: 2156
  },
  {
    id: 'dai',
    name: 'Dai Stable Pool',
    symbol: 'DAI',
    apy: '16.2',
    tvl: '567892',
    risk: 'Low',
    duration: '30 days',
    minStake: '100',
    participants: 1876
  },
  {
    id: 'uni',
    name: 'Uniswap LP',
    symbol: 'UNI-ETH',
    apy: '28.7',
    tvl: '234567',
    risk: 'Medium',
    duration: 'Flexible',
    minStake: '10',
    participants: 987
  }
];

let yieldFarms = [
  {
    id: 'comp',
    name: 'Compound Farm',
    pair: 'USDC-COMP',
    apy: '45.2',
    tvl: '156789',
    risk: 'High',
    multiplier: '2.5',
    rewards: 'COMP',
    duration: 'Flexible',
    participants: 543
  },
  {
    id: 'sushi',
    name: 'SushiSwap Farm',
    pair: 'ETH-SUSHI',
    apy: '32.8',
    tvl: '98432',
    risk: 'Medium',
    multiplier: '1.8',
    rewards: 'SUSHI',
    duration: '14 days',
    participants: 321
  },
  {
    id: 'aave',
    name: 'Aave Staking',
    pair: 'AAVE-ETH',
    apy: '38.5',
    tvl: '234567',
    risk: 'Medium',
    multiplier: '2.1',
    rewards: 'AAVE',
    duration: '30 days',
    participants: 756
  }
];

let liquidityPools = [
  {
    id: 'eth-usdc',
    name: 'ETH-USDC',
    fee: '0.3',
    liquidity: '4567890',
    volume24h: '1234567',
    impermanentLoss: '-2.1',
    utilization: '87',
    apy: '22.1'
  },
  {
    id: 'dai-eth',
    name: 'DAI-ETH',
    fee: '0.05',
    liquidity: '2345678',
    volume24h: '567890',
    impermanentLoss: '-1.8',
    utilization: '92',
    apy: '18.5'
  },
  {
    id: 'wbtc-eth',
    name: 'WBTC-ETH',
    fee: '0.3',
    liquidity: '8901234',
    volume24h: '2345678',
    impermanentLoss: '-4.2',
    utilization: '78',
    apy: '15.7'
  }
];

// GET vault statistics
router.get('/stats', (req, res) => {
  res.json({
    totalStaked: `$${parseInt(vaultStats.totalStaked).toLocaleString()}`,
    totalYield: `$${parseInt(vaultStats.totalYield).toLocaleString()}`,
    activeUsers: vaultStats.activeUsers,
    avgAPY: `${vaultStats.avgAPY}%`
  });
});

// GET all staking pools
router.get('/pools', (req, res) => {
  res.json(stakingPools);
});

// GET staking pool by ID
router.get('/pools/:id', (req, res) => {
  const pool = stakingPools.find(p => p.id === req.params.id);
  if (!pool) {
    return res.status(404).json({ error: 'Pool not found' });
  }
  res.json(pool);
});

// POST stake assets
router.post('/stake', (req, res) => {
  const { poolId, amount, userId } = req.body;

  const pool = stakingPools.find(p => p.id === poolId);
  if (!pool) {
    return res.status(404).json({ error: 'Pool not found' });
  }

  if (parseFloat(amount) < parseFloat(pool.minStake)) {
    return res.status(400).json({ error: `Minimum stake is ${pool.minStake} ${pool.symbol}` });
  }

  const stakeTransaction = {
    id: Date.now(),
    poolId,
    amount,
    value: (parseFloat(amount) * 1700).toString(), // Mock ETH price
    apy: pool.apy,
    timestamp: new Date().toISOString(),
    status: 'active'
  };

  res.status(201).json({
    message: `Successfully staked ${amount} ${pool.symbol}`,
    transaction: stakeTransaction
  });
});

// GET yield farms
router.get('/farms', (req, res) => {
  res.json(yieldFarms);
});

// GET liquidity pools
router.get('/liquidity', (req, res) => {
  res.json(liquidityPools);
});

// POST provide liquidity
router.post('/liquidity', (req, res) => {
  const { poolId, amount1, amount2, userId } = req.body;

  const pool = liquidityPools.find(p => p.id === poolId);
  if (!pool) {
    return res.status(404).json({ error: 'Pool not found' });
  }

  const liquidityTransaction = {
    id: Date.now(),
    poolId,
    amount1,
    amount2,
    timestamp: new Date().toISOString(),
    status: 'active',
    apy: pool.apy
  };

  res.status(201).json({
    message: 'Successfully provided liquidity',
    transaction: liquidityTransaction
  });
});

module.exports = router;