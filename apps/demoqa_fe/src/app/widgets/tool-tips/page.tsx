"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, HelpCircle, Info, AlertTriangle, CheckCircle, Star, Settings } from "lucide-react";
import Link from "next/link";
import { AdBanner } from "@/components/ui/ad-banner";

export default function ToolTipsPage() {
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
              <h1 className="text-3xl font-bold text-gray-900">Tool Tips</h1>
              <p className="text-gray-600 mt-2">Hover tooltips with helpful information and guidance</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Tool Tips Banner" />
        </div>
        
        <TooltipProvider>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tooltip Demo Card */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Interactive Tooltips</CardTitle>
                <CardDescription>
                  Hover over the elements below to see different tooltip styles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Basic Tooltips */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Tooltips</h3>
                  <div className="flex flex-wrap gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button id="hoverTooltip" variant="outline" className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4" />
                          Hover Me
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is a basic tooltip that appears on hover</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button id="infoTooltip" variant="outline" className="flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          Information
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click this button to get more information about the current page</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button id="settingsTooltip" variant="outline" className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Settings
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Access application settings and preferences</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Status Tooltips */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Status Tooltips</h3>
                  <div className="flex flex-wrap gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button id="successTooltip" className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Success
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-green-600">
                        <p>Operation completed successfully!</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button id="warningTooltip" className="bg-yellow-600 hover:bg-yellow-700 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Warning
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-yellow-600">
                        <p>Please review your input before proceeding</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button id="favoriteTooltip" className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          Favorite
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-purple-600">
                        <p>Add this item to your favorites list</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Text with Tooltips */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Text with Tooltips</h3>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      This paragraph contains{" "}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span id="textTooltip" className="underline cursor-help text-blue-600">
                            interactive text
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This text has a tooltip when you hover over it</p>
                        </TooltipContent>
                      </Tooltip>
                      {" "}that you can hover over to see additional information.
                    </p>

                    <p className="text-gray-700">
                      You can also hover over{" "}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span id="definitionTooltip" className="font-semibold cursor-help text-green-600">
                            technical terms
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="max-w-xs">
                            <p className="font-semibold">Technical Terms</p>
                            <p className="text-sm">Specialized vocabulary used in a particular field or profession</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      {" "}to get their definitions.
                    </p>
                  </div>
                </div>

                {/* Form Elements with Tooltips */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Form Elements</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <label htmlFor="usernameInput" className="text-sm font-medium">Username:</label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Username must be 3-20 characters long and contain only letters, numbers, and underscores</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <input
                      id="usernameInput"
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter username"
                    />

                    <div className="flex items-center space-x-2">
                      <label htmlFor="passwordInput" className="text-sm font-medium">Password:</label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="max-w-xs">
                            <p className="font-semibold mb-1">Password Requirements:</p>
                            <ul className="text-sm space-y-1">
                              <li>• At least 8 characters long</li>
                              <li>• Contains uppercase and lowercase letters</li>
                              <li>• Contains at least one number</li>
                              <li>• Contains at least one special character</li>
                            </ul>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <input
                      id="passwordInput"
                      type="password"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter password"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tooltip Information Card */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Tooltip Information</CardTitle>
                <CardDescription>
                  Learn about different tooltip types and behaviors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Tooltip Types */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Tooltip Types</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-800">Basic Tooltips</h4>
                        <p className="text-sm text-blue-700">Simple text that appears on hover to provide additional context</p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-800">Status Tooltips</h4>
                        <p className="text-sm text-green-700">Colored tooltips that indicate success, warning, or error states</p>
                      </div>
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-semibold text-purple-800">Rich Content Tooltips</h4>
                        <p className="text-sm text-purple-700">Tooltips with formatted content, lists, and multiple lines</p>
                      </div>
                    </div>
                  </div>

                  {/* Tooltip Behavior */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Tooltip Behavior</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <p><strong>Hover Activation:</strong> Tooltips appear when you hover over the trigger element</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                        <p><strong>Auto Positioning:</strong> Tooltips automatically position themselves to stay visible</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                        <p><strong>Delay:</strong> Small delay before showing to prevent accidental triggers</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                        <p><strong>Auto Hide:</strong> Tooltips disappear when you move the cursor away</p>
                      </div>
                    </div>
                  </div>

                  {/* Testing Guidelines */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Testing Guidelines</h3>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <ul className="text-sm text-yellow-700 space-y-2">
                        <li className="flex items-start space-x-2">
                          <span className="text-yellow-600">•</span>
                          <span>Test tooltip visibility on hover events</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-yellow-600">•</span>
                          <span>Verify tooltip content matches expected text</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-yellow-600">•</span>
                          <span>Check tooltip positioning and boundaries</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-yellow-600">•</span>
                          <span>Test tooltip disappearance on mouse leave</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-yellow-600">•</span>
                          <span>Verify keyboard accessibility (focus events)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Common Use Cases */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Common Use Cases</h3>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>Help Icons</span>
                        <span className="text-gray-600">Contextual help</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>Form Fields</span>
                        <span className="text-gray-600">Input requirements</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>Buttons</span>
                        <span className="text-gray-600">Action descriptions</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>Status Indicators</span>
                        <span className="text-gray-600">State explanations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testing Information */}
          <Card className="mt-8 bg-pink-50 border-pink-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-pink-800">Testing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-pink-700 mb-2">Tooltip Element IDs:</h4>
                  <ul className="space-y-1 text-pink-600">
                    <li><code>hoverTooltip</code> - Basic hover tooltip</li>
                    <li><code>infoTooltip</code> - Information tooltip</li>
                    <li><code>successTooltip</code> - Success status tooltip</li>
                    <li><code>warningTooltip</code> - Warning status tooltip</li>
                    <li><code>textTooltip</code> - Text with tooltip</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-pink-700 mb-2">Testing Scenarios:</h4>
                  <ul className="space-y-1 text-pink-600">
                    <li>• Hover to trigger tooltip display</li>
                    <li>• Verify tooltip content and styling</li>
                    <li>• Test tooltip positioning</li>
                    <li>• Check auto-hide behavior</li>
                    <li>• Test keyboard focus events</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Ad */}
          <div className="mt-8">
            <AdBanner size="leaderboard" position="Tool Tips Footer" />
          </div>
        </TooltipProvider>
      </main>
    </div>
  );
}