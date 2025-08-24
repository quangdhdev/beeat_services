"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Play, Database, Code, Copy } from "lucide-react";
import Link from "next/link";
import { AdBanner } from "@/components/ui/ad-banner";

interface ApiEndpoint {
  method: string;
  endpoint: string;
  description: string;
  parameters?: string[];
  requestBody?: string;
  responseExample?: string;
}

export default function ApiPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [requestData, setRequestData] = useState("");
  const [responseData, setResponseData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const accountEndpoints: ApiEndpoint[] = [
    {
      method: "POST",
      endpoint: "/Account/v1/User",
      description: "Create a new user account",
      requestBody: `{
  "userName": "testuser",
  "password": "Test@123"
}`,
      responseExample: `{
  "userID": "12345-67890-abcde-fghij",
  "username": "testuser",
  "books": []
}`
    },
    {
      method: "POST",
      endpoint: "/Account/v1/GenerateToken",
      description: "Generate authentication token",
      requestBody: `{
  "userName": "testuser",
  "password": "Test@123"
}`,
      responseExample: `{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires": "2024-01-01T12:00:00.000Z",
  "status": "Success",
  "result": "User authorized successfully."
}`
    },
    {
      method: "POST",
      endpoint: "/Account/v1/Authorized",
      description: "Check if user is authorized",
      requestBody: `{
  "userName": "testuser",
  "password": "Test@123"
}`,
      responseExample: `{
  "status": "Success",
  "result": "User authorized successfully."
}`
    },
    {
      method: "DELETE",
      endpoint: "/Account/v1/User/{UUID}",
      description: "Delete user account",
      parameters: ["UUID - User ID"],
      responseExample: `{
  "status": "Success",
  "result": "User deleted successfully."
}`
    }
  ];

  const bookEndpoints: ApiEndpoint[] = [
    {
      method: "GET",
      endpoint: "/BookStore/v1/Books",
      description: "Get all available books",
      responseExample: `{
  "books": [
    {
      "isbn": "9781449325862",
      "title": "Git Pocket Guide",
      "subTitle": "A Working Introduction",
      "author": "Richard E. Silverman",
      "publish_date": "2020-06-04T08:48:39.000Z",
      "publisher": "O'Reilly Media",
      "pages": 234,
      "description": "This pocket guide is the perfect on-the-job companion to Git.",
      "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
    }
  ]
}`
    },
    {
      method: "POST",
      endpoint: "/BookStore/v1/Books",
      description: "Add books to user collection",
      requestBody: `{
  "userId": "12345-67890-abcde-fghij",
  "collectionOfIsbns": [
    {
      "isbn": "9781449325862"
    },
    {
      "isbn": "9781449331818"
    }
  ]
}`,
      responseExample: `{
  "books": [
    {
      "isbn": "9781449325862",
      "title": "Git Pocket Guide",
      "subTitle": "A Working Introduction",
      "author": "Richard E. Silverman",
      "publisher": "O'Reilly Media",
      "pages": 234
    }
  ]
}`
    },
    {
      method: "DELETE",
      endpoint: "/BookStore/v1/Books",
      description: "Delete all books from user collection",
      parameters: ["UserId - User ID (query parameter)"],
      responseExample: `{
  "status": "Success",
  "result": "All books deleted successfully."
}`
    },
    {
      method: "PUT",
      endpoint: "/BookStore/v1/Books/{ISBN}",
      description: "Update book in user collection",
      parameters: ["ISBN - Book ISBN", "UserId - User ID"],
      requestBody: `{
  "userId": "12345-67890-abcde-fghij",
  "isbn": "9781449325862"
}`,
      responseExample: `{
  "userId": "12345-67890-abcde-fghij",
  "username": "testuser",
  "books": [
    {
      "isbn": "9781449325862",
      "title": "Git Pocket Guide",
      "subTitle": "A Working Introduction",
      "author": "Richard E. Silverman",
      "publisher": "O'Reilly Media",
      "pages": 234
    }
  ]
}`
    },
    {
      method: "DELETE",
      endpoint: "/BookStore/v1/Book",
      description: "Delete specific book from collection",
      requestBody: `{
  "isbn": "9781449325862",
  "userId": "12345-67890-abcde-fghij"
}`,
      responseExample: `{
  "status": "Success",
  "result": "Book deleted successfully."
}`
    }
  ];

  const handleTestEndpoint = async () => {
    if (!selectedEndpoint) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResponseData(selectedEndpoint.responseExample || "No response example available");
      setIsLoading(false);
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const EndpointCard = ({ endpoint, category }: { endpoint: ApiEndpoint; category: string }) => (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        selectedEndpoint === endpoint ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white'
      }`}
      onClick={() => {
        setSelectedEndpoint(endpoint);
        setRequestData(endpoint.requestBody || "");
        setResponseData("");
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
            endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {endpoint.method}
          </span>
          <span className="text-xs text-gray-500">{category}</span>
        </div>
        <CardTitle className="text-sm font-mono">{endpoint.endpoint}</CardTitle>
        <CardDescription className="text-xs">
          {endpoint.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/book-store">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Book Store
              </Button>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Book Store API</h1>
              <p className="text-gray-600 mt-2">RESTful API documentation and testing interface</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="API Documentation Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* API Endpoints */}
          <div className="space-y-6">
            {/* Account Endpoints */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Account API
                </CardTitle>
                <CardDescription>
                  User authentication and account management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {accountEndpoints.map((endpoint, index) => (
                  <EndpointCard key={index} endpoint={endpoint} category="Account" />
                ))}
              </CardContent>
            </Card>

            {/* Book Endpoints */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  BookStore API
                </CardTitle>
                <CardDescription>
                  Book collection and library management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {bookEndpoints.map((endpoint, index) => (
                  <EndpointCard key={index} endpoint={endpoint} category="BookStore" />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* API Testing Interface */}
          <div className="lg:col-span-2 space-y-6">
            {selectedEndpoint ? (
              <>
                {/* Endpoint Details */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-semibold flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            selectedEndpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            selectedEndpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            selectedEndpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {selectedEndpoint.method}
                          </span>
                          <code className="text-lg">{selectedEndpoint.endpoint}</code>
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {selectedEndpoint.description}
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(selectedEndpoint.endpoint)}
                        className="flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedEndpoint.parameters && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Parameters:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {selectedEndpoint.parameters.map((param, index) => (
                            <li key={index}>{param}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Request */}
                {selectedEndpoint.requestBody && (
                  <Card className="bg-white shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">Request Body</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(requestData)}
                          className="flex items-center gap-2"
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        id="requestBody"
                        value={requestData}
                        onChange={(e) => setRequestData(e.target.value)}
                        className="font-mono text-sm min-h-[150px]"
                        placeholder="Enter request body JSON..."
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Test Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleTestEndpoint}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2 px-8 py-3"
                  >
                    <Play className="w-4 h-4" />
                    {isLoading ? "Testing..." : "Test Endpoint"}
                  </Button>
                </div>

                {/* Response */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">Response</CardTitle>
                      {responseData && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(responseData)}
                          className="flex items-center gap-2"
                        >
                          <Copy className="w-4 h-4" />
                          Copy
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      id="responseBody"
                      value={responseData}
                      readOnly
                      className="font-mono text-sm min-h-[200px] bg-gray-50"
                      placeholder="Response will appear here after testing..."
                    />
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-white shadow-lg">
                <CardContent className="text-center py-12">
                  <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Select an API Endpoint</h3>
                  <p className="text-gray-500">Choose an endpoint from the left panel to test it</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* API Documentation */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-800">API Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-blue-700 mb-3">Authentication</h4>
                <div className="space-y-2 text-blue-600">
                  <p>• All API requests require authentication</p>
                  <p>• Use the <code>/Account/v1/GenerateToken</code> endpoint to get a token</p>
                  <p>• Include the token in the Authorization header:</p>
                  <code className="block bg-blue-100 p-2 rounded text-xs mt-1">
                    Authorization: Bearer {"{token}"}
                  </code>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-3">Base URL</h4>
                <div className="space-y-2 text-blue-600">
                  <p>• Production: <code>https://bookstore.toolsqa.com</code></p>
                  <p>• All endpoints are relative to the base URL</p>
                  <p>• Content-Type: <code>application/json</code></p>
                  <p>• All responses are in JSON format</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testing Information */}
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-green-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">API Testing Element IDs:</h4>
                <ul className="space-y-1 text-green-600">
                  <li><code>requestBody</code> - Request JSON input</li>
                  <li><code>responseBody</code> - Response display area</li>
                  <li>Endpoint cards are clickable for selection</li>
                  <li>Copy buttons for easy data copying</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Testing Scenarios:</h4>
                <ul className="space-y-1 text-green-600">
                  <li>• Test user registration and login</li>
                  <li>• Test book collection management</li>
                  <li>• Test API authentication flow</li>
                  <li>• Test error handling and responses</li>
                  <li>• Validate request/response formats</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="API Documentation Footer" />
        </div>
      </main>
    </div>
  );
}