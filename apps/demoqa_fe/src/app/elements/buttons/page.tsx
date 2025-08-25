"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MousePointer } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";
import Link from "next/link";

export default function ButtonsPage() {
  const [clickMessage, setClickMessage] = useState("");
  const [rightClickMessage, setRightClickMessage] = useState("");
  const [doubleClickMessage, setDoubleClickMessage] = useState("");

  const handleClick = () => {
    setClickMessage("You have done a dynamic click");
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setRightClickMessage("You have done a right click");
  };

  const handleDoubleClick = () => {
    setDoubleClickMessage("You have done a double click");
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
              <h1 className="text-3xl font-bold text-gray-900">Buttons</h1>
              <p className="text-gray-600 mt-2">Various button types with different events</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Buttons Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Button Actions Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Button Actions</CardTitle>
              <CardDescription>
                Test different types of button interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Click Me Button */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Click Me</h3>
                <Button
                  id="dynamicClickBtn"
                  onClick={handleClick}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                >
                  Click Me
                </Button>
                {clickMessage && (
                  <p id="dynamicClickMessage" className="text-blue-600 font-medium">
                    {clickMessage}
                  </p>
                )}
              </div>

              {/* Right Click Button */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Right Click Me</h3>
                <Button
                  id="rightClickBtn"
                  onContextMenu={handleRightClick}
                  className="bg-green-600 hover:bg-green-700 px-8 py-3"
                >
                  Right Click Me
                </Button>
                {rightClickMessage && (
                  <p id="rightClickMessage" className="text-green-600 font-medium">
                    {rightClickMessage}
                  </p>
                )}
              </div>

              {/* Double Click Button */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Double Click Me</h3>
                <Button
                  id="doubleClickBtn"
                  onDoubleClick={handleDoubleClick}
                  className="bg-purple-600 hover:bg-purple-700 px-8 py-3"
                >
                  Double Click Me
                </Button>
                {doubleClickMessage && (
                  <p id="doubleClickMessage" className="text-purple-600 font-medium">
                    {doubleClickMessage}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Button Styles Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Button Styles</CardTitle>
              <CardDescription>
                Different button styles and states for testing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary Buttons */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800">Primary Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button id="primaryBtn" className="bg-blue-600 hover:bg-blue-700">
                    Primary
                  </Button>
                  <Button id="successBtn" className="bg-green-600 hover:bg-green-700">
                    Success
                  </Button>
                  <Button id="dangerBtn" className="bg-red-600 hover:bg-red-700">
                    Danger
                  </Button>
                  <Button id="warningBtn" className="bg-yellow-600 hover:bg-yellow-700">
                    Warning
                  </Button>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800">Secondary Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button id="secondaryBtn" variant="secondary">
                    Secondary
                  </Button>
                  <Button id="outlineBtn" variant="outline">
                    Outline
                  </Button>
                  <Button id="ghostBtn" variant="ghost">
                    Ghost
                  </Button>
                  <Button id="linkBtn" variant="link">
                    Link
                  </Button>
                </div>
              </div>

              {/* Button Sizes */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button id="smallBtn" size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    Small
                  </Button>
                  <Button id="defaultBtn" className="bg-indigo-600 hover:bg-indigo-700">
                    Default
                  </Button>
                  <Button id="largeBtn" size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                    Large
                  </Button>
                </div>
              </div>

              {/* Button States */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800">Button States</h3>
                <div className="flex flex-wrap gap-3">
                  <Button id="enabledBtn" className="bg-teal-600 hover:bg-teal-700">
                    Enabled
                  </Button>
                  <Button id="disabledBtn" disabled className="bg-gray-400">
                    Disabled
                  </Button>
                  <Button id="loadingBtn" disabled className="bg-gray-400">
                    <MousePointer className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testing Information */}
        <Card className="mt-8 bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-orange-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Interactive Button IDs:</h4>
                <ul className="space-y-1 text-orange-600">
                  <li><code>dynamicClickBtn</code> - Single click button</li>
                  <li><code>rightClickBtn</code> - Right click button</li>
                  <li><code>doubleClickBtn</code> - Double click button</li>
                  <li><code>dynamicClickMessage</code> - Click result message</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Style Button IDs:</h4>
                <ul className="space-y-1 text-orange-600">
                  <li><code>primaryBtn</code>, <code>successBtn</code>, <code>dangerBtn</code> - Color variants</li>
                  <li><code>smallBtn</code>, <code>defaultBtn</code>, <code>largeBtn</code> - Size variants</li>
                  <li><code>enabledBtn</code>, <code>disabledBtn</code> - State variants</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Buttons Footer" />
        </div>
      </main>
    </div>
  );
}