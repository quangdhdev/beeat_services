import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: LucideIcon;
  iconColor: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor
}) => {
  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change}%`;
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change !== undefined && (
              <div className={`flex items-center space-x-1 mt-2 ${
                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeType === 'increase' ? 
                  <TrendingUp size={16} /> : 
                  <TrendingDown size={16} />
                }
                <span className="text-sm font-medium">
                  {formatChange(change)} from last month
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${iconColor}`}>
            <Icon size={24} className="text-white" />
          </div>
        </div>
      </div>
    </Card>
  );
};