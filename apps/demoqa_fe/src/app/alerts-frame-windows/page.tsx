"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/ui/ad-banner";
import { ArrowLeft, ExternalLink, AlertTriangle, Square, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AlertsFrameWindowsPage() {
  const [alertResult, setAlertResult] = useState("");

  const handleSimpleAlert = () => {
    alert("You clicked a button");
    setAlertResult("You successfully clicked an alert");
  };

  const handleConfirmAlert = () => {
    const result = confirm("Do you confirm action?");
    setAlertResult(result ? "You selected Ok" : "You selected Cancel");
  };

  const handlePromptAlert = () => {
    const result = prompt("Please enter your name");
    setAlertResult(result ? `You entered ${result}` : "You cancelled the prompt");
  };

  const openNewTab = () => {
    window.open("https://demoqa.com", "_blank");
  };

  const openNewWindow = () => {
    window.open("https://demoqa.com", "_blank", "width=600,height=400");
  };

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
              <h1 className="text-3xl font-bold text-gray-900">Alerts, Frame & Windows</h1>
              <p className="text-gray-600 mt-2">Browser windows, alerts, frames, and modal dialogs</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Alerts Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Browser Windows Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Browser Windows</CardTitle>
              <CardDescription>
                Test opening new tabs and windows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="text-center">
                  <Button
                    id="tabButton"
                    onClick={openNewTab}
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    New Tab
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Opens a new tab with sample content
                  </p>
                </div>

                <div className="text-center">
                  <Button
                    id="windowButton"
                    onClick={openNewWindow}
                    className="bg-green-600 hover:bg-green-700 px-8 py-3"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    New Window
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Opens a new window with specific dimensions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Alerts</CardTitle>
              <CardDescription>
                Different types of JavaScript alerts for testing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="text-center">
                  <Button
                    id="alertButton"
                    onClick={handleSimpleAlert}
                    className="bg-yellow-600 hover:bg-yellow-700 px-8 py-3"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Click for JS Alert
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Triggers a simple JavaScript alert
                  </p>
                </div>

                <div className="text-center">
                  <Button
                    id="confirmButton"
                    onClick={handleConfirmAlert}
                    className="bg-orange-600 hover:bg-orange-700 px-8 py-3"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Click for JS Confirm
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Triggers a confirm dialog with OK/Cancel
                  </p>
                </div>

                <div className="text-center">
                  <Button
                    id="promtButton"
                    onClick={handlePromptAlert}
                    className="bg-purple-600 hover:bg-purple-700 px-8 py-3"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Click for JS Prompt
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">
                    Triggers a prompt dialog for text input
                  </p>
                </div>
              </div>

              {/* Alert Result */}
              {alertResult && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p id="confirmResult" className="text-blue-800 font-medium">
                    {alertResult}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Frames Section */}
        <Card className="mt-8 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Frames</CardTitle>
            <CardDescription>
              Test frame switching and nested frames
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Frame 1 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Frame 1</h3>
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                  <iframe
                    id="frame1"
                    src="data:text/html,<html><body><h1>Frame 1</h1><p>Frame ID: frame1</p></body></html>"
                    width="100%"
                    height="200"
                    title="Frame 1"
                    className="border-0"
                  />
                </div>
              </div>

              {/* Frame 2 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Frame 2</h3>
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                  <iframe
                    id="frame2"
                    src="data:text/html,<html><body><h1>Frame 2</h1><p>Frame ID: frame2</p><button onclick='alert(&quot;Hello!&quot;)'>Click Me</button></body></html>"
                    width="100%"
                    height="200"
                    title="Frame 2"
                    className="border-0"
                  />
                </div>
              </div>
            </div>

            {/* Nested Frames */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold">Nested Frames</h3>
              <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                <iframe
                  id="frame3"
                  src="data:text/html,<html><body><h1>Parent Frame</h1><p>Contains nested iframe</p><iframe src='data:text/html,<html><body><h2>Nested Frame</h2></body></html>' width='100%' height='150'></iframe></body></html>"
                  width="100%"
                  height="300"
                  title="Nested Frames"
                  className="border-0"
                />
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
                <h4 className="font-semibold text-yellow-700 mb-2">Window & Alert Element IDs:</h4>
                <ul className="space-y-1 text-yellow-600">
                  <li><code>tabButton</code> - New tab button</li>
                  <li><code>windowButton</code> - New window button</li>
                  <li><code>alertButton</code> - Simple alert button</li>
                  <li><code>confirmButton</code> - Confirm dialog button</li>
                  <li><code>promtButton</code> - Prompt dialog button</li>
                  <li><code>confirmResult</code> - Alert result display</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-700 mb-2">Frame Element IDs:</h4>
                <ul className="space-y-1 text-yellow-600">
                  <li><code>frame1</code> - First iframe</li>
                  <li><code>frame2</code> - Second iframe with button</li>
                  <li><code>frame3</code> - Parent frame with nested iframe</li>
                  <li>Nested frames require frame switching</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-12">
          <AdBanner size="leaderboard" position="Alerts Footer" />
        </div>
      </main>
    </div>
  );
}