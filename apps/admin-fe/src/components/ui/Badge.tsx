import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant: 'active' | 'inactive' | 'pending' | 'suspended' | 'banned' | 'published' | 'draft' | 'archived' | 'completed' | 'cancelled' | 'refunded';
  className?: string;
}

const variantStyles = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
  suspended: 'bg-red-100 text-red-800',
  banned: 'bg-red-100 text-red-800',
  published: 'bg-green-100 text-green-800',
  draft: 'bg-yellow-100 text-yellow-800',
  archived: 'bg-gray-100 text-gray-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-orange-100 text-orange-800',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};