"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Download, File, CheckCircle, AlertCircle } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";
import Link from "next/link";

export default function UploadDownloadPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file validation
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (file.size > maxSize) {
        setUploadStatus("error");
        setUploadedFile(null);
        return;
      }
      
      if (!allowedTypes.includes(file.type)) {
        setUploadStatus("error");
        setUploadedFile(null);
        return;
      }
      
      setUploadedFile(file);
      setUploadStatus("success");
    }
  };

  const handleDownload = (filename: string, content: string, mimeType: string = 'text/plain') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadSampleText = () => {
    const content = `This is a sample text file for testing download functionality.

File Details:
- Created: ${new Date().toLocaleString()}
- Purpose: Testing file download in automation scripts
- Format: Plain text (.txt)

You can use this file to test:
1. File download automation
2. File existence verification
3. File content validation
4. Download folder monitoring

Happy testing!`;
    
    handleDownload('sampleFile.txt', content);
  };

  const downloadSampleJSON = () => {
    const data = {
      message: "Sample JSON file for testing",
      timestamp: new Date().toISOString(),
      data: {
        users: [
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Smith", email: "jane@example.com" }
        ],
        settings: {
          theme: "light",
          notifications: true,
          language: "en"
        }
      }
    };
    
    handleDownload('sampleData.json', JSON.stringify(data, null, 2), 'application/json');
  };

  const downloadSampleCSV = () => {
    const csvContent = `Name,Email,Age,Department
John Doe,john@example.com,30,Engineering
Jane Smith,jane@example.com,25,Marketing
Bob Johnson,bob@example.com,35,Sales
Alice Brown,alice@example.com,28,HR`;
    
    handleDownload('sampleData.csv', csvContent, 'text/csv');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
              <h1 className="text-3xl font-bold text-gray-900">Upload and Download</h1>
              <p className="text-gray-600 mt-2">File upload and download functionality</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Upload Download Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">File Upload</CardTitle>
              <CardDescription>
                Upload files to test file handling functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div className="space-y-4">
                <Label htmlFor="uploadFile">Select File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="space-y-2">
                    <p className="text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">
                      Supported: JPG, PNG, GIF, TXT, PDF, DOC, DOCX (Max 10MB)
                    </p>
                  </div>
                  <Input
                    id="uploadFile"
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    className="mt-4"
                    accept=".jpg,.jpeg,.png,.gif,.txt,.pdf,.doc,.docx"
                  />
                </div>
              </div>

              {/* Upload Status */}
              {uploadStatus !== "idle" && (
                <div className={`p-4 rounded-lg border ${
                  uploadStatus === "success" 
                    ? "bg-green-50 border-green-200" 
                    : "bg-red-50 border-red-200"
                }`}>
                  <div className="flex items-center space-x-2">
                    {uploadStatus === "success" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`font-medium ${
                      uploadStatus === "success" ? "text-green-800" : "text-red-800"
                    }`}>
                      {uploadStatus === "success" ? "Upload Successful!" : "Upload Failed!"}
                    </span>
                  </div>
                  
                  {uploadedFile && uploadStatus === "success" && (
                    <div className="mt-3 text-sm text-green-700">
                      <p><strong>File:</strong> {uploadedFile.name}</p>
                      <p><strong>Size:</strong> {formatFileSize(uploadedFile.size)}</p>
                      <p><strong>Type:</strong> {uploadedFile.type}</p>
                      <p><strong>Last Modified:</strong> {new Date(uploadedFile.lastModified).toLocaleString()}</p>
                    </div>
                  )}
                  
                  {uploadStatus === "error" && (
                    <p className="mt-2 text-sm text-red-700">
                      File upload failed. Please check file size (max 10MB) and format.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Download Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">File Download</CardTitle>
              <CardDescription>
                Download sample files for testing purposes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Download Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <File className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Sample Text File</h3>
                      <p className="text-sm text-gray-600">Plain text file for testing</p>
                    </div>
                  </div>
                  <Button
                    id="downloadButton"
                    onClick={downloadSampleText}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <File className="w-8 h-8 text-green-600" />
                    <div>
                      <h3 className="font-medium">Sample JSON Data</h3>
                      <p className="text-sm text-gray-600">JSON file with sample data</p>
                    </div>
                  </div>
                  <Button
                    id="downloadJsonButton"
                    onClick={downloadSampleJSON}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <File className="w-8 h-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">Sample CSV Data</h3>
                      <p className="text-sm text-gray-600">CSV file with employee data</p>
                    </div>
                  </div>
                  <Button
                    id="downloadCsvButton"
                    onClick={downloadSampleCSV}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Download Instructions */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Download Instructions:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Files will be downloaded to your default download folder</li>
                  <li>• Use these files to test download automation scripts</li>
                  <li>• Verify file existence and content after download</li>
                  <li>• Test different file formats and sizes</li>
                </ul>
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
                <h4 className="font-semibold text-pink-700 mb-2">Upload Element IDs:</h4>
                <ul className="space-y-1 text-pink-600">
                  <li><code>uploadFile</code> - File input element</li>
                  <li>Upload status messages appear dynamically</li>
                  <li>File validation for size and type</li>
                  <li>Success/error feedback display</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-pink-700 mb-2">Download Element IDs:</h4>
                <ul className="space-y-1 text-pink-600">
                  <li><code>downloadButton</code> - Text file download</li>
                  <li><code>downloadJsonButton</code> - JSON file download</li>
                  <li><code>downloadCsvButton</code> - CSV file download</li>
                  <li>Files download to default browser location</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Upload Download Footer" />
        </div>
      </main>
    </div>
  );
}