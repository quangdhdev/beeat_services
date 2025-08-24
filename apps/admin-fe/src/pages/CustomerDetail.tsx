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
  Clock,
  Star,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  Activity,
  CreditCard,
  Globe,
  Shield
} from 'lucide-react';

// Mock customer data
const customerData = {
  id: '1',
  fullName: 'Nguyễn Văn An',
  email: 'nguyen.van.an@example.com',
  phone: '+84 901 234 567',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  bio: 'Kỹ sư phần mềm với 5 năm kinh nghiệm, đam mê học hỏi về kiểm thử tự động.',
  status: 'active',
  userType: 'student',
  registrationDate: '2024-01-15T08:30:00Z',
  lastLogin: '2024-12-19T14:30:00Z',
  emailVerified: true,
  preferences: {
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    notifications: {
      email: true,
      courseUpdates: true,
      promotions: false
    }
  },
  location: {
    country: 'Việt Nam',
    city: 'Hồ Chí Minh',
    ipAddress: '203.162.4.191'
  },
  statistics: {
    coursesEnrolled: 5,
    coursesCompleted: 3,
    certificatesEarned: 2,
    totalLearningTime: 1250,
    averageRating: 4.6,
    totalSpent: 2499000,
    lastPurchase: '2024-12-10T10:30:00Z'
  }
};

const enrollments = [
  {
    courseId: '1',
    courseTitle: 'Khóa học Selenium WebDriver toàn diện',
    courseThumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    instructor: 'Trần Thị Hương',
    enrollmentDate: '2024-11-15T08:30:00Z',
    progress: 85,
    completionDate: null,
    certificateEarned: false,
    lastAccessed: '2024-12-19T14:30:00Z'
  },
  {
    courseId: '2',
    courseTitle: 'Kiểm thử API với Postman & RestAssured',
    courseThumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    instructor: 'Lê Minh Tuấn',
    enrollmentDate: '2024-10-20T10:15:00Z',
    progress: 100,
    completionDate: '2024-11-25T16:45:00Z',
    certificateEarned: true,
    lastAccessed: '2024-11-25T16:45:00Z'
  },
  {
    courseId: '3',
    courseTitle: 'Kiểm thử ứng dụng di động với Appium',
    courseThumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    instructor: 'Phạm Văn Đức',
    enrollmentDate: '2024-09-10T14:20:00Z',
    progress: 100,
    completionDate: '2024-10-15T11:30:00Z',
    certificateEarned: true,
    lastAccessed: '2024-10-15T11:30:00Z'
  }
];

const orders = [
  {
    id: '1',
    orderNumber: 'DH-2024-001234',
    date: '2024-12-10T10:30:00Z',
    total: 899000,
    status: 'completed',
    items: 1,
    courses: ['Khóa học Selenium WebDriver toàn diện']
  },
  {
    id: '2',
    orderNumber: 'DH-2024-001156',
    date: '2024-10-20T10:15:00Z',
    total: 699000,
    status: 'completed',
    items: 1,
    courses: ['Kiểm thử API với Postman & RestAssured']
  },
  {
    id: '3',
    orderNumber: 'DH-2024-000987',
    date: '2024-09-10T14:20:00Z',
    total: 899000,
    status: 'completed',
    items: 1,
    courses: ['Kiểm thử ứng dụng di động với Appium']
  }
];

const activityLog = [
  {
    id: '1',
    action: 'login',
    description: 'Đăng nhập vào hệ thống',
    timestamp: '2024-12-19T14:30:00Z',
    ipAddress: '203.162.4.191'
  },
  {
    id: '2',
    action: 'course_progress',
    description: 'Hoàn thành bài học "Locating Elements" trong khóa Selenium',
    timestamp: '2024-12-19T13:45:00Z',
    ipAddress: '203.162.4.191'
  },
  {
    id: '3',
    action: 'course_enrollment',
    description: 'Đăng ký khóa học "Selenium WebDriver toàn diện"',
    timestamp: '2024-11-15T08:30:00Z',
    ipAddress: '203.162.4.191'
  },
  {
    id: '4',
    action: 'purchase',
    description: 'Mua khóa học với giá trị 899.000 VNĐ',
    timestamp: '2024-12-10T10:30:00Z',
    ipAddress: '203.162.4.191'
  }
];

export const CustomerDetail: React.FC = () => {
  const { t } = useTranslation();
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusReason, setStatusReason] = useState('');

  const handleStatusChange = () => {
    console.log('Changing status to:', newStatus, 'Reason:', statusReason);
    setShowStatusModal(false);
  };

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: User },
    { id: 'courses', label: 'Khóa học', icon: BookOpen },
    { id: 'orders', label: 'Đơn hàng', icon: CreditCard },
    { id: 'activity', label: 'Hoạt động', icon: Activity }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/customers')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Chi tiết khách hàng</h1>
            <p className="text-gray-600 mt-1">ID: {customerId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={customerData.status as any}>{customerData.status === 'active' ? 'Hoạt động' : customerData.status}</Badge>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Edit size={16} />
            <span>Chỉnh sửa</span>
          </button>
          <button 
            onClick={() => setShowStatusModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            <Shield size={16} />
            <span>Thay đổi trạng thái</span>
          </button>
        </div>
      </div>

      {/* Customer Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{customerData.statistics.coursesEnrolled}</p>
                <p className="text-sm text-gray-600">Khóa học đã đăng ký</p>
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
                <p className="text-2xl font-bold text-gray-900">{customerData.statistics.certificatesEarned}</p>
                <p className="text-sm text-gray-600">Chứng chỉ đạt được</p>
              </div>
              <div className="ml-auto p-2 bg-yellow-100 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{(customerData.statistics.totalSpent / 1000).toLocaleString()}K VNĐ</p>
                <p className="text-sm text-gray-600">Tổng chi tiêu</p>
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
                <p className="text-2xl font-bold text-gray-900">{Math.round(customerData.statistics.totalLearningTime / 60)}h</p>
                <p className="text-sm text-gray-600">Thời gian học</p>
              </div>
              <div className="ml-auto p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
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
                <div className="flex items-center space-x-4">
                  <img 
                    src={customerData.avatar} 
                    alt={customerData.fullName}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{customerData.fullName}</h4>
                    <p className="text-gray-600">{customerData.bio}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{customerData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Số điện thoại</p>
                      <p className="font-medium">{customerData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Địa chỉ</p>
                      <p className="font-medium">{customerData.location.city}, {customerData.location.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Ngày đăng ký</p>
                      <p className="font-medium">{new Date(customerData.registrationDate).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Thống kê học tập</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{customerData.statistics.coursesEnrolled}</p>
                    <p className="text-sm text-gray-600">Khóa học đăng ký</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{customerData.statistics.coursesCompleted}</p>
                    <p className="text-sm text-gray-600">Khóa học hoàn thành</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">{customerData.statistics.certificatesEarned}</p>
                    <p className="text-sm text-gray-600">Chứng chỉ</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{customerData.statistics.averageRating}</p>
                    <p className="text-sm text-gray-600">Đánh giá TB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Trạng thái tài khoản</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Trạng thái</span>
                  <Badge variant={customerData.status as any}>
                    {customerData.status === 'active' ? 'Hoạt động' : customerData.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email xác thực</span>
                  {customerData.emailVerified ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Loại tài khoản</span>
                  <span className="text-sm font-medium capitalize">
                    {customerData.userType === 'student' ? 'Học viên' : 'Giảng viên'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Đăng nhập cuối</span>
                  <span className="text-sm font-medium">
                    {new Date(customerData.lastLogin).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Tùy chọn</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ngôn ngữ</span>
                  <span className="text-sm font-medium">Tiếng Việt</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Múi giờ</span>
                  <span className="text-sm font-medium">GMT+7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Thông báo email</span>
                  {customerData.preferences.notifications.email ? (
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

      {activeTab === 'courses' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Khóa học đã đăng ký</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <div key={enrollment.courseId} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <img 
                    src={enrollment.courseThumbnail} 
                    alt={enrollment.courseTitle}
                    className="w-16 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{enrollment.courseTitle}</h4>
                    <p className="text-sm text-gray-600">Giảng viên: {enrollment.instructor}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Đăng ký: {new Date(enrollment.enrollmentDate).toLocaleDateString('vi-VN')}</span>
                      <span>Truy cập cuối: {new Date(enrollment.lastAccessed).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-lg font-semibold text-gray-900">{enrollment.progress}%</div>
                      {enrollment.certificateEarned && (
                        <Award className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-pink-500 h-2 rounded-full" 
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                    {enrollment.completionDate && (
                      <p className="text-xs text-green-600 mt-1">
                        Hoàn thành: {new Date(enrollment.completionDate).toLocaleDateString('vi-VN')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'orders' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Lịch sử đơn hàng</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{order.orderNumber}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString('vi-VN')} • {order.items} sản phẩm
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {order.courses.join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {order.total.toLocaleString()} VNĐ
                    </div>
                    <Badge variant={order.status as any} className="mt-1">
                      {order.status === 'completed' ? 'Hoàn thành' : order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'activity' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Nhật ký hoạt động</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityLog.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleString('vi-VN')}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">IP: {activity.ipAddress}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Change Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thay đổi trạng thái tài khoản</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái mới
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="active">Hoạt động</option>
                  <option value="suspended">Tạm khóa</option>
                  <option value="banned">Cấm vĩnh viễn</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lý do thay đổi
                </label>
                <textarea
                  value={statusReason}
                  onChange={(e) => setStatusReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows={3}
                  placeholder="Nhập lý do thay đổi trạng thái..."
                />
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={handleStatusChange}
                className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Xác nhận
              </button>
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};