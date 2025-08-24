import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Table } from '../components/ui/Table';
import { Card, CardContent } from '../components/ui/Card';
import { Order } from '../types';
import { Badge } from '../components/ui/Badge';
import { Eye, RefreshCw, Download } from 'lucide-react';

// Mock data
const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001234',
    customer: {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    items: [
      {
        courseId: '1',
        courseTitle: 'Complete Selenium WebDriver Course',
        price: 89.99,
        quantity: 1
      }
    ],
    summary: {
      subtotal: 89.99,
      discount: 10.00,
      tax: 7.20,
      total: 87.19
    },
    payment: {
      method: 'card',
      status: 'completed',
      transactionId: 'txn_1234567890',
      paidAt: '2024-12-19T10:30:00Z'
    },
    status: 'completed',
    createdAt: '2024-12-19T10:25:00Z',
    updatedAt: '2024-12-19T10:30:00Z'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-001235',
    customer: {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    items: [
      {
        courseId: '2',
        courseTitle: 'API Testing with Postman & RestAssured',
        price: 69.99,
        quantity: 1
      }
    ],
    summary: {
      subtotal: 69.99,
      discount: 0,
      tax: 5.60,
      total: 75.59
    },
    payment: {
      method: 'momo',
      status: 'pending',
      transactionId: 'momo_9876543210'
    },
    status: 'pending',
    createdAt: '2024-12-19T14:20:00Z',
    updatedAt: '2024-12-19T14:20:00Z'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-001236',
    customer: {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    items: [
      {
        courseId: '1',
        courseTitle: 'Complete Selenium WebDriver Course',
        price: 89.99,
        quantity: 1
      },
      {
        courseId: '2',
        courseTitle: 'API Testing with Postman & RestAssured',
        price: 69.99,
        quantity: 1
      }
    ],
    summary: {
      subtotal: 159.98,
      discount: 20.00,
      tax: 11.20,
      total: 151.18
    },
    payment: {
      method: 'card',
      status: 'refunded',
      transactionId: 'txn_5555555555',
      paidAt: '2024-12-18T16:45:00Z'
    },
    status: 'refunded',
    createdAt: '2024-12-18T16:40:00Z',
    updatedAt: '2024-12-19T09:15:00Z'
  }
];

export const Orders: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      key: 'orderNumber' as keyof Order,
      label: 'Order',
      sortable: true,
      render: (value: string, order: Order) => (
        <div className="cursor-pointer" onClick={() => navigate(`/orders/${order.id}`)}>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
        </div>
      )
    },
    {
      key: 'customer' as keyof Order,
      label: t('orders.customer'),
      render: (value: any) => (
        <div className="flex items-center space-x-3">
          <img 
            src={value.avatar} 
            alt={value.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{value.name}</div>
            <div className="text-sm text-gray-500">{value.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'items' as keyof Order,
      label: t('orders.items'),
      render: (value: any[]) => (
        <div className="space-y-1">
          {value.slice(0, 2).map((item, index) => (
            <div key={index} className="text-sm text-gray-900 truncate max-w-xs">
              {item.courseTitle}
            </div>
          ))}
          {value.length > 2 && (
            <div className="text-sm text-gray-500">
              +{value.length - 2} {t('orders.moreItems')}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'payment' as keyof Order,
      label: t('orders.payment'),
      render: (value: any) => (
        <div className="space-y-1">
          <Badge variant={value.status as any}>{value.status}</Badge>
          <div className="text-sm text-gray-500 capitalize">{t(`orders.${value.method}`)}</div>
        </div>
      )
    },
    {
      key: 'summary' as keyof Order,
      label: t('orders.total'),
      sortable: true,
      render: (value: any) => (
        <div className="font-medium text-gray-900">
          ${value.total.toFixed(2)}
        </div>
      )
    },
    {
      key: 'status' as keyof Order,
      label: t('orders.status'),
      sortable: true,
      render: (value: string) => <Badge variant={value as any}>{t(`orders.${value}`)}</Badge>
    },
    {
      key: 'id' as keyof Order,
      label: t('orders.actions'),
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => navigate(`/orders/${value}`)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            <Eye size={16} />
          </button>
          <button className="p-1 text-green-600 hover:bg-green-50 rounded">
            <RefreshCw size={16} />
          </button>
          <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
            <Download size={16} />
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
          <h1 className="text-3xl font-bold text-gray-900">{t('orders.title')}</h1>
          <p className="text-gray-600 mt-2">{t('orders.subtitle')}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">2.467</p>
                <p className="text-sm text-gray-600">{t('orders.totalOrders')}</p>
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
                <p className="text-2xl font-bold text-green-600">4.2 tỷ VNĐ</p>
                <p className="text-sm text-gray-600">{t('orders.totalRevenue')}</p>
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
                <p className="text-2xl font-bold text-yellow-600">45</p>
                <p className="text-sm text-gray-600">{t('orders.pendingOrders')}</p>
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
                <p className="text-2xl font-bold text-red-600">12</p>
                <p className="text-sm text-gray-600">{t('orders.refunded')}</p>
              </div>
              <div className="ml-auto p-2 bg-red-100 rounded-lg">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Table
        data={orders}
        columns={columns}
        searchable={true}
        filterable={true}
        exportable={true}
        pagination={true}
      />
    </div>
  );
};