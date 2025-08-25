"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AdBanner } from "@/components/ui/ad-banner";
import { ArrowLeft, ChevronRight, ChevronDown, Folder, FolderOpen, File } from "lucide-react";
import Link from "next/link";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  isExpanded?: boolean;
}

export default function CheckBoxPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<string[]>(["home"]);

  const treeData: TreeNode[] = [
    {
      id: "home",
      label: "Home",
      children: [
        {
          id: "desktop",
          label: "Desktop",
          children: [
            { id: "notes", label: "Notes" },
            { id: "commands", label: "Commands" }
          ]
        },
        {
          id: "documents",
          label: "Documents",
          children: [
            { id: "workspace", label: "WorkSpace", children: [
              { id: "react", label: "React" },
              { id: "angular", label: "Angular" },
              { id: "veu", label: "Veu" }
            ]},
            { id: "office", label: "Office", children: [
              { id: "public", label: "Public" },
              { id: "private", label: "Private" },
              { id: "classified", label: "Classified" },
              { id: "general", label: "General" }
            ]}
          ]
        },
        {
          id: "downloads",
          label: "Downloads",
          children: [
            { id: "word-file", label: "Word File.doc" },
            { id: "excel-file", label: "Excel File.doc" }
          ]
        }
      ]
    }
  ];

  const toggleExpanded = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const handleCheckboxChange = (nodeId: string, checked: boolean) => {
    const getAllChildIds = (node: TreeNode): string[] => {
      const ids = [node.id];
      if (node.children) {
        node.children.forEach(child => {
          ids.push(...getAllChildIds(child));
        });
      }
      return ids;
    };

    const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findNodeById(node.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const node = findNodeById(treeData, nodeId);
    if (!node) return;

    const childIds = getAllChildIds(node);

    if (checked) {
      setSelectedItems(prev => Array.from(new Set([...prev, ...childIds])));
    } else {
      setSelectedItems(prev => prev.filter(id => !childIds.includes(id)));
    }
  };

  const isChecked = (nodeId: string) => selectedItems.includes(nodeId);

  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.includes(node.id);
    const checked = isChecked(node.id);

    return (
      <div key={node.id} className="select-none">
        <div 
          className="flex items-center py-1 hover:bg-gray-50 rounded"
          style={{ paddingLeft: `${level * 20 + 8}px` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(node.id)}
              className="mr-1 p-1 hover:bg-gray-200 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          
          {!hasChildren && <div className="w-6" />}
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id={node.id}
              checked={checked}
              onCheckedChange={(checked) => handleCheckboxChange(node.id, !!checked)}
            />
            
            <div className="flex items-center space-x-1">
              {hasChildren ? (
                isExpanded ? (
                  <FolderOpen className="w-4 h-4 text-blue-500" />
                ) : (
                  <Folder className="w-4 h-4 text-blue-500" />
                )
              ) : (
                <File className="w-4 h-4 text-gray-500" />
              )}
              
              <Label 
                htmlFor={node.id}
                className="cursor-pointer text-sm font-medium"
              >
                {node.label}
              </Label>
            </div>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
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
              <h1 className="text-3xl font-bold text-gray-900">Check Box</h1>
              <p className="text-gray-600 mt-2">Practice with checkbox selections and tree structures</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Check Box Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tree Checkbox Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">File System Tree</CardTitle>
              <CardDescription>
                Select files and folders using the checkbox tree structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                {treeData.map(node => renderTreeNode(node))}
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Selected Items</CardTitle>
              <CardDescription>
                Items you have selected will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedItems.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-4">
                    You have selected {selectedItems.length} item(s):
                  </p>
                  <div className="max-h-64 overflow-y-auto">
                    {selectedItems.map(item => (
                      <div 
                        key={item}
                        className="flex items-center space-x-2 p-2 bg-green-50 border border-green-200 rounded text-sm"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>No items selected</p>
                  <p className="text-sm mt-2">Select checkboxes from the tree to see them here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Simple Checkboxes Section */}
        <Card className="mt-8 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Simple Checkboxes</CardTitle>
            <CardDescription>
              Basic checkbox examples for automation testing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Programming Languages</h3>
                <div className="space-y-3">
                  {["JavaScript", "Python", "Java", "C#"].map(lang => (
                    <div key={lang} className="flex items-center space-x-2">
                      <Checkbox id={`lang-${lang.toLowerCase()}`} />
                      <Label htmlFor={`lang-${lang.toLowerCase()}`} className="text-sm">
                        {lang}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Frameworks</h3>
                <div className="space-y-3">
                  {["React", "Angular", "Vue", "Svelte"].map(framework => (
                    <div key={framework} className="flex items-center space-x-2">
                      <Checkbox id={`framework-${framework.toLowerCase()}`} />
                      <Label htmlFor={`framework-${framework.toLowerCase()}`} className="text-sm">
                        {framework}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Tools</h3>
                <div className="space-y-3">
                  {["Git", "Docker", "Kubernetes", "Jenkins"].map(tool => (
                    <div key={tool} className="flex items-center space-x-2">
                      <Checkbox id={`tool-${tool.toLowerCase()}`} />
                      <Label htmlFor={`tool-${tool.toLowerCase()}`} className="text-sm">
                        {tool}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testing Information */}
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-green-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Tree Checkbox Features:</h4>
                <ul className="space-y-1 text-green-600">
                  <li>• Hierarchical checkbox selection</li>
                  <li>• Parent-child relationship handling</li>
                  <li>• Expandable/collapsible nodes</li>
                  <li>• Dynamic state management</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Simple Checkbox IDs:</h4>
                <ul className="space-y-1 text-green-600">
                  <li>• <code>lang-*</code> - Programming language checkboxes</li>
                  <li>• <code>framework-*</code> - Framework checkboxes</li>
                  <li>• <code>tool-*</code> - Tool checkboxes</li>
                  <li>• Tree nodes use their respective IDs</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Check Box Footer" />
        </div>
      </main>
    </div>
  );
}