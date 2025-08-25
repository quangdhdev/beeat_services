import React from 'react';
import { useTranslation } from 'react-i18next';
import { MetricCard } from '../components/ui/MetricCard';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Users, BookOpen, DollarSign, GraduationCap, Headphones } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 45000, orders: 120 },
  { month: 'Feb', revenue: 52000, orders: 140 },
  { month: 'Mar', revenue: 48000, orders: 130 },
  { month: 'Apr', revenue: 61000, orders: 160 },
  { month: 'May', revenue: 55000, orders: 150 },
  { month: 'Jun', revenue: 67000, orders: 180 },
  { month: 'Jul', revenue: 73000, orders: 200 },
  { month: 'Aug', revenue: 69000, orders: 190 },
  { month: 'Sep', revenue: 82000, orders: 220 },
  { month: 'Oct', revenue: 78000, orders: 210 },
  { month: 'Nov', revenue: 85000, orders: 230 },
  { month: 'Dec', revenue: 92000, orders: 250 }
];



export const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const categoryData = [
    { category: t('courses.webTesting'), value: 35, color: '#EC4899' },
    { category: t('courses.mobileTesting'), value: 25, color: '#8B5CF6' },
    { category: t('courses.apiTesting'), value: 20, color: '#06B6D4' },
    { category: t('courses.performanceTesting'), value: 15, color: '#10B981' },
    { category: t('courses.securityTesting'), value: 5, color: '#F59E0B' }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'user_registration',
      description: 'Người dùng mới đã đăng ký',
      user: { id: '1', name: 'John Smith', email: 'john@example.com' },
      timestamp: '2 phút trước'
    },
    {
      id: '2',
      type: 'course_purchase',
      description: 'Đã mua "Kiểm thử Selenium nâng cao"',
      user: { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com' },
      timestamp: '15 phút trước'
    },
    {
      id: '3',
      type: 'course_completion',
      description: 'Đã hoàn thành "Cơ bản về kiểm thử API"',
      user: { id: '3', name: 'Mike Wilson', email: 'mike@example.com' },
      timestamp: '1 giờ trước'
    },
    {
      id: '4',
      type: 'support_ticket',
      description: 'Phiếu hỗ trợ mới đã được tạo',
      user: { id: '4', name: 'Emma Davis', email: 'emma@example.com' },
      timestamp: '2 giờ trước'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        <p className="text-gray-600 mt-2">{t('dashboard.subtitle')}</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title={t('dashboard.totalCustomers')}
          value="24.567"
          change={12.5}
          changeType="increase"
          icon={Users}
          iconColor="bg-blue-500"
        />
        <MetricCard
          title={t('dashboard.totalCourses')}
          value="156"
          change={8.2}
          changeType="increase"
          icon={BookOpen}
          iconColor="bg-green-500"
        />
        <MetricCard
          title={t('dashboard.monthlyRevenue')}
          value="2.1 tỷ VNĐ"
          change={15.3}
          changeType="increase"
          icon={DollarSign}
          iconColor="bg-pink-500"
        />
        <MetricCard
          title={t('dashboard.activeEnrollments')}
          value="18.234"
          change={5.7}
          changeType="increase"
          icon={GraduationCap}
          iconColor="bg-purple-500"
        />
        <MetricCard
          title={t('dashboard.supportTickets')}
          value="23"
          change={-12.3}
          changeType="decrease"
          icon={Headphones}
          iconColor="bg-orange-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.revenueOverview')}</h3>
              <p className="text-sm text-gray-600">{t('dashboard.monthlyRevenueAndOrders')}</p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'revenue' ? `$${value.toLocaleString()}` : value,
                        name === 'revenue' ? t('dashboard.revenue') : t('dashboard.orders')
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#EC4899" 
                      strokeWidth={3}
                      dot={{ fill: '#EC4899', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Categories */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.courseCategories')}</h3>
            <p className="text-sm text-gray-600">{t('dashboard.distributionByCategory')}</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ category, value }) => `${category}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.recentActivity')}</h3>
          <p className="text-sm text-gray-600">{t('dashboard.latestPlatformActivities')}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user.name}
                    </p>
                    <p className="text-sm text-gray-500">{activity.timestamp}</p>
                  </div>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-400">{activity.user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};