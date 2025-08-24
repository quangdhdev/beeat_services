"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, Zap } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";
import Link from "next/link";

export default function DynamicPropertiesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [colorChangeCount, setColorChangeCount] = useState(0);
  const [currentColor, setCurrentColor] = useState("blue");

  // Enable button after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEnabled(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Show element after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Color change button - changes color every 5 seconds
  useEffect(() => {
    const colors = ["blue", "red", "green", "purple", "orange", "pink"];
    const interval = setInterval(() => {
      setColorChangeCount(prev => {
        const newCount = prev + 1;
        setCurrentColor(colors[newCount % colors.length]);
        return newCount;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "bg-blue-600 hover:bg-blue-700 text-white",
      red: "bg-red-600 hover:bg-red-700 text-white",
      green: "bg-green-600 hover:bg-green-700 text-white",
      purple: "bg-purple-600 hover:bg-purple-700 text-white",
      orange: "bg-orange-600 hover:bg-orange-700 text-white",
      pink: "bg-pink-600 hover:bg-pink-700 text-white"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/elements">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Elements
              </Button>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Dynamic Properties</h1>
              <p className="text-gray-600 mt-2">Elements with properties that change over time</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Dynamic Properties Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dynamic Elements Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Dynamic Elements</CardTitle>
              <CardDescription>
                Elements that change their properties dynamically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Enable After Button */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Enable After 5 Seconds</h3>
                <p className="text-sm text-gray-600">
                  This button will be enabled after 5 seconds
                </p>
                <Button
                  id="enableAfter"
                  disabled={!isEnabled}
                  className={`px-8 py-3 ${
                    isEnabled 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isEnabled ? "Button Enabled!" : "Button Disabled"}
                </Button>
                <p className="text-xs text-gray-500">
                  Status: {isEnabled ? "Enabled" : "Waiting to enable..."}
                </p>
              </div>

              {/* Color Change Button */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Color Change</h3>
                <p className="text-sm text-gray-600">
                  This button changes color every 5 seconds
                </p>
                <Button
                  id="colorChange"
                  className={`px-8 py-3 transition-colors duration-500 ${getColorClasses(currentColor)}`}
                >
                  Color Change Button
                </Button>
                <p className="text-xs text-gray-500">
                  Current Color: {currentColor} | Changes: {colorChangeCount}
                </p>
              </div>

              {/* Visible After Element */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Visible After 5 Seconds</h3>
                <p className="text-sm text-gray-600">
                  An element will appear below after 5 seconds
                </p>
                <div className="min-h-[60px] flex items-center justify-center">
                  {isVisible ? (
                    <div
                      id="visibleAfter"
                      className="bg-blue-100 border border-blue-300 rounded-lg p-4 animate-fade-in"
                    >
                      <div className="flex items-center space-x-2 text-blue-800">
                        <Eye className="w-5 h-5" />
                        <span className="font-medium">I&apos;m now visible!</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-500">
                      <EyeOff className="w-5 h-5" />
                      <span>Waiting to appear...</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Monitor Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Property Monitor</CardTitle>
              <CardDescription>
                Real-time monitoring of element properties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status Display */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-800">Element Status</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Enable Button:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      isEnabled 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {isEnabled ? "ENABLED" : "DISABLED"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Visible Element:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      isVisible 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {isVisible ? "VISIBLE" : "HIDDEN"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Color Button:</span>
                    <div className="flex items-center space-x-2">
                      <div 
                        className={`w-4 h-4 rounded-full ${
                          currentColor === 'blue' ? 'bg-blue-600' :
                          currentColor === 'red' ? 'bg-red-600' :
                          currentColor === 'green' ? 'bg-green-600' :
                          currentColor === 'purple' ? 'bg-purple-600' :
                          currentColor === 'orange' ? 'bg-orange-600' :
                          'bg-pink-600'
                        }`}
                      ></div>
                      <span className="text-xs font-medium uppercase">{currentColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timing Information */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-800">Timing Information</h3>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>Button enables after 5 seconds</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>Element appears after 5 seconds</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>Color changes every 5 seconds</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Testing Tips */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-800">Testing Tips</h3>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Use explicit waits for dynamic elements</li>
                    <li>• Check element properties before interaction</li>
                    <li>• Implement retry mechanisms for timing</li>
                    <li>• Monitor attribute changes over time</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testing Information */}
        <Card className="mt-8 bg-teal-50 border-teal-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-teal-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-teal-700 mb-2">Dynamic Element IDs:</h4>
                <ul className="space-y-1 text-teal-600">
                  <li><code>enableAfter</code> - Button that enables after 5s</li>
                  <li><code>colorChange</code> - Button that changes color</li>
                  <li><code>visibleAfter</code> - Element that appears after 5s</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-teal-700 mb-2">Testing Scenarios:</h4>
                <ul className="space-y-1 text-teal-600">
                  <li>• Wait for element to be enabled</li>
                  <li>• Wait for element to be visible</li>
                  <li>• Monitor CSS property changes</li>
                  <li>• Handle timing-dependent interactions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Dynamic Properties Footer" />
        </div>
      </main>
    </div>
  );
}