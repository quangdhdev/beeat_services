"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/ui/ad-banner";
import { ArrowLeft, Type, CheckSquare, Circle, Table, MousePointer, Link as LinkIcon, Upload, Zap } from "lucide-react";
import Link from "next/link";

export default function ElementsPage() {
  const elements = [
    {
      title: "Text Box",
      description: "Input field for text entry with validation",
      icon: <Type className="w-6 h-6" />,
      href: "/elements/text-box",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      title: "Check Box",
      description: "Single and multiple selection checkboxes",
      icon: <CheckSquare className="w-6 h-6" />,
      href: "/elements/check-box",
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      title: "Radio Button",
      description: "Single selection radio button groups",
      icon: <Circle className="w-6 h-6" />,
      href: "/elements/radio-button",
      color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
    },
    {
      title: "Web Tables",
      description: "Dynamic table with add, edit, and delete functionality",
      icon: <Table className="w-6 h-6" />,
      href: "/elements/web-tables",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    },
    {
      title: "Buttons",
      description: "Various button types with different events",
      icon: <MousePointer className="w-6 h-6" />,
      href: "/elements/buttons",
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100"
    },
    {
      title: "Links",
      description: "Internal, external, and broken links for testing",
      icon: <LinkIcon className="w-6 h-6" />,
      href: "/elements/links",
      color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
    },
    {
      title: "Upload and Download",
      description: "File upload and download functionality",
      icon: <Upload className="w-6 h-6" />,
      href: "/elements/upload-download",
      color: "bg-pink-50 border-pink-200 hover:bg-pink-100"
    },
    {
      title: "Dynamic Properties",
      description: "Elements with changing properties over time",
      icon: <Zap className="w-6 h-6" />,
      href: "/elements/dynamic-properties",
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
              <h1 className="text-3xl font-bold text-gray-900">Elements</h1>
              <p className="text-gray-600 mt-2">Standard HTML elements for basic interaction testing</p>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Elements Banner" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {elements.map((element, index) => (
            <Link key={index} href={element.href}>
              <Card className={`h-full transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg ${element.color}`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-3 text-gray-700">
                    {element.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {element.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 text-sm leading-relaxed">
                    {element.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Bottom Ad */}
        <div className="mt-12">
          <AdBanner size="leaderboard" position="Elements Footer" />
        </div>
      </main>
    </div>
  );
}