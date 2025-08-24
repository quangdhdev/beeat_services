"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, CheckSquare, Square } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";
import Link from "next/link";

interface SelectableItem {
  id: string;
  text: string;
  color: string;
  category: string;
}

export default function SelectablePage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState<'single' | 'multiple'>('multiple');

  const items: SelectableItem[] = [
    { id: "item1", text: "JavaScript", color: "bg-yellow-100 border-yellow-300", category: "Language" },
    { id: "item2", text: "Python", color: "bg-blue-100 border-blue-300", category: "Language" },
    { id: "item3", text: "Java", color: "bg-red-100 border-red-300", category: "Language" },
    { id: "item4", text: "React", color: "bg-cyan-100 border-cyan-300", category: "Framework" },
    { id: "item5", text: "Vue", color: "bg-green-100 border-green-300", category: "Framework" },
    { id: "item6", text: "Angular", color: "bg-red-100 border-red-300", category: "Framework" },
    { id: "item7", text: "Node.js", color: "bg-green-100 border-green-300", category: "Runtime" },
    { id: "item8", text: "Docker", color: "bg-blue-100 border-blue-300", category: "Tool" },
    { id: "item9", text: "Git", color: "bg-orange-100 border-orange-300", category: "Tool" },
    { id: "item10", text: "MongoDB", color: "bg-green-100 border-green-300", category: "Database" },
    { id: "item11", text: "PostgreSQL", color: "bg-blue-100 border-blue-300", category: "Database" },
    { id: "item12", text: "Redis", color: "bg-red-100 border-red-300", category: "Database" }
  ];

  const handleItemClick = (itemId: string, event: React.MouseEvent) => {
    if (selectionMode === 'single') {
      setSelectedItems([itemId]);
    } else {
      // Multiple selection mode
      if (event.ctrlKey || event.metaKey) {
        // Ctrl+Click: Toggle individual item
        setSelectedItems(prev => 
          prev.includes(itemId) 
            ? prev.filter(id => id !== itemId)
            : [...prev, itemId]
        );
      } else if (event.shiftKey && selectedItems.length > 0) {
        // Shift+Click: Select range
        const lastSelected = selectedItems[selectedItems.length - 1];
        const lastIndex = items.findIndex(item => item.id === lastSelected);
        const currentIndex = items.findIndex(item => item.id === itemId);
        
        const start = Math.min(lastIndex, currentIndex);
        const end = Math.max(lastIndex, currentIndex);
        
        const rangeItems = items.slice(start, end + 1).map(item => item.id);
        setSelectedItems(prev => [...new Set([...prev, ...rangeItems])]);
      } else {
        // Regular click: Select only this item
        setSelectedItems([itemId]);
      }
    }
  };

  const selectAll = () => {
    setSelectedItems(items.map(item => item.id));
  };

  const selectNone = () => {
    setSelectedItems([]);
  };

  const selectByCategory = (category: string) => {
    const categoryItems = items.filter(item => item.category === category).map(item => item.id);
    setSelectedItems(prev => [...new Set([...prev, ...categoryItems])]);
  };

  const getSelectedByCategory = () => {
    const categories: { [key: string]: number } = {};
    selectedItems.forEach(itemId => {
      const item = items.find(i => i.id === itemId);
      if (item) {
        categories[item.category] = (categories[item.category] || 0) + 1;
      }
    });
    return categories;
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
              <h1 className="text-3xl font-bold text-gray-900">Selectable</h1>
              <p className="text-gray-600 mt-2">Click to select multiple items from a grid or list</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Selectable Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selectable Demo Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold">Selectable Items</CardTitle>
                    <CardDescription>
                      Click items to select them. Use Ctrl+Click for multiple selection, Shift+Click for range selection.
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant={selectionMode === 'single' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectionMode('single')}
                    >
                      Single
                    </Button>
                    <Button
                      variant={selectionMode === 'multiple' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectionMode('multiple')}
                    >
                      Multiple
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Selection Controls */}
                <div className="mb-6 flex flex-wrap gap-2">
                  <Button size="sm" onClick={selectAll} variant="outline">
                    Select All
                  </Button>
                  <Button size="sm" onClick={selectNone} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Clear Selection
                  </Button>
                  <Button size="sm" onClick={() => selectByCategory('Language')} variant="outline">
                    Select Languages
                  </Button>
                  <Button size="sm" onClick={() => selectByCategory('Framework')} variant="outline">
                    Select Frameworks
                  </Button>
                  <Button size="sm" onClick={() => selectByCategory('Tool')} variant="outline">
                    Select Tools
                  </Button>
                </div>

                {/* Selectable Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" id="selectableContainer">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      id={item.id}
                      onClick={(e) => handleItemClick(item.id, e)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedItems.includes(item.id)
                          ? `${item.color} border-blue-500 ring-2 ring-blue-200`
                          : `${item.color} hover:border-gray-400`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-600">{item.category}</span>
                        {selectedItems.includes(item.id) ? (
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Square className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div className="font-medium text-gray-800">{item.text}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selection Status Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Selection Status</CardTitle>
              <CardDescription>
                Current selection information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Selection Summary */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Selection Summary:</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Mode:</span>
                      <span className="font-bold text-blue-800 capitalize">{selectionMode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Selected:</span>
                      <span className="font-bold text-blue-800">{selectedItems.length} / {items.length}</span>
                    </div>
                  </div>
                </div>

                {/* Selected Items */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Selected Items:</h3>
                  <div className="max-h-48 overflow-y-auto">
                    {selectedItems.length > 0 ? (
                      <div className="space-y-1">
                        {selectedItems.map(itemId => {
                          const item = items.find(i => i.id === itemId);
                          return item ? (
                            <div key={itemId} className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded text-sm">
                              <span className="font-medium">{item.text}</span>
                              <span className="text-green-600">{item.category}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No items selected</p>
                    )}
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">By Category:</h3>
                  <div className="space-y-2">
                    {Object.entries(getSelectedByCategory()).map(([category, count]) => (
                      <div key={category} className="flex justify-between p-2 bg-purple-50 border border-purple-200 rounded text-sm">
                        <span className="font-medium">{category}:</span>
                        <span className="text-purple-600">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Instructions:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Click: Select single item</li>
                    <li>• Ctrl+Click: Toggle selection</li>
                    <li>• Shift+Click: Range selection</li>
                    <li>• Use buttons for bulk operations</li>
                  </ul>
                </div>
              </div>
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
                <h4 className="font-semibold text-green-700 mb-2">Selectable Element IDs:</h4>
                <ul className="space-y-1 text-green-600">
                  <li><code>selectableContainer</code> - Main selectable container</li>
                  <li><code>item1</code> through <code>item12</code> - Individual selectable items</li>
                  <li>Selection state tracked in component state</li>
                  <li>Visual feedback with checkboxes and highlighting</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Testing Scenarios:</h4>
                <ul className="space-y-1 text-green-600">
                  <li>• Single vs multiple selection modes</li>
                  <li>• Keyboard modifiers (Ctrl, Shift)</li>
                  <li>• Bulk selection operations</li>
                  <li>• Category-based selection</li>
                  <li>• Visual state verification</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Selectable Footer" />
        </div>
      </main>
    </div>
  );
}