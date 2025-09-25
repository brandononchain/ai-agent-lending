import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Search,
  Filter,
  Grid3X3,
  List,
  Heart,
  Share,
  Eye,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Award,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  RefreshCw
} from 'lucide-react';

const NFTMarketplace = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    { id: 'all', label: 'All NFTs', count: 1247 },
    { id: 'trading', label: 'Trading Bots', count: 342 },
    { id: 'defi', label: 'DeFi Agents', count: 189 },
    { id: 'analysis', label: 'Analysis Tools', count: 234 },
    { id: 'collectibles', label: 'Collectibles', count: 156 },
    { id: 'legendary', label: 'Legendary', count: 23 }
  ];

  const nfts = [
    {
      id: 1,
      name: 'Neural Trader Pro',
      description: 'Advanced cryptocurrency trading algorithm with 94% success rate',
      image: '/api/placeholder/300/300',
      price: '2.5',
      currency: 'ETH',
      usdPrice: '$4,250',
      owner: '0x1234...5678',
      creator: 'AI Labs',
      rarity: 'Epic',
      category: 'trading',
      stats: {
        successRate: '94.2%',
        trades: '12,847',
        profit: '+127.5%',
        volume: '$2.1M'
      },
      traits: [
        { trait: 'Accuracy', value: 'High', rarity: '85%' },
        { trait: 'Speed', value: 'Fast', rarity: '92%' },
        { trait: 'Risk', value: 'Medium', rarity: '78%' }
      ],
      history: [
        { action: 'Sold', price: '2.3 ETH', time: '2 hours ago', buyer: '0xabcd...1234' },
        { action: 'Listed', price: '2.5 ETH', time: '1 day ago', buyer: '0x5678...9012' }
      ]
    },
    {
      id: 2,
      name: 'DeFi Optimizer',
      description: 'Automated yield farming and liquidity optimization',
      image: '/api/placeholder/300/300',
      price: '1.8',
      currency: 'ETH',
      usdPrice: '$3,060',
      owner: '0x9876...4321',
      creator: 'YieldMax',
      rarity: 'Rare',
      category: 'defi',
      stats: {
        successRate: '89.1%',
        farms: '156',
        profit: '+89.3%',
        volume: '$890K'
      },
      traits: [
        { trait: 'Yield', value: 'High', rarity: '76%' },
        { trait: 'Gas Efficiency', value: 'Optimized', rarity: '88%' },
        { trait: 'Risk', value: 'Low', rarity: '91%' }
      ],
      history: [
        { action: 'Bought', price: '1.6 ETH', time: '5 hours ago', buyer: '0x9876...4321' }
      ]
    },
    {
      id: 3,
      name: 'Market Oracle',
      description: 'Predictive analytics and market intelligence AI',
      image: '/api/placeholder/300/300',
      price: '3.2',
      currency: 'ETH',
      usdPrice: '$5,440',
      owner: '0x2468...1357',
      creator: 'Oracle AI',
      rarity: 'Legendary',
      category: 'analysis',
      stats: {
        successRate: '96.7%',
        predictions: '8,934',
        profit: '+234.1%',
        volume: '$4.2M'
      },
      traits: [
        { trait: 'Accuracy', value: 'Very High', rarity: '95%' },
        { trait: 'Speed', value: 'Ultra Fast', rarity: '98%' },
        { trait: 'Data Sources', value: 'Multiple', rarity: '87%' }
      ],
      history: [
        { action: 'Sold', price: '3.0 ETH', time: '1 day ago', buyer: '0x2468...1357' },
        { action: 'Listed', price: '3.2 ETH', time: '3 days ago', buyer: '0x1357...2468' }
      ]
    },
    {
      id: 4,
      name: 'Crypto Collector',
      description: 'Rare collectible AI agent with unique trading patterns',
      image: '/api/placeholder/300/300',
      price: '0.8',
      currency: 'ETH',
      usdPrice: '$1,360',
      owner: '0x5555...9999',
      creator: 'Collector Series',
      rarity: 'Common',
      category: 'collectibles',
      stats: {
        successRate: '78.5%',
        trades: '2,341',
        profit: '+45.2%',
        volume: '$156K'
      },
      traits: [
        { trait: 'Rarity', value: 'Unique', rarity: '67%' },
        { trait: 'Style', value: 'Vintage', rarity: '72%' },
        { trait: 'Performance', value: 'Standard', rarity: '84%' }
      ],
      history: [
        { action: 'Listed', price: '0.8 ETH', time: '30 minutes ago', buyer: '0x5555...9999' }
      ]
    }
  ];

  const featuredNFTs = nfts.filter(nft => nft.rarity === 'Legendary' || nft.price > 3);
  const filteredNFTs = nfts.filter(nft => {
    const matchesCategory = selectedCategory === 'all' || nft.category === selectedCategory;
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getRarityColor = (rarity) => {
    switch (rarity.toLowerCase()) {
      case 'legendary':
        return 'from-yellow-500 to-orange-500';
      case 'epic':
        return 'from-purple-500 to-pink-500';
      case 'rare':
        return 'from-blue-500 to-cyan-500';
      case 'common':
        return 'from-gray-500 to-slate-500';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const NFTCard = ({ nft, onClick }) => (
    <motion.div
      className="card cursor-pointer group"
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={() => onClick(nft)}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRarityColor(nft.rarity)} text-white`}>
            {nft.rarity}
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <motion.button
            className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle favorite toggle
            }}
          >
            <Heart className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
            <p className="text-white text-sm font-medium">{nft.price} {nft.currency}</p>
            <p className="text-slate-300 text-xs">{nft.usdPrice}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2">{nft.name}</h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{nft.description}</p>

        <div className="flex items-center justify-between text-sm mb-4">
          <div>
            <p className="text-slate-400">Success Rate</p>
            <p className="text-green-400 font-medium">{nft.stats.successRate}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400">24h Volume</p>
            <p className="text-white font-medium">{nft.stats.volume}</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <motion.button
            className="flex-1 btn-primary text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle buy action
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Buy Now
          </motion.button>
          <motion.button
            className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle view details
            }}
          >
            <Eye className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const NFTDetailModal = ({ nft, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl glass-effect rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={nft.image}
            alt={nft.name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-4 right-4">
            <motion.button
              onClick={onClose}
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-5 h-5 rotate-45" />
            </motion.button>
          </div>
          <div className="absolute top-4 left-4">
            <div className={`px-3 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${getRarityColor(nft.rarity)} text-white`}>
              {nft.rarity}
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{nft.name}</h1>
              <p className="text-slate-400 text-lg">{nft.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{nft.price} {nft.currency}</div>
              <div className="text-slate-400">{nft.usdPrice}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Success Rate</span>
                  <span className="text-green-400 font-medium">{nft.stats.successRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Trades</span>
                  <span className="text-white font-medium">{nft.stats.trades}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Profit</span>
                  <span className="text-green-400 font-medium">{nft.stats.profit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Trading Volume</span>
                  <span className="text-white font-medium">{nft.stats.volume}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Traits</h3>
              <div className="space-y-3">
                {nft.traits.map((trait, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-slate-400">{trait.trait}</span>
                    <div className="text-right">
                      <span className="text-white font-medium">{trait.value}</span>
                      <div className="text-xs text-slate-500">{trait.rarity} rarity</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <motion.button
              className="flex-1 btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Buy Now - {nft.price} {nft.currency}
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          <span className="gradient-text">NFT Marketplace</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Discover, collect, and trade unique AI agent NFTs
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search NFTs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recent" className="bg-slate-800">Recently Listed</option>
            <option value="price-low" className="bg-slate-800">Price: Low to High</option>
            <option value="price-high" className="bg-slate-800">Price: High to Low</option>
            <option value="rarity" className="bg-slate-800">Rarity</option>
            <option value="volume" className="bg-slate-800">Trading Volume</option>
          </select>

          <div className="flex items-center bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3"
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label} ({category.count})
          </motion.button>
        ))}
      </motion.div>

      {/* Featured NFTs */}
      {selectedCategory === 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Featured NFTs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredNFTs.map((nft) => (
              <NFTCard key={nft.id} nft={nft} onClick={setSelectedNFT} />
            ))}
          </div>
        </motion.div>
      )}

      {/* All NFTs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          {selectedCategory === 'all' ? 'All NFTs' : categories.find(c => c.id === selectedCategory)?.label}
        </h2>
        <div className={`grid gap-6 ${
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        }`}>
          {filteredNFTs.map((nft) => (
            <NFTCard key={nft.id} nft={nft} onClick={setSelectedNFT} />
          ))}
        </div>
      </motion.div>

      {/* NFT Detail Modal */}
      <AnimatePresence>
        {selectedNFT && (
          <NFTDetailModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NFTMarketplace;