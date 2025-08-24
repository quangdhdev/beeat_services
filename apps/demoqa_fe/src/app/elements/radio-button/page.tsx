"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/ui/ad-banner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RadioButtonPage() {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedFramework, setSelectedFramework] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
              <h1 className="text-3xl font-bold text-gray-900">Radio Button</h1>
              <p className="text-gray-600 mt-2">Practice with radio button selections</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Radio Button Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Radio Button Form</CardTitle>
              <CardDescription>
                Select one option from each group using radio buttons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Gender Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Do you like the site?</Label>
                  <RadioGroup value={selectedGender} onValueChange={setSelectedGender}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="impressive" id="impressive" />
                      <Label htmlFor="impressive">Impressive</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Experience Level */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">What is your experience level?</Label>
                  <RadioGroup value={selectedExperience} onValueChange={setSelectedExperience}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0-2" id="exp-0-2" />
                      <Label htmlFor="exp-0-2">0-2 years</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2-5" id="exp-2-5" />
                      <Label htmlFor="exp-2-5">2-5 years</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5-10" id="exp-5-10" />
                      <Label htmlFor="exp-5-10">5-10 years</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10+" id="exp-10-plus" />
                      <Label htmlFor="exp-10-plus">10+ years</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Preferred Framework */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Which testing framework do you prefer?</Label>
                  <RadioGroup value={selectedFramework} onValueChange={setSelectedFramework}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="selenium" id="selenium" />
                      <Label htmlFor="selenium">Selenium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cypress" id="cypress" />
                      <Label htmlFor="cypress">Cypress</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="playwright" id="playwright" />
                      <Label htmlFor="playwright">Playwright</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="testcafe" id="testcafe" />
                      <Label htmlFor="testcafe">TestCafe</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Selected Options</CardTitle>
              <CardDescription>
                Your radio button selections will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Survey Results:</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Do you like the site?</span>
                        <span className="font-medium text-blue-600" id="site-result">
                          {selectedGender || "Not selected"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-700">Experience Level:</span>
                        <span className="font-medium text-green-600" id="experience-result">
                          {selectedExperience ? `${selectedExperience} years` : "Not selected"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-700">Preferred Framework:</span>
                        <span className="font-medium text-purple-600" id="framework-result">
                          {selectedFramework || "Not selected"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedGender && selectedExperience && selectedFramework && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium">✓ All selections completed!</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Make your selections and submit to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Testing Information */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-yellow-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-yellow-700 mb-2">Radio Button IDs:</h4>
                <ul className="space-y-1 text-yellow-600">
                  <li><code>yes</code>, <code>impressive</code>, <code>no</code> - Site preference</li>
                  <li><code>exp-0-2</code>, <code>exp-2-5</code>, <code>exp-5-10</code>, <code>exp-10-plus</code> - Experience</li>
                  <li><code>selenium</code>, <code>cypress</code>, <code>playwright</code>, <code>testcafe</code> - Framework</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-700 mb-2">Result Element IDs:</h4>
                <ul className="space-y-1 text-yellow-600">
                  <li><code>site-result</code> - Site preference result</li>
                  <li><code>experience-result</code> - Experience level result</li>
                  <li><code>framework-result</code> - Framework preference result</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Radio Button Footer" />
        </div>
      </main>
    </div>
  );
}