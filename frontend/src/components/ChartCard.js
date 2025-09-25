import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const ChartCard = ({ title, data, labels }) => {
  // Transform data for the chart
  const chartData = data.map((value, index) => ({
    name: labels[index] || `Point ${index + 1}`,
    value: value
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/90 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-lg">
          <p className="text-white text-sm font-medium">{`${label}`}</p>
          <p className="text-blue-400 text-sm font-bold">{`Value: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h4 className="text-lg font-bold text-white mb-4">{title}</h4>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="name"
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#gradient)"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#8b5cf6' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <span className="text-slate-400">Portfolio Value</span>
          </div>
        </div>
        <div className="text-green-400 font-medium">+12.5%</div>
      </div>
    </motion.div>
  );
};

export default ChartCard;