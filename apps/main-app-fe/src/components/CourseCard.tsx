import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, Clock, Users } from 'lucide-react';
import { Course } from '../types/Course';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { t } = useTranslation();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Link
      to={`/course/${course.id}`}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-medium">
            {course.level}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded">
            {course.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span>{t('courses.card.by')} {course.instructor.name}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration} {t('courses.card.hours')}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.studentsCount.toLocaleString()} {t('courses.card.students')}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {renderStars(course.rating)}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {course.rating}
            </span>
            <span className="text-sm text-gray-500">
              ({course.studentsCount.toLocaleString()})
            </span>
          </div>
          
          <div className="text-right">
            {course.originalPrice && (
              <span className="text-sm text-gray-500 line-through mr-2">
                {course.originalPrice.toLocaleString()}₫
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              {course.price.toLocaleString()}₫
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;