import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const PortfolioCard = ({ title, value, change, icon: Icon, trend }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4 text-green-400" />;
      case 'down':
        return <ArrowDownRight className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-slate-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <motion.div
      className="card p-6 hover:shadow-2xl"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        {getTrendIcon()}
      </div>

      <div className="space-y-2">
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
        <p className={`text-sm font-medium ${getTrendColor()}`}>{change}</p>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;