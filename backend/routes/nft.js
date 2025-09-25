const express = require('express');
const router = express.Router();

// Enhanced NFT mock data
let nfts = [
  {
    id: 1,
    name: "Neural Trader Pro",
    description: "Advanced cryptocurrency trading algorithm with 94% success rate",
    image: "/api/placeholder/300/300",
    price: "2.5",
    currency: "ETH",
    usdPrice: "$4,250",
    owner: "0x1234...5678",
    creator: "AI Labs",
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
    ],
    history: [
      { action: "Sold", price: "2.3 ETH", time: "2 hours ago", buyer: "0xabcd...1234" },
      { action: "Listed", price: "2.5 ETH", time: "1 day ago", buyer: "0x5678...9012" }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "DeFi Optimizer",
    description: "Automated yield farming and liquidity optimization",
    image: "/api/placeholder/300/300",
    price: "1.8",
    currency: "ETH",
    usdPrice: "$3,060",
    owner: "0x9876...4321",
    creator: "YieldMax",
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
    ],
    history: [
      { action: "Bought", price: "1.6 ETH", time: "5 hours ago", buyer: "0x9876...4321" }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Market Oracle",
    description: "Predictive analytics and market intelligence AI",
    image: "/api/placeholder/300/300",
    price: "3.2",
    currency: "ETH",
    usdPrice: "$5,440",
    owner: "0x2468...1357",
    creator: "Oracle AI",
    rarity: "Legendary",
    category: "analysis",
    stats: {
      successRate: "96.7%",
      predictions: "8,934",
      profit: "+234.1%",
      volume: "$4.2M"
    },
    traits: [
      { trait: "Accuracy", value: "Very High", rarity: "95%" },
      { trait: "Speed", value: "Ultra Fast", rarity: "98%" },
      { trait: "Data Sources", value: "Multiple", rarity: "87%" }
    ],
    history: [
      { action: "Sold", price: "3.0 ETH", time: "1 day ago", buyer: "0x2468...1357" },
      { action: "Listed", price: "3.2 ETH", time: "3 days ago", buyer: "0x1357...2468" }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Crypto Collector",
    description: "Rare collectible AI agent with unique trading patterns",
    image: "/api/placeholder/300/300",
    price: "0.8",
    currency: "ETH",
    usdPrice: "$1,360",
    owner: "0x5555...9999",
    creator: "Collector Series",
    rarity: "Common",
    category: "collectibles",
    stats: {
      successRate: "78.5%",
      trades: "2,341",
      profit: "+45.2%",
      volume: "$156K"
    },
    traits: [
      { trait: "Rarity", value: "Unique", rarity: "67%" },
      { trait: "Style", value: "Vintage", rarity: "72%" },
      { trait: "Performance", value: "Standard", rarity: "84%" }
    ],
    history: [
      { action: "Listed", price: "0.8 ETH", time: "30 minutes ago", buyer: "0x5555...9999" }
    ],
    createdAt: new Date().toISOString()
  }
];

let collections = [
  {
    id: 1,
    name: "AI Trading Bots",
    description: "Collection of advanced trading algorithms",
    image: "/api/placeholder/200/200",
    nftCount: 156,
    floorPrice: "1.2",
    volume24h: "45.6",
    creator: "AI Labs"
  },
  {
    id: 2,
    name: "DeFi Specialists",
    description: "Automated DeFi and yield farming agents",
    image: "/api/placeholder/200/200",
    nftCount: 89,
    floorPrice: "0.8",
    volume24h: "23.4",
    creator: "YieldMax"
  },
  {
    id: 3,
    name: "Market Oracles",
    description: "Predictive analytics and intelligence agents",
    image: "/api/placeholder/200/200",
    nftCount: 34,
    floorPrice: "2.5",
    volume24h: "67.8",
    creator: "Oracle AI"
  }
];

let categories = [
  { id: 'all', label: 'All NFTs', count: 1247 },
  { id: 'trading', label: 'Trading Bots', count: 342 },
  { id: 'defi', label: 'DeFi Agents', count: 189 },
  { id: 'analysis', label: 'Analysis Tools', count: 234 },
  { id: 'collectibles', label: 'Collectibles', count: 156 },
  { id: 'legendary', label: 'Legendary', count: 23 }
];

// GET all NFTs
router.get('/', (req, res) => {
  const { category, search, sortBy, limit = 20, offset = 0 } = req.query;

  let filteredNFTs = [...nfts];

  // Filter by category
  if (category && category !== 'all') {
    filteredNFTs = filteredNFTs.filter(nft => nft.category === category);
  }

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase();
    filteredNFTs = filteredNFTs.filter(nft =>
      nft.name.toLowerCase().includes(searchLower) ||
      nft.description.toLowerCase().includes(searchLower)
    );
  }

  // Sort
  switch (sortBy) {
    case 'price-low':
      filteredNFTs.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case 'price-high':
      filteredNFTs.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case 'rarity':
      const rarityOrder = { 'Legendary': 4, 'Epic': 3, 'Rare': 2, 'Common': 1 };
      filteredNFTs.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
      break;
    case 'volume':
      filteredNFTs.sort((a, b) => parseFloat(b.stats.volume.replace(/[$,]/g, '')) - parseFloat(a.stats.volume.replace(/[$,]/g, '')));
      break;
    default: // recent
      filteredNFTs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // Pagination
  const paginatedNFTs = filteredNFTs.slice(parseInt(offset), parseInt(offset) + parseInt(limit));

  res.json({
    nfts: paginatedNFTs,
    total: filteredNFTs.length,
    limit: parseInt(limit),
    offset: parseInt(offset)
  });
});

// GET NFT by ID
router.get('/:id', (req, res) => {
  const nft = nfts.find(n => n.id === parseInt(req.params.id));
  if (!nft) {
    return res.status(404).json({ error: 'NFT not found' });
  }
  res.json(nft);
});

// GET NFT categories
router.get('/meta/categories', (req, res) => {
  res.json(categories);
});

// GET collections
router.get('/collections/all', (req, res) => {
  res.json(collections);
});

// POST buy NFT
router.post('/:id/buy', (req, res) => {
  const nft = nfts.find(n => n.id === parseInt(req.params.id));
  if (!nft) {
    return res.status(404).json({ error: 'NFT not found' });
  }

  const { buyerAddress } = req.body;
  if (!buyerAddress) {
    return res.status(400).json({ error: 'Buyer address required' });
  }

  const transaction = {
    id: Date.now(),
    nftId: nft.id,
    buyer: buyerAddress,
    seller: nft.owner,
    price: nft.price,
    currency: nft.currency,
    timestamp: new Date().toISOString(),
    status: 'completed'
  };

  // Update NFT ownership
  nft.owner = buyerAddress;
  nft.history.unshift({
    action: 'Sold',
    price: `${nft.price} ${nft.currency}`,
    time: 'Just now',
    buyer: buyerAddress
  });

  res.json({
    message: `Successfully purchased ${nft.name}`,
    transaction,
    nft
  });
});

// POST list NFT for sale
router.post('/:id/list', (req, res) => {
  const nft = nfts.find(n => n.id === parseInt(req.params.id));
  if (!nft) {
    return res.status(404).json({ error: 'NFT not found' });
  }

  const { price, currency = 'ETH' } = req.body;
  if (!price || parseFloat(price) <= 0) {
    return res.status(400).json({ error: 'Valid price required' });
  }

  nft.price = price;
  nft.currency = currency;
  nft.usdPrice = `$${(parseFloat(price) * 1700).toLocaleString()}`; // Mock ETH price

  nft.history.unshift({
    action: 'Listed',
    price: `${price} ${currency}`,
    time: 'Just now',
    buyer: 'Marketplace'
  });

  res.json({
    message: `Successfully listed ${nft.name} for sale`,
    nft
  });
});

// GET featured NFTs
router.get('/featured/all', (req, res) => {
  const featured = nfts.filter(nft => nft.rarity === 'Legendary' || parseFloat(nft.price) > 3);
  res.json(featured);
});

// POST create new NFT (minting)
router.post('/', (req, res) => {
  const {
    name,
    description,
    image,
    price,
    currency = 'ETH',
    rarity = 'Common',
    category = 'general',
    traits = [],
    creator
  } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  const newNFT = {
    id: nfts.length + 1,
    name,
    description,
    image: image || '/api/placeholder/300/300',
    price: price || '0',
    currency,
    usdPrice: price ? `$${(parseFloat(price) * 1700).toLocaleString()}` : '$0',
    owner: creator || '0x0000...0000',
    creator: creator || 'Unknown',
    rarity,
    category,
    stats: {
      successRate: '0%',
      trades: '0',
      profit: '+0%',
      volume: '$0'
    },
    traits,
    history: [
      {
        action: 'Minted',
        price: '0 ETH',
        time: 'Just now',
        buyer: creator || 'Creator'
      }
    ],
    createdAt: new Date().toISOString()
  };

  nfts.push(newNFT);

  res.status(201).json({
    message: `Successfully minted ${name}`,
    nft: newNFT
  });
});

module.exports = router;