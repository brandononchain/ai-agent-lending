import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  Brain,
  Code,
  Palette,
  Wand2,
  CheckCircle,
  X,
  Plus,
  Settings,
  History,
  Trash2,
  Copy,
  Download
} from 'lucide-react';

const AIChatInterface = ({ onClose, onMintAgent }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI Agent Builder. Describe what kind of AI agent you\'d like to create, and I\'ll help you design and mint it on-chain.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [agentConfig, setAgentConfig] = useState({
    name: '',
    description: '',
    capabilities: [],
    personality: '',
    avatarStyle: 'modern',
    specializations: []
  });
  const [currentStep, setCurrentStep] = useState('chat'); // chat, config, minting
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        type: 'assistant',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
        agentUpdate: aiResponse.agentUpdate
      }]);

      if (aiResponse.agentUpdate) {
        setAgentConfig(prev => ({ ...prev, ...aiResponse.agentUpdate }));
      }

      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('trading') || lowerInput.includes('crypto') || lowerInput.includes('market')) {
      return {
        content: 'Great! A trading-focused AI agent. I can help you create an agent that specializes in cryptocurrency trading, market analysis, and portfolio optimization. What specific trading strategies should it focus on?',
        suggestions: ['Technical Analysis', 'DeFi Strategies', 'Risk Management', 'Arbitrage'],
        agentUpdate: {
          name: 'Crypto Trader AI',
          capabilities: ['Market Analysis', 'Trading Execution', 'Risk Assessment'],
          specializations: ['Cryptocurrency Trading']
        }
      };
    }

    if (lowerInput.includes('defi') || lowerInput.includes('yield') || lowerInput.includes('farming')) {
      return {
        content: 'Excellent choice! A DeFi specialist agent can help with yield farming, liquidity provision, and protocol interactions. What DeFi activities should it prioritize?',
        suggestions: ['Yield Farming', 'Liquidity Mining', 'Staking', 'Protocol Analytics'],
        agentUpdate: {
          name: 'DeFi Optimizer',
          capabilities: ['Yield Optimization', 'Liquidity Management', 'Protocol Analysis'],
          specializations: ['DeFi', 'Yield Farming']
        }
      };
    }

    if (lowerInput.includes('nft') || lowerInput.includes('collectible') || lowerInput.includes('art')) {
      return {
        content: 'NFT specialist! This agent can help with NFT trading, rarity analysis, and collection management. What aspects of NFTs interest you most?',
        suggestions: ['Trading', 'Rarity Analysis', 'Collection Management', 'Market Research'],
        agentUpdate: {
          name: 'NFT Expert',
          capabilities: ['Market Analysis', 'Rarity Assessment', 'Trading Strategy'],
          specializations: ['NFTs', 'Digital Art']
        }
      };
    }

    if (lowerInput.includes('analysis') || lowerInput.includes('research') || lowerInput.includes('data')) {
      return {
        content: 'Research and analysis agent! Perfect for data-driven insights and market intelligence. What type of analysis should it specialize in?',
        suggestions: ['Market Research', 'Data Analysis', 'Trend Prediction', 'Risk Assessment'],
        agentUpdate: {
          name: 'Research Analyst',
          capabilities: ['Data Analysis', 'Trend Prediction', 'Report Generation'],
          specializations: ['Research', 'Analytics']
        }
      };
    }

    return {
      content: 'I understand you want to create a custom AI agent. To help you better, could you tell me more about its purpose? For example, should it focus on trading, DeFi, NFTs, or analysis?',
      suggestions: ['Trading Bot', 'DeFi Specialist', 'NFT Expert', 'Research Agent'],
      agentUpdate: {
        name: 'Custom AI Agent'
      }
    };
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSendMessage({ preventDefault: () => {}, target: { value: suggestion } });
  };

  const handleMintAgent = () => {
    const finalAgent = {
      ...agentConfig,
      id: Date.now(),
      status: 'minting',
      createdAt: new Date().toISOString()
    };
    onMintAgent(finalAgent);
    setCurrentStep('minting');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl h-[80vh] glass-effect rounded-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI Agent Builder</h2>
              <p className="text-slate-400 text-sm">Create and mint your custom AI agent</p>
            </div>
          </div>
          <motion.button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 text-slate-400" />
          </motion.button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-start space-x-3">
                    {message.type === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`rounded-2xl p-4 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-white/10 text-white'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>

                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <motion.button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {suggestion}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Agent Preview Card */}
        {agentConfig.name && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-white/20 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Agent Preview</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Configuring</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 block mb-1">Name</label>
                  <p className="text-white font-medium">{agentConfig.name}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-1">Capabilities</label>
                  <div className="flex flex-wrap gap-2">
                    {agentConfig.capabilities.map((cap, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-1">Specializations</label>
                  <div className="flex flex-wrap gap-2">
                    {agentConfig.specializations.map((spec, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Bot className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <motion.button
                onClick={onClose}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleMintAgent}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg text-white font-medium flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Wand2 className="w-4 h-4" />
                <span>Mint Agent</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Input Area */}
        <div className="border-t border-white/20 p-6">
          <form onSubmit={handleSendMessage} className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your AI agent..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <motion.button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 rounded-lg text-white disabled:cursor-not-allowed flex items-center justify-center min-w-[50px]"
              whileHover={!(!input.trim() || isTyping) ? { scale: 1.05 } : {}}
              whileTap={!(!input.trim() || isTyping) ? { scale: 0.95 } : {}}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIChatInterface;