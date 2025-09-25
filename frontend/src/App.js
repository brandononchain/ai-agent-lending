import React, { useState, useEffect } from 'react';
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
  Settings,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import AIChatInterface from './components/AIChatInterface';
import DeFiVault from './components/DeFiVault';
import NFTMarketplace from './components/NFTMarketplace';
import './App.css';

function App() {
  const [agents, setAgents] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAIChat, setShowAIChat] = useState(false);

  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(setAgents);
  }, []);

  const portfolioStats = {
    totalValue: '$127,543.21',
    change24h: '+12.5%',
    agentsLent: 8,
    totalEarned: '$3,247.89',
    activeLoans: 5,
    avgYield: '18.7%'
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'agents', label: 'AI Agents', icon: Bot },
    { id: 'lending', label: 'Lending', icon: DollarSign },
    { id: 'defi', label: 'DeFi Vault', icon: Shield },
    { id: 'nft', label: 'NFT Market', icon: Star },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ];

  const handleCreateAgent = () => {
    setShowAIChat(true);
  };

  const handleCloseAIChat = () => {
    setShowAIChat(false);
  };

  const handleMintAgent = (agentConfig) => {
    // Here you would typically make an API call to mint the agent on-chain
    console.log('Minting agent:', agentConfig);

    // Add the new agent to the list
    const newAgent = {
      id: Date.now(),
      name: agentConfig.name,
      status: 'active',
      value: '2,500',
      successRate: '94.2%',
      lendingRate: '18.5%'
    };

    setAgents(prev => [...prev, newAgent]);
    setShowAIChat(false);

    // Show success message or navigate to agent details
    alert(`AI Agent "${agentConfig.name}" has been successfully minted!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="glass-effect border-b border-white/20 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">AI Agent Lending</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <motion.button
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Settings className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0
        }}
        className="md:hidden glass-effect border-b border-white/20 overflow-hidden"
      >
        <div className="px-4 py-4 space-y-2">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMenuOpen(false);
              }}
              className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard agents={agents} portfolioStats={portfolioStats} onCreateAgent={handleCreateAgent} />}
        {activeTab === 'agents' && (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">AI Agents</h2>
            <p className="text-slate-400">Manage your AI agent collection and lending activities.</p>
          </div>
        )}
        {activeTab === 'lending' && (
          <div className="text-center py-12">
            <DollarSign className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Lending Dashboard</h2>
            <p className="text-slate-400">View active loans, returns, and lending opportunities.</p>
          </div>
        )}
        {activeTab === 'defi' && <DeFiVault />}
        {activeTab === 'nft' && <NFTMarketplace />}
        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <PieChart className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Analytics</h2>
            <p className="text-slate-400">Detailed insights and performance metrics.</p>
          </div>
        )}
      </main>

      {/* AI Chat Interface */}
      <AnimatePresence>
        {showAIChat && (
          <AIChatInterface
            onClose={handleCloseAIChat}
            onMintAgent={handleMintAgent}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
