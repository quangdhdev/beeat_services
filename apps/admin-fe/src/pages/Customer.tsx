import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Table } from '../components/ui/Table';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { User as Customer } from '../types';
import { Badge } from '../components/ui/Badge';
import { Eye, Edit, Ban, Mail } from 'lucide-react';

// Mock data
const customers: Customer[] = [
  {
    id: '1',
    fullName: 'Nguyễn Văn An',
    email: 'nguyen.van.an@example.com',
    phone: '+84 901 234 567',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    status: 'active',
    userType: 'student',
    registrationDate: '2024-01-15T08:30:00Z',
    lastLogin: '2024-12-19T14:30:00Z',
    emailVerified: true,
    coursesEnrolled: 5,
    coursesCompleted: 3,
    totalSpent: 2499000,
    location: {
      country: 'Việt Nam',
      city: 'Hồ Chí Minh'
    }
  },
  {
    id: '2',
    fullName: 'Trần Thị Hương',
    email: 'tran.thi.huong@example.com',
    phone: '+84 987 654 321',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    status: 'active',
    userType: 'instructor',
    registrationDate: '2024-02-20T10:15:00Z',
    lastLogin: '2024-12-19T09:45:00Z',
    emailVerified: true,
    coursesEnrolled: 0,
    coursesCompleted: 0,
    totalSpent: 0,
    location: {
      country: 'Việt Nam',
      city: 'Hà Nội'
    }
  },
  {
    id: '3',
    fullName: 'Lê Minh Tuấn',
    email: 'le.minh.tuan@example.com',
    phone: '+84 912 345 678',
    status: 'suspended',
    userType: 'student',
    registrationDate: '2024-03-10T16:20:00Z',
    lastLogin: '2024-12-18T11:20:00Z',
    emailVerified: false,
    coursesEnrolled: 2,
    coursesCompleted: 0,
    totalSpent: 899000,
    location: {
      country: 'Việt Nam',
      city: 'Đà Nẵng'
    }
  },
  {
    id: '4',
    fullName: 'Phạm Thị Mai',
    email: 'pham.thi.mai@example.com',
    phone: '+84 908 765 432',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    status: 'pending',
    userType: 'student',
    registrationDate: '2024-12-18T14:10:00Z',
    emailVerified: false,
    coursesEnrolled: 0,
    coursesCompleted: 0,
    totalSpent: 0,
    location: {
      country: 'Việt Nam',
      city: 'Cần Thơ'
    }
  }
];

export const Customers: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      key: 'avatar' as keyof Customer,
      label: '',
      render: (value: string, customer: Customer) => (
        <img 
          src={value || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
          alt={customer.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
      )
    },
    {
      key: 'fullName' as keyof Customer,
      label: t('customers.name'),
      sortable: true,
      render: (value: string, customer: Customer) => (
        <div className="cursor-pointer" onClick={() => navigate(`/customers/${customer.id}`)}>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{customer.email}</div>
        </div>
      )
    },
    {
      key: 'status' as keyof Customer,
      label: t('customers.status'),
      sortable: true,
      render: (value: string) => <Badge variant={value as any}>{value}</Badge>
    },
    {
      key: 'userType' as keyof Customer,
      label: t('customers.type'),
      sortable: true,
      render: (value: string) => (
        <span className="capitalize text-sm font-medium text-gray-700">{t(`customers.${value}`)}</span>
      )
    },
    {
      key: 'coursesEnrolled' as keyof Customer,
      label: t('customers.courses'),
      sortable: true,
      render: (value: number, customer: Customer) => (
        <div className="text-sm">
          <div>{value} {t('customers.enrolled')}</div>
          <div className="text-gray-500">{customer.coursesCompleted} {t('customers.completed')}</div>
        </div>
      )
    },
    {
      key: 'totalSpent' as keyof Customer,
      label: t('customers.totalSpent'),
      sortable: true,
      render: (value: number) => (
        <span className="font-medium">{(value / 1000).toLocaleString()}K VNĐ</span>
      )
    },
    {
      key: 'registrationDate' as keyof Customer,
      label: t('customers.registered'),
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString('vi-VN')
    },
    {
      key: 'id' as keyof Customer,
      label: t('customers.actions'),
      render: (value: string, customer: Customer) => (
        <div className="flex items-center space-x-2">
          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
            onClick={() => navigate(`/customers/${value}`)}
            <Eye size={16} />
          </button>
          <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
            <Edit size={16} />
          </button>
          <button className="p-1 text-orange-600 hover:bg-orange-50 rounded">
            <Mail size={16} />
          </button>
          <button className="p-1 text-red-600 hover:bg-red-50 rounded">
            <Ban size={16} />
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
          <h1 className="text-3xl font-bold text-gray-900">{t('customers.title')}</h1>
          <p className="text-gray-600 mt-2">{t('customers.subtitle')}</p>
        </div>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
          {t('customers.addCustomer')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">24.567</p>
                <p className="text-sm text-gray-600">{t('customers.totalCustomers')}</p>
              </div>
              <div className="ml-auto p-2 bg-blue-100 rounded-lg">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-green-600">22.134</p>
                <p className="text-sm text-gray-600">{t('customers.activeCustomers')}</p>
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
                <p className="text-2xl font-bold text-yellow-600">1.245</p>
                <p className="text-sm text-gray-600">{t('customers.pendingCustomers')}</p>
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
                <p className="text-2xl font-bold text-red-600">156</p>
                <p className="text-sm text-gray-600">{t('customers.suspended')}</p>
              </div>
              <div className="ml-auto p-2 bg-red-100 rounded-lg">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Table
        data={customers}
        columns={columns}
        searchable={true}
        filterable={true}
        exportable={true}
        pagination={true}
      />
    </div>
  );
};