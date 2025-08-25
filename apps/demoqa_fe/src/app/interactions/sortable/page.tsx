"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/ui/ad-banner";
import { ArrowLeft, GripVertical, RotateCcw } from "lucide-react";
import Link from "next/link";

interface SortableItem {
  id: string;
  text: string;
  color: string;
}

export default function SortablePage() {
  const [items, setItems] = useState<SortableItem[]>([
    { id: "item1", text: "Item One", color: "bg-blue-100 border-blue-300" },
    { id: "item2", text: "Item Two", color: "bg-green-100 border-green-300" },
    { id: "item3", text: "Item Three", color: "bg-yellow-100 border-yellow-300" },
    { id: "item4", text: "Item Four", color: "bg-purple-100 border-purple-300" },
    { id: "item5", text: "Item Five", color: "bg-pink-100 border-pink-300" },
    { id: "item6", text: "Item Six", color: "bg-indigo-100 border-indigo-300" }
  ]);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [sortHistory, setSortHistory] = useState<string[]>([]);

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = items.findIndex(item => item.id === draggedItem);
    const targetIndex = items.findIndex(item => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newItems = [...items];
    const [draggedItemData] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItemData);

    setItems(newItems);
    setSortHistory(prev => [...prev, `Moved ${draggedItemData.text} to position ${targetIndex + 1}`]);
    setDraggedItem(null);
  };

  const resetOrder = () => {
    const originalOrder: SortableItem[] = [
      { id: "item1", text: "Item One", color: "bg-blue-100 border-blue-300" },
      { id: "item2", text: "Item Two", color: "bg-green-100 border-green-300" },
      { id: "item3", text: "Item Three", color: "bg-yellow-100 border-yellow-300" },
      { id: "item4", text: "Item Four", color: "bg-purple-100 border-purple-300" },
      { id: "item5", text: "Item Five", color: "bg-pink-100 border-pink-300" },
      { id: "item6", text: "Item Six", color: "bg-indigo-100 border-indigo-300" }
    ];
    setItems(originalOrder);
    setSortHistory([]);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    setItems(newItems);
    setSortHistory(prev => [...prev, `Moved ${newItems[index - 1].text} up`]);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setItems(newItems);
    setSortHistory(prev => [...prev, `Moved ${newItems[index + 1].text} down`]);
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
              <h1 className="text-3xl font-bold text-gray-900">Sortable</h1>
              <p className="text-gray-600 mt-2">Drag and drop to reorder items in a list</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Sortable Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sortable Demo Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-semibold">Sortable List</CardTitle>
                  <CardDescription>
                    Drag items to reorder them or use the arrow buttons
                  </CardDescription>
                </div>
                <Button
                  onClick={resetOrder}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2" id="sortableList">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    id={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, item.id)}
                    className={`p-4 border-2 rounded-lg cursor-move transition-all duration-200 hover:shadow-md ${item.color} ${
                      draggedItem === item.id ? 'opacity-50 scale-95' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <GripVertical className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">{item.text}</span>
                        <span className="text-sm text-gray-500">Position: {index + 1}</span>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          className="px-2 py-1 text-xs"
                        >
                          ↑
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveDown(index)}
                          disabled={index === items.length - 1}
                          className="px-2 py-1 text-xs"
                        >
                          ↓
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Sort Status</CardTitle>
              <CardDescription>
                Current order and sorting history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Current Order */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Current Order:</h3>
                  <div className="space-y-2">
                    {items.map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-medium">{index + 1}. {item.text}</span>
                        <span className="text-sm text-gray-500">{item.id}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sort History */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Sort History:</h3>
                  <div className="max-h-48 overflow-y-auto">
                    {sortHistory.length > 0 ? (
                      <div className="space-y-1">
                        {sortHistory.slice(-10).map((action, index) => (
                          <div key={index} className="text-sm p-2 bg-blue-50 border border-blue-200 rounded">
                            {action}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No sorting actions yet</p>
                    )}
                  </div>
                </div>

                {/* Statistics */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Statistics:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-700">Total Items:</span>
                      <span className="font-bold text-green-800 ml-2">{items.length}</span>
                    </div>
                    <div>
                      <span className="text-green-700">Sort Actions:</span>
                      <span className="font-bold text-green-800 ml-2">{sortHistory.length}</span>
                    </div>
                  </div>
                </div>
              </div>
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
                <h4 className="font-semibold text-blue-700 mb-2">Sortable Element IDs:</h4>
                <ul className="space-y-1 text-blue-600">
                  <li><code>sortableList</code> - Main sortable container</li>
                  <li><code>item1</code> through <code>item6</code> - Individual sortable items</li>
                  <li>Each item has drag and drop event handlers</li>
                  <li>Arrow buttons for keyboard-accessible sorting</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Testing Scenarios:</h4>
                <ul className="space-y-1 text-blue-600">
                  <li>• Drag and drop items to reorder</li>
                  <li>• Use arrow buttons for precise positioning</li>
                  <li>• Verify order changes in status panel</li>
                  <li>• Test reset functionality</li>
                  <li>• Check drag visual feedback</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Sortable Footer" />
        </div>
      </main>
    </div>
  );
}