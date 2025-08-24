"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/ui/ad-banner";
import { BookOpen, MousePointer, FormInput, AlertTriangle, Puzzle, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const sections = [
    {
      title: "Elements",
      description: "Standard HTML elements for basic interaction testing",
      icon: <MousePointer className="w-8 h-8" />,
      href: "/elements",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Forms",
      description: "Practice forms with various input types and validation",
      icon: <FormInput className="w-8 h-8" />,
      href: "/forms",
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Alerts, Frame & Windows",
      description: "Browser windows, alerts, frames, and modal dialogs",
      icon: <AlertTriangle className="w-8 h-8" />,
      href: "/alerts-frame-windows",
      color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      title: "Widgets",
      description: "Complex UI components like accordions, date pickers, and sliders",
      icon: <Puzzle className="w-8 h-8" />,
      href: "/widgets",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Interactions",
      description: "Advanced user interactions: drag & drop, sortable, resizable",
      icon: <Users className="w-8 h-8" />,
      href: "/interactions",
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      title: "Book Store Application",
      description: "Complete application with login, book store, and profile management",
      icon: <BookOpen className="w-8 h-8" />,
      href: "/book-store",
      color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
      iconColor: "text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        {/* Top Leaderboard Ad */}
        <div className="bg-gray-50 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdBanner size="leaderboard" position="Top Banner" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">DemoQA</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive testing platform for developers and QA testers to practice automation scripts and programming skills
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Banner Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Header Banner" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Link key={index} href={section.href}>
              <Card className={`h-full transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg ${section.color}`}>
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-4 ${section.iconColor}`}>
                    {section.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mid-content Ad */}
        <div className="my-12">
          <AdBanner size="banner" position="Mid Content" />
        </div>

        {/* Features Section */}
        <section className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose DemoQA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MousePointer className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Comprehensive Testing</h3>
              <p className="text-gray-600">Wide variety of web elements and interactions for thorough automation testing practice.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FormInput className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Stable Environment</h3>
              <p className="text-gray-600">Reliable and consistent platform that won&apos;t break your automation scripts unexpectedly.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Puzzle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-world Scenarios</h3>
              <p className="text-gray-600">Practice with realistic web components and user interactions you&apos;ll encounter in production.</p>
            </div>
          </div>
        </section>

        {/* Bottom Ad */}
        <div className="mt-12">
          <AdBanner size="leaderboard" position="Bottom Banner" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            © 2025 DemoQA. A training platform for developers and QA testers.
          </p>
        </div>
      </footer>
    </div>
  );
}