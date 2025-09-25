import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  TrendingUp,
  Lock,
  Unlock,
  Coins,
  Zap,
  Target,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Plus,
  Minus,
  RefreshCw,
  BarChart3,
  PieChart,
  Layers
} from 'lucide-react';

const DeFiVault = () => {
  const [activeTab, setActiveTab] = useState('staking');
  const [stakingAmount, setStakingAmount] = useState('');
  const [selectedPool, setSelectedPool] = useState('eth');

  const vaultStats = {
    totalStaked: '$2,847,391',
    totalYield: '$127,543',
    activeUsers: '12,847',
    avgAPY: '18.7%'
  };

  const stakingPools = [
    {
      id: 'eth',
      name: 'Ethereum Pool',
      symbol: 'ETH',
      apy: '12.5%',
      tvl: '$1,247,391',
      risk: 'Low',
      duration: 'Flexible',
      minStake: '0.1 ETH',
      icon: '⟠'
    },
    {
      id: 'usdc',
      name: 'USD Coin Pool',
      symbol: 'USDC',
      apy: '15.8%',
      tvl: '$892,147',
      risk: 'Low',
      duration: '7 days',
      minStake: '100 USDC',
      icon: '💰'
    },
    {
      id: 'dai',
      name: 'Dai Stable Pool',
      symbol: 'DAI',
      apy: '16.2%',
      tvl: '$567,892',
      risk: 'Low',
      duration: '30 days',
      minStake: '100 DAI',
      icon: '🪙'
    },
    {
      id: 'uni',
      name: 'Uniswap LP',
      symbol: 'UNI-ETH',
      apy: '28.7%',
      tvl: '$234,567',
      risk: 'Medium',
      duration: 'Flexible',
      minStake: '10 UNI',
      icon: '🦄'
    }
  ];

  const yieldFarms = [
    {
      id: 'comp',
      name: 'Compound Farm',
      pair: 'USDC-COMP',
      apy: '45.2%',
      tvl: '$156,789',
      risk: 'High',
      multiplier: '2.5x',
      rewards: 'COMP',
      duration: 'Flexible'
    },
    {
      id: 'sushi',
      name: 'SushiSwap Farm',
      pair: 'ETH-SUSHI',
      apy: '32.8%',
      tvl: '$98,432',
      risk: 'Medium',
      multiplier: '1.8x',
      rewards: 'SUSHI',
      duration: '14 days'
    },
    {
      id: 'aave',
      name: 'Aave Staking',
      pair: 'AAVE-ETH',
      apy: '38.5%',
      tvl: '$234,567',
      risk: 'Medium',
      multiplier: '2.1x',
      rewards: 'AAVE',
      duration: '30 days'
    }
  ];

  const liquidityPools = [
    {
      id: 'eth-usdc',
      name: 'ETH-USDC',
      fee: '0.3%',
      liquidity: '$4,567,890',
      volume24h: '$1,234,567',
      impermanentLoss: '-2.1%',
      utilization: '87%'
    },
    {
      id: 'dai-eth',
      name: 'DAI-ETH',
      fee: '0.05%',
      liquidity: '$2,345,678',
      volume24h: '$567,890',
      impermanentLoss: '-1.8%',
      utilization: '92%'
    },
    {
      id: 'wbtc-eth',
      name: 'WBTC-ETH',
      fee: '0.3%',
      liquidity: '$8,901,234',
      volume24h: '$2,345,678',
      impermanentLoss: '-4.2%',
      utilization: '78%'
    }
  ];

  const userPositions = [
    {
      id: 1,
      type: 'staking',
      asset: 'ETH',
      amount: '2.5',
      value: '$4,250',
      apy: '12.5%',
      earned: '$127.50',
      duration: '30 days',
      status: 'active'
    },
    {
      id: 2,
      type: 'farming',
      asset: 'USDC-COMP',
      amount: '1,000',
      value: '$1,000',
      apy: '45.2%',
      earned: '$45.20',
      duration: '7 days',
      status: 'active'
    },
    {
      id: 3,
      type: 'liquidity',
      asset: 'ETH-USDC',
      amount: '1.2',
      value: '$2,100',
      apy: '22.1%',
      earned: '$23.10',
      duration: 'Flexible',
      status: 'active'
    }
  ];

  const handleStake = () => {
    if (!stakingAmount || parseFloat(stakingAmount) <= 0) return;
    alert(`Successfully staked ${stakingAmount} ${stakingPools.find(p => p.id === selectedPool)?.symbol}!`);
    setStakingAmount('');
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 'text-green-400 bg-green-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'high':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-slate-400 bg-slate-500/20';
    }
  };

  const tabs = [
    { id: 'staking', label: 'Staking', icon: Lock },
    { id: 'farming', label: 'Yield Farming', icon: TrendingUp },
    { id: 'liquidity', label: 'Liquidity', icon: Layers },
    { id: 'positions', label: 'My Positions', icon: Wallet }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          <span className="gradient-text">DeFi Vault</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Stake, farm, and provide liquidity to earn maximum yields
        </p>
      </motion.div>

      {/* Vault Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Value Locked</p>
            <p className="text-white text-2xl font-bold">{vaultStats.totalStaked}</p>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Yield Generated</p>
            <p className="text-white text-2xl font-bold">{vaultStats.totalYield}</p>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Active Users</p>
            <p className="text-white text-2xl font-bold">{vaultStats.activeUsers}</p>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Target className="w-6 h-6 text-yellow-400" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Average APY</p>
            <p className="text-white text-2xl font-bold">{vaultStats.avgAPY}</p>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex space-x-1 bg-white/10 rounded-xl p-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'staking' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Staking Form */}
            <div className="lg:col-span-1">
              <div className="card">
                <h3 className="text-xl font-bold text-white mb-6">Stake Assets</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Select Pool</label>
                    <select
                      value={selectedPool}
                      onChange={(e) => setSelectedPool(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {stakingPools.map((pool) => (
                        <option key={pool.id} value={pool.id} className="bg-slate-800">
                          {pool.icon} {pool.name} - {pool.apy} APY
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Amount to Stake</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={stakingAmount}
                        onChange={(e) => setStakingAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                        {stakingPools.find(p => p.id === selectedPool)?.symbol}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">APY</span>
                      <span className="text-green-400 font-medium">
                        {stakingPools.find(p => p.id === selectedPool)?.apy}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Duration</span>
                      <span className="text-white">
                        {stakingPools.find(p => p.id === selectedPool)?.duration}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Min. Stake</span>
                      <span className="text-white">
                        {stakingPools.find(p => p.id === selectedPool)?.minStake}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleStake}
                    disabled={!stakingAmount || parseFloat(stakingAmount) <= 0}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Stake Assets
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Staking Pools */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-white mb-6">Available Pools</h3>
              <div className="space-y-4">
                {stakingPools.map((pool) => (
                  <motion.div
                    key={pool.id}
                    className="card p-6 hover:shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{pool.icon}</div>
                        <div>
                          <h4 className="text-white font-bold">{pool.name}</h4>
                          <p className="text-slate-400 text-sm">{pool.symbol}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-green-400 font-bold text-lg">{pool.apy}</div>
                        <div className="text-slate-400 text-sm">APY</div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400">TVL</p>
                        <p className="text-white font-medium">{pool.tvl}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Risk</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(pool.risk)}`}>
                          {pool.risk}
                        </span>
                      </div>
                      <div>
                        <p className="text-slate-400">Duration</p>
                        <p className="text-white font-medium">{pool.duration}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Min. Stake</p>
                        <p className="text-white font-medium">{pool.minStake}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'farming' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {yieldFarms.map((farm) => (
              <motion.div
                key={farm.id}
                className="card p-6 hover:shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-bold text-lg">{farm.name}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(farm.risk)}`}>
                    {farm.risk} Risk
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pair</span>
                    <span className="text-white font-medium">{farm.pair}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">APY</span>
                    <span className="text-green-400 font-bold">{farm.apy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Multiplier</span>
                    <span className="text-yellow-400 font-medium">{farm.multiplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rewards</span>
                    <span className="text-white font-medium">{farm.rewards}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">TVL</span>
                    <span className="text-white font-medium">{farm.tvl}</span>
                  </div>
                </div>

                <motion.button
                  className="w-full mt-6 btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Start Farming
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'liquidity' && (
          <div className="space-y-6">
            {liquidityPools.map((pool) => (
              <motion.div
                key={pool.id}
                className="card p-6 hover:shadow-2xl"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-white font-bold text-lg">{pool.name}</h4>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">{pool.fee}</div>
                    <div className="text-slate-400 text-sm">Fee Tier</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Total Liquidity</p>
                    <p className="text-white font-bold text-lg">{pool.liquidity}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">24h Volume</p>
                    <p className="text-white font-bold text-lg">{pool.volume24h}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Impermanent Loss</p>
                    <p className={`font-bold text-lg ${pool.impermanentLoss.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                      {pool.impermanentLoss}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Utilization</p>
                    <p className="text-white font-bold text-lg">{pool.utilization}</p>
                  </div>
                </div>

                <motion.button
                  className="w-full mt-6 btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Layers className="w-4 h-4 mr-2" />
                  Provide Liquidity
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'positions' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Your Positions</h3>
            {userPositions.map((position) => (
              <motion.div
                key={position.id}
                className="card p-6 hover:shadow-2xl"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      {position.type === 'staking' && <Lock className="w-5 h-5 text-blue-400" />}
                      {position.type === 'farming' && <TrendingUp className="w-5 h-5 text-green-400" />}
                      {position.type === 'liquidity' && <Layers className="w-5 h-5 text-purple-400" />}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{position.asset}</h4>
                      <p className="text-slate-400 text-sm capitalize">{position.type}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-white font-bold">{position.value}</div>
                    <div className="text-slate-400 text-sm">{position.amount} {position.asset.split('-')[0]}</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">APY</p>
                    <p className="text-green-400 font-medium">{position.apy}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Earned</p>
                    <p className="text-white font-medium">{position.earned}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Duration</p>
                    <p className="text-white font-medium">{position.duration}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Status</p>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                      {position.status}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <motion.button
                    className="flex-1 btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Manage
                  </motion.button>
                  <motion.button
                    className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DeFiVault;