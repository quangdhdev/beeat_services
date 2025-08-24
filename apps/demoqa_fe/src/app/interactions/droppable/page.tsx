"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Target, Package } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";
import Link from "next/link";

interface DroppableItem {
  id: string;
  text: string;
  color: string;
  type: string;
}

interface DropZone {
  id: string;
  title: string;
  acceptedTypes: string[];
  items: DroppableItem[];
  color: string;
}

export default function DroppablePage() {
  const [draggedItem, setDraggedItem] = useState<DroppableItem | null>(null);
  const [dropHistory, setDropHistory] = useState<string[]>([]);

  const [availableItems, setAvailableItems] = useState<DroppableItem[]>([
    { id: "item1", text: "Document.pdf", color: "bg-red-100 border-red-300", type: "document" },
    { id: "item2", text: "Image.jpg", color: "bg-blue-100 border-blue-300", type: "image" },
    { id: "item3", text: "Video.mp4", color: "bg-purple-100 border-purple-300", type: "video" },
    { id: "item4", text: "Audio.mp3", color: "bg-green-100 border-green-300", type: "audio" },
    { id: "item5", text: "Archive.zip", color: "bg-yellow-100 border-yellow-300", type: "archive" },
    { id: "item6", text: "Spreadsheet.xlsx", color: "bg-orange-100 border-orange-300", type: "document" }
  ]);

  const [dropZones, setDropZones] = useState<DropZone[]>([
    {
      id: "documents",
      title: "Documents",
      acceptedTypes: ["document"],
      items: [],
      color: "bg-blue-50 border-blue-300"
    },
    {
      id: "media",
      title: "Media Files",
      acceptedTypes: ["image", "video", "audio"],
      items: [],
      color: "bg-green-50 border-green-300"
    },
    {
      id: "archives",
      title: "Archives",
      acceptedTypes: ["archive"],
      items: [],
      color: "bg-yellow-50 border-yellow-300"
    },
    {
      id: "trash",
      title: "Trash",
      acceptedTypes: ["document", "image", "video", "audio", "archive"],
      items: [],
      color: "bg-red-50 border-red-300"
    }
  ]);

  const handleDragStart = (e: React.DragEvent, item: DroppableItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id);
  };

  const handleDragOver = (e: React.DragEvent, zone: DropZone) => {
    e.preventDefault();
    if (draggedItem && zone.acceptedTypes.includes(draggedItem.type)) {
      e.dataTransfer.dropEffect = "move";
    } else {
      e.dataTransfer.dropEffect = "none";
    }
  };

  const handleDrop = (e: React.DragEvent, targetZone: DropZone) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    // Check if the drop zone accepts this type of item
    if (!targetZone.acceptedTypes.includes(draggedItem.type)) {
      setDropHistory(prev => [...prev, `❌ Cannot drop ${draggedItem.text} in ${targetZone.title} (wrong type)`]);
      setDraggedItem(null);
      return;
    }

    // Remove item from available items or other drop zones
    setAvailableItems(prev => prev.filter(item => item.id !== draggedItem.id));
    setDropZones(prev => prev.map(zone => ({
      ...zone,
      items: zone.items.filter(item => item.id !== draggedItem.id)
    })));

    // Add item to target zone
    setDropZones(prev => prev.map(zone => 
      zone.id === targetZone.id 
        ? { ...zone, items: [...zone.items, draggedItem] }
        : zone
    ));

    setDropHistory(prev => [...prev, `✅ Dropped ${draggedItem.text} in ${targetZone.title}`]);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const resetItems = () => {
    setAvailableItems([
      { id: "item1", text: "Document.pdf", color: "bg-red-100 border-red-300", type: "document" },
      { id: "item2", text: "Image.jpg", color: "bg-blue-100 border-blue-300", type: "image" },
      { id: "item3", text: "Video.mp4", color: "bg-purple-100 border-purple-300", type: "video" },
      { id: "item4", text: "Audio.mp3", color: "bg-green-100 border-green-300", type: "audio" },
      { id: "item5", text: "Archive.zip", color: "bg-yellow-100 border-yellow-300", type: "archive" },
      { id: "item6", text: "Spreadsheet.xlsx", color: "bg-orange-100 border-orange-300", type: "document" }
    ]);
    setDropZones(prev => prev.map(zone => ({ ...zone, items: [] })));
    setDropHistory([]);
  };

  const DroppableZone = ({ zone }: { zone: DropZone }) => {
    const isValidDrop = draggedItem && zone.acceptedTypes.includes(draggedItem.type);
    
    return (
      <div
        id={zone.id}
        onDragOver={(e) => handleDragOver(e, zone)}
        onDrop={(e) => handleDrop(e, zone)}
        className={`min-h-[200px] p-4 border-2 border-dashed rounded-lg transition-all duration-200 ${
          zone.color
        } ${
          draggedItem 
            ? isValidDrop 
              ? 'border-green-500 bg-green-100' 
              : 'border-red-500 bg-red-100'
            : 'hover:border-gray-400'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Target className="w-5 h-5" />
            {zone.title}
          </h3>
          <span className="text-sm text-gray-600">
            {zone.items.length} item{zone.items.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="text-xs text-gray-500 mb-3">
          Accepts: {zone.acceptedTypes.join(", ")}
        </div>

        <div className="space-y-2">
          {zone.items.length > 0 ? (
            zone.items.map(item => (
              <div
                key={item.id}
                className={`p-2 border rounded ${item.color} flex items-center gap-2`}
              >
                <Package className="w-4 h-4" />
                <span className="text-sm font-medium">{item.text}</span>
                <span className="text-xs text-gray-500 ml-auto">{item.type}</span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Drop items here</p>
            </div>
          )}
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
              <h1 className="text-3xl font-bold text-gray-900">Droppable</h1>
              <p className="text-gray-600 mt-2">Drop target areas for drag and drop operations</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Droppable Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Items */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-semibold">Available Items</CardTitle>
                  <CardDescription>
                    Drag these items to the drop zones
                  </CardDescription>
                </div>
                <Button
                  onClick={resetItems}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3" id="availableItems">
                {availableItems.map(item => (
                  <div
                    key={item.id}
                    id={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragEnd={handleDragEnd}
                    className={`p-3 border-2 rounded-lg cursor-move transition-all duration-200 hover:shadow-md ${
                      item.color
                    } ${
                      draggedItem?.id === item.id ? 'opacity-50 scale-95' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      <span className="font-medium">{item.text}</span>
                      <span className="text-xs text-gray-500 ml-auto bg-white px-2 py-1 rounded">
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))}
                
                {availableItems.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">All items have been moved</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Drop Zones */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dropZones.map(zone => (
                <DroppableZone key={zone.id} zone={zone} />
              ))}
            </div>

            {/* Drop History */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Drop History</CardTitle>
                <CardDescription>
                  Recent drop operations and their results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-48 overflow-y-auto">
                  {dropHistory.length > 0 ? (
                    <div className="space-y-2">
                      {dropHistory.slice(-10).map((action, index) => (
                        <div 
                          key={index} 
                          className={`text-sm p-2 rounded ${
                            action.startsWith('✅') 
                              ? 'bg-green-50 border border-green-200 text-green-800'
                              : 'bg-red-50 border border-red-200 text-red-800'
                          }`}
                        >
                          {action}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm text-center py-4">No drop actions yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testing Information */}
        <Card className="mt-8 bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-orange-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Droppable Element IDs:</h4>
                <ul className="space-y-1 text-orange-600">
                  <li><code>availableItems</code> - Source items container</li>
                  <li><code>documents</code> - Documents drop zone</li>
                  <li><code>media</code> - Media files drop zone</li>
                  <li><code>archives</code> - Archives drop zone</li>
                  <li><code>trash</code> - Trash drop zone (accepts all)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Testing Scenarios:</h4>
                <ul className="space-y-1 text-orange-600">
                  <li>• Drag items to compatible drop zones</li>
                  <li>• Test invalid drops (wrong type)</li>
                  <li>• Verify visual feedback during drag</li>
                  <li>• Check drop history logging</li>
                  <li>• Test reset functionality</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Droppable Footer" />
        </div>
      </main>
    </div>
  );
}