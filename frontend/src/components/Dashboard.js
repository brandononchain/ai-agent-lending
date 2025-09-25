import React from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Wallet,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign,
  PieChart,
  Plus,
  Send,
  RefreshCw,
  BarChart3,
  Target,
  Coins,
  Trophy
} from 'lucide-react';
import PortfolioCard from './PortfolioCard';
import AgentCard from './AgentCard';
import StatsCard from './StatsCard';
import ChartCard from './ChartCard';

const Dashboard = ({ agents, portfolioStats, onCreateAgent }) => {
  const quickActions = [
    {
      id: 'create-agent',
      label: 'Create AI Agent',
      icon: Plus,
      color: 'from-green-500 to-emerald-500',
      description: 'Build and mint a new AI agent'
    },
    {
      id: 'lend-agent',
      label: 'Lend Agent',
      icon: Send,
      color: 'from-blue-500 to-cyan-500',
      description: 'List your agent for lending'
    },
    {
      id: 'stake-vault',
      label: 'Stake in Vault',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      description: 'Earn yield on your assets'
    },
    {
      id: 'trade-nft',
      label: 'Trade NFTs',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      description: 'Buy and sell AI agent NFTs'
    }
  ];

  const recentActivity = [
    { id: 1, type: 'lending', message: 'Agent "Neural Trader" lent to @user123', time: '2 min ago', amount: '+$127.50' },
    { id: 2, type: 'minting', message: 'New AI Agent "Crypto Oracle" minted', time: '15 min ago', amount: '' },
    { id: 3, type: 'staking', message: 'Staked 1000 USDC in DeFi Vault', time: '1 hour ago', amount: '+$25.00' },
    { id: 4, type: 'trading', message: 'Sold "AI Assistant v2" NFT for 2.5 ETH', time: '3 hours ago', amount: '+$3,250' }
  ];

  const topPerformingAgents = [
    { id: 1, name: 'Neural Trader', performance: '+28.5%', status: 'lending', image: '/api/placeholder/40/40' },
    { id: 2, name: 'Crypto Oracle', performance: '+22.1%', status: 'active', image: '/api/placeholder/40/40' },
    { id: 3, name: 'Market Predictor', performance: '+19.7%', status: 'idle', image: '/api/placeholder/40/40' },
    { id: 4, name: 'Risk Analyzer', performance: '+15.3%', status: 'lending', image: '/api/placeholder/40/40' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome to <span className="gradient-text">AI Agent Lending</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Manage your AI agents, earn from lending, and participate in the future of decentralized finance
        </p>
      </motion.div>

      {/* Portfolio Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <PortfolioCard
          title="Total Portfolio Value"
          value={portfolioStats.totalValue}
          change={portfolioStats.change24h}
          icon={Wallet}
          trend="up"
        />
        <PortfolioCard
          title="Agents Lent"
          value={portfolioStats.agentsLent}
          change={`${portfolioStats.activeLoans} active`}
          icon={Bot}
          trend="neutral"
        />
        <PortfolioCard
          title="Total Earned"
          value={portfolioStats.totalEarned}
          change="This month"
          icon={TrendingUp}
          trend="up"
        />
        <PortfolioCard
          title="Average Yield"
          value={portfolioStats.avgYield}
          change="APY"
          icon={Target}
          trend="up"
        />
      </motion.div>

      {/* Main Bento Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bento-grid"
      >
        {/* AI Agents Overview - Large Card */}
        <motion.div
          className="bento-item large card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">AI Agents</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-400">{agents.length} Active</span>
            </div>
          </div>

          <div className="space-y-4">
            {agents.slice(0, 4).map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{agent.name}</p>
                    <p className="text-sm text-slate-400 capitalize">{agent.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">
                    {agent.status === 'lending' ? '$127.50' : '$0.00'}
                  </p>
                  <p className="text-sm text-green-400">+12.5%</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="w-full mt-6 btn-outline"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Agents
          </motion.button>
        </motion.div>

        {/* Quick Actions - Wide Card */}
        <motion.div
          className="bento-item wide card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 rounded-lg bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 transition-all duration-300 text-left group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (action.id === 'create-agent' && onCreateAgent) {
                    onCreateAgent();
                  }
                }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-medium mb-1">{action.label}</h4>
                <p className="text-slate-400 text-sm">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          className="bento-item card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <ChartCard
            title="Portfolio Performance"
            data={[65, 78, 66, 89, 77, 95, 87, 92, 88, 94, 91, 96]}
            labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
          />
        </motion.div>

        {/* Top Performing Agents */}
        <motion.div
          className="bento-item card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Top Performers</h3>
          <div className="space-y-4">
            {topPerformingAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{agent.name}</p>
                    <p className="text-sm text-slate-400 capitalize">{agent.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-medium">{agent.performance}</p>
                  <p className="text-sm text-slate-400">30d</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="bento-item tall card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-white text-sm mb-1">{activity.message}</p>
                  <p className="text-slate-400 text-xs">{activity.time}</p>
                </div>
                {activity.amount && (
                  <div className="text-green-400 font-medium text-sm">
                    {activity.amount}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Stats */}
        <motion.div
          className="bento-item card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Market Stats</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">AI Agent Floor</p>
                <p className="text-white font-bold text-lg">2.1 ETH</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Lending Rate</p>
                <p className="text-white font-bold text-lg">18.5%</p>
              </div>
              <ArrowDownRight className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">TVL</p>
                <p className="text-white font-bold text-lg">$12.4M</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Users</p>
                <p className="text-white font-bold text-lg">8,421</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;