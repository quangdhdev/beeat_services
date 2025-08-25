"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdBanner } from "@/components/ui/ad-banner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TextBoxPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentAddress: "",
    permanentAddress: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
              <h1 className="text-3xl font-bold text-gray-900">Text Box</h1>
              <p className="text-gray-600 mt-2">Practice with text input fields and form submission</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sidebar Ad */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden xl:block z-10">
          <AdBanner size="sidebar" position="Sidebar Ad" className="w-48" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">User Information Form</CardTitle>
              <CardDescription>
                Fill out the form below to test text input functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentAddress">Current Address</Label>
                  <Textarea
                    id="currentAddress"
                    placeholder="Enter your current address"
                    value={formData.currentAddress}
                    onChange={(e) => handleInputChange("currentAddress", e.target.value)}
                    className="w-full min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="permanentAddress">Permanent Address</Label>
                  <Textarea
                    id="permanentAddress"
                    placeholder="Enter your permanent address"
                    value={formData.permanentAddress}
                    onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                    className="w-full min-h-[100px]"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Output Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Form Output</CardTitle>
              <CardDescription>
                The submitted form data will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-800">Name:</h3>
                    <p className="text-gray-600" id="name-output">{formData.fullName || "Not provided"}</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-800">Email:</h3>
                    <p className="text-gray-600" id="email-output">{formData.email || "Not provided"}</p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="font-semibold text-gray-800">Current Address:</h3>
                    <p className="text-gray-600 whitespace-pre-wrap" id="current-address-output">
                      {formData.currentAddress || "Not provided"}
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-gray-800">Permanent Address:</h3>
                    <p className="text-gray-600 whitespace-pre-wrap" id="permanent-address-output">
                      {formData.permanentAddress || "Not provided"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Submit the form to see the output here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Testing Information */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Element IDs for Automation:</h4>
                <ul className="space-y-1 text-blue-600">
                  <li><code>fullName</code> - Full Name input field</li>
                  <li><code>email</code> - Email input field</li>
                  <li><code>currentAddress</code> - Current Address textarea</li>
                  <li><code>permanentAddress</code> - Permanent Address textarea</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Output Element IDs:</h4>
                <ul className="space-y-1 text-blue-600">
                  <li><code>name-output</code> - Name display</li>
                  <li><code>email-output</code> - Email display</li>
                  <li><code>current-address-output</code> - Current Address display</li>
                  <li><code>permanent-address-output</code> - Permanent Address display</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Text Box Footer" />
        </div>
      </main>
    </div>
  );
}