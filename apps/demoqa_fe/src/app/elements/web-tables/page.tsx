"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Edit, Trash2, Plus, Search } from "lucide-react";
import { AdBanner } from "@/components/ui/ad-banner";
import Link from "next/link";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  salary: number;
  department: string;
}

export default function WebTablesPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, firstName: "Cierra", lastName: "Vega", age: 39, email: "cierra@example.com", salary: 10000, department: "Insurance" },
    { id: 2, firstName: "Alden", lastName: "Cantrell", age: 45, email: "alden@example.com", salary: 12000, department: "Compliance" },
    { id: 3, firstName: "Kierra", lastName: "Gentry", age: 29, email: "kierra@example.com", salary: 2000, department: "Legal" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    salary: "",
    department: ""
  });

  const filteredEmployees = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (formData.firstName && formData.lastName && formData.email) {
      const newEmployee: Employee = {
        id: Math.max(...employees.map(e => e.id)) + 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: parseInt(formData.age) || 0,
        email: formData.email,
        salary: parseInt(formData.salary) || 0,
        department: formData.department
      };
      setEmployees([...employees, newEmployee]);
      setFormData({ firstName: "", lastName: "", age: "", email: "", salary: "", department: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      age: employee.age.toString(),
      email: employee.email,
      salary: employee.salary.toString(),
      department: employee.department
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (editingEmployee && formData.firstName && formData.lastName && formData.email) {
      const updatedEmployee: Employee = {
        ...editingEmployee,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: parseInt(formData.age) || 0,
        email: formData.email,
        salary: parseInt(formData.salary) || 0,
        department: formData.department
      };
      setEmployees(employees.map(emp => emp.id === editingEmployee.id ? updatedEmployee : emp));
      setFormData({ firstName: "", lastName: "", age: "", email: "", salary: "", department: "" });
      setEditingEmployee(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const EmployeeForm = ({ onSubmit, submitText }: { onSubmit: () => void; submitText: string }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="First Name"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder="Age"
          />
        </div>
        <div>
          <Label htmlFor="salary">Salary</Label>
          <Input
            id="salary"
            type="number"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            placeholder="Salary"
          />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            placeholder="Department"
          />
        </div>
      </div>
      <Button onClick={onSubmit} className="w-full">
        {submitText}
      </Button>
    </div>
  );

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
              <h1 className="text-3xl font-bold text-gray-900">Web Tables</h1>
              <p className="text-gray-600 mt-2">Dynamic table with add, edit, and delete functionality</p>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Ad */}
        <div className="mb-8">
          <AdBanner size="banner" position="Web Tables Banner" />
        </div>
        
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-semibold">Employee Records</CardTitle>
                <CardDescription>
                  Manage employee data with full CRUD operations
                </CardDescription>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Employee
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogDescription>
                      Fill in the employee details below
                    </DialogDescription>
                  </DialogHeader>
                  <EmployeeForm onSubmit={handleAdd} submitText="Add Employee" />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  id="search-box"
                />
              </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{employee.firstName}</TableCell>
                      <TableCell>{employee.lastName}</TableCell>
                      <TableCell>{employee.age}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>${employee.salary.toLocaleString()}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <div className="flex justify-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(employee)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(employee.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredEmployees.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No employees found matching your search.
              </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredEmployees.length} of {employees.length} employees
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
              <DialogDescription>
                Update the employee details below
              </DialogDescription>
            </DialogHeader>
            <EmployeeForm onSubmit={handleUpdate} submitText="Update Employee" />
          </DialogContent>
        </Dialog>

        {/* Testing Information */}
        <Card className="mt-8 bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-800">Testing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">Table Features:</h4>
                <ul className="space-y-1 text-purple-600">
                  <li>• Dynamic row addition and deletion</li>
                  <li>• In-line editing with modal dialogs</li>
                  <li>• Search and filter functionality</li>
                  <li>• Sortable columns and pagination ready</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">Key Element IDs:</h4>
                <ul className="space-y-1 text-purple-600">
                  <li>• <code>search-box</code> - Search input field</li>
                  <li>• <code>firstName</code>, <code>lastName</code> - Name fields</li>
                  <li>• <code>email</code>, <code>age</code>, <code>salary</code> - Data fields</li>
                  <li>• Edit and Delete buttons in each row</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Ad */}
        <div className="mt-8">
          <AdBanner size="leaderboard" position="Web Tables Footer" />
        </div>
      </main>
    </div>
  );
}