import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  ArrowLeft, 
  User, 
  CreditCard, 
  Package, 
  RefreshCw,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react';

// Mock order data
const orderData = {
  id: '1',
  orderNumber: 'ORD-2024-001234',
  customer: {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    registrationDate: '2024-01-15T08:30:00Z',
    totalOrders: 5,
    totalSpent: 450.75
  },
  items: [
    {
      id: '1',
      courseId: '1',
      courseTitle: 'Complete Selenium WebDriver Course',
      courseThumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      instructor: 'Sarah Johnson',
      price: 89.99,
      originalPrice: 129.99,
      quantity: 1,
      discount: 40.00
    }
  ],
  billing: {
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    zipCode: '10001',
    country: 'United States'
  },
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
    gatewayResponse: {
      cardLast4: '4242',
      cardBrand: 'visa',
      cardExpiry: '12/25'
    },
    paidAt: '2024-12-19T10:30:00Z',
    refundedAt: null,
    refundAmount: null,
    refundReason: null
  },
  status: 'completed',
  notes: null,
  createdAt: '2024-12-19T10:25:00Z',
  updatedAt: '2024-12-19T10:30:00Z'
};

const timeline = [
  {
    id: '1',
    action: 'created',
    description: 'Order was created',
    performedBy: { id: '1', name: 'John Smith', type: 'customer' },
    timestamp: '2024-12-19T10:25:00Z'
  },
  {
    id: '2',
    action: 'paid',
    description: 'Payment was processed successfully',
    performedBy: { id: '1', name: 'John Smith', type: 'customer' },
    timestamp: '2024-12-19T10:30:00Z'
  },
  {
    id: '3',
    action: 'completed',
    description: 'Order was completed and access granted',
    performedBy: { id: 'system', name: 'System', type: 'system' },
    timestamp: '2024-12-19T10:30:00Z'
  }
];

export const OrderDetail: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');

  const handleRefund = () => {
    // Handle refund processing
    console.log('Processing refund:', { amount: refundAmount, reason: refundReason });
    setShowRefundModal(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'refunded':
        return <RefreshCw className="w-5 h-5 text-orange-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="w-5 h-5 text-blue-500" />;
      default:
        return <DollarSign className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/orders')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-600 mt-1">{orderData.orderNumber}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={orderData.status as any}>{orderData.status}</Badge>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download size={16} />
            <span>Download Invoice</span>
          </button>
          {orderData.status === 'completed' && (
            <button 
              onClick={() => setShowRefundModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <RefreshCw size={16} />
              <span>Process Refund</span>
            </button>
          )}
        </div>
      </div>

      {/* Order Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">${orderData.summary.total}</p>
                <p className="text-sm text-gray-600">Total Amount</p>
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
                <p className="text-2xl font-bold text-gray-900">{orderData.items.length}</p>
                <p className="text-sm text-gray-600">Items</p>
              </div>
              <div className="ml-auto p-2 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900 capitalize">{orderData.payment.method}</p>
                <p className="text-sm text-gray-600">Payment Method</p>
              </div>
              <div className="ml-auto p-2 bg-purple-100 rounded-lg">
                {getPaymentMethodIcon(orderData.payment.method)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{new Date(orderData.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Order Date</p>
              </div>
              <div className="ml-auto p-2 bg-yellow-100 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Order Items</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img 
                      src={item.courseThumbnail} 
                      alt={item.courseTitle}
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.courseTitle}</h4>
                      <p className="text-sm text-gray-600">by {item.instructor}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-medium text-gray-900">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                        )}
                        {item.discount > 0 && (
                          <span className="text-sm text-green-600">-${item.discount}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="font-medium text-gray-900">${item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Payment Information</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Payment Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Method</span>
                      <div className="flex items-center space-x-2">
                        {getPaymentMethodIcon(orderData.payment.method)}
                        <span className="text-sm font-medium capitalize">{orderData.payment.method}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(orderData.payment.status)}
                        <Badge variant={orderData.payment.status as any}>{orderData.payment.status}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Transaction ID</span>
                      <span className="text-sm font-medium">{orderData.payment.transactionId}</span>
                    </div>
                    {orderData.payment.gatewayResponse && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Card</span>
                        <span className="text-sm font-medium">
                          **** **** **** {orderData.payment.gatewayResponse.cardLast4}
                        </span>
                      </div>
                    )}
                    {orderData.payment.paidAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Paid At</span>
                        <span className="text-sm font-medium">
                          {new Date(orderData.payment.paidAt).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm font-medium">${orderData.summary.subtotal}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Discount</span>
                      <span className="text-sm font-medium text-green-600">-${orderData.summary.discount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tax</span>
                      <span className="text-sm font-medium">${orderData.summary.tax}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">Total</span>
                        <span className="font-bold text-gray-900">${orderData.summary.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Order Timeline</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{event.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">
                        by {event.performedBy.name} ({event.performedBy.type})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Customer Information</h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={orderData.customer.avatar} 
                  alt={orderData.customer.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{orderData.customer.name}</h4>
                  <p className="text-sm text-gray-600">Customer since {new Date(orderData.customer.registrationDate).getFullYear()}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">{orderData.customer.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">{orderData.customer.phone}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{orderData.customer.totalOrders}</p>
                    <p className="text-sm text-gray-600">Total Orders</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">${orderData.customer.totalSpent}</p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                View Customer Profile
              </button>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Billing Address</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{orderData.billing.fullName}</p>
                <p className="text-sm text-gray-600">{orderData.billing.address}</p>
                <p className="text-sm text-gray-600">
                  {orderData.billing.city}, {orderData.billing.zipCode}
                </p>
                <p className="text-sm text-gray-600">{orderData.billing.country}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Quick Actions</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Mail size={16} />
                <span>Send Email</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Download size={16} />
                <span>Download Invoice</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <User size={16} />
                <span>View Customer</span>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Process Refund</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Refund Amount
                </label>
                <input
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="0.00"
                  max={orderData.summary.total}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Refund
                </label>
                <textarea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter reason for refund..."
                />
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={handleRefund}
                className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Process Refund
              </button>
              <button
                onClick={() => setShowRefundModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};