"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/ui/ad-banner";
import { ArrowLeft, Move, MousePointer, Maximize, Target, Hand } from "lucide-react";
import Link from "next/link";

export default function InteractionsPage() {
  const interactions = [
    {
      title: "Sortable",
      description: "Drag and drop to reorder items in a list",
      icon: <Move className="w-6 h-6" />,
      href: "/interactions/sortable",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      title: "Selectable",
      description: "Click to select multiple items from a grid or list",
      icon: <MousePointer className="w-6 h-6" />,
      href: "/interactions/selectable",
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      title: "Resizable",
      description: "Resize elements by dragging their edges or corners",
      icon: <Maximize className="w-6 h-6" />,
      href: "/interactions/resizable",
      color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
    },
    {
      title: "Droppable",
      description: "Drop target areas for drag and drop operations",
      icon: <Target className="w-6 h-6" />,
      href: "/interactions/droppable",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    },
    {
      title: "Dragabble",
      description: "Draggable elements that can be moved around the page",
      icon: <Hand className="w-6 h-6" />,
      href: "/interactions/dragabble",
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
              <h1 className="text-3xl font-bold text-gray-900">Interactions</h1>
              <p className="text-gray-600 mt-2">Advanced user interactions: drag & drop, sortable, resizable</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Interactions Banner" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {interactions.map((interaction, index) => (
            <Link key={index} href={interaction.href}>
              <Card className={`h-full transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg ${interaction.color}`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 text-gray-700">
                    {interaction.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {interaction.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {interaction.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <section className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Interaction Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Move className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Drag & Drop</h3>
              <p className="text-gray-600">Test complex drag and drop interactions with visual feedback.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MousePointer className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multi-Selection</h3>
              <p className="text-gray-600">Practice selecting multiple elements with various selection methods.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Maximize className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dynamic Sizing</h3>
              <p className="text-gray-600">Test resizable elements and dynamic layout changes.</p>
            </div>
          </div>
        </section>

        {/* Testing Tips */}
        <Card className="mt-8 bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-orange-800">Testing Tips for Interactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Drag & Drop Testing:</h4>
                <ul className="space-y-1 text-orange-600">
                  <li>• Use Actions API for complex mouse movements</li>
                  <li>• Verify source and target element states</li>
                  <li>• Test drag over invalid drop zones</li>
                  <li>• Check visual feedback during drag operations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Selection Testing:</h4>
                <ul className="space-y-1 text-orange-600">
                  <li>• Test single and multiple selection modes</li>
                  <li>• Verify selection state persistence</li>
                  <li>• Test keyboard navigation (Ctrl+Click, Shift+Click)</li>
                  <li>• Check selection visual indicators</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-12">
          <AdBanner size="leaderboard" position="Interactions Footer" />
        </div>
      </main>
    </div>
  );
}