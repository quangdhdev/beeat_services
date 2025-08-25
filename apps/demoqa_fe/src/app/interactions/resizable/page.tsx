"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Maximize2 } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";
import Link from "next/link";

interface ResizableElement {
  id: string;
  title: string;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
  color: string;
}

export default function ResizablePage() {
  const [elements, setElements] = useState<ResizableElement[]>([
    {
      id: "resizable1",
      title: "Resizable Box 1",
      width: 300,
      height: 200,
      minWidth: 150,
      minHeight: 100,
      maxWidth: 500,
      maxHeight: 400,
      color: "bg-blue-100 border-blue-300"
    },
    {
      id: "resizable2",
      title: "Resizable Box 2",
      width: 250,
      height: 150,
      minWidth: 100,
      minHeight: 80,
      maxWidth: 400,
      maxHeight: 300,
      color: "bg-green-100 border-green-300"
    },
    {
      id: "resizable3",
      title: "Resizable Box 3",
      width: 200,
      height: 180,
      minWidth: 120,
      minHeight: 90,
      maxWidth: 350,
      maxHeight: 250,
      color: "bg-purple-100 border-purple-300"
    }
  ]);

  const [resizeHistory, setResizeHistory] = useState<string[]>([]);
  const [activeResize, setActiveResize] = useState<string | null>(null);

  const updateElementSize = (id: string, newWidth: number, newHeight: number) => {
    setElements(prev => prev.map(el => {
      if (el.id === id) {
        const constrainedWidth = Math.max(el.minWidth, Math.min(el.maxWidth, newWidth));
        const constrainedHeight = Math.max(el.minHeight, Math.min(el.maxHeight, newHeight));
        
        setResizeHistory(prev => [...prev, `${el.title}: ${constrainedWidth}x${constrainedHeight}`]);
        
        return {
          ...el,
          width: constrainedWidth,
          height: constrainedHeight
        };
      }
      return el;
    }));
  };

  const resetSizes = () => {
    setElements([
      {
        id: "resizable1",
        title: "Resizable Box 1",
        width: 300,
        height: 200,
        minWidth: 150,
        minHeight: 100,
        maxWidth: 500,
        maxHeight: 400,
        color: "bg-blue-100 border-blue-300"
      },
      {
        id: "resizable2",
        title: "Resizable Box 2",
        width: 250,
        height: 150,
        minWidth: 100,
        minHeight: 80,
        maxWidth: 400,
        maxHeight: 300,
        color: "bg-green-100 border-green-300"
      },
      {
        id: "resizable3",
        title: "Resizable Box 3",
        width: 200,
        height: 180,
        minWidth: 120,
        minHeight: 90,
        maxWidth: 350,
        maxHeight: 250,
        color: "bg-purple-100 border-purple-300"
      }
    ]);
    setResizeHistory([]);
  };

  const ResizableBox = ({ element }: { element: ResizableElement }) => {
    const [isResizing, setIsResizing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [startSize, setStartSize] = useState({ width: 0, height: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
      setIsResizing(true);
      setActiveResize(element.id);
      setStartPos({ x: e.clientX, y: e.clientY });
      setStartSize({ width: element.width, height: element.height });
      
      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startPos.x;
        const deltaY = e.clientY - startPos.y;
        
        updateElementSize(
          element.id,
          startSize.width + deltaX,
          startSize.height + deltaY
        );
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        setActiveResize(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    return (
      <div
        id={element.id}
        className={`relative border-2 rounded-lg ${element.color} ${
          isResizing ? 'shadow-lg' : 'hover:shadow-md'
        } transition-shadow duration-200`}
        style={{
          width: `${element.width}px`,
          height: `${element.height}px`,
          minWidth: `${element.minWidth}px`,
          minHeight: `${element.minHeight}px`,
          maxWidth: `${element.maxWidth}px`,
          maxHeight: `${element.maxHeight}px`
        }}
      >
        <div className="p-4 h-full flex flex-col">
          <h3 className="font-semibold text-gray-800 mb-2">{element.title}</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Size: {element.width} × {element.height}</div>
            <div>Min: {element.minWidth} × {element.minHeight}</div>
            <div>Max: {element.maxWidth} × {element.maxHeight}</div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Maximize2 className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        
        {/* Resize Handle */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 cursor-se-resize hover:bg-gray-600 transition-colors"
          style={{
            clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)'
          }}
          onMouseDown={handleMouseDown}
        />
        
        {/* Resize indicators */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner indicators */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-gray-300 rounded-full opacity-50" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-gray-300 rounded-full opacity-50" />
          <div className="absolute bottom-1 left-1 w-2 h-2 bg-gray-300 rounded-full opacity-50" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/interactions">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Interactions
              </Button>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Resizable</h1>
              <p className="text-gray-600 mt-2">Resize elements by dragging their edges or corners</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Resizable Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resizable Demo Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold">Resizable Elements</CardTitle>
                    <CardDescription>
                      Drag the bottom-right corner of each box to resize it
                    </CardDescription>
                  </div>
                  <Button
                    onClick={resetSizes}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Sizes
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6" id="resizableContainer">
                  {elements.map((element) => (
                    <ResizableBox key={element.id} element={element} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Resize Status</CardTitle>
              <CardDescription>
                Current sizes and resize history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Current Sizes */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Current Sizes:</h3>
                  <div className="space-y-2">
                    {elements.map((element) => (
                      <div key={element.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-800 mb-1">{element.title}</div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Size: {element.width} × {element.height}</div>
                          <div className="flex justify-between">
                            <span>Width:</span>
                            <span>{element.minWidth} - {element.maxWidth}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Height:</span>
                            <span>{element.minHeight} - {element.maxHeight}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Resize */}
                {activeResize && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Currently Resizing:</h3>
                    <p className="text-blue-700">{elements.find(el => el.id === activeResize)?.title}</p>
                  </div>
                )}

                {/* Resize History */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Resize History:</h3>
                  <div className="max-h-48 overflow-y-auto">
                    {resizeHistory.length > 0 ? (
                      <div className="space-y-1">
                        {resizeHistory.slice(-10).map((action, index) => (
                          <div key={index} className="text-sm p-2 bg-green-50 border border-green-200 rounded">
                            {action}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No resize actions yet</p>
                    )}
                  </div>
                </div>

                {/* Instructions */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Instructions:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Drag the triangle in bottom-right corner</li>
                    <li>• Elements have min/max size constraints</li>
                    <li>• Watch the size display update in real-time</li>
                    <li>• Use reset button to restore original sizes</li>
                  </ul>
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
                <h4 className="font-semibold text-purple-700 mb-2">Resizable Element IDs:</h4>
                <ul className="space-y-1 text-purple-600">
                  <li><code>resizableContainer</code> - Main container</li>
                  <li><code>resizable1</code> - First resizable box</li>
                  <li><code>resizable2</code> - Second resizable box</li>
                  <li><code>resizable3</code> - Third resizable box</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">Testing Scenarios:</h4>
                <ul className="space-y-1 text-purple-600">
                  <li>• Drag resize handles to change size</li>
                  <li>• Test min/max size constraints</li>
                  <li>• Verify size updates in status panel</li>
                  <li>• Test reset functionality</li>
                  <li>• Check visual feedback during resize</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Resizable Footer" />
        </div>
      </main>
    </div>
  );
}