export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: {
    name: string;
    bio: string;
    avatar: string;
    rating: number;
    studentsCount: number;
  };
  thumbnail: string;
  price: number;
  originalPrice?: number;
  rating: number;
  studentsCount: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  language: string;
  lastUpdated: string;
  curriculum: {
    id: string;
    title: string;
    lessons: {
      id: string;
      title: string;
      duration: string;
      isPreview: boolean;
    }[];
  }[];
  skills: string[];
  requirements: string[];
}

export interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: string;
  duration: string;
  category: string;
  enrolledDate: string;
  certificateEarned: boolean;
}
