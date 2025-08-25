"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";
import Link from "next/link";

export default function AutoCompletePage() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const colors = [
    "Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown", 
    "Black", "White", "Gray", "Cyan", "Magenta", "Lime", "Indigo", "Violet"
  ];

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.length > 0) {
      const filtered = colors.filter(color => 
        color.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSelectedSuggestion(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedSuggestion(inputValue);
    setShowSuggestions(false);
  };

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
              <h1 className="text-3xl font-bold text-gray-900">Auto Complete</h1>
              <p className="text-gray-600 mt-2">Text input with dynamic suggestions and autocomplete</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Auto Complete Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Auto Complete Demo Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Color Auto Complete</CardTitle>
              <CardDescription>
                Start typing a color name to see suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="autoCompleteInput">Type a color name:</Label>
                  <div className="relative">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="autoCompleteInput"
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder="Start typing... (e.g., 'red', 'blue')"
                        className="pl-10"
                        autoComplete="off"
                      />
                    </div>
                    
                    {/* Suggestions Dropdown */}
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                            onClick={() => handleSuggestionClick(suggestion)}
                            id={`suggestion-${index}`}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Select Color
                </Button>
              </form>

              {/* Multiple Auto Complete */}
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold">Multiple Colors</h3>
                <div className="space-y-2">
                  <Label htmlFor="multipleColors">Select multiple colors (comma separated):</Label>
                  <Input
                    id="multipleColors"
                    type="text"
                    placeholder="red, blue, green..."
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Selection Results</CardTitle>
              <CardDescription>
                Your selected colors will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedSuggestion ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Selected Color:</h3>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded border-2 border-gray-300"
                        style={{ 
                          backgroundColor: selectedSuggestion.toLowerCase() === 'red' ? '#ef4444' :
                                          selectedSuggestion.toLowerCase() === 'blue' ? '#3b82f6' :
                                          selectedSuggestion.toLowerCase() === 'green' ? '#10b981' :
                                          selectedSuggestion.toLowerCase() === 'yellow' ? '#f59e0b' :
                                          selectedSuggestion.toLowerCase() === 'purple' ? '#8b5cf6' :
                                          selectedSuggestion.toLowerCase() === 'orange' ? '#f97316' :
                                          selectedSuggestion.toLowerCase() === 'pink' ? '#ec4899' :
                                          selectedSuggestion.toLowerCase() === 'brown' ? '#92400e' :
                                          selectedSuggestion.toLowerCase() === 'black' ? '#000000' :
                                          selectedSuggestion.toLowerCase() === 'white' ? '#ffffff' :
                                          selectedSuggestion.toLowerCase() === 'gray' ? '#6b7280' :
                                          selectedSuggestion.toLowerCase() === 'cyan' ? '#06b6d4' :
                                          selectedSuggestion.toLowerCase() === 'magenta' ? '#d946ef' :
                                          selectedSuggestion.toLowerCase() === 'lime' ? '#84cc16' :
                                          selectedSuggestion.toLowerCase() === 'indigo' ? '#6366f1' :
                                          selectedSuggestion.toLowerCase() === 'violet' ? '#8b5cf6' :
                                          '#9ca3af'
                        }}
                      />
                      <span id="selectedColor" className="text-lg font-medium text-gray-800">
                        {selectedSuggestion}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Available Colors:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {colors.map((color, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded border border-gray-300"
                            style={{ 
                              backgroundColor: color.toLowerCase() === 'red' ? '#ef4444' :
                                              color.toLowerCase() === 'blue' ? '#3b82f6' :
                                              color.toLowerCase() === 'green' ? '#10b981' :
                                              color.toLowerCase() === 'yellow' ? '#f59e0b' :
                                              color.toLowerCase() === 'purple' ? '#8b5cf6' :
                                              color.toLowerCase() === 'orange' ? '#f97316' :
                                              color.toLowerCase() === 'pink' ? '#ec4899' :
                                              color.toLowerCase() === 'brown' ? '#92400e' :
                                              color.toLowerCase() === 'black' ? '#000000' :
                                              color.toLowerCase() === 'white' ? '#ffffff' :
                                              color.toLowerCase() === 'gray' ? '#6b7280' :
                                              color.toLowerCase() === 'cyan' ? '#06b6d4' :
                                              color.toLowerCase() === 'magenta' ? '#d946ef' :
                                              color.toLowerCase() === 'lime' ? '#84cc16' :
                                              color.toLowerCase() === 'indigo' ? '#6366f1' :
                                              color.toLowerCase() === 'violet' ? '#8b5cf6' :
                                              '#9ca3af'
                            }}
                          />
                          <span className="text-blue-700">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Start typing to see suggestions</p>
                  <p className="text-sm mt-2">Select a color to see it displayed here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Testing Information */}
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-green-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Auto Complete Element IDs:</h4>
                <ul className="space-y-1 text-green-600">
                  <li><code>autoCompleteInput</code> - Main input field</li>
                  <li><code>suggestion-{"{index}"}</code> - Individual suggestions</li>
                  <li><code>selectedColor</code> - Selected color display</li>
                  <li><code>multipleColors</code> - Multiple selection input</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Testing Scenarios:</h4>
                <ul className="space-y-1 text-green-600">
                  <li>• Type partial text to trigger suggestions</li>
                  <li>• Click on suggestions to select</li>
                  <li>• Test keyboard navigation (arrows, enter)</li>
                  <li>• Verify dropdown visibility states</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Auto Complete Footer" />
        </div>
      </main>
    </div>
  );
}