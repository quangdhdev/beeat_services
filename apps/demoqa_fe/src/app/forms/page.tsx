"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdBanner } from "@/components/ui/ad-banner";
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, BookOpen } from "lucide-react";
import Link from "next/link";

export default function FormsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    mobile: "",
    dateOfBirth: "",
    subjects: "",
    hobbies: [] as string[],
    picture: "",
    currentAddress: "",
    state: "",
    city: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleHobbyChange = (hobby: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, hobbies: [...prev.hobbies, hobby] }));
    } else {
      setFormData(prev => ({ ...prev, hobbies: prev.hobbies.filter(h => h !== hobby) }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Practice Form</h1>
              <p className="text-gray-600 mt-2">Comprehensive form with various input types and validation</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Forms Banner" />
        </div>
        
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Student Registration Form</CardTitle>
            <CardDescription>
              Fill out this practice form to test various input types and form validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="userEmail" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </Label>
                <Input
                  id="userEmail"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Gender */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Gender *</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="gender-male" />
                    <Label htmlFor="gender-male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="gender-female" />
                    <Label htmlFor="gender-female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="gender-other" />
                    <Label htmlFor="gender-other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <Label htmlFor="userNumber" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile *
                </Label>
                <Input
                  id="userNumber"
                  type="tel"
                  placeholder="1234567890"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirthInput" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirthInput"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>

              {/* Subjects */}
              <div className="space-y-2">
                <Label htmlFor="subjectsInput" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Subjects
                </Label>
                <Input
                  id="subjectsInput"
                  type="text"
                  placeholder="Math, Physics, Chemistry"
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                />
              </div>

              {/* Hobbies */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Hobbies</Label>
                <div className="flex flex-wrap gap-4">
                  {["Sports", "Reading", "Music"].map((hobby) => (
                    <div key={hobby} className="flex items-center space-x-2">
                      <Checkbox
                        id={`hobbies-${hobby.toLowerCase()}`}
                        checked={formData.hobbies.includes(hobby)}
                        onCheckedChange={(checked) => handleHobbyChange(hobby, !!checked)}
                      />
                      <Label htmlFor={`hobbies-${hobby.toLowerCase()}`}>{hobby}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Picture Upload */}
              <div className="space-y-2">
                <Label htmlFor="uploadPicture">Picture</Label>
                <Input
                  id="uploadPicture"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, picture: e.target.files?.[0]?.name || "" })}
                />
              </div>

              {/* Current Address */}
              <div className="space-y-2">
                <Label htmlFor="currentAddress" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Current Address
                </Label>
                <Textarea
                  id="currentAddress"
                  placeholder="Current Address"
                  value={formData.currentAddress}
                  onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              {/* State and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NCR">NCR</SelectItem>
                      <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="Haryana">Haryana</SelectItem>
                      <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Gurgaon">Gurgaon</SelectItem>
                      <SelectItem value="Noida">Noida</SelectItem>
                      <SelectItem value="Agra">Agra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                  Submit
                </Button>
              </div>
            </form>

            {/* Submission Result */}
            {submitted && (
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Thanks for submitting the form</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Student Name:</strong> {formData.firstName} {formData.lastName}</div>
                  <div><strong>Student Email:</strong> {formData.email}</div>
                  <div><strong>Gender:</strong> {formData.gender}</div>
                  <div><strong>Mobile:</strong> {formData.mobile}</div>
                  <div><strong>Date of Birth:</strong> {formData.dateOfBirth}</div>
                  <div><strong>Subjects:</strong> {formData.subjects}</div>
                  <div><strong>Hobbies:</strong> {formData.hobbies.join(", ")}</div>
                  <div><strong>Picture:</strong> {formData.picture || "No file selected"}</div>
                  <div><strong>Address:</strong> {formData.currentAddress}</div>
                  <div><strong>State and City:</strong> {formData.state} {formData.city}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Forms Footer" />
        </div>
      </main>
    </div>
  );
}