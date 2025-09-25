import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue',
  delay = 0
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-500/20',
          icon: 'text-green-400',
          trend: trend === 'up' ? 'text-green-400' : 'text-red-400'
        };
      case 'purple':
        return {
          bg: 'bg-purple-500/20',
          icon: 'text-purple-400',
          trend: trend === 'up' ? 'text-green-400' : 'text-red-400'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-500/20',
          icon: 'text-yellow-400',
          trend: trend === 'up' ? 'text-green-400' : 'text-red-400'
        };
      default:
        return {
          bg: 'bg-blue-500/20',
          icon: 'text-blue-400',
          trend: trend === 'up' ? 'text-green-400' : 'text-red-400'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
        {trend && (
          <motion.div
            className={colors.trend}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {trend === 'up' ? '↗' : '↘'}
          </motion.div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
        {subtitle && (
          <p className="text-slate-400 text-sm">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;