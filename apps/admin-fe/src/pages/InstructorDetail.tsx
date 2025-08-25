import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Award, 
  DollarSign,
  Star,
  Users,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  Globe,
  Linkedin,
  Twitter,
  ExternalLink,
  TrendingUp,
  MessageSquare,
  Play,
  FileText
} from 'lucide-react';

// Mock instructor data
const instructorData = {
  id: '1',
  fullName: 'Trần Thị Hương',
  email: 'tran.thi.huong@example.com',
  phone: '+84 901 234 567',
  avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  bio: 'Kỹ sư QA cao cấp với hơn 8 năm kinh nghiệm trong lĩnh vực kiểm thử tự động và Selenium WebDriver. Đã đào tạo hơn 2000 học viên thành công.',
  status: 'active',
  joinDate: '2024-01-15T08:30:00Z',
  lastLogin: '2024-12-19T14:30:00Z',
  emailVerified: true,
  location: {
    country: 'Việt Nam',
    city: 'Hà Nội'
  },
  specializations: ['Selenium WebDriver', 'Kiểm thử tự động', 'Kiểm thử API', 'TestNG', 'Page Object Model'],
  socialLinks: {
    website: 'https://tranhuong.dev',
    linkedin: 'https://linkedin.com/in/tranhuong',
    twitter: 'https://twitter.com/tranhuong'
  },
  statistics: {
    courseCount: 3,
    studentCount: 2456,
    averageRating: 4.6,
    totalRevenue: 125430500,
    reviewCount: 342,
    totalLessons: 45,
    totalVideoHours: 28.5
  },
  qualifications: {
    education: 'Thạc sĩ Khoa học Máy tính, Đại học Bách Khoa Hà Nội',
    experience: '8+ năm kinh nghiệm trong kiểm thử phần mềm và đảm bảo chất lượng',
    certifications: ['ISTQB Advanced Level', 'Certified Selenium Professional', 'AWS Certified Developer'],
    achievements: [
      'Top 1% giảng viên được đánh giá cao nhất năm 2023',
      'Hơn 2000 học viên đã hoàn thành khóa học',
      'Tỷ lệ hoàn thành khóa học trung bình 85%'
    ]
  }
};

const courses = [
  {
    id: '1',
    title: 'Khóa học Selenium WebDriver toàn diện',
    thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    status: 'published',
    students: 1234,
    rating: 4.6,
    reviews: 256,
    revenue: 110974660,
    createdAt: '2024-01-15T08:30:00Z',
    lastUpdated: '2024-12-19T14:30:00Z'
  },
  {
    id: '2',
    title: 'Kiểm thử API nâng cao với RestAssured',
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    status: 'published',
    students: 890,
    rating: 4.4,
    reviews: 178,
    revenue: 62291100,
    createdAt: '2024-02-10T10:15:00Z',
    lastUpdated: '2024-12-18T16:20:00Z'
  },
  {
    id: '3',
    title: 'Kiểm thử hiệu năng với JMeter',
    thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    status: 'draft',
    students: 0,
    rating: 0,
    reviews: 0,
    revenue: 0,
    createdAt: '2024-12-10T09:20:00Z',
    lastUpdated: '2024-12-18T13:45:00Z'
  }
];

const recentReviews = [
  {
    id: '1',
    student: {
      name: 'Nguyễn Văn An',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    course: 'Khóa học Selenium WebDriver toàn diện',
    rating: 5,
    comment: 'Khóa học rất chi tiết và dễ hiểu. Cô Hương giảng dạy rất tận tâm và chuyên nghiệp.',
    createdAt: '2024-12-18T10:30:00Z'
  },
  {
    id: '2',
    student: {
      name: 'Lê Thị Mai',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    course: 'Kiểm thử API nâng cao với RestAssured',
    rating: 4,
    comment: 'Nội dung hay, nhưng có thể cần thêm nhiều ví dụ thực tế hơn.',
    createdAt: '2024-12-17T15:45:00Z'
  }
];

const monthlyStats = [
  { month: 'T1', students: 120, revenue: 8500000 },
  { month: 'T2', students: 140, revenue: 9800000 },
  { month: 'T3', students: 130, revenue: 9200000 },
  { month: 'T4', students: 160, revenue: 11200000 },
  { month: 'T5', students: 150, revenue: 10500000 },
  { month: 'T6', students: 180, revenue: 12600000 },
  { month: 'T7', students: 200, revenue: 14000000 },
  { month: 'T8', students: 190, revenue: 13300000 },
  { month: 'T9', students: 220, revenue: 15400000 },
  { month: 'T10', students: 210, revenue: 14700000 },
  { month: 'T11', students: 230, revenue: 16100000 },
  { month: 'T12', students: 250, revenue: 17500000 }
];

export const InstructorDetail: React.FC = () => {
  const { t } = useTranslation();
  const { instructorId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: User },
    { id: 'courses', label: 'Khóa học', icon: BookOpen },
    { id: 'reviews', label: 'Đánh giá', icon: Star },
    { id: 'analytics', label: 'Thống kê', icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/instructors')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Chi tiết giảng viên</h1>
            <p className="text-gray-600 mt-1">ID: {instructorId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={instructorData.status as any}>
            {instructorData.status === 'active' ? 'Hoạt động' : instructorData.status}
          </Badge>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Edit size={16} />
            <span>Chỉnh sửa</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
            <MessageSquare size={16} />
            <span>Gửi tin nhắn</span>
          </button>
        </div>
      </div>

      {/* Instructor Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{instructorData.statistics.studentCount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Tổng học viên</p>
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
                <p className="text-2xl font-bold text-gray-900">{instructorData.statistics.averageRating}</p>
                <p className="text-sm text-gray-600">Đánh giá trung bình</p>
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
                <p className="text-2xl font-bold text-gray-900">{(instructorData.statistics.totalRevenue / 1000000).toFixed(1)}M VNĐ</p>
                <p className="text-sm text-gray-600">Tổng doanh thu</p>
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
                <p className="text-2xl font-bold text-gray-900">{instructorData.statistics.courseCount}</p>
                <p className="text-sm text-gray-600">Khóa học</p>
              </div>
              <div className="ml-auto p-2 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
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
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <img 
                    src={instructorData.avatar} 
                    alt={instructorData.fullName}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900">{instructorData.fullName}</h4>
                    <p className="text-gray-600 mt-2">{instructorData.bio}</p>
                    
                    <div className="flex items-center space-x-4 mt-4">
                      {instructorData.socialLinks.website && (
                        <a 
                          href={instructorData.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                        >
                          <Globe size={16} />
                          <span>Website</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                      {instructorData.socialLinks.linkedin && (
                        <a 
                          href={instructorData.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                        >
                          <Linkedin size={16} />
                          <span>LinkedIn</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                      {instructorData.socialLinks.twitter && (
                        <a 
                          href={instructorData.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                        >
                          <Twitter size={16} />
                          <span>Twitter</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{instructorData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Số điện thoại</p>
                      <p className="font-medium">{instructorData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Địa chỉ</p>
                      <p className="font-medium">{instructorData.location.city}, {instructorData.location.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Ngày tham gia</p>
                      <p className="font-medium">{new Date(instructorData.joinDate).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Chuyên môn</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {instructorData.specializations.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Trình độ & Thành tích</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Học vấn</h4>
                  <p className="text-gray-600">{instructorData.qualifications.education}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Kinh nghiệm</h4>
                  <p className="text-gray-600">{instructorData.qualifications.experience}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Chứng chỉ</h4>
                  <div className="flex flex-wrap gap-2">
                    {instructorData.qualifications.certifications.map((cert, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Thành tích nổi bật</h4>
                  <ul className="space-y-1">
                    {instructorData.qualifications.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Award className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Thống kê tổng quan</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{instructorData.statistics.courseCount}</p>
                  <p className="text-sm text-gray-600">Khóa học</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{instructorData.statistics.studentCount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Học viên</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{instructorData.statistics.averageRating}</p>
                  <p className="text-sm text-gray-600">Đánh giá TB</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{instructorData.statistics.totalVideoHours}h</p>
                  <p className="text-sm text-gray-600">Video giảng dạy</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Trạng thái tài khoản</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Trạng thái</span>
                  <Badge variant={instructorData.status as any}>
                    {instructorData.status === 'active' ? 'Hoạt động' : instructorData.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email xác thực</span>
                  {instructorData.emailVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Đăng nhập cuối</span>
                  <span className="text-sm font-medium">
                    {new Date(instructorData.lastLogin).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'courses' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Khóa học của giảng viên</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-16 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span>{course.students} học viên</span>
                      {course.rating > 0 && (
                        <span className="flex items-center">
                          <Star size={14} className="text-yellow-500 mr-1" />
                          {course.rating} ({course.reviews} đánh giá)
                        </span>
                      )}
                      <Badge variant={course.status as any}>
                        {course.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Tạo: {new Date(course.createdAt).toLocaleDateString('vi-VN')}</span>
                      <span>Cập nhật: {new Date(course.lastUpdated).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {course.revenue > 0 ? `${(course.revenue / 1000000).toFixed(1)}M VNĐ` : '0 VNĐ'}
                    </div>
                    <div className="text-sm text-gray-500">Doanh thu</div>
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
            <h3 className="text-lg font-semibold">Đánh giá gần đây</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <img 
                      src={review.student.avatar} 
                      alt={review.student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{review.student.name}</h4>
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
                      <p className="text-sm text-gray-600 mb-2">{review.course}</p>
                      <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Học viên mới theo tháng</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {monthlyStats.slice(-6).map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{stat.month}</span>
                      <span className="font-medium">{stat.students} học viên</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Doanh thu theo tháng</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {monthlyStats.slice(-6).map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{stat.month}</span>
                      <span className="font-medium">{(stat.revenue / 1000000).toFixed(1)}M VNĐ</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Hiệu suất giảng dạy</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">85%</p>
                  <p className="text-sm text-gray-600">Tỷ lệ hoàn thành TB</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">92%</p>
                  <p className="text-sm text-gray-600">Tỷ lệ hài lòng</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">4.6</p>
                  <p className="text-sm text-gray-600">Đánh giá trung bình</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};