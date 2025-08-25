import { Course } from '../types/Course';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Selenium WebDriver với Java - Khóa học toàn diện',
    description: 'Học automation testing từ cơ bản đến nâng cao với Selenium WebDriver và Java',
    longDescription: 'Khóa học toàn diện về Selenium WebDriver với Java, từ những kiến thức cơ bản đến các kỹ thuật nâng cao. Bạn sẽ học cách thiết kế framework automation testing, viết test cases hiệu quả, và tích hợp với CI/CD pipeline.',
    instructor: {
      name: 'Nguyễn Văn Minh',
      bio: 'Senior QA Engineer tại FPT Software với 8+ năm kinh nghiệm trong automation testing và test framework design.',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 4.8,
      studentsCount: 12500
    },
    thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    price: 1990000,
    originalPrice: 3990000,
    rating: 4.7,
    studentsCount: 8430,
    duration: '42 giờ',
    level: 'Intermediate',
    category: 'Web Testing',
    language: 'Tiếng Việt',
    lastUpdated: 'Tháng 12, 2024',
    curriculum: [
      {
        id: '1',
        title: 'Giới thiệu Selenium WebDriver',
        lessons: [
          { id: '1', title: 'Tổng quan về Automation Testing', duration: '12:45', isPreview: true },
          { id: '2', title: 'Cài đặt môi trường Selenium', duration: '15:30', isPreview: true },
          { id: '3', title: 'WebDriver đầu tiên của bạn', duration: '18:20', isPreview: false }
        ]
      },
      {
        id: '2',
        title: 'Locators và WebElements',
        lessons: [
          { id: '4', title: 'Các loại Locators trong Selenium', duration: '25:15', isPreview: false },
          { id: '5', title: 'Thao tác với WebElements', duration: '22:40', isPreview: false },
          { id: '6', title: 'Waits và Synchronization', duration: '28:30', isPreview: false }
        ]
      },
      {
        id: '3',
        title: 'Test Framework Design',
        lessons: [
          { id: '7', title: 'Page Object Model', duration: '30:20', isPreview: false },
          { id: '8', title: 'TestNG Framework', duration: '35:45', isPreview: false },
          { id: '9', title: 'Data-Driven Testing', duration: '28:15', isPreview: false }
        ]
      }
    ],
    skills: ['Selenium WebDriver', 'Java', 'TestNG', 'Page Object Model', 'Maven'],
    requirements: ['Kiến thức Java cơ bản', 'Hiểu biết về HTML/CSS', 'Cài đặt Java JDK']
  },
  {
    id: '2',
    title: 'Cypress - Modern End-to-End Testing',
    description: 'Học Cypress framework để automation testing cho ứng dụng web hiện đại',
    longDescription: 'Khóa học chuyên sâu về Cypress, framework automation testing hiện đại cho web applications. Học cách viết test cases hiệu quả, debug tests, và tích hợp với CI/CD pipeline.',
    instructor: {
      name: 'Trần Thị Hương',
      bio: 'QA Lead tại Viettel Solutions với chuyên môn về modern testing frameworks và DevOps practices.',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 4.9,
      studentsCount: 15600
    },
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    price: 1790000,
    originalPrice: 2990000,
    rating: 4.8,
    studentsCount: 6750,
    duration: '28 giờ',
    level: 'Intermediate',
    category: 'Web Testing',
    language: 'Tiếng Việt',
    lastUpdated: 'Tháng 11, 2024',
    curriculum: [
      {
        id: '1',
        title: 'Cypress Fundamentals',
        lessons: [
          { id: '1', title: 'Giới thiệu Cypress', duration: '20:30', isPreview: true },
          { id: '2', title: 'Cài đặt và cấu hình Cypress', duration: '15:45', isPreview: true },
          { id: '3', title: 'Viết test đầu tiên', duration: '18:15', isPreview: false }
        ]
      }
    ],
    skills: ['Cypress', 'JavaScript', 'E2E Testing', 'API Testing', 'CI/CD'],
    requirements: ['JavaScript cơ bản', 'Hiểu biết về web development', 'Node.js đã cài đặt']
  },
  {
    id: '3',
    title: 'API Testing với Postman và RestAssured',
    description: 'Automation testing cho REST APIs sử dụng Postman và RestAssured',
    longDescription: 'Học cách test REST APIs một cách hiệu quả với Postman và RestAssured. Khóa học bao gồm API testing strategies, data validation, và integration testing.',
    instructor: {
      name: 'Lê Hoàng Nam',
      bio: 'API Testing Specialist tại TMA Solutions với 6+ năm kinh nghiệm trong backend testing và microservices.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 4.6,
      studentsCount: 9800
    },
    thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    price: 1590000,
    originalPrice: 2490000,
    rating: 4.5,
    studentsCount: 5100,
    duration: '32 giờ',
    level: 'Beginner',
    category: 'API Testing',
    language: 'Tiếng Việt',
    lastUpdated: 'Tháng 1, 2025',
    curriculum: [
      {
        id: '1',
        title: 'API Testing Fundamentals',
        lessons: [
          { id: '1', title: 'Giới thiệu về API Testing', duration: '15:20', isPreview: true },
          { id: '2', title: 'HTTP Methods và Status Codes', duration: '22:45', isPreview: true },
          { id: '3', title: 'Postman cơ bản', duration: '30:15', isPreview: false }
        ]
      }
    ],
    skills: ['Postman', 'RestAssured', 'API Testing', 'JSON/XML', 'Java'],
    requirements: ['Không cần kinh nghiệm trước đó', 'Hiểu biết cơ bản về web']
  },
  {
    id: '4',
    title: 'Mobile Testing với Appium',
    description: 'Automation testing cho ứng dụng mobile iOS và Android',
    longDescription: 'Khóa học toàn diện về mobile automation testing với Appium. Học cách test native apps, hybrid apps, và mobile web applications trên cả iOS và Android.',
    instructor: {
      name: 'Phạm Thị Lan',
      bio: 'Mobile QA Engineer tại VNG Corporation với chuyên môn về mobile testing và performance optimization.',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 4.8,
      studentsCount: 7200
    },
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    price: 2190000,
    originalPrice: 3490000,
    rating: 4.9,
    studentsCount: 3800,
    duration: '38 giờ',
    level: 'Advanced',
    category: 'Mobile Testing',
    language: 'Tiếng Việt',
    lastUpdated: 'Tháng 12, 2024',
    curriculum: [
      {
        id: '1',
        title: 'Appium Setup và Configuration',
        lessons: [
          { id: '1', title: 'Giới thiệu Mobile Testing', duration: '18:30', isPreview: true },
          { id: '2', title: 'Cài đặt Appium Server', duration: '25:45', isPreview: false }
        ]
      }
    ],
    skills: ['Appium', 'Mobile Testing', 'Android Testing', 'iOS Testing', 'Java/Python'],
    requirements: ['Kiến thức Java hoặc Python', 'Hiểu biết về mobile development']
  },
  {
    id: '5',
    title: 'Performance Testing với JMeter',
    description: 'Học cách thực hiện load testing và performance testing với Apache JMeter',
    longDescription: 'Khóa học chuyên sâu về performance testing với Apache JMeter. Học cách thiết kế load tests, phân tích performance metrics, và tối ưu hóa hiệu suất ứng dụng.',
    instructor: {
      name: 'Đỗ Văn Hùng',
      bio: 'Performance Testing Expert tại Saigon Technology với 10+ năm kinh nghiệm trong load testing và system optimization.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 4.7,
      studentsCount: 11200
    },
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    price: 1890000,
    originalPrice: 2990000,
    rating: 4.6,
    studentsCount: 4600,
    duration: '25 giờ',
    level: 'Intermediate',
    category: 'Performance Testing',
    language: 'Tiếng Việt',
    lastUpdated: 'Tháng 10, 2024',
    curriculum: [
      {
        id: '1',
        title: 'JMeter Basics',
        lessons: [
          { id: '1', title: 'Giới thiệu Performance Testing', duration: '20:15', isPreview: true },
          { id: '2', title: 'JMeter Installation và Setup', duration: '15:30', isPreview: false }
        ]
      }
    ],
    skills: ['JMeter', 'Load Testing', 'Performance Analysis', 'Monitoring', 'Reporting'],
    requirements: ['Kiến thức cơ bản về web applications', 'Hiểu biết về HTTP protocol']
  },
  {
    id: '6',
    title: 'Test Automation Framework Design',
    description: 'Thiết kế và xây dựng test automation framework từ đầu',
    longDescription: 'Khóa học nâng cao về thiết kế test automation framework. Học các design patterns, best practices, và cách xây dựng framework có thể maintain và scale được.',
    instructor: {
      name: 'Vũ Thành Đạt',
      bio: 'Test Automation Architect tại Nashtech với 12+ năm kinh nghiệm trong framework design và team leadership.',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 4.9,
      studentsCount: 8900
    },
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    price: 2490000,
    originalPrice: 3990000,
    rating: 4.8,
    studentsCount: 2300,
    duration: '45 giờ',
    level: 'Advanced',
    category: 'Framework Design',
    language: 'Tiếng Việt',
    lastUpdated: 'Tháng 9, 2024',
    curriculum: [
      {
        id: '1',
        title: 'Framework Architecture',
        lessons: [
          { id: '1', title: 'Framework Design Principles', duration: '25:45', isPreview: true },
          { id: '2', title: 'Design Patterns trong Testing', duration: '30:30', isPreview: false }
        ]
      }
    ],
    skills: ['Framework Design', 'Design Patterns', 'Java/C#', 'CI/CD Integration', 'Reporting'],
    requirements: ['Kinh nghiệm automation testing', 'Kiến thức OOP vững chắc']
  }
];

export const categories = [
  'Tất cả danh mục',
  'Web Testing',
  'API Testing',
  'Mobile Testing',
  'Performance Testing',
  'Framework Design',
  'Security Testing'
];