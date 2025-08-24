"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Home, AlertCircle } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";
import Link from "next/link";

export default function LinksPage() {
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApiCall = async (endpoint: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      switch (endpoint) {
        case "created":
          setApiResponse("Link has responded with staus 201 and status text Created");
          break;
        case "no-content":
          setApiResponse("Link has responded with staus 204 and status text No Content");
          break;
        case "moved":
          setApiResponse("Link has responded with staus 301 and status text Moved Permanently");
          break;
        case "bad-request":
          setApiResponse("Link has responded with staus 400 and status text Bad Request");
          break;
        case "unauthorized":
          setApiResponse("Link has responded with staus 401 and status text Unauthorized");
          break;
        case "forbidden":
          setApiResponse("Link has responded with staus 403 and status text Forbidden");
          break;
        case "not-found":
          setApiResponse("Link has responded with staus 404 and status text Not Found");
          break;
        default:
          setApiResponse("Link has responded with staus 200 and status text OK");
      }
    } catch (error) {
      setApiResponse("Error occurred while making the request");
    } finally {
      setLoading(false);
    }
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
              <h1 className="text-3xl font-bold text-gray-900">Links</h1>
              <p className="text-gray-600 mt-2">Internal, external, and broken links for testing</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Links Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Navigation Links Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Navigation Links</CardTitle>
              <CardDescription>
                Test different types of navigation and external links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Internal Links */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800">Internal Links</h3>
                <div className="space-y-2">
                  <div>
                    <Link 
                      href="/" 
                      id="simpleLink"
                      className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                    >
                      <Home className="w-4 h-4" />
                      Home
                    </Link>
                  </div>
                  <div>
                    <Link 
                      href="/elements" 
                      id="dynamicLink"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Elements Page
                    </Link>
                  </div>
                  <div>
                    <Link 
                      href="/elements/text-box" 
                      id="textBoxLink"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Text Box Demo
                    </Link>
                  </div>
                </div>
              </div>

              {/* External Links */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800">External Links</h3>
                <div className="space-y-2">
                  <div>
                    <a 
                      href="https://demoqa.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      id="externalLink"
                      className="text-green-600 hover:text-green-800 underline flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Original DemoQA
                    </a>
                  </div>
                  <div>
                    <a 
                      href="https://www.selenium.dev" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      id="seleniumLink"
                      className="text-green-600 hover:text-green-800 underline flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Selenium WebDriver
                    </a>
                  </div>
                </div>
              </div>

              {/* Broken Link */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800">Broken Link</h3>
                <div>
                  <a 
                    href="http://the-internet.herokuapp.com/status_codes/500" 
                    id="brokenLink"
                    className="text-red-600 hover:text-red-800 underline flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Broken Link (500 Error)
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Links Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">API Response Links</CardTitle>
              <CardDescription>
                Links that simulate different HTTP response codes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Success Responses */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800">Success Responses</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleApiCall("created")}
                    id="created"
                    className="text-green-600 hover:text-green-800 underline block text-left"
                    disabled={loading}
                  >
                    Created (201)
                  </button>
                  <button 
                    onClick={() => handleApiCall("no-content")}
                    id="no-content"
                    className="text-green-600 hover:text-green-800 underline block text-left"
                    disabled={loading}
                  >
                    No Content (204)
                  </button>
                </div>
              </div>

              {/* Redirect Responses */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800">Redirect Responses</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleApiCall("moved")}
                    id="moved"
                    className="text-blue-600 hover:text-blue-800 underline block text-left"
                    disabled={loading}
                  >
                    Moved Permanently (301)
                  </button>
                </div>
              </div>

              {/* Error Responses */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-800">Error Responses</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleApiCall("bad-request")}
                    id="bad-request"
                    className="text-red-600 hover:text-red-800 underline block text-left"
                    disabled={loading}
                  >
                    Bad Request (400)
                  </button>
                  <button 
                    onClick={() => handleApiCall("unauthorized")}
                    id="unauthorized"
                    className="text-red-600 hover:text-red-800 underline block text-left"
                    disabled={loading}
                  >
                    Unauthorized (401)
                  </button>
                  <button 
                    onClick={() => handleApiCall("forbidden")}
                    id="forbidden"
                    className="text-red-600 hover:text-red-800 underline block text-left"
                    disabled={loading}
                  >
                    Forbidden (403)
                  </button>
                  <button 
                    onClick={() => handleApiCall("not-found")}
                    id="not-found"
                    className="text-red-600 hover:text-red-800 underline block text-left"
                    disabled={loading}
                  >
                    Not Found (404)
                  </button>
                </div>
              </div>

              {/* Response Display */}
              {(apiResponse || loading) && (
                <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Response:</h4>
                  {loading ? (
                    <p className="text-gray-600">Loading...</p>
                  ) : (
                    <p id="linkResponse" className="text-gray-700 text-sm">
                      {apiResponse}
                    </p>
                  )}
                </div>
              )}
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
                <h4 className="font-semibold text-indigo-700 mb-2">Navigation Link IDs:</h4>
                <ul className="space-y-1 text-indigo-600">
                  <li><code>simpleLink</code> - Home page link</li>
                  <li><code>dynamicLink</code> - Elements page link</li>
                  <li><code>externalLink</code> - External website link</li>
                  <li><code>brokenLink</code> - Broken/error link</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">API Response Link IDs:</h4>
                <ul className="space-y-1 text-indigo-600">
                  <li><code>created</code>, <code>no-content</code> - Success responses</li>
                  <li><code>moved</code> - Redirect response</li>
                  <li><code>bad-request</code>, <code>unauthorized</code> - Error responses</li>
                  <li><code>linkResponse</code> - Response message display</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Links Footer" />
        </div>
      </main>
    </div>
  );
}