"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Volume2, Copyright as Brightness4, DollarSign } from "lucide-react";
import Link from "next/link";
import { AdBanner } from "@/components/ui/ad-banner";

export default function SliderPage() {
  const [singleValue, setSingleValue] = useState([50]);
  const [rangeValue, setRangeValue] = useState([20, 80]);
  const [volumeValue, setVolumeValue] = useState([75]);
  const [brightnessValue, setBrightnessValue] = useState([60]);
  const [priceValue, setPriceValue] = useState([500]);

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
              <h1 className="text-3xl font-bold text-gray-900">Slider</h1>
              <p className="text-gray-600 mt-2">Draggable slider to select values within a range</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Slider Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Slider Demo Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Interactive Sliders</CardTitle>
              <CardDescription>
                Drag the sliders to select different values
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Single Value Slider */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Single Value Slider</Label>
                <div className="space-y-3">
                  <Slider
                    id="singleSlider"
                    value={singleValue}
                    onValueChange={setSingleValue}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0</span>
                    <span className="font-medium">Value: {singleValue[0]}</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              {/* Range Slider */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Range Slider</Label>
                <div className="space-y-3">
                  <Slider
                    id="rangeSlider"
                    value={rangeValue}
                    onValueChange={setRangeValue}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0</span>
                    <span className="font-medium">Range: {rangeValue[0]} - {rangeValue[1]}</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="space-y-4">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  Volume Control
                </Label>
                <div className="space-y-3">
                  <Slider
                    id="volumeSlider"
                    value={volumeValue}
                    onValueChange={setVolumeValue}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Mute</span>
                    <span className="font-medium">{volumeValue[0]}%</span>
                    <span>Max</span>
                  </div>
                </div>
              </div>

              {/* Brightness Slider */}
              <div className="space-y-4">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <Brightness4 className="w-4 h-4" />
                  Brightness
                </Label>
                <div className="space-y-3">
                  <Slider
                    id="brightnessSlider"
                    value={brightnessValue}
                    onValueChange={setBrightnessValue}
                    max={100}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Dim</span>
                    <span className="font-medium">{brightnessValue[0]}%</span>
                    <span>Bright</span>
                  </div>
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-4">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price Range
                </Label>
                <div className="space-y-3">
                  <Slider
                    id="priceSlider"
                    value={priceValue}
                    onValueChange={setPriceValue}
                    max={1000}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span className="font-medium">${priceValue[0]}</span>
                    <span>$1000</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Slider Values</CardTitle>
              <CardDescription>
                Current values from all sliders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Single Value Display */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Single Value:</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Current Value:</span>
                    <span id="singleValueDisplay" className="text-2xl font-bold text-blue-800">
                      {singleValue[0]}
                    </span>
                  </div>
                  <div className="mt-2 bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${singleValue[0]}%` }}
                    />
                  </div>
                </div>

                {/* Range Display */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Range Values:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-700">Minimum:</span>
                      <span id="rangeMinDisplay" className="font-bold text-green-800">{rangeValue[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Maximum:</span>
                      <span id="rangeMaxDisplay" className="font-bold text-green-800">{rangeValue[1]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Difference:</span>
                      <span className="font-bold text-green-800">{rangeValue[1] - rangeValue[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Volume Display */}
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Volume Level:
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-700">Level:</span>
                    <span id="volumeDisplay" className="text-2xl font-bold text-purple-800">
                      {volumeValue[0]}%
                    </span>
                  </div>
                  <p className="text-sm text-purple-600 mt-1">
                    {volumeValue[0] === 0 ? "Muted" : 
                     volumeValue[0] < 30 ? "Low" :
                     volumeValue[0] < 70 ? "Medium" : "High"}
                  </p>
                </div>

                {/* Brightness Display */}
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                    <Brightness4 className="w-4 h-4" />
                    Brightness:
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-700">Level:</span>
                    <span id="brightnessDisplay" className="text-2xl font-bold text-orange-800">
                      {brightnessValue[0]}%
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <h3 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Price Filter:
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-700">Max Price:</span>
                    <span id="priceDisplay" className="text-2xl font-bold text-indigo-800">
                      ${priceValue[0]}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testing Information */}
        <Card className="mt-8 bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">Slider Element IDs:</h4>
                <ul className="space-y-1 text-purple-600">
                  <li><code>singleSlider</code> - Single value slider</li>
                  <li><code>rangeSlider</code> - Range slider (dual handles)</li>
                  <li><code>volumeSlider</code> - Volume control slider</li>
                  <li><code>brightnessSlider</code> - Brightness slider</li>
                  <li><code>priceSlider</code> - Price range slider</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">Display Element IDs:</h4>
                <ul className="space-y-1 text-purple-600">
                  <li><code>singleValueDisplay</code> - Single value result</li>
                  <li><code>rangeMinDisplay</code>, <code>rangeMaxDisplay</code> - Range results</li>
                  <li><code>volumeDisplay</code> - Volume level</li>
                  <li><code>brightnessDisplay</code> - Brightness level</li>
                  <li><code>priceDisplay</code> - Price value</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Slider Footer" />
        </div>
      </main>
    </div>
  );
}