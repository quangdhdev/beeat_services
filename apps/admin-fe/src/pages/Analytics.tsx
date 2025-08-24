import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, Users, BookOpen, Star } from 'lucide-react';

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 45000, orders: 120, users: 890 },
  { month: 'Feb', revenue: 52000, orders: 140, users: 1020 },
  { month: 'Mar', revenue: 48000, orders: 130, users: 980 },
  { month: 'Apr', revenue: 61000, orders: 160, users: 1150 },
  { month: 'May', revenue: 55000, orders: 150, users: 1080 },
  { month: 'Jun', revenue: 67000, orders: 180, users: 1250 },
  { month: 'Jul', revenue: 73000, orders: 200, users: 1350 },
  { month: 'Aug', revenue: 69000, orders: 190, users: 1280 },
  { month: 'Sep', revenue: 82000, orders: 220, users: 1420 },
  { month: 'Oct', revenue: 78000, orders: 210, users: 1380 },
  { month: 'Nov', revenue: 85000, orders: 230, users: 1480 },
  { month: 'Dec', revenue: 92000, orders: 250, users: 1560 }
];

const categoryData = [
  { category: 'Web Testing', revenue: 245000, students: 3500, color: '#EC4899' },
  { category: 'Mobile Testing', revenue: 180000, students: 2100, color: '#8B5CF6' },
  { category: 'API Testing', revenue: 165000, students: 1900, color: '#06B6D4' },
  { category: 'Performance Testing', revenue: 120000, students: 1200, color: '#10B981' },
  { category: 'Security Testing', revenue: 90000, students: 800, color: '#F59E0B' }
];

const topCoursesData = [
  { course: 'Complete Selenium WebDriver', revenue: 110975, students: 1234, rating: 4.6 },
  { course: 'API Testing with Postman', revenue: 85432, students: 1120, rating: 4.4 },
  { course: 'Mobile Testing with Appium', revenue: 78900, students: 980, rating: 4.5 },
  { course: 'Performance Testing JMeter', revenue: 65780, students: 850, rating: 4.3 },
  { course: 'Cypress End-to-End Testing', revenue: 54321, students: 720, rating: 4.7 }
];

const userGrowthData = [
  { week: 'Week 1', active: 1200, new: 45, returning: 1155 },
  { week: 'Week 2', active: 1350, new: 67, returning: 1283 },
  { week: 'Week 3', active: 1280, new: 52, returning: 1228 },
  { week: 'Week 4', active: 1450, new: 78, returning: 1372 },
];

export const Analytics: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('analytics.title')}</h1>
        <p className="text-gray-600 mt-2">{t('analytics.subtitle')}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title={t('analytics.totalRevenue')}
          value="16.8 tỷ VNĐ"
          change={18.2}
          changeType="increase"
          icon={DollarSign}
          iconColor="bg-green-500"
        />
        <MetricCard
          title={t('analytics.activeUsers')}
          value="15,450"
          change={12.5}
          changeType="increase"
          icon={Users}
          iconColor="bg-blue-500"
        />
        <MetricCard
          title={t('analytics.courseSales')}
          value="2,145"
          change={8.7}
          changeType="increase"
          icon={BookOpen}
          iconColor="bg-purple-500"
        />
        <MetricCard
          title={t('analytics.avgRating')}
          value="4.6"
          change={2.1}
          changeType="increase"
          icon={Star}
          iconColor="bg-yellow-500"
        />
        <MetricCard
          title={t('analytics.growthRate')}
          value="24.3%"
          change={5.4}
          changeType="increase"
          icon={TrendingUp}
          iconColor="bg-pink-500"
        />
      </div>

      {/* Revenue & Orders Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">{t('analytics.revenueAndOrdersTrend')}</h3>
              <p className="text-sm text-gray-600">{t('analytics.monthlyRevenueAndOrderVolume')}</p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="revenue" orientation="left" />
                    <YAxis yAxisId="orders" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => [
                      name === 'revenue' ? `${value.toLocaleString()} VNĐ` : value,
                      name === 'revenue' ? t('analytics.revenue') : t('analytics.orders')
                      ]}
                    />
                    <Line 
                      yAxisId="revenue"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#EC4899" 
                      strokeWidth={3}
                    />
                    <Bar 
                      yAxisId="orders"
                      dataKey="orders" 
                      fill="#8B5CF6"
                      opacity={0.6}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
            <p className="text-sm text-gray-600">Revenue by course category</p>
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
                    dataKey="revenue"
                    label={({ category, revenue }) => `$${revenue.toLocaleString()}`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Growth & Top Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
            <p className="text-sm text-gray-600">Weekly active users breakdown</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="new" 
                    stackId="1"
                    stroke="#10B981" 
                    fill="#10B981"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="returning" 
                    stackId="1"
                    stroke="#06B6D4" 
                    fill="#06B6D4"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Courses */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Courses</h3>
            <p className="text-sm text-gray-600">Best courses by revenue and enrollment</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCoursesData.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 truncate">{course.course}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span>{course.students} students</span>
                      <span className="flex items-center">
                        <Star size={14} className="text-yellow-500 mr-1" />
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      ${course.revenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Revenue Breakdown */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">{t('analytics.categoryPerformance')}</h3>
          <p className="text-sm text-gray-600">{t('analytics.revenueByCourseCategory')}</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-medium text-gray-900">Category</th>
                  <th className="text-right py-3 font-medium text-gray-900">Revenue</th>
                  <th className="text-right py-3 font-medium text-gray-900">Students</th>
                  <th className="text-right py-3 font-medium text-gray-900">Avg. Revenue/Student</th>
                  <th className="text-right py-3 font-medium text-gray-900">Growth</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((category, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="font-medium text-gray-900">{category.category}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 font-semibold">
                      ${category.revenue.toLocaleString()}
                    </td>
                    <td className="text-right py-4">{category.students.toLocaleString()}</td>
                    <td className="text-right py-4">
                      ${Math.round(category.revenue / category.students)}
                    </td>
                    <td className="text-right py-4">
                      <span className="text-green-600 font-medium">
                        +{(Math.random() * 20 + 5).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};