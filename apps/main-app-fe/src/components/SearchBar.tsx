import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder
}) => {
  const { t } = useTranslation();
  const defaultPlaceholder = placeholder || t('header.searchPlaceholder');

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="relative flex-1 max-w-lg group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors duration-200" />
      </div>
      <input
        type="text"
        placeholder={defaultPlaceholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:shadow-md text-gray-900 placeholder-gray-500 transition-all duration-200 hover:border-gray-400"
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      
      {/* Search suggestions backdrop */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none -z-10"></div>
    </div>
  );
};

export default SearchBar;