"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/ui/ad-banner";
import { ArrowLeft, User, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: ""
  });
  const [loginResult, setLoginResult] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login logic
      if (formData.userName === "testuser" && formData.password === "Test@123") {
        setLoginResult("Login successful! Welcome back.");
        setIsLoggedIn(true);
      } else {
        setLoginResult("Invalid credentials. Try username: testuser, password: Test@123");
      }
    } else {
      // Registration logic
      if (formData.firstName && formData.lastName && formData.userName && formData.password) {
        if (formData.password.length >= 8) {
          setLoginResult("Registration successful! You can now login.");
          setIsLogin(true);
          setFormData({ ...formData, firstName: "", lastName: "" });
        } else {
          setLoginResult("Password must be at least 8 characters long.");
        }
      } else {
        setLoginResult("Please fill in all required fields.");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginResult("");
    setFormData({ firstName: "", lastName: "", userName: "", password: "" });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setLoginResult("");
    setFormData({ firstName: "", lastName: "", userName: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/book-store">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Book Store
              </Button>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {isLoggedIn ? "User Dashboard" : isLogin ? "Login" : "Register"}
              </h1>
              <p className="text-gray-600 mt-2">
                {isLoggedIn ? "Welcome to your account" : "Book Store Authentication System"}
              </p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Login Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Authentication Form */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                {isLoggedIn ? (
                  <>
                    <User className="w-5 h-5" />
                    User Profile
                  </>
                ) : (
                  <>
                    {isLogin ? <User className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                    {isLogin ? "Login to Book Store" : "Create New Account"}
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {isLoggedIn 
                  ? "Manage your account and book collection"
                  : isLogin 
                    ? "Enter your credentials to access your account"
                    : "Fill in the details to create a new account"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoggedIn ? (
                // Logged in state
                <div className="space-y-6">
                  <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Account Information</h3>
                    <div className="space-y-2 text-green-700">
                      <p><strong>Username:</strong> {formData.userName}</p>
                      <p><strong>Status:</strong> Active</p>
                      <p><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link href="/book-store/books">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Browse Books
                        </Button>
                      </Link>
                      <Link href="/book-store/profile">
                        <Button variant="outline" className="w-full">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <Button 
                    onClick={handleLogout}
                    variant="destructive" 
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                // Login/Register form
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required={!isLogin}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required={!isLogin}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="userName">Username *</Label>
                    <Input
                      id="userName"
                      type="text"
                      placeholder="Enter username"
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    {isLogin ? "Login" : "Register"}
                  </Button>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      onClick={switchMode}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {isLogin 
                        ? "Don't have an account? Register here" 
                        : "Already have an account? Login here"
                      }
                    </Button>
                  </div>
                </form>
              )}

              {/* Result Message */}
              {loginResult && (
                <div className={`mt-6 p-4 rounded-lg border ${
                  loginResult.includes("successful") 
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}>
                  <p id="loginResult">{loginResult}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Authentication Info</CardTitle>
              <CardDescription>
                Testing credentials and system information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Test Credentials */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">Test Credentials</h3>
                  <div className="space-y-2 text-blue-700">
                    <div className="flex justify-between">
                      <span>Username:</span>
                      <code className="bg-blue-100 px-2 py-1 rounded">testuser</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Password:</span>
                      <code className="bg-blue-100 px-2 py-1 rounded">Test@123</code>
                    </div>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-3">Password Requirements</h3>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Minimum 8 characters</li>
                    <li>• At least one uppercase letter</li>
                    <li>• At least one lowercase letter</li>
                    <li>• At least one number</li>
                    <li>• At least one special character</li>
                  </ul>
                </div>

                {/* API Endpoints */}
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-3">API Endpoints</h3>
                  <div className="space-y-2 text-purple-700 text-sm">
                    <div>
                      <code className="bg-purple-100 px-2 py-1 rounded text-xs">POST</code>
                      <span className="ml-2">/Account/v1/User</span>
                    </div>
                    <div>
                      <code className="bg-purple-100 px-2 py-1 rounded text-xs">POST</code>
                      <span className="ml-2">/Account/v1/GenerateToken</span>
                    </div>
                    <div>
                      <code className="bg-purple-100 px-2 py-1 rounded text-xs">POST</code>
                      <span className="ml-2">/Account/v1/Authorized</span>
                    </div>
                    <div>
                      <code className="bg-purple-100 px-2 py-1 rounded text-xs">DELETE</code>
                      <span className="ml-2">/Account/v1/User/{"{UUID}"}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">Features</h3>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• User registration and login</li>
                    <li>• Password visibility toggle</li>
                    <li>• Form validation</li>
                    <li>• Session management</li>
                    <li>• Error handling</li>
                  </ul>
                </div>

                {/* Current Status */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Current Status</h3>
                  <div className="space-y-2 text-gray-700 text-sm">
                    <div className="flex justify-between">
                      <span>Mode:</span>
                      <span className="font-medium">{isLogin ? "Login" : "Register"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Logged In:</span>
                      <span className={`font-medium ${isLoggedIn ? "text-green-600" : "text-red-600"}`}>
                        {isLoggedIn ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Username:</span>
                      <span className="font-medium">{formData.userName || "None"}</span>
                    </div>
                  </div>
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
                <h4 className="font-semibold text-indigo-700 mb-2">Form Element IDs:</h4>
                <ul className="space-y-1 text-indigo-600">
                  <li><code>firstName</code> - First name input (register only)</li>
                  <li><code>lastName</code> - Last name input (register only)</li>
                  <li><code>userName</code> - Username input field</li>
                  <li><code>password</code> - Password input field</li>
                  <li><code>loginResult</code> - Result message display</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">Testing Scenarios:</h4>
                <ul className="space-y-1 text-indigo-600">
                  <li>• Test valid login credentials</li>
                  <li>• Test invalid login attempts</li>
                  <li>• Test user registration flow</li>
                  <li>• Test password visibility toggle</li>
                  <li>• Test form validation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Login Footer" />
        </div>
      </main>
    </div>
  );
}