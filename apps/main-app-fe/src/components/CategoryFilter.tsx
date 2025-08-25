import React from 'react';
import { useTranslation } from 'react-i18next';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const { t } = useTranslation();

  const translateCategory = (category: string) => {
    switch (category) {
      case 'Tất cả danh mục':
        return t('categories.allCategories');
      case 'Web Testing':
        return t('categories.webTesting');
      case 'API Testing':
        return t('categories.apiTesting');
      case 'Mobile Testing':
        return t('categories.mobileTesting');
      case 'Performance Testing':
        return t('categories.performanceTesting');
      case 'Framework Design':
        return t('categories.frameworkDesign');
      case 'Security Testing':
        return t('categories.securityTesting');
      default:
        return category;
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-pink-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {translateCategory(category)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;