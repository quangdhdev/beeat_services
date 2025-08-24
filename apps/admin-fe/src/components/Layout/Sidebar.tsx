import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ShoppingCart,
  BarChart3,
  FileText,
  Settings,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}


export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { t } = useTranslation();

  const navigation = [
    { name: t('navigation.dashboard'), href: '/', icon: LayoutDashboard },
    { name: t('navigation.customers'), href: '/customers', icon: Users },
    { name: t('navigation.courses'), href: '/courses', icon: BookOpen },
    { name: t('navigation.orders'), href: '/orders', icon: ShoppingCart },
    { name: t('navigation.instructors'), href: '/instructors', icon: UserCheck },
    { name: t('navigation.analytics'), href: '/analytics', icon: BarChart3 },
    { name: t('navigation.content'), href: '/content', icon: FileText },
    { name: t('navigation.settings'), href: '/settings', icon: Settings },
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BeeAt Admin</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-pink-50 text-pink-600 border-r-2 border-pink-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon size={20} />
            {!isCollapsed && <span className="font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};