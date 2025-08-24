"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/ui/ad-banner";
import { ArrowLeft, LogIn, BookOpen, User, Database } from "lucide-react";
import Link from "next/link";

export default function BookStorePage() {
  const bookStoreFeatures = [
    {
      title: "Login",
      description: "User authentication system with login and registration",
      icon: <LogIn className="w-6 h-6" />,
      href: "/book-store/login",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      title: "Book Store",
      description: "Browse and search through a collection of books",
      icon: <BookOpen className="w-6 h-6" />,
      href: "/book-store/books",
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      title: "Profile",
      description: "User profile management and book collection",
      icon: <User className="w-6 h-6" />,
      href: "/book-store/profile",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    },
    {
      title: "Book Store API",
      description: "API documentation and testing endpoints",
      icon: <Database className="w-6 h-6" />,
      href: "/book-store/api",
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Book Store Application</h1>
              <p className="text-gray-600 mt-2">Complete book store with authentication and API testing</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Book Store Banner" />
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {bookStoreFeatures.map((feature, index) => (
            <Link key={index} href={feature.href} className="block">
              <Card className={`transition-all duration-200 hover:shadow-lg ${feature.color}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-700">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* API Documentation */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Book Store API Documentation</CardTitle>
            <CardDescription>
              Complete API reference for the Book Store application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">Authentication:</h4>
                <ul className="space-y-1 text-indigo-600">
                  <li><code>POST /Account/v1/User</code> - Create user</li>
                  <li><code>POST /Account/v1/GenerateToken</code> - Generate token</li>
                  <li><code>POST /Account/v1/Authorized</code> - Check authorization</li>
                  <li><code>DELETE /Account/v1/User/{"{UUID}"}</code> - Delete user</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">Books:</h4>
                <ul className="space-y-1 text-indigo-600">
                  <li><code>GET /BookStore/v1/Books</code> - Get all books</li>
                  <li><code>POST /BookStore/v1/Books</code> - Add books to user</li>
                  <li><code>DELETE /BookStore/v1/Books</code> - Delete all user books</li>
                  <li><code>PUT /BookStore/v1/Books/{"{ISBN}"}</code> - Update book</li>
                  <li><code>DELETE /BookStore/v1/Book</code> - Delete specific book</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testing Information */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-yellow-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-yellow-700 mb-2">Test User Credentials:</h4>
                <ul className="space-y-1 text-yellow-600">
                  <li><strong>Username:</strong> testuser</li>
                  <li><strong>Password:</strong> Test@123</li>
                  <li>Use these credentials for testing authentication</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-700 mb-2">Available Books:</h4>
                <ul className="space-y-1 text-yellow-600">
                  <li>Git Pocket Guide</li>
                  <li>Learning JavaScript Design Patterns</li>
                  <li>Designing Evolvable Web APIs with ASP.NET</li>
                  <li>Speaking JavaScript</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-12">
          <AdBanner size="leaderboard" position="Book Store Footer" />
        </div>
      </main>
    </div>
  );
}