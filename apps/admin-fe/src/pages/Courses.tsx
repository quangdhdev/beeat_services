import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Table } from '../components/ui/Table';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Course } from '../types';
import { Badge } from '../components/ui/Badge';
import { Eye, Edit, Archive, Star, Users, DollarSign, BookOpen } from 'lucide-react';

// Mock data
const courses: Course[] = [
  {
    id: '1',
    title: 'Complete Selenium WebDriver Course',
    description: 'Learn automated testing with Selenium WebDriver from basics to advanced concepts.',
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    status: 'published',
    category: 'Web Testing',
    level: 'intermediate',
    price: 89.99,
    originalPrice: 129.99,
    instructor: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    statistics: {
      enrollmentCount: 1234,
      completionRate: 78.5,
      averageRating: 4.6,
      totalRevenue: 110974.66,
      reviewCount: 256
    },
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-12-19T14:30:00Z',
    publishedAt: '2024-02-01T09:00:00Z'
  },
  {
    id: '2',
    title: 'API Testing with Postman & RestAssured',
    description: 'Master API testing using industry-standard tools and frameworks.',
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    status: 'published',
    category: 'API Testing',
    level: 'beginner',
    price: 69.99,
    instructor: {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    statistics: {
      enrollmentCount: 890,
      completionRate: 82.3,
      averageRating: 4.4,
      totalRevenue: 62291.10,
      reviewCount: 178
    },
    createdAt: '2024-02-10T10:15:00Z',
    updatedAt: '2024-12-18T16:20:00Z',
    publishedAt: '2024-02-20T10:00:00Z'
  },
  {
    id: '3',
    title: 'Mobile App Testing with Appium',
    description: 'Learn to test mobile applications on iOS and Android platforms.',
    thumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    status: 'draft',
    category: 'Mobile Testing',
    level: 'advanced',
    price: 119.99,
    originalPrice: 149.99,
    instructor: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    statistics: {
      enrollmentCount: 0,
      completionRate: 0,
      averageRating: 0,
      totalRevenue: 0,
      reviewCount: 0
    },
    createdAt: '2024-12-15T14:00:00Z',
    updatedAt: '2024-12-19T11:30:00Z'
  },
  {
    id: '4',
    title: 'Performance Testing with JMeter',
    description: 'Master performance testing concepts and Apache JMeter tool.',
    thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    status: 'pending_review',
    category: 'Performance Testing',
    level: 'intermediate',
    price: 99.99,
    instructor: {
      id: '3',
      name: 'David Kumar',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    statistics: {
      enrollmentCount: 0,
      completionRate: 0,
      averageRating: 0,
      totalRevenue: 0,
      reviewCount: 0
    },
    createdAt: '2024-12-10T09:20:00Z',
    updatedAt: '2024-12-18T13:45:00Z'
  }
];

export const Courses: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      key: 'thumbnail' as keyof Course,
      label: '',
      render: (value: string, course: Course) => (
        <img 
          src={value} 
          alt={course.title}
          className="w-16 h-12 rounded-lg object-cover"
        />
      )
    },
    {
      key: 'title' as keyof Course,
      label: t('courses.course'),
      sortable: true,
      render: (value: string, course: Course) => (
        <div className="min-w-0 cursor-pointer" onClick={() => navigate(`/courses/${course.id}`)}>
          <div className="font-medium text-gray-900 truncate">{value}</div>
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <span>{course.category}</span>
            <span>•</span>
            <span className="capitalize">{course.level}</span>
          </div>
        </div>
      )
    },
    {
      key: 'instructor' as keyof Course,
      label: t('courses.instructor'),
      render: (value: any) => (
        <div className="flex items-center space-x-2">
          <img 
            src={value.avatar} 
            alt={value.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{value.name}</span>
        </div>
      )
    },
    {
      key: 'status' as keyof Course,
      label: t('courses.status'),
      sortable: true,
      render: (value: string) => <Badge variant={value as any}>{t(`courses.${value.replace('_', '')}`)}</Badge>
    },
    {
      key: 'price' as keyof Course,
      label: t('courses.price'),
      sortable: true,
      render: (value: number, course: Course) => (
        <div>
          <div className="font-medium">${value}</div>
          {course.originalPrice && (
            <div className="text-sm text-gray-500 line-through">
              ${course.originalPrice}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'statistics' as keyof Course,
      label: t('courses.stats'),
      render: (value: any) => (
        <div className="text-sm space-y-1">
          <div className="flex items-center space-x-1">
            <Users size={12} className="text-blue-500" />
            <span>{value.enrollmentCount} {t('courses.students')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={12} className="text-yellow-500" />
            <span>{value.averageRating > 0 ? value.averageRating.toFixed(1) : 'N/A'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign size={12} className="text-green-500" />
            <span>${value.totalRevenue.toLocaleString()}</span>
          </div>
        </div>
      )
    },
    {
      key: 'createdAt' as keyof Course,
      label: t('courses.created'),
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: 'id' as keyof Course,
      label: t('courses.actions'),
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => navigate(`/courses/${value}`)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            <Eye size={16} />
          </button>
          <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
            <Edit size={16} />
          </button>
          <button className="p-1 text-orange-600 hover:bg-orange-50 rounded">
            <Archive size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('courses.title')}</h1>
          <p className="text-gray-600 mt-2">{t('courses.subtitle')}</p>
        </div>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
          {t('courses.createCourse')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">{t('courses.totalCourses')}</p>
              </div>
              <div className="ml-auto p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-green-600">134</p>
                <p className="text-sm text-gray-600">{t('courses.published')}</p>
              </div>
              <div className="ml-auto p-2 bg-green-100 rounded-lg">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-yellow-600">18</p>
                <p className="text-sm text-gray-600">{t('courses.draft')}</p>
              </div>
              <div className="ml-auto p-2 bg-yellow-100 rounded-lg">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-orange-600">4</p>
                <p className="text-sm text-gray-600">{t('courses.pendingReview')}</p>
              </div>
              <div className="ml-auto p-2 bg-orange-100 rounded-lg">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Table
        data={courses}
        columns={columns}
        searchable={true}
        filterable={true}
        exportable={true}
        pagination={true}
      />
    </div>
  );
};