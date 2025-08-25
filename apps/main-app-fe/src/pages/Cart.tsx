import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCartQuery, useRemoveFromCartMutation, useUpdateCartQuantityMutation } from '../hooks/queries/cartQueries';
import { CartItem } from '../types/Cart';

const Cart: React.FC = () => {
  const { t } = useTranslation();
  
  const { data: cartData, isLoading, error } = useCartQuery();
  const removeFromCartMutation = useRemoveFromCartMutation();
  const updateQuantityMutation = useUpdateCartQuantityMutation();

  const cartItems = cartData?.items || [];
  const summary = cartData?.summary || { total: 0, subtotal: 0, totalSavings: 0 };

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      await removeItem(id);
      return;
    }
    
    try {
      await updateQuantityMutation.mutateAsync({ courseId: id, quantity: newQuantity });
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await removeFromCartMutation.mutateAsync(id);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading cart</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('cart.empty.title')}</h2>
            <p className="text-gray-600 mb-8">{t('cart.empty.description')}</p>
            <Link
              to="/courses"
              className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors inline-flex items-center"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {t('cart.continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/courses"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('cart.continueShopping')}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{t('cart.title')}</h1>
          <p className="text-gray-600 mt-2">{t('cart.itemsInCart', { count: cartItems.length })}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full sm:w-32 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{t('courses.card.by')} {item.instructor}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="font-medium text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={updateQuantityMutation.isPending}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={removeFromCartMutation.isPending}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {item.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        {(item.originalPrice * item.quantity).toLocaleString()}₫
                      </p>
                    )}
                    <p className="text-xl font-bold text-gray-900">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t('cart.orderSummary')}</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal')}</span>
                  <span>{summary.subtotal.toLocaleString()}₫</span>
                </div>
                
                {summary.totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>{t('cart.savings')}</span>
                    <span>-{summary.totalSavings.toLocaleString()}₫</span>
                  </div>
                )}
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>{t('cart.total')}</span>
                  <span>{summary.total.toLocaleString()}₫</span>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors text-center block"
              >
                {t('cart.checkout')}
              </Link>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                {t('cart.terms')}{' '}
                <a href="#" className="text-pink-600 hover:underline">{t('cart.termsOfService')}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;