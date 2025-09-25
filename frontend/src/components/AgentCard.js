import React from 'react';
import { motion } from 'framer-motion';
import { Bot, TrendingUp, TrendingDown, Activity, DollarSign, Clock, Star } from 'lucide-react';

const AgentCard = ({
  agent,
  performance,
  earnings,
  status,
  isLending = false,
  onLend,
  onViewDetails
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'lending':
        return 'bg-blue-500/20 text-blue-400';
      case 'idle':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'maintenance':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Activity className="w-3 h-3" />;
      case 'lending':
        return <DollarSign className="w-3 h-3" />;
      case 'idle':
        return <Clock className="w-3 h-3" />;
      default:
        return <Bot className="w-3 h-3" />;
    }
  };

  return (
    <motion.div
      className="card group cursor-pointer"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onViewDetails}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{agent.name}</h3>
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {getStatusIcon(status)}
              <span className="capitalize">{status}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          {performance && (
            <div className="flex items-center space-x-1">
              {performance.startsWith('+') ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span className={`font-bold ${performance.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {performance}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Current Value</span>
          <span className="text-white font-bold">${agent.value || '2,450'}</span>
        </div>

        {earnings && (
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">24h Earnings</span>
            <span className="text-green-400 font-bold">{earnings}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">Success Rate</span>
          <span className="text-white font-bold">{agent.successRate || '94.2%'}%</span>
        </div>

        {isLending && (
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Lending Rate</span>
            <span className="text-blue-400 font-bold">{agent.lendingRate || '18.5%'} APY</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <motion.button
          className="flex-1 btn-primary text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            onLend && onLend(agent);
          }}
        >
          {isLending ? 'Manage Lending' : 'Lend Agent'}
        </motion.button>

        <motion.button
          className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails && onViewDetails(agent);
          }}
        >
          <Star className="w-4 h-4 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AgentCard;