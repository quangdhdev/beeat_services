"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Book, Star, ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";
import { AdBanner } from "@/components/ui/ad-banner";

interface Book {
  isbn: string;
  title: string;
  subTitle: string;
  author: string;
  publish_date: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
}

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [viewedBook, setViewedBook] = useState<Book | null>(null);

  const books: Book[] = [
    {
      isbn: "9781449325862",
      title: "Git Pocket Guide",
      subTitle: "A Working Introduction",
      author: "Richard E. Silverman",
      publish_date: "2020-06-04T08:48:39.000Z",
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
      publish_date: "2020-06-04T09:11:40.000Z",
      publisher: "O'Reilly Media",
      pages: 254,
      description: "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript.",
      website: "http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/"
    },
    {
      isbn: "9781449337711",
      title: "Designing Evolvable Web APIs with ASP.NET",
      subTitle: "Harnessing the Power of the Web",
      author: "Glenn Block et al.",
      publish_date: "2020-06-04T09:12:43.000Z",
      publisher: "O'Reilly Media",
      pages: 538,
      description: "Design and build Web APIs for a broad range of clients—including browsers and mobile devices.",
      website: "http://chimera.labs.oreilly.com/books/1234000001708/index.html"
    },
    {
      isbn: "9781449365035",
      title: "Speaking JavaScript",
      subTitle: "An In-Depth Guide for Programmers",
      author: "Axel Rauschmayer",
      publish_date: "2020-06-04T09:13:32.000Z",
      publisher: "O'Reilly Media",
      pages: 460,
      description: "Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language.",
      website: "http://speakingjs.com/"
    },
    {
      isbn: "9781491904244",
      title: "You Don't Know JS",
      subTitle: "ES6 & Beyond",
      author: "Kyle Simpson",
      publish_date: "2020-06-04T09:14:05.000Z",
      publisher: "O'Reilly Media",
      pages: 278,
      description: "No matter how much experience you have with JavaScript, odds are you don't fully understand the language.",
      website: "https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20&%20beyond"
    },
    {
      isbn: "9781491950296",
      title: "Programming JavaScript Applications",
      subTitle: "Robust Web Architecture with Node, HTML5, and Modern JS Libraries",
      author: "Eric Elliott",
      publish_date: "2020-06-04T09:14:56.000Z",
      publisher: "O'Reilly Media",
      pages: 254,
      description: "Take advantage of JavaScript's power to build robust web-scale or enterprise applications.",
      website: "http://chimera.labs.oreilly.com/books/1234000000262/index.html"
    },
    {
      isbn: "9781593275846",
      title: "Eloquent JavaScript, Second Edition",
      subTitle: "A Modern Introduction to Programming",
      author: "Marijn Haverbeke",
      publish_date: "2020-06-04T09:15:28.000Z",
      publisher: "No Starch Press",
      pages: 472,
      description: "JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games.",
      website: "http://eloquentjavascript.net/"
    },
    {
      isbn: "9781593277574",
      title: "Understanding ECMAScript 6",
      subTitle: "The Definitive Guide for JavaScript Developers",
      author: "Nicholas C. Zakas",
      publish_date: "2020-06-04T09:16:15.000Z",
      publisher: "No Starch Press",
      pages: 352,
      description: "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language.",
      website: "https://leanpub.com/understandinges6/read"
    }
  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.publisher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCollection = (isbn: string) => {
    if (!selectedBooks.includes(isbn)) {
      setSelectedBooks([...selectedBooks, isbn]);
    }
  };

  const handleRemoveFromCollection = (isbn: string) => {
    setSelectedBooks(selectedBooks.filter(id => id !== isbn));
  };

  const handleViewBook = (book: Book) => {
    setViewedBook(book);
  };

  const closeBookView = () => {
    setViewedBook(null);
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
              <h1 className="text-3xl font-bold text-gray-900">Book Store</h1>
              <p className="text-gray-600 mt-2">Browse and manage your book collection</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Book Store Banner" />
        </div>
        
        {/* Search and Collection Summary */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Search Books</CardTitle>
                <CardDescription>
                  Find books by title, author, or publisher
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="searchBox"
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">My Collection</CardTitle>
              <CardDescription>
                Books in your personal library
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{selectedBooks.length}</div>
                <div className="text-sm text-gray-600">Books Selected</div>
                {selectedBooks.length > 0 && (
                  <Link href="/book-store/profile">
                    <Button className="mt-3 w-full" size="sm">
                      View Collection
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.isbn} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Book className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg font-semibold line-clamp-2">
                  {book.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {book.subTitle}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div><strong>Author:</strong> {book.author}</div>
                  <div><strong>Publisher:</strong> {book.publisher}</div>
                  <div><strong>Pages:</strong> {book.pages}</div>
                  <div><strong>Published:</strong> {new Date(book.publish_date).getFullYear()}</div>
                </div>
                
                <div className="text-xs text-gray-600 line-clamp-3">
                  {book.description}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewBook(book)}
                    className="flex-1 flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </Button>
                  
                  {selectedBooks.includes(book.isbn) ? (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveFromCollection(book.isbn)}
                      className="flex-1"
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleAddToCollection(book.isbn)}
                      className="flex-1 flex items-center gap-1"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Add
                    </Button>
                  )}
                </div>

                <div className="text-xs text-gray-500 pt-1">
                  ISBN: {book.isbn}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No books found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}

        {/* Book Detail Modal */}
        {viewedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold">{viewedBook.title}</CardTitle>
                    <CardDescription className="text-lg mt-1">{viewedBook.subTitle}</CardDescription>
                  </div>
                  <Button variant="ghost" onClick={closeBookView} className="text-gray-500 hover:text-gray-700">
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Book Details</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Author:</strong> {viewedBook.author}</div>
                      <div><strong>Publisher:</strong> {viewedBook.publisher}</div>
                      <div><strong>Pages:</strong> {viewedBook.pages}</div>
                      <div><strong>Published:</strong> {new Date(viewedBook.publish_date).toLocaleDateString()}</div>
                      <div><strong>ISBN:</strong> {viewedBook.isbn}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Rating</h4>
                    <div className="flex space-x-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{viewedBook.description}</p>
                </div>

                {viewedBook.website && (
                  <div>
                    <h4 className="font-semibold mb-2">Website</h4>
                    <a 
                      href={viewedBook.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      {viewedBook.website}
                    </a>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  {selectedBooks.includes(viewedBook.isbn) ? (
                    <Button
                      variant="destructive"
                      onClick={() => handleRemoveFromCollection(viewedBook.isbn)}
                      className="flex-1"
                    >
                      Remove from Collection
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAddToCollection(viewedBook.isbn)}
                      className="flex-1"
                    >
                      Add to Collection
                    </Button>
                  )}
                  <Button variant="outline" onClick={closeBookView}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Testing Information */}
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-green-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Book Store Element IDs:</h4>
                <ul className="space-y-1 text-green-600">
                  <li><code>searchBox</code> - Book search input</li>
                  <li>Each book card contains ISBN as identifier</li>
                  <li>Add/Remove buttons for collection management</li>
                  <li>View buttons for detailed book information</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Testing Scenarios:</h4>
                <ul className="space-y-1 text-green-600">
                  <li>• Search books by title, author, publisher</li>
                  <li>• Add books to personal collection</li>
                  <li>• Remove books from collection</li>
                  <li>• View detailed book information</li>
                  <li>• Navigate to profile to see collection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Book Store Footer" />
        </div>
      </main>
    </div>
  );
}