"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/ui/ad-banner";
import { ArrowLeft, ChevronDown, Calendar, Sliders, BarChart3, Table, HelpCircle, Menu } from "lucide-react";
import Link from "next/link";

export default function WidgetsPage() {
  const widgets = [
    {
      title: "Accordian",
      description: "Collapsible content sections with expand/collapse functionality",
      icon: <ChevronDown className="w-6 h-6" />,
      href: "/widgets/accordian",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      title: "Auto Complete",
      description: "Text input with dynamic suggestions and autocomplete",
      icon: <Menu className="w-6 h-6" />,
      href: "/widgets/auto-complete",
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      title: "Date Picker",
      description: "Calendar widget for selecting dates with various formats",
      icon: <Calendar className="w-6 h-6" />,
      href: "/widgets/date-picker",
      color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
    },
    {
      title: "Slider",
      description: "Draggable slider to select values within a range",
      icon: <Sliders className="w-6 h-6" />,
      href: "/widgets/slider",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    },
    {
      title: "Progress Bar",
      description: "Dynamic progress indicator with status updates",
      icon: <BarChart3 className="w-6 h-6" />,
      href: "/widgets/progress-bar",
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100"
    },
    {
      title: "Tabs",
      description: "Tabbed interface to switch between content panels",
      icon: <Table className="w-6 h-6" />,
      href: "/widgets/tabs",
      color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
    },
    {
      title: "Tool Tips",
      description: "Hover tooltips with helpful information and guidance",
      icon: <HelpCircle className="w-6 h-6" />,
      href: "/widgets/tool-tips",
      color: "bg-pink-50 border-pink-200 hover:bg-pink-100"
    },
    {
      title: "Menu",
      description: "Hierarchical dropdown menu with nested options",
      icon: <Menu className="w-6 h-6" />,
      href: "/widgets/menu",
      color: "bg-teal-50 border-teal-200 hover:bg-teal-100"
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
              <h1 className="text-3xl font-bold text-gray-900">Widgets</h1>
              <p className="text-gray-600 mt-2">Complex UI components like accordions, date pickers, and sliders</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Widgets Banner" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {widgets.map((widget, index) => (
            <Link key={index} href={widget.href}>
              <Card className={`h-full transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg ${widget.color}`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-3 text-gray-700">
                    {widget.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {widget.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 text-sm leading-relaxed">
                    {widget.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <section className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Widget Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChevronDown className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Components</h3>
              <p className="text-gray-600">Rich UI widgets with complex interactions and state management.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Advanced Controls</h3>
              <p className="text-gray-600">Date pickers, sliders, and other sophisticated input controls.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dynamic Updates</h3>
              <p className="text-gray-600">Real-time updates and progress indicators for testing automation.</p>
            </div>
          </div>
        </section>

        {/* Bottom Ad */}
        <div className="mt-12">
          <AdBanner size="leaderboard" position="Widgets Footer" />
        </div>
      </main>
    </div>
  );
}