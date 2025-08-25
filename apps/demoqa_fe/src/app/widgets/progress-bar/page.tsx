"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, RotateCcw, Download, Upload, Loader } from "lucide-react";
import Link from "next/link";
import { AdBanner } from "@/components/ui/ad-banner";

export default function ProgressBarPage() {
  const [staticProgress, setStaticProgress] = useState(75);
  const [dynamicProgress, setDynamicProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Dynamic progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && dynamicProgress < 100) {
      interval = setInterval(() => {
        setDynamicProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, dynamicProgress]);

  // Download simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDownloading && downloadProgress < 100) {
      interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            setIsDownloading(false);
            return 100;
          }
          return prev + Math.random() * 5;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isDownloading, downloadProgress]);

  // Upload simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isUploading && uploadProgress < 100) {
      interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            setIsUploading(false);
            return 100;
          }
          return prev + Math.random() * 3;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isUploading, uploadProgress]);

  const startDynamicProgress = () => {
    setIsRunning(true);
  };

  const pauseDynamicProgress = () => {
    setIsRunning(false);
  };

  const resetDynamicProgress = () => {
    setDynamicProgress(0);
    setIsRunning(false);
  };

  const startDownload = () => {
    setDownloadProgress(0);
    setIsDownloading(true);
  };

  const startUpload = () => {
    setUploadProgress(0);
    setIsUploading(true);
  };

  const getProgressColor = (value: number) => {
    if (value < 25) return "bg-red-500";
    if (value < 50) return "bg-orange-500";
    if (value < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getProgressStatus = (value: number) => {
    if (value === 0) return "Not started";
    if (value < 25) return "Starting...";
    if (value < 50) return "In progress...";
    if (value < 75) return "Almost there...";
    if (value < 100) return "Nearly complete...";
    return "Complete!";
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
              <h1 className="text-3xl font-bold text-gray-900">Progress Bar</h1>
              <p className="text-gray-600 mt-2">Dynamic progress indicator with status updates</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Progress Bar Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Bar Demo Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Progress Indicators</CardTitle>
              <CardDescription>
                Various types of progress bars and indicators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Static Progress Bar */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold">Static Progress</h3>
                  <span className="text-sm text-gray-600">{staticProgress}%</span>
                </div>
                <Progress id="staticProgressBar" value={staticProgress} className="w-full" />
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => setStaticProgress(Math.max(0, staticProgress - 10))}
                    disabled={staticProgress <= 0}
                  >
                    -10%
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => setStaticProgress(Math.min(100, staticProgress + 10))}
                    disabled={staticProgress >= 100}
                  >
                    +10%
                  </Button>
                </div>
              </div>

              {/* Dynamic Progress Bar */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold">Dynamic Progress</h3>
                  <span className="text-sm text-gray-600">{Math.round(dynamicProgress)}%</span>
                </div>
                <Progress id="dynamicProgressBar" value={dynamicProgress} className="w-full" />
                <div className="flex gap-2">
                  <Button 
                    id="startBtn"
                    size="sm" 
                    onClick={startDynamicProgress}
                    disabled={isRunning || dynamicProgress >= 100}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Start
                  </Button>
                  <Button 
                    id="pauseBtn"
                    size="sm" 
                    onClick={pauseDynamicProgress}
                    disabled={!isRunning}
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    <Pause className="w-4 h-4 mr-1" />
                    Pause
                  </Button>
                  <Button 
                    id="resetBtn"
                    size="sm" 
                    onClick={resetDynamicProgress}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Download Progress */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Progress
                  </h3>
                  <span className="text-sm text-gray-600">{Math.round(downloadProgress)}%</span>
                </div>
                <Progress id="downloadProgressBar" value={downloadProgress} className="w-full" />
                <Button 
                  id="downloadBtn"
                  size="sm" 
                  onClick={startDownload}
                  disabled={isDownloading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isDownloading ? (
                    <>
                      <Loader className="w-4 h-4 mr-1 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-1" />
                      Start Download
                    </>
                  )}
                </Button>
              </div>

              {/* Upload Progress */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Progress
                  </h3>
                  <span className="text-sm text-gray-600">{Math.round(uploadProgress)}%</span>
                </div>
                <Progress id="uploadProgressBar" value={uploadProgress} className="w-full" />
                <Button 
                  id="uploadBtn"
                  size="sm" 
                  onClick={startUpload}
                  disabled={isUploading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isUploading ? (
                    <>
                      <Loader className="w-4 h-4 mr-1 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-1" />
                      Start Upload
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Progress Status</CardTitle>
              <CardDescription>
                Real-time status of all progress indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Static Progress Status */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Static Progress:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Value:</span>
                      <span id="staticProgressValue" className="font-bold text-blue-800">{staticProgress}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Status:</span>
                      <span className="font-medium text-blue-800">{getProgressStatus(staticProgress)}</span>
                    </div>
                  </div>
                </div>

                {/* Dynamic Progress Status */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Dynamic Progress:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-700">Value:</span>
                      <span id="dynamicProgressValue" className="font-bold text-green-800">{Math.round(dynamicProgress)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Status:</span>
                      <span className="font-medium text-green-800">
                        {isRunning ? "Running..." : dynamicProgress >= 100 ? "Complete!" : "Stopped"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Download Status */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Download Status:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Progress:</span>
                      <span id="downloadProgressValue" className="font-bold text-blue-800">{Math.round(downloadProgress)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Status:</span>
                      <span className="font-medium text-blue-800">
                        {isDownloading ? "Downloading..." : downloadProgress >= 100 ? "Download Complete!" : "Ready"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Upload Status */}
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Upload Status:</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-purple-700">Progress:</span>
                      <span id="uploadProgressValue" className="font-bold text-purple-800">{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Status:</span>
                      <span className="font-medium text-purple-800">
                        {isUploading ? "Uploading..." : uploadProgress >= 100 ? "Upload Complete!" : "Ready"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Overall Status */}
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Overall Activity:</h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-700">
                      Active processes: {[isRunning, isDownloading, isUploading].filter(Boolean).length}
                    </p>
                    <p className="text-gray-700">
                      Completed: {[staticProgress >= 100, dynamicProgress >= 100, downloadProgress >= 100, uploadProgress >= 100].filter(Boolean).length}/4
                    </p>
                  </div>
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
                <h4 className="font-semibold text-orange-700 mb-2">Progress Bar Element IDs:</h4>
                <ul className="space-y-1 text-orange-600">
                  <li><code>staticProgressBar</code> - Static progress bar</li>
                  <li><code>dynamicProgressBar</code> - Animated progress bar</li>
                  <li><code>downloadProgressBar</code> - Download progress</li>
                  <li><code>uploadProgressBar</code> - Upload progress</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Control Element IDs:</h4>
                <ul className="space-y-1 text-orange-600">
                  <li><code>startBtn</code>, <code>pauseBtn</code>, <code>resetBtn</code> - Controls</li>
                  <li><code>downloadBtn</code>, <code>uploadBtn</code> - Action buttons</li>
                  <li><code>*ProgressValue</code> - Value display elements</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Progress Bar Footer" />
        </div>
      </main>
    </div>
  );
}