"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Move, Hand } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";
import Link from "next/link";

interface DraggableItem {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  size: 'small' | 'medium' | 'large';
}

export default function DragabblePage() {
  const [items, setItems] = useState<DraggableItem[]>([
    { id: "drag1", text: "Drag Me 1", x: 50, y: 50, color: "bg-blue-100 border-blue-300", size: 'medium' },
    { id: "drag2", text: "Drag Me 2", x: 200, y: 100, color: "bg-green-100 border-green-300", size: 'small' },
    { id: "drag3", text: "Drag Me 3", x: 100, y: 200, color: "bg-purple-100 border-purple-300", size: 'large' },
    { id: "drag4", text: "Drag Me 4", x: 300, y: 150, color: "bg-yellow-100 border-yellow-300", size: 'medium' },
    { id: "drag5", text: "Drag Me 5", x: 150, y: 300, color: "bg-pink-100 border-pink-300", size: 'small' }
  ]);

  const [dragHistory, setDragHistory] = useState<string[]>([]);
  const [activeDrag, setActiveDrag] = useState<string | null>(null);
  const [containerBounds, setContainerBounds] = useState({ width: 600, height: 400 });

  const getSizeClasses = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small': return 'w-20 h-16 text-xs';
      case 'medium': return 'w-24 h-20 text-sm';
      case 'large': return 'w-32 h-24 text-base';
    }
  };

  const handleMouseDown = (e: React.MouseEvent, itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    setActiveDrag(itemId);
    const startX = e.clientX - item.x;
    const startY = e.clientY - item.y;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(0, Math.min(containerBounds.width - 100, e.clientX - startX));
      const newY = Math.max(0, Math.min(containerBounds.height - 80, e.clientY - startY));

      setItems(prev => prev.map(i => 
        i.id === itemId ? { ...i, x: newX, y: newY } : i
      ));
    };

    const handleMouseUp = () => {
      const finalItem = items.find(i => i.id === itemId);
      if (finalItem) {
        setDragHistory(prev => [...prev, `${finalItem.text} moved to (${Math.round(finalItem.x)}, ${Math.round(finalItem.y)})`]);
      }
      setActiveDrag(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const resetPositions = () => {
    setItems([
      { id: "drag1", text: "Drag Me 1", x: 50, y: 50, color: "bg-blue-100 border-blue-300", size: 'medium' },
      { id: "drag2", text: "Drag Me 2", x: 200, y: 100, color: "bg-green-100 border-green-300", size: 'small' },
      { id: "drag3", text: "Drag Me 3", x: 100, y: 200, color: "bg-purple-100 border-purple-300", size: 'large' },
      { id: "drag4", text: "Drag Me 4", x: 300, y: 150, color: "bg-yellow-100 border-yellow-300", size: 'medium' },
      { id: "drag5", text: "Drag Me 5", x: 150, y: 300, color: "bg-pink-100 border-pink-300", size: 'small' }
    ]);
    setDragHistory([]);
  };

  const randomizePositions = () => {
    setItems(prev => prev.map(item => ({
      ...item,
      x: Math.random() * (containerBounds.width - 100),
      y: Math.random() * (containerBounds.height - 80)
    })));
    setDragHistory(prev => [...prev, "All items randomized"]);
  };

  const arrangeInGrid = () => {
    const cols = 3;
    const spacing = 120;
    setItems(prev => prev.map((item, index) => ({
      ...item,
      x: (index % cols) * spacing + 50,
      y: Math.floor(index / cols) * 100 + 50
    })));
    setDragHistory(prev => [...prev, "Items arranged in grid"]);
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
              <h1 className="text-3xl font-bold text-gray-900">Dragabble</h1>
              <p className="text-gray-600 mt-2">Draggable elements that can be moved around the page</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Dragabble Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Draggable Demo Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold">Draggable Elements</CardTitle>
                    <CardDescription>
                      Click and drag the elements to move them around
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={resetPositions}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                    <Button
                      onClick={randomizePositions}
                      variant="outline"
                      size="sm"
                    >
                      Randomize
                    </Button>
                    <Button
                      onClick={arrangeInGrid}
                      variant="outline"
                      size="sm"
                    >
                      Grid
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="relative border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 overflow-hidden"
                  style={{ width: `${containerBounds.width}px`, height: `${containerBounds.height}px` }}
                  id="dragContainer"
                >
                  {/* Grid lines for reference */}
                  <div className="absolute inset-0 opacity-20">
                    {Array.from({ length: Math.floor(containerBounds.width / 50) }).map((_, i) => (
                      <div
                        key={`v-${i}`}
                        className="absolute top-0 bottom-0 w-px bg-gray-300"
                        style={{ left: `${i * 50}px` }}
                      />
                    ))}
                    {Array.from({ length: Math.floor(containerBounds.height / 50) }).map((_, i) => (
                      <div
                        key={`h-${i}`}
                        className="absolute left-0 right-0 h-px bg-gray-300"
                        style={{ top: `${i * 50}px` }}
                      />
                    ))}
                  </div>

                  {/* Draggable Items */}
                  {items.map((item) => (
                    <div
                      key={item.id}
                      id={item.id}
                      className={`absolute border-2 rounded-lg cursor-move transition-all duration-200 hover:shadow-lg flex items-center justify-center font-medium ${
                        item.color
                      } ${
                        getSizeClasses(item.size)
                      } ${
                        activeDrag === item.id ? 'shadow-xl scale-105 z-10' : 'hover:scale-102'
                      }`}
                      style={{
                        left: `${item.x}px`,
                        top: `${item.y}px`,
                        userSelect: 'none'
                      }}
                      onMouseDown={(e) => handleMouseDown(e, item.id)}
                    >
                      <div className="text-center">
                        <Hand className="w-4 h-4 mx-auto mb-1 opacity-60" />
                        <div>{item.text}</div>
                        <div className="text-xs opacity-60 mt-1">
                          ({Math.round(item.x)}, {Math.round(item.y)})
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Instructions overlay */}
                  <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Move className="w-4 h-4" />
                      <span>Click and drag to move items</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Drag Status</CardTitle>
              <CardDescription>
                Current positions and drag history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Currently Dragging */}
                {activeDrag && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Currently Dragging:</h3>
                    <p className="text-blue-700">{items.find(i => i.id === activeDrag)?.text}</p>
                  </div>
                )}

                {/* Current Positions */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Current Positions:</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                        <span className="font-medium">{item.text}</span>
                        <span className="text-gray-600">
                          ({Math.round(item.x)}, {Math.round(item.y)})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drag History */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Drag History:</h3>
                  <div className="max-h-48 overflow-y-auto">
                    {dragHistory.length > 0 ? (
                      <div className="space-y-1">
                        {dragHistory.slice(-8).map((action, index) => (
                          <div key={index} className="text-sm p-2 bg-green-50 border border-green-200 rounded">
                            {action}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No drag actions yet</p>
                    )}
                  </div>
                </div>

                {/* Statistics */}
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Statistics:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-purple-700">Total Items:</span>
                      <span className="font-bold text-purple-800 ml-2">{items.length}</span>
                    </div>
                    <div>
                      <span className="text-purple-700">Drag Actions:</span>
                      <span className="font-bold text-purple-800 ml-2">{dragHistory.length}</span>
                    </div>
                    <div>
                      <span className="text-purple-700">Container:</span>
                      <span className="font-bold text-purple-800 ml-2">{containerBounds.width}×{containerBounds.height}</span>
                    </div>
                    <div>
                      <span className="text-purple-700">Active:</span>
                      <span className="font-bold text-purple-800 ml-2">{activeDrag ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Instructions:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Click and drag items to move them</li>
                    <li>• Items are constrained to the container</li>
                    <li>• Use buttons for quick arrangements</li>
                    <li>• Watch coordinates update in real-time</li>
                  </ul>
                </div>
              </div>
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
                <h4 className="font-semibold text-indigo-700 mb-2">Draggable Element IDs:</h4>
                <ul className="space-y-1 text-indigo-600">
                  <li><code>dragContainer</code> - Main drag area</li>
                  <li><code>drag1</code> through <code>drag5</code> - Individual draggable items</li>
                  <li>Each item has mouse event handlers for dragging</li>
                  <li>Position coordinates updated in real-time</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">Testing Scenarios:</h4>
                <ul className="space-y-1 text-indigo-600">
                  <li>• Drag items to different positions</li>
                  <li>• Test boundary constraints</li>
                  <li>• Verify position updates in status panel</li>
                  <li>• Test arrangement buttons</li>
                  <li>• Check drag visual feedback</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Dragabble Footer" />
        </div>
      </main>
    </div>
  );
}