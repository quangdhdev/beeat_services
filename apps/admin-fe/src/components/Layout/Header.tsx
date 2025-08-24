import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, Search, LogOut, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { admin, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('common.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <div className="relative group">
            <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <img
                src={admin?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">{admin?.fullName}</p>
                <p className="text-xs text-gray-500">{admin?.role.replace('_', ' ')}</p>
              </div>
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="py-1">
                <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <User size={16} />
                  <span>{t('auth.profile')}</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <LogOut size={16} />
                  <span>{t('auth.signOut')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};