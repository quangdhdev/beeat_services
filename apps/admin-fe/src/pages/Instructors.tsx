import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from '../components/ui/Table';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  Eye, 
  Edit, 
  Ban, 
  Mail, 
  Star, 
  Users, 
  BookOpen, 
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Award,
  TrendingUp
} from 'lucide-react';

// Mock instructors data
const instructors = [
  {
    id: '1',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Senior QA Engineer with 8+ years of experience in test automation and Selenium WebDriver.',
    status: 'active',
    joinDate: '2024-01-15T08:30:00Z',
    statistics: {
      courseCount: 3,
      studentCount: 2456,
      averageRating: 4.6,
      totalRevenue: 125430.50,
      reviewCount: 342
    },
    specializations: ['Selenium WebDriver', 'Test Automation', 'API Testing'],
    socialLinks: {
      website: 'https://sarahjohnson.dev',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson'
    }
  },
  {
    id: '2',
    fullName: 'Mike Chen',
    email: 'mike.chen@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Full-stack developer and testing expert specializing in API testing and automation frameworks.',
    status: 'active',
    joinDate: '2024-02-10T10:15:00Z',
    statistics: {
      courseCount: 2,
      studentCount: 1890,
      averageRating: 4.4,
      totalRevenue: 89250.75,
      reviewCount: 234
    },
    specializations: ['API Testing', 'Postman', 'RestAssured', 'JavaScript'],
    socialLinks: {
      website: 'https://mikechen.tech',
      linkedin: 'https://linkedin.com/in/mikechen',
      twitter: null
    }
  },
  {
    id: '3',
    fullName: 'David Kumar',
    email: 'david.kumar@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Performance testing specialist with expertise in JMeter and load testing strategies.',
    status: 'pending',
    joinDate: '2024-12-10T09:20:00Z',
    statistics: {
      courseCount: 0,
      studentCount: 0,
      averageRating: 0,
      totalRevenue: 0,
      reviewCount: 0
    },
    specializations: ['Performance Testing', 'JMeter', 'Load Testing'],
    socialLinks: {
      website: null,
      linkedin: 'https://linkedin.com/in/davidkumar',
      twitter: null
    }
  },
  {
    id: '4',
    fullName: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@example.com',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    bio: 'Mobile testing expert with extensive experience in iOS and Android automation.',
    status: 'suspended',
    joinDate: '2024-03-05T14:45:00Z',
    statistics: {
      courseCount: 1,
      studentCount: 567,
      averageRating: 4.2,
      totalRevenue: 34560.25,
      reviewCount: 89
    },
    specializations: ['Mobile Testing', 'Appium', 'iOS Testing', 'Android Testing'],
    socialLinks: {
      website: 'https://lisarodriguez.com',
      linkedin: 'https://linkedin.com/in/lisarodriguez',
      twitter: 'https://twitter.com/lisarodriguez'
    }
  }
];

// Mock instructor applications
const applications = [
  {
    id: '1',
    applicant: {
      fullName: 'Alex Thompson',
      email: 'alex.thompson@example.com',
      phone: '+1 (555) 987-6543'
    },
    qualifications: {
      education: 'Master of Computer Science, Stanford University',
      experience: '10+ years in software testing and quality assurance',
      certifications: ['ISTQB Advanced Level', 'Certified Selenium Professional'],
      portfolio: 'https://alexthompson.dev/portfolio'
    },
    documents: [
      { type: 'resume', filename: 'alex_thompson_resume.pdf', url: '/documents/alex_resume.pdf' },
      { type: 'certificate', filename: 'istqb_certificate.pdf', url: '/documents/istqb_cert.pdf' }
    ],
    status: 'pending',
    submittedAt: '2024-12-15T09:30:00Z',
    reviewedAt: null,
    reviewedBy: null,
    notes: null
  },
  {
    id: '2',
    applicant: {
      fullName: 'Maria Garcia',
      email: 'maria.garcia@example.com',
      phone: '+1 (555) 456-7890'
    },
    qualifications: {
      education: 'Bachelor of Engineering, MIT',
      experience: '7 years in test automation and DevOps',
      certifications: ['AWS Certified Developer', 'Cypress Certified'],
      portfolio: 'https://mariagarcia.tech'
    },
    documents: [
      { type: 'resume', filename: 'maria_garcia_resume.pdf', url: '/documents/maria_resume.pdf' },
      { type: 'portfolio', filename: 'portfolio_samples.zip', url: '/documents/maria_portfolio.zip' }
    ],
    status: 'approved',
    submittedAt: '2024-12-10T14:20:00Z',
    reviewedAt: '2024-12-12T10:15:00Z',
    reviewedBy: { id: '1', name: 'Admin User' },
    notes: 'Excellent qualifications and portfolio. Approved for instructor role.'
  }
];

export const Instructors: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('instructors');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const instructorColumns = [
    {
      key: 'avatar' as keyof typeof instructors[0],
      label: '',
      render: (value: string, instructor: typeof instructors[0]) => (
        <img 
          src={value} 
          alt={instructor.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
      )
    },
    {
      key: 'fullName' as keyof typeof instructors[0],
      label: 'Instructor',
      sortable: true,
      render: (value: string, instructor: typeof instructors[0]) => (
        <div className="cursor-pointer" onClick={() => navigate(`/instructors/${instructor.id}`)}>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{instructor.email}</div>
        </div>
      )
    },
    {
      key: 'status' as keyof typeof instructors[0],
      label: 'Status',
      sortable: true,
      render: (value: string) => <Badge variant={value as any}>{value}</Badge>
    },
    {
      key: 'specializations' as keyof typeof instructors[0],
      label: 'Specializations',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((spec, index) => (
            <span key={index} className="px-2 py-1 bg-pink-100 text-pink-800 rounded text-xs">
              {spec}
            </span>
          ))}
          {value.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              +{value.length - 2} more
            </span>
          )}
        </div>
      )
    },
    {
      key: 'statistics' as keyof typeof instructors[0],
      label: 'Performance',
      render: (value: any) => (
        <div className="text-sm space-y-1">
          <div className="flex items-center space-x-1">
            <BookOpen size={12} className="text-blue-500" />
            <span>{value.courseCount} courses</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={12} className="text-green-500" />
            <span>{value.studentCount} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={12} className="text-yellow-500" />
            <span>{value.averageRating > 0 ? value.averageRating.toFixed(1) : 'N/A'}</span>
          </div>
        </div>
      )
    },
    {
      key: 'statistics' as keyof typeof instructors[0],
      label: 'Revenue',
      sortable: true,
      render: (value: any) => (
        <span className="font-medium text-gray-900">
          ${value.totalRevenue.toLocaleString()}
        </span>
      )
    },
    {
      key: 'joinDate' as keyof typeof instructors[0],
      label: 'Join Date',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: 'id' as keyof typeof instructors[0],
      label: 'Actions',
      render: (value: string, instructor: typeof instructors[0]) => (
        <div className="flex items-center space-x-2">
          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
            onClick={() => navigate(`/instructors/${value}`)}
            <Eye size={16} />
          </button>
          <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
            <Edit size={16} />
          </button>
          <button className="p-1 text-orange-600 hover:bg-orange-50 rounded">
            <Mail size={16} />
          </button>
          {instructor.status === 'active' ? (
            <button className="p-1 text-red-600 hover:bg-red-50 rounded">
              <Ban size={16} />
            </button>
          ) : (
            <button className="p-1 text-green-600 hover:bg-green-50 rounded">
              <CheckCircle size={16} />
            </button>
          )}
        </div>
      )
    }
  ];

  const handleApplicationAction = (applicationId: string, action: 'approve' | 'reject') => {
    console.log(`${action} application:`, applicationId);
    setSelectedApplication(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Instructors</h1>
          <p className="text-gray-600 mt-2">Manage instructors and review applications</p>
        </div>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
          Invite Instructor
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('instructors')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'instructors'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Active Instructors ({instructors.filter(i => i.status === 'active').length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'applications'
                ? 'border-pink-500 text-pink-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Applications ({applications.filter(a => a.status === 'pending').length})
          </button>
        </nav>
      </div>

      {activeTab === 'instructors' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {instructors.filter(i => i.status === 'active').length}
                    </p>
                    <p className="text-sm text-gray-600">Active Instructors</p>
                  </div>
                  <div className="ml-auto p-2 bg-green-100 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {instructors.reduce((sum, i) => sum + i.statistics.courseCount, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Courses</p>
                  </div>
                  <div className="ml-auto p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {instructors.reduce((sum, i) => sum + i.statistics.studentCount, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Total Students</p>
                  </div>
                  <div className="ml-auto p-2 bg-purple-100 rounded-lg">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      ${instructors.reduce((sum, i) => sum + i.statistics.totalRevenue, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                  </div>
                  <div className="ml-auto p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructors Table */}
          <Table
            data={instructors}
            columns={instructorColumns}
            searchable={true}
            filterable={true}
            exportable={true}
            pagination={true}
          />
        </>
      )}

      {activeTab === 'applications' && (
        <div className="space-y-6">
          {/* Applications List */}
          <div className="grid gap-6">
            {applications.map((application) => (
              <Card key={application.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.applicant.fullName}
                          </h3>
                          <p className="text-sm text-gray-600">{application.applicant.email}</p>
                          <p className="text-sm text-gray-600">{application.applicant.phone}</p>
                        </div>
                        <Badge variant={application.status as any}>{application.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Education</h4>
                          <p className="text-sm text-gray-600 mb-3">{application.qualifications.education}</p>
                          
                          <h4 className="font-medium text-gray-900 mb-2">Experience</h4>
                          <p className="text-sm text-gray-600">{application.qualifications.experience}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Certifications</h4>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {application.qualifications.certifications.map((cert, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                {cert}
                              </span>
                            ))}
                          </div>

                          <h4 className="font-medium text-gray-900 mb-2">Portfolio</h4>
                          <a 
                            href={application.qualifications.portfolio} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-pink-600 hover:text-pink-700 flex items-center space-x-1"
                          >
                            <span>View Portfolio</span>
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
                        <div className="flex flex-wrap gap-2">
                          {application.documents.map((doc, index) => (
                            <a
                              key={index}
                              href={doc.url}
                              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              <span className="text-sm text-gray-700">{doc.filename}</span>
                              <ExternalLink size={14} className="text-gray-500" />
                            </a>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <span>Submitted: {new Date(application.submittedAt).toLocaleDateString()}</span>
                        {application.reviewedAt && (
                          <span>Reviewed: {new Date(application.reviewedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>

                    {application.status === 'pending' && (
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleApplicationAction(application.id, 'approve')}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <CheckCircle size={16} />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleApplicationAction(application.id, 'reject')}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <XCircle size={16} />
                          <span>Reject</span>
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};