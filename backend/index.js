const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const agentsRouter = require('./routes/agents');
const vaultRouter = require('./routes/vault');
const nftRouter = require('./routes/nft');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/agents', agentsRouter);
app.use('/api/vault', vaultRouter);
app.use('/api/nft', nftRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AI Agent Lending Backend is running!',
    endpoints: {
      agents: '/api/agents',
      vault: '/api/vault',
      nft: '/api/nft'
    }
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'AI Agent Lending Platform API',
    version: '1.0.0',
    description: 'Backend API for AI agent lending, DeFi vault, and NFT marketplace',
    endpoints: {
      agents: {
        'GET /api/agents': 'Get all AI agents',
        'GET /api/agents/:id': 'Get specific agent',
        'POST /api/agents': 'Create new agent (minting)',
        'PATCH /api/agents/:id': 'Update agent',
        'DELETE /api/agents/:id': 'Delete agent'
      },
      vault: {
        'GET /api/vault/stats': 'Get vault statistics',
        'GET /api/vault/pools': 'Get staking pools',
        'GET /api/vault/pools/:id': 'Get specific pool',
        'POST /api/vault/stake': 'Stake assets',
        'GET /api/vault/farms': 'Get yield farms',
        'GET /api/vault/liquidity': 'Get liquidity pools',
        'POST /api/vault/liquidity': 'Provide liquidity'
      },
      nft: {
        'GET /api/nft': 'Get all NFTs with filtering',
        'GET /api/nft/:id': 'Get specific NFT',
        'POST /api/nft': 'Create new NFT (minting)',
        'POST /api/nft/:id/buy': 'Buy NFT',
        'POST /api/nft/:id/list': 'List NFT for sale',
        'GET /api/nft/featured/all': 'Get featured NFTs',
        'GET /api/nft/meta/categories': 'Get NFT categories',
        'GET /api/nft/collections/all': 'Get collections'
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
  console.log(`API documentation available at http://localhost:${port}/api`);
});
