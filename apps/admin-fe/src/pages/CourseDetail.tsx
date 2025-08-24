import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  ArrowLeft, 
  Edit, 
  Archive, 
  Eye, 
  Users, 
  Star, 
  DollarSign, 
  Clock, 
  Play,
  FileText,
  Award,
  MessageSquare,
  BarChart3,
  Calendar,
  Globe,
  BookOpen,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Mock course data
const courseData = {
  id: '1',
  title: 'Complete Selenium WebDriver Course',
  description: 'Master automated testing with Selenium WebDriver from basics to advanced concepts.',
  longDescription: 'This comprehensive course covers everything you need to know about Selenium WebDriver for automated testing. You\'ll learn from basic setup to advanced testing strategies, including page object model, data-driven testing, and continuous integration.',
  thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
  status: 'published',
  category: 'Web Testing',
  level: 'intermediate',
  language: 'English',
  price: 89.99,
  originalPrice: 129.99,
  duration: '12 hours 30 minutes',
  instructor: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Senior QA Engineer with 8+ years of experience in test automation and Selenium WebDriver.'
  },
  curriculum: [
    {
      id: '1',
      title: 'Introduction to Selenium',
      lessons: [
        { id: '1', title: 'What is Selenium WebDriver?', duration: '15 min', type: 'video', isPreview: true },
        { id: '2', title: 'Setting up Development Environment', duration: '20 min', type: 'video', isPreview: false },
        { id: '3', title: 'First Selenium Script', duration: '25 min', type: 'video', isPreview: false }
      ]
    },
    {
      id: '2',
      title: 'WebDriver Basics',
      lessons: [
        { id: '4', title: 'Locating Elements', duration: '30 min', type: 'video', isPreview: false },
        { id: '5', title: 'Interacting with Elements', duration: '35 min', type: 'video', isPreview: false },
        { id: '6', title: 'Handling Different Element Types', duration: '40 min', type: 'video', isPreview: false }
      ]
    },
    {
      id: '3',
      title: 'Advanced Concepts',
      lessons: [
        { id: '7', title: 'Page Object Model', duration: '45 min', type: 'video', isPreview: false },
        { id: '8', title: 'Data-Driven Testing', duration: '50 min', type: 'video', isPreview: false },
        { id: '9', title: 'TestNG Integration', duration: '30 min', type: 'video', isPreview: false }
      ]
    }
  ],
  skills: ['Selenium WebDriver', 'Test Automation', 'Java', 'TestNG', 'Page Object Model'],
  requirements: ['Basic Java knowledge', 'Understanding of web technologies', 'Computer with internet connection'],
  settings: {
    enrollmentLimit: null,
    certificateEnabled: true,
    discussionEnabled: true,
    downloadableResources: true
  },
  statistics: {
    enrollmentCount: 1234,
    completionCount: 968,
    completionRate: 78.5,
    averageRating: 4.6,
    totalRevenue: 110974.66,
    reviewCount: 256,
    totalLessons: 9,
    totalDuration: 290
  },
  createdAt: '2024-01-15T08:30:00Z',
  updatedAt: '2024-12-19T14:30:00Z',
  publishedAt: '2024-02-01T09:00:00Z'
};

const recentReviews = [
  {
    id: '1',
    user: { id: '1', name: 'John Smith', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
    rating: 5,
    comment: 'Excellent course! Very comprehensive and well-structured.',
    createdAt: '2024-12-18T10:30:00Z'
  },
  {
    id: '2',
    user: { id: '2', name: 'Emma Davis', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
    rating: 4,
    comment: 'Great content, but could use more practical examples.',
    createdAt: '2024-12-17T15:45:00Z'
  }
];

const recentEnrollments = [
  { userId: '1', userName: 'Mike Wilson', enrollmentDate: '2024-12-19T09:15:00Z', progress: 45, lastAccessed: '2024-12-19T14:30:00Z' },
  { userId: '2', userName: 'Lisa Chen', enrollmentDate: '2024-12-18T16:20:00Z', progress: 12, lastAccessed: '2024-12-19T11:45:00Z' },
  { userId: '3', userName: 'David Kumar', enrollmentDate: '2024-12-17T11:30:00Z', progress: 78, lastAccessed: '2024-12-19T08:20:00Z' }
];

export const CourseDetail: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleStatusChange = (newStatus: string) => {
    // Handle status change
    console.log('Changing status to:', newStatus);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/courses')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{courseData.title}</h1>
            <p className="text-gray-600 mt-1">Course ID: {courseId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={courseData.status as any}>{courseData.status}</Badge>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Edit size={16} />
            <span>Edit Course</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
            <Archive size={16} />
            <span>Archive</span>
          </button>
        </div>
      </div>

      {/* Course Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{courseData.statistics.enrollmentCount}</p>
                <p className="text-sm text-gray-600">Total Students</p>
              </div>
              <div className="ml-auto p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{courseData.statistics.averageRating}</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div className="ml-auto p-2 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">${courseData.statistics.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
              <div className="ml-auto p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{courseData.statistics.completionRate}%</p>
                <p className="text-sm text-gray-600">Completion Rate</p>
              </div>
              <div className="ml-auto p-2 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Course Information</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={courseData.thumbnail} 
                    alt={courseData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{courseData.longDescription}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Category</h4>
                    <p className="text-gray-600">{courseData.category}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Level</h4>
                    <p className="text-gray-600 capitalize">{courseData.level}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Duration</h4>
                    <p className="text-gray-600">{courseData.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Language</h4>
                    <p className="text-gray-600">{courseData.language}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Skills You'll Learn</h4>
                  <div className="flex flex-wrap gap-2">
                    {courseData.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor Info */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Instructor</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src={courseData.instructor.avatar} 
                    alt={courseData.instructor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{courseData.instructor.name}</h4>
                    <p className="text-sm text-gray-600">{courseData.instructor.email}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{courseData.instructor.bio}</p>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Pricing</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">${courseData.price}</span>
                  {courseData.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">${courseData.originalPrice}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {courseData.originalPrice && (
                    <span className="text-green-600">
                      {Math.round((1 - courseData.price / courseData.originalPrice) * 100)}% off
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>

            {/* Course Settings */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Settings</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Certificate</span>
                  {courseData.settings.certificateEnabled ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Discussions</span>
                  {courseData.settings.discussionEnabled ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Downloads</span>
                  {courseData.settings.downloadableResources ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'curriculum' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Course Curriculum</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseData.curriculum.map((section, sectionIndex) => (
                <div key={section.id} className="border border-gray-200 rounded-lg">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900">
                      Section {sectionIndex + 1}: {section.title}
                    </h4>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {lesson.type === 'video' ? (
                              <Play className="w-5 h-5 text-pink-500" />
                            ) : (
                              <FileText className="w-5 h-5 text-blue-500" />
                            )}
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Clock size={14} />
                              <span>{lesson.duration}</span>
                              {lesson.isPreview && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                  Preview
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Edit size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'students' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Enrollments</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEnrollments.map((enrollment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{enrollment.userName}</h4>
                    <p className="text-sm text-gray-600">
                      Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Last accessed: {new Date(enrollment.lastAccessed).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">{enrollment.progress}%</div>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-pink-500 h-2 rounded-full" 
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'reviews' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Reviews</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <img 
                      src={review.user.avatar} 
                      alt={review.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};