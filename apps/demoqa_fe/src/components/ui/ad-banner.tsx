import React from 'react';
import { Card } from './card';

interface AdBannerProps {
  size: 'banner' | 'sidebar' | 'square' | 'leaderboard';
  position?: string;
  className?: string;
}

export function AdBanner({ size, position = "Advertisement", className = "" }: AdBannerProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'banner':
        return 'h-24 w-full';
      case 'sidebar':
        return 'h-64 w-full';
      case 'square':
        return 'h-64 w-64';
      case 'leaderboard':
        return 'h-20 w-full';
      default:
        return 'h-24 w-full';
    }
  };

  const getAdContent = () => {
    switch (size) {
      case 'leaderboard':
        return {
          title: "Premium Testing Tools",
          subtitle: "Boost your automation testing with professional tools",
          cta: "Learn More"
        };
      case 'sidebar':
        return {
          title: "Selenium Courses",
          subtitle: "Master automation testing with expert-led courses",
          cta: "Start Learning"
        };
      case 'square':
        return {
          title: "QA Certification",
          subtitle: "Get certified in quality assurance",
          cta: "Get Certified"
        };
      default:
        return {
          title: "Testing Framework",
          subtitle: "Advanced testing solutions for developers",
          cta: "Try Free"
        };
    }
  };

  const adContent = getAdContent();

  return (
    <Card className={`${getSizeClasses()} ${className} bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 flex items-center justify-center`}>
      <div className="text-center p-4">
        <div className="text-xs text-gray-500 mb-1">{position}</div>
        <h3 className="font-semibold text-gray-800 text-sm mb-1">{adContent.title}</h3>
        <p className="text-xs text-gray-600 mb-2">{adContent.subtitle}</p>
        <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
          {adContent.cta}
        </button>
      </div>
    </Card>
  );
}