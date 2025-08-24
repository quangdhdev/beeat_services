import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { 
  Save, 
  Upload, 
  Globe, 
  Mail, 
  CreditCard, 
  Shield, 
  Bell, 
  Users, 
  Database,
  Key,
  Webhook,
  Settings as SettingsIcon,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'BeeAt Learning Platform',
      siteDescription: 'Professional automation testing courses and certification',
      logo: '/logo.png',
      favicon: '/favicon.ico',
      contactEmail: 'contact@beeat.com',
      supportEmail: 'support@beeat.com',
      socialMedia: {
        facebook: 'https://facebook.com/beeat',
        twitter: 'https://twitter.com/beeat',
        linkedin: 'https://linkedin.com/company/beeat',
        youtube: 'https://youtube.com/beeat'
      },
      maintenance: {
        enabled: false,
        message: 'We are currently performing scheduled maintenance. Please check back soon.',
        allowedIPs: ['127.0.0.1', '192.168.1.1']
      }
    },
    payment: {
      currency: 'USD',
      taxRate: 8.5,
      gateways: {
        stripe: {
          enabled: true,
          publicKey: 'pk_test_...',
          webhookSecret: 'whsec_...'
        },
        momo: {
          enabled: true,
          partnerCode: 'MOMO123',
          accessKey: 'access_key_...'
        }
      },
      refundPolicy: {
        enabled: true,
        periodDays: 30,
        conditions: 'Refunds are available within 30 days of purchase for courses with less than 20% completion.'
      }
    },
    email: {
      provider: 'smtp',
      smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        username: 'noreply@beeat.com',
        password: '••••••••',
        encryption: 'tls'
      },
      templates: {
        welcome: 'Welcome to BeeAt!',
        courseCompletion: 'Congratulations on completing your course!',
        paymentConfirmation: 'Payment received successfully'
      }
    },
    security: {
      twoFactorRequired: true,
      sessionTimeout: 120,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: true
      },
      ipWhitelist: ['192.168.1.0/24'],
      rateLimiting: {
        enabled: true,
        requestsPerMinute: 100
      }
    },
    notifications: {
      email: {
        newUserRegistration: true,
        newCourseEnrollment: true,
        paymentReceived: true,
        courseCompletion: true,
        systemAlerts: true
      },
      slack: {
        enabled: false,
        webhookUrl: '',
        channels: {
          general: '#general',
          alerts: '#alerts'
        }
      }
    }
  });

  const tabs = [
    { id: 'general', label: t('settings.general'), icon: SettingsIcon },
    { id: 'payment', label: t('settings.payment'), icon: CreditCard },
    { id: 'email', label: t('settings.email'), icon: Mail },
    { id: 'security', label: t('settings.security'), icon: Shield },
    { id: 'notifications', label: t('settings.notifications'), icon: Bell },
    { id: 'integrations', label: t('settings.integrations'), icon: Webhook }
  ];

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings:`, settings[section as keyof typeof settings]);
    // Show success message
  };

  const handleFileUpload = (type: 'logo' | 'favicon') => {
    // Handle file upload
    console.log(`Uploading ${type}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('settings.title')}</h1>
        <p className="text-gray-600 mt-2">{t('settings.subtitle')}</p>
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
      {activeTab === 'general' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">{t('settings.siteInformation')}</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('settings.siteName')}
                  </label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, siteName: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('settings.contactEmail')}
                  </label>
                  <input
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, contactEmail: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Description
                </label>
                <textarea
                  value={settings.general.siteDescription}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, siteDescription: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo
                  </label>
                  <div className="flex items-center space-x-3">
                    <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-lg object-cover" />
                    <button
                      onClick={() => handleFileUpload('logo')}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Upload size={16} />
                      <span>Upload Logo</span>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon
                  </label>
                  <div className="flex items-center space-x-3">
                    <img src="/favicon.ico" alt="Favicon" className="w-8 h-8 rounded object-cover" />
                    <button
                      onClick={() => handleFileUpload('favicon')}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Upload size={16} />
                      <span>Upload Favicon</span>
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSave('general')}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                <Save size={16} />
                <span>Save Changes</span>
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Social Media Links</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={settings.general.socialMedia.facebook}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: {
                        ...settings.general,
                        socialMedia: { ...settings.general.socialMedia, facebook: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={settings.general.socialMedia.twitter}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: {
                        ...settings.general,
                        socialMedia: { ...settings.general.socialMedia, twitter: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={settings.general.socialMedia.linkedin}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: {
                        ...settings.general,
                        socialMedia: { ...settings.general.socialMedia, linkedin: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={settings.general.socialMedia.youtube}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: {
                        ...settings.general,
                        socialMedia: { ...settings.general.socialMedia, youtube: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Maintenance Mode</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="maintenance"
                  checked={settings.general.maintenance.enabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: {
                      ...settings.general,
                      maintenance: { ...settings.general.maintenance, enabled: e.target.checked }
                    }
                  })}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label htmlFor="maintenance" className="text-sm font-medium text-gray-700">
                  Enable Maintenance Mode
                </label>
              </div>
              
              {settings.general.maintenance.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maintenance Message
                  </label>
                  <textarea
                    value={settings.general.maintenance.message}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: {
                        ...settings.general,
                        maintenance: { ...settings.general.maintenance, message: e.target.value }
                      }
                    })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'payment' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Payment Configuration</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Currency
                  </label>
                  <select
                    value={settings.payment.currency}
                    onChange={(e) => setSettings({
                      ...settings,
                      payment: { ...settings.payment, currency: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="VND">VND - Vietnamese Dong</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.payment.taxRate}
                    onChange={(e) => setSettings({
                      ...settings,
                      payment: { ...settings.payment, taxRate: parseFloat(e.target.value) }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Payment Gateways</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stripe */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-6 h-6 text-blue-500" />
                    <h4 className="font-medium text-gray-900">Stripe</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    {settings.payment.gateways.stripe.enabled ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <input
                      type="checkbox"
                      checked={settings.payment.gateways.stripe.enabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        payment: {
                          ...settings.payment,
                          gateways: {
                            ...settings.payment.gateways,
                            stripe: { ...settings.payment.gateways.stripe, enabled: e.target.checked }
                          }
                        }
                      })}
                      className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                  </div>
                </div>
                {settings.payment.gateways.stripe.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Public Key
                      </label>
                      <input
                        type="text"
                        value={settings.payment.gateways.stripe.publicKey}
                        onChange={(e) => setSettings({
                          ...settings,
                          payment: {
                            ...settings.payment,
                            gateways: {
                              ...settings.payment.gateways,
                              stripe: { ...settings.payment.gateways.stripe, publicKey: e.target.value }
                            }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Webhook Secret
                      </label>
                      <input
                        type="password"
                        value={settings.payment.gateways.stripe.webhookSecret}
                        onChange={(e) => setSettings({
                          ...settings,
                          payment: {
                            ...settings.payment,
                            gateways: {
                              ...settings.payment.gateways,
                              stripe: { ...settings.payment.gateways.stripe, webhookSecret: e.target.value }
                            }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* MoMo */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-pink-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">M</span>
                    </div>
                    <h4 className="font-medium text-gray-900">MoMo</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    {settings.payment.gateways.momo.enabled ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <input
                      type="checkbox"
                      checked={settings.payment.gateways.momo.enabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        payment: {
                          ...settings.payment,
                          gateways: {
                            ...settings.payment.gateways,
                            momo: { ...settings.payment.gateways.momo, enabled: e.target.checked }
                          }
                        }
                      })}
                      className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                    />
                  </div>
                </div>
                {settings.payment.gateways.momo.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Partner Code
                      </label>
                      <input
                        type="text"
                        value={settings.payment.gateways.momo.partnerCode}
                        onChange={(e) => setSettings({
                          ...settings,
                          payment: {
                            ...settings.payment,
                            gateways: {
                              ...settings.payment.gateways,
                              momo: { ...settings.payment.gateways.momo, partnerCode: e.target.value }
                            }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Access Key
                      </label>
                      <input
                        type="password"
                        value={settings.payment.gateways.momo.accessKey}
                        onChange={(e) => setSettings({
                          ...settings,
                          payment: {
                            ...settings.payment,
                            gateways: {
                              ...settings.payment.gateways,
                              momo: { ...settings.payment.gateways.momo, accessKey: e.target.value }
                            }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleSave('payment')}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                <Save size={16} />
                <span>Save Payment Settings</span>
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Authentication & Access</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="twoFactor"
                  checked={settings.security.twoFactorRequired}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, twoFactorRequired: e.target.checked }
                  })}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label htmlFor="twoFactor" className="text-sm font-medium text-gray-700">
                  Require Two-Factor Authentication for all admin accounts
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Password Policy</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Password Length
                </label>
                <input
                  type="number"
                  value={settings.security.passwordPolicy.minLength}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      passwordPolicy: { ...settings.security.passwordPolicy, minLength: parseInt(e.target.value) }
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="requireUppercase"
                    checked={settings.security.passwordPolicy.requireUppercase}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        passwordPolicy: { ...settings.security.passwordPolicy, requireUppercase: e.target.checked }
                      }
                    })}
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label htmlFor="requireUppercase" className="text-sm text-gray-700">
                    Require uppercase letters
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="requireNumbers"
                    checked={settings.security.passwordPolicy.requireNumbers}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        passwordPolicy: { ...settings.security.passwordPolicy, requireNumbers: e.target.checked }
                      }
                    })}
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label htmlFor="requireNumbers" className="text-sm text-gray-700">
                    Require numbers
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="requireSymbols"
                    checked={settings.security.passwordPolicy.requireSymbols}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        passwordPolicy: { ...settings.security.passwordPolicy, requireSymbols: e.target.checked }
                      }
                    })}
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label htmlFor="requireSymbols" className="text-sm text-gray-700">
                    Require special characters
                  </label>
                </div>
              </div>

              <button
                onClick={() => handleSave('security')}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                <Save size={16} />
                <span>Save Security Settings</span>
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add other tab contents as needed */}
      {activeTab === 'notifications' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Email Notifications</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {Object.entries(settings.notifications.email).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={key}
                    checked={value}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        email: { ...settings.notifications.email, [key]: e.target.checked }
                      }
                    })}
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label htmlFor={key} className="text-sm text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => handleSave('notifications')}
              className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              <Save size={16} />
              <span>Save Notification Settings</span>
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};