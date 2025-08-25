"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Book, Trash2, Edit, Save, X } from "lucide-react";
import Link from "next/link";
import { AdBanner } from "@/components/ui/ad-banner";

interface UserProfile {
  userId: string;
  username: string;
  books: Book[];
}

interface Book {
  isbn: string;
  title: string;
  subTitle: string;
  author: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    username: "testuser"
  });

  const [userProfile] = useState<UserProfile>({
    userId: "12345-67890-abcde-fghij",
    username: "testuser",
    books: [
      {
        isbn: "9781449325862",
        title: "Git Pocket Guide",
        subTitle: "A Working Introduction",
        author: "Richard E. Silverman",
        publisher: "O'Reilly Media",
        pages: 234,
        description: "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system.",
        website: "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
      },
      {
        isbn: "9781449331818",
        title: "Learning JavaScript Design Patterns",
        subTitle: "A JavaScript and jQuery Developer's Guide",
        author: "Addy Osmani",
        publisher: "O'Reilly Media",
        pages: 254,
        description: "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript.",
        website: "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/"
      }
    ]
  });

  const [books, setBooks] = useState(userProfile.books);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real app, this would make an API call to update the profile
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to original values
    setProfileData({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "testuser"
    });
  };

  const handleRemoveBook = (isbn: string) => {
    setBooks(books.filter(book => book.isbn !== isbn));
  };

  const handleDeleteAllBooks = () => {
    setBooks([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/book-store">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Book Store
              </Button>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
              <p className="text-gray-600 mt-2">Manage your account and book collection</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Profile Banner" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Your account details and settings
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">First Name</Label>
                      <p className="text-gray-900">{profileData.firstName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Last Name</Label>
                      <p className="text-gray-900">{profileData.lastName}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Email</Label>
                    <p className="text-gray-900">{profileData.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Username</Label>
                    <p className="text-gray-900">{profileData.username}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">User ID</Label>
                    <p className="text-gray-900 text-sm font-mono">{userProfile.userId}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Book Collection */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                      <Book className="w-5 h-5" />
                      My Book Collection
                    </CardTitle>
                    <CardDescription>
                      Books you&apos;ve added to your personal library
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      {books.length} book{books.length !== 1 ? 's' : ''}
                    </span>
                    {books.length > 0 && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDeleteAllBooks}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete All
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {books.length > 0 ? (
                  <div className="space-y-4">
                    {books.map((book) => (
                      <div key={book.isbn} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900">{book.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">{book.subTitle}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                              <div><strong>Author:</strong> {book.author}</div>
                              <div><strong>Publisher:</strong> {book.publisher}</div>
                              <div><strong>Pages:</strong> {book.pages}</div>
                              <div><strong>ISBN:</strong> {book.isbn}</div>
                            </div>
                            <p className="text-gray-700 text-sm mt-2 line-clamp-2">{book.description}</p>
                            {book.website && (
                              <a 
                                href={book.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm underline mt-1 inline-block"
                              >
                                Visit Website
                              </a>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveBook(book.isbn)}
                            className="ml-4 flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No books in your collection</h3>
                    <p className="text-gray-500 mb-4">Start building your library by adding books from the store</p>
                    <Link href="/book-store/books">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Browse Books
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Account Actions</CardTitle>
                <CardDescription>
                  Manage your account and data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/book-store/books">
                    <Button variant="outline" className="w-full">
                      Browse Books
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    Export Data
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* API Information */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-800">API Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Profile API Endpoints:</h4>
                <ul className="space-y-1 text-blue-600">
                  <li><code>GET /Account/v1/User/{"{UUID}"}</code> - Get user profile</li>
                  <li><code>PUT /Account/v1/User/{"{UUID}"}</code> - Update profile</li>
                  <li><code>DELETE /Account/v1/User/{"{UUID}"}</code> - Delete account</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Book Collection API:</h4>
                <ul className="space-y-1 text-blue-600">
                  <li><code>GET /BookStore/v1/Books</code> - Get user&apos;s books</li>
                  <li><code>POST /BookStore/v1/Books</code> - Add books to collection</li>
                  <li><code>DELETE /BookStore/v1/Books</code> - Remove all books</li>
                  <li><code>DELETE /BookStore/v1/Book</code> - Remove specific book</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testing Information */}
        <Card className="mt-8 bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">Profile Element IDs:</h4>
                <ul className="space-y-1 text-purple-600">
                  <li><code>firstName</code> - First name input (edit mode)</li>
                  <li><code>lastName</code> - Last name input (edit mode)</li>
                  <li><code>email</code> - Email input (edit mode)</li>
                  <li><code>username</code> - Username input (edit mode)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">Testing Scenarios:</h4>
                <ul className="space-y-1 text-purple-600">
                  <li>• Edit and save profile information</li>
                  <li>• View book collection</li>
                  <li>• Remove individual books</li>
                  <li>• Delete entire collection</li>
                  <li>• Navigate to book store</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Profile Footer" />
        </div>
      </main>
    </div>
  );
}