"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AdBanner } from "@/components/ui/ad-banner";
import { ArrowLeft, ChevronDown, Info } from "lucide-react";
import Link from "next/link";

export default function AccordianPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleAccordionChange = (value: string) => {
    setOpenItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
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
              <h1 className="text-3xl font-bold text-gray-900">Accordian</h1>
              <p className="text-gray-600 mt-2">Collapsible content sections with expand/collapse functionality</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Accordion Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Accordion Demo Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Interactive Accordion</CardTitle>
              <CardDescription>
                Click on the sections below to expand or collapse them
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="section1" id="section1">
                  <AccordionTrigger className="text-left">
                    What is Lorem Ipsum?
                  </AccordionTrigger>
                  <AccordionContent>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="section2" id="section2">
                  <AccordionTrigger className="text-left">
                    Where does it come from?
                  </AccordionTrigger>
                  <AccordionContent>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of 
                    classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, 
                    a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="section3" id="section3">
                  <AccordionTrigger className="text-left">
                    Why do we use it?
                  </AccordionTrigger>
                  <AccordionContent>
                    It is a long established fact that a reader will be distracted by the readable content of a page 
                    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal 
                    distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="section4" id="section4">
                  <AccordionTrigger className="text-left">
                    Where can I get some?
                  </AccordionTrigger>
                  <AccordionContent>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered 
                    alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Accordion Status</CardTitle>
              <CardDescription>
                Monitor which sections are currently expanded
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: "section1", title: "What is Lorem Ipsum?" },
                    { id: "section2", title: "Where does it come from?" },
                    { id: "section3", title: "Why do we use it?" },
                    { id: "section4", title: "Where can I get some?" }
                  ].map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">{section.title}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        openItems.includes(section.id)
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {openItems.includes(section.id) ? "EXPANDED" : "COLLAPSED"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-800">Testing Tips:</span>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Use explicit waits for accordion animations</li>
                    <li>• Verify content visibility after expansion</li>
                    <li>• Test keyboard navigation (Enter/Space)</li>
                    <li>• Check aria-expanded attributes</li>
                  </ul>
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
                <h4 className="font-semibold text-blue-700 mb-2">Accordion Element IDs:</h4>
                <ul className="space-y-1 text-blue-600">
                  <li><code>section1</code> - &quot;What is Lorem Ipsum?&quot; section</li>
                  <li><code>section2</code> - &quot;Where does it come from?&quot; section</li>
                  <li><code>section3</code> - &quot;Why do we use it?&quot; section</li>
                  <li><code>section4</code> - &quot;Where can I get some?&quot; section</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Testing Scenarios:</h4>
                <ul className="space-y-1 text-blue-600">
                  <li>• Single section expand/collapse</li>
                  <li>• Multiple sections open simultaneously</li>
                  <li>• Content visibility verification</li>
                  <li>• Animation state handling</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Accordion Footer" />
        </div>
      </main>
    </div>
  );
}