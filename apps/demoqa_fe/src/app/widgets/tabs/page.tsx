"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, User, Settings, Bell, Shield, Info } from "lucide-react";
import Link from "next/link";
import { AdBanner } from "@/components/ui/ad-banner";

export default function TabsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/widgets">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Widgets
              </Button>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Tabs</h1>
              <p className="text-gray-600 mt-2">Tabbed interface to switch between content panels</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Tabs Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tabs Demo Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Interactive Tabs</CardTitle>
                <CardDescription>
                  Click on different tabs to switch between content panels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile" id="profileTab" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger value="settings" id="settingsTab" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </TabsTrigger>
                    <TabsTrigger value="notifications" id="notificationsTab" className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger value="security" id="securityTab" className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Security
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">User Profile</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Full Name</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="John Doe"
                            id="fullNameInput"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <input 
                            type="email" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="john@example.com"
                            id="emailInput"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone</label>
                          <input 
                            type="tel" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="+1 (555) 123-4567"
                            id="phoneInput"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Location</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="New York, NY"
                            id="locationInput"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Bio</label>
                        <textarea 
                          className="w-full p-2 border rounded-md" 
                          rows={3}
                          placeholder="Tell us about yourself..."
                          id="bioInput"
                        />
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">Save Profile</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Application Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Dark Mode</h4>
                            <p className="text-sm text-gray-600">Enable dark theme</p>
                          </div>
                          <input type="checkbox" id="darkModeToggle" className="toggle" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Auto Save</h4>
                            <p className="text-sm text-gray-600">Automatically save changes</p>
                          </div>
                          <input type="checkbox" id="autoSaveToggle" className="toggle" defaultChecked />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Language</label>
                          <select className="w-full p-2 border rounded-md" id="languageSelect">
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Timezone</label>
                          <select className="w-full p-2 border rounded-md" id="timezoneSelect">
                            <option value="utc">UTC</option>
                            <option value="est">Eastern Time</option>
                            <option value="pst">Pacific Time</option>
                            <option value="cst">Central Time</option>
                          </select>
                        </div>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700">Save Settings</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="notifications" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Email Notifications</h4>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                          <input type="checkbox" id="emailNotifications" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Push Notifications</h4>
                            <p className="text-sm text-gray-600">Receive push notifications</p>
                          </div>
                          <input type="checkbox" id="pushNotifications" className="toggle" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">SMS Notifications</h4>
                            <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                          </div>
                          <input type="checkbox" id="smsNotifications" className="toggle" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Notification Frequency</label>
                          <select className="w-full p-2 border rounded-md" id="notificationFrequency">
                            <option value="immediate">Immediate</option>
                            <option value="hourly">Hourly</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                          </select>
                        </div>
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700">Save Preferences</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="security" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Security Settings</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Current Password</label>
                          <input 
                            type="password" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Enter current password"
                            id="currentPassword"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">New Password</label>
                          <input 
                            type="password" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Enter new password"
                            id="newPassword"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Confirm Password</label>
                          <input 
                            type="password" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Confirm new password"
                            id="confirmPassword"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-600">Add an extra layer of security</p>
                          </div>
                          <input type="checkbox" id="twoFactorAuth" className="toggle" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Login Alerts</h4>
                            <p className="text-sm text-gray-600">Get notified of new logins</p>
                          </div>
                          <input type="checkbox" id="loginAlerts" className="toggle" defaultChecked />
                        </div>
                      </div>
                      <Button className="bg-red-600 hover:bg-red-700">Update Security</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Status Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Tab Status</CardTitle>
              <CardDescription>
                Current active tab and navigation info
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Active Tab:</h3>
                  <p id="activeTabDisplay" className="text-blue-700 capitalize font-medium">
                    {activeTab}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Available Tabs:</h3>
                  {[
                    { id: "profile", name: "Profile", icon: User },
                    { id: "settings", name: "Settings", icon: Settings },
                    { id: "notifications", name: "Notifications", icon: Bell },
                    { id: "security", name: "Security", icon: Shield }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <div key={tab.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium">{tab.name}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          activeTab === tab.id
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {activeTab === tab.id ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Testing Tips:</span>
                  </div>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Click tabs to switch content</li>
                    <li>• Verify content visibility</li>
                    <li>• Test keyboard navigation</li>
                    <li>• Check active tab styling</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testing Information */}
        <Card className="mt-8 bg-indigo-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-indigo-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">Tab Element IDs:</h4>
                <ul className="space-y-1 text-indigo-600">
                  <li><code>profileTab</code> - Profile tab trigger</li>
                  <li><code>settingsTab</code> - Settings tab trigger</li>
                  <li><code>notificationsTab</code> - Notifications tab trigger</li>
                  <li><code>securityTab</code> - Security tab trigger</li>
                  <li><code>activeTabDisplay</code> - Active tab indicator</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">Form Element IDs:</h4>
                <ul className="space-y-1 text-indigo-600">
                  <li><code>fullNameInput</code>, <code>emailInput</code> - Profile inputs</li>
                  <li><code>darkModeToggle</code>, <code>autoSaveToggle</code> - Settings toggles</li>
                  <li><code>emailNotifications</code>, <code>pushNotifications</code> - Notification settings</li>
                  <li><code>currentPassword</code>, <code>newPassword</code> - Security inputs</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Tabs Footer" />
        </div>
      </main>
    </div>
  );
}