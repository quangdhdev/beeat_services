import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { useCoursesQuery } from '../hooks/queries/courseQueries';
import { categories } from '../data/courses';
import { Course } from '../types/Course';

const CourseList: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả danh mục');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: coursesData, isLoading, error } = useCoursesQuery({
    search: searchTerm || undefined,
    category: selectedCategory !== 'Tất cả danh mục' ? selectedCategory : undefined,
  });

  const courses = coursesData?.courses || [];
  const totalCourses = coursesData?.pagination?.totalItems || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t('courses.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('courses.description', { count: totalCourses })}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm}
              placeholder={t('courses.searchPlaceholder')}
            />
            
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            >
              <Filter className="h-5 w-5 mr-2" />
              {t('courses.filters')}
            </button>
          </div>
          
          <div className={`mt-4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-gray-700 mr-4">{t('courses.filterByCategory')}</span>
            </div>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {t('courses.showing', { filtered: courses.length, total: totalCourses })}
            {searchTerm && (
              <span className="ml-2">
                {t('courses.searchFor', { term: searchTerm })}
              </span>
            )}
            {selectedCategory !== 'Tất cả danh mục' && (
              <span className="ml-2">
                {t('courses.inCategory', { category: selectedCategory })}
              </span>
            )}
          </p>
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error loading courses</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
            >
              Retry
            </button>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course: Course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('courses.noResults.title')}</h3>
            <p className="text-gray-600 mb-4">
              {t('courses.noResults.description')}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Tất cả danh mục');
              }}
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              {t('courses.noResults.clearFilters')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;