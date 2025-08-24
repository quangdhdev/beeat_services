"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar";
import { ArrowLeft, Menu, ChevronRight, File, Edit, Save, Copy, Cast as Paste, Settings, User, LogOut } from "lucide-react";
import Link from "next/link";
import { AdBanner } from "@/components/ui/ad-banner";

export default function MenuPage() {
  const [selectedAction, setSelectedAction] = useState("");
  const [menubarAction, setMenubarAction] = useState("");

  const handleMenuAction = (action: string) => {
    setSelectedAction(action);
  };

  const handleMenubarAction = (action: string) => {
    setMenubarAction(action);
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
              <h1 className="text-3xl font-bold text-gray-900">Menu</h1>
              <p className="text-gray-600 mt-2">Hierarchical dropdown menu with nested options</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Menu Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Menu Demo Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Interactive Menus</CardTitle>
              <CardDescription>
                Click on the menu buttons to see different menu styles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Dropdown Menu */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dropdown Menu</h3>
                <div className="flex flex-wrap gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button id="dropdownMenuButton" variant="outline" className="flex items-center gap-2">
                        <Menu className="w-4 h-4" />
                        Actions Menu
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleMenuAction("profile")}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMenuAction("settings")}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <File className="mr-2 h-4 w-4" />
                          <span>File Operations</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => handleMenuAction("new-file")}>
                            <File className="mr-2 h-4 w-4" />
                            <span>New File</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMenuAction("open-file")}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Open File</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMenuAction("save-file")}>
                            <Save className="mr-2 h-4 w-4" />
                            <span>Save File</span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => handleMenuAction("copy")}>
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Copy</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMenuAction("paste")}>
                            <Paste className="mr-2 h-4 w-4" />
                            <span>Paste</span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleMenuAction("logout")}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Menu Bar */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Menu Bar</h3>
                <Menubar className="w-fit">
                  <MenubarMenu>
                    <MenubarTrigger id="fileMenu">File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem onClick={() => handleMenubarAction("new")}>
                        New <span className="ml-auto text-xs">Ctrl+N</span>
                      </MenubarItem>
                      <MenubarItem onClick={() => handleMenubarAction("open")}>
                        Open <span className="ml-auto text-xs">Ctrl+O</span>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarSub>
                        <MenubarSubTrigger>Recent Files</MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem onClick={() => handleMenubarAction("recent-1")}>Document1.txt</MenubarItem>
                          <MenubarItem onClick={() => handleMenubarAction("recent-2")}>Spreadsheet.xlsx</MenubarItem>
                          <MenubarItem onClick={() => handleMenubarAction("recent-3")}>Presentation.pptx</MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                      <MenubarSeparator />
                      <MenubarItem onClick={() => handleMenubarAction("save")}>
                        Save <span className="ml-auto text-xs">Ctrl+S</span>
                      </MenubarItem>
                      <MenubarItem onClick={() => handleMenubarAction("save-as")}>
                        Save As... <span className="ml-auto text-xs">Ctrl+Shift+S</span>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  
                  <MenubarMenu>
                    <MenubarTrigger id="editMenu">Edit</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem onClick={() => handleMenubarAction("undo")}>
                        Undo <span className="ml-auto text-xs">Ctrl+Z</span>
                      </MenubarItem>
                      <MenubarItem onClick={() => handleMenubarAction("redo")}>
                        Redo <span className="ml-auto text-xs">Ctrl+Y</span>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem onClick={() => handleMenubarAction("cut")}>
                        Cut <span className="ml-auto text-xs">Ctrl+X</span>
                      </MenubarItem>
                      <MenubarItem onClick={() => handleMenubarAction("copy")}>
                        Copy <span className="ml-auto text-xs">Ctrl+C</span>
                      </MenubarItem>
                      <MenubarItem onClick={() => handleMenubarAction("paste")}>
                        Paste <span className="ml-auto text-xs">Ctrl+V</span>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  
                  <MenubarMenu>
                    <MenubarTrigger id="viewMenu">View</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem onClick={() => handleMenubarAction("zoom-in")}>
                        Zoom In <span className="ml-auto text-xs">Ctrl++</span>
                      </MenubarItem>
                      <MenubarItem onClick={() => handleMenubarAction("zoom-out")}>
                        Zoom Out <span className="ml-auto text-xs">Ctrl+-</span>
                      </MenubarItem>
                      <MenubarItem onClick={() => handleMenubarAction("zoom-reset")}>
                        Reset Zoom <span className="ml-auto text-xs">Ctrl+0</span>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarSub>
                        <MenubarSubTrigger>Layout</MenubarSubTrigger>
                        <MenubarSubContent>
                          <MenubarItem onClick={() => handleMenubarAction("layout-grid")}>Grid View</MenubarItem>
                          <MenubarItem onClick={() => handleMenubarAction("layout-list")}>List View</MenubarItem>
                          <MenubarItem onClick={() => handleMenubarAction("layout-card")}>Card View</MenubarItem>
                        </MenubarSubContent>
                      </MenubarSub>
                    </MenubarContent>
                  </MenubarMenu>
                  
                  <MenubarMenu>
                    <MenubarTrigger id="helpMenu">Help</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem onClick={() => handleMenubarAction("documentation")}>Documentation</MenubarItem>
                      <MenubarItem onClick={() => handleMenubarAction("shortcuts")}>Keyboard Shortcuts</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem onClick={() => handleMenubarAction("about")}>About</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>

              {/* Context Menu Simulation */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Context Menu Area</h3>
                <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50">
                  <p className="text-gray-600 mb-4">Right-click in this area to see a context menu</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button id="contextMenuButton" variant="outline">
                        Show Context Menu
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleMenuAction("inspect")}>
                        Inspect Element
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMenuAction("copy-text")}>
                        Copy Text
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleMenuAction("select-all")}>
                        Select All
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMenuAction("refresh")}>
                        Refresh
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Menu Actions</CardTitle>
              <CardDescription>
                Selected menu actions will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Dropdown Menu Actions */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Dropdown Menu Action:</h3>
                  <p id="dropdownMenuResult" className="text-blue-700">
                    {selectedAction || "No action selected"}
                  </p>
                </div>

                {/* Menu Bar Actions */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Menu Bar Action:</h3>
                  <p id="menubarResult" className="text-green-700">
                    {menubarAction || "No action selected"}
                  </p>
                </div>

                {/* Menu Structure */}
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Menu Structure:</h3>
                  <div className="text-sm text-purple-700 space-y-2">
                    <div className="font-medium">Dropdown Menu:</div>
                    <ul className="ml-4 space-y-1">
                      <li>• My Account (Label)</li>
                      <li>• Profile, Settings (Items)</li>
                      <li>• File Operations (Submenu)</li>
                      <li>• Edit (Submenu)</li>
                      <li>• Log out (Item)</li>
                    </ul>
                    
                    <div className="font-medium mt-3">Menu Bar:</div>
                    <ul className="ml-4 space-y-1">
                      <li>• File (New, Open, Recent Files, Save)</li>
                      <li>• Edit (Undo, Redo, Cut, Copy, Paste)</li>
                      <li>• View (Zoom, Layout options)</li>
                      <li>• Help (Documentation, About)</li>
                    </ul>
                  </div>
                </div>

                {/* Menu Statistics */}
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Menu Statistics:</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-orange-700">Dropdown Actions:</span>
                      <span className="font-bold text-orange-800 ml-2">
                        {selectedAction ? 1 : 0}
                      </span>
                    </div>
                    <div>
                      <span className="text-orange-700">Menubar Actions:</span>
                      <span className="font-bold text-orange-800 ml-2">
                        {menubarAction ? 1 : 0}
                      </span>
                    </div>
                    <div>
                      <span className="text-orange-700">Total Menus:</span>
                      <span className="font-bold text-orange-800 ml-2">5</span>
                    </div>
                    <div>
                      <span className="text-orange-700">Submenus:</span>
                      <span className="font-bold text-orange-800 ml-2">4</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testing Information */}
        <Card className="mt-8 bg-teal-50 border-teal-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-teal-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-teal-700 mb-2">Menu Element IDs:</h4>
                <ul className="space-y-1 text-teal-600">
                  <li><code>dropdownMenuButton</code> - Main dropdown trigger</li>
                  <li><code>fileMenu</code> - File menu trigger</li>
                  <li><code>editMenu</code> - Edit menu trigger</li>
                  <li><code>viewMenu</code> - View menu trigger</li>
                  <li><code>helpMenu</code> - Help menu trigger</li>
                  <li><code>contextMenuButton</code> - Context menu trigger</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-teal-700 mb-2">Result Element IDs:</h4>
                <ul className="space-y-1 text-teal-600">
                  <li><code>dropdownMenuResult</code> - Dropdown action result</li>
                  <li><code>menubarResult</code> - Menubar action result</li>
                  <li>Menu items trigger onClick events</li>
                  <li>Submenus expand on hover/click</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Menu Footer" />
        </div>
      </main>
    </div>
  );
}