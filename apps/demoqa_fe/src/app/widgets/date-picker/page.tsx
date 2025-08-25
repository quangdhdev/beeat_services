"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";
import Link from "next/link";

export default function DatePickerPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not selected";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return "Not selected";
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
              <h1 className="text-3xl font-bold text-gray-900">Date Picker</h1>
              <p className="text-gray-600 mt-2">Calendar widget for selecting dates with various formats</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Date Picker Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Date Picker Demo Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Date Selection</CardTitle>
              <CardDescription>
                Various date and time picker options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Simple Date Picker */}
              <div className="space-y-2">
                <Label htmlFor="datePicker" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Select Date
                </Label>
                <Input
                  id="datePicker"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Time Picker */}
              <div className="space-y-2">
                <Label htmlFor="timePicker">Select Time</Label>
                <Input
                  id="timePicker"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Date and Time Picker */}
              <div className="space-y-2">
                <Label htmlFor="dateTimePicker">Select Date and Time</Label>
                <Input
                  id="dateTimePicker"
                  type="datetime-local"
                  value={selectedDateTime}
                  onChange={(e) => setSelectedDateTime(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Date Range */}
              <div className="space-y-4">
                <Label>Date Range</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sm">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full"
                      min={dateRange.start}
                    />
                  </div>
                </div>
              </div>

              {/* Month Picker */}
              <div className="space-y-2">
                <Label htmlFor="monthPicker">Select Month</Label>
                <Input
                  id="monthPicker"
                  type="month"
                  className="w-full"
                />
              </div>

              {/* Week Picker */}
              <div className="space-y-2">
                <Label htmlFor="weekPicker">Select Week</Label>
                <Input
                  id="weekPicker"
                  type="week"
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Selected Values</CardTitle>
              <CardDescription>
                Your date and time selections will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Selected Date */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Selected Date:</h3>
                  <p id="selectedDateDisplay" className="text-blue-700">
                    {formatDate(selectedDate)}
                  </p>
                </div>

                {/* Selected Time */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Selected Time:</h3>
                  <p id="selectedTimeDisplay" className="text-green-700">
                    {selectedTime || "Not selected"}
                  </p>
                </div>

                {/* Selected Date and Time */}
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Selected Date & Time:</h3>
                  <p id="selectedDateTimeDisplay" className="text-purple-700">
                    {formatDateTime(selectedDateTime)}
                  </p>
                </div>

                {/* Date Range */}
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Date Range:</h3>
                  <div className="space-y-1 text-orange-700">
                    <p><strong>Start:</strong> <span id="startDateDisplay">{formatDate(dateRange.start)}</span></p>
                    <p><strong>End:</strong> <span id="endDateDisplay">{formatDate(dateRange.end)}</span></p>
                    {dateRange.start && dateRange.end && (
                      <p><strong>Duration:</strong> {
                        Math.ceil((new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 60 * 60 * 24)) + 1
                      } days</p>
                    )}
                  </div>
                </div>

                {/* Current Date Info */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Current Date & Time:</h3>
                  <p className="text-gray-700">
                    {new Date().toLocaleString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </div>
              </div>
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
                <h4 className="font-semibold text-yellow-700 mb-2">Date Picker Element IDs:</h4>
                <ul className="space-y-1 text-yellow-600">
                  <li><code>datePicker</code> - Simple date picker</li>
                  <li><code>timePicker</code> - Time selection</li>
                  <li><code>dateTimePicker</code> - Date and time combined</li>
                  <li><code>startDate</code>, <code>endDate</code> - Date range</li>
                  <li><code>monthPicker</code>, <code>weekPicker</code> - Month/week selection</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-700 mb-2">Display Element IDs:</h4>
                <ul className="space-y-1 text-yellow-600">
                  <li><code>selectedDateDisplay</code> - Date result</li>
                  <li><code>selectedTimeDisplay</code> - Time result</li>
                  <li><code>selectedDateTimeDisplay</code> - DateTime result</li>
                  <li><code>startDateDisplay</code>, <code>endDateDisplay</code> - Range results</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Date Picker Footer" />
        </div>
      </main>
    </div>
  );
}