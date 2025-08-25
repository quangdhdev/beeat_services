import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Star, 
  Clock, 
  Users, 
  Globe, 
  Calendar, 
  Award, 
  PlayCircle, 
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { useCourseQuery } from '../hooks/queries/courseQueries';
import { useEnrollCourseMutation } from '../hooks/queries/courseQueries';
import { useAddToCartMutation } from '../hooks/queries/cartQueries';

const CourseDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  
  const { data: course, isLoading, error } = useCourseQuery(id!);
  const addToCartMutation = useAddToCartMutation();
  const enrollCourseMutation = useEnrollCourseMutation();

  const handleEnrollClick = async () => {
    if (!course) return;
    
    try {
      if (course.price === 0) {
        await enrollCourseMutation.mutateAsync(course.id);
        // Redirect to learning page
      } else {
        // await addToCartMutation.mutateAsync(course.id);
        // Show success message or redirect to cart
      }
    } catch (error) {
      console.error('Enrollment/Add to cart failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('courseDetail.notFound')}</h1>
          <Link
            to="/courses"
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            {t('courseDetail.backToCourses')}
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const totalLessons = course.curriculum.reduce((total: number, section: {lessons: {length: number}[]}) => total + section.lessons.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <Link
            to="/courses"
            className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('courseDetail.backToCourses')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center">
                  {renderStars(course.rating)}
                  <span className="ml-2 font-medium">{course.rating}</span>
                  <span className="ml-1 text-gray-300">
                    ({course.studentsCount.toLocaleString()} {t('courseDetail.studentsEnrolled')})
                  </span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Award className="h-4 w-4 mr-1" />
                  <span>{course.level}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>{course.language}</span>
                </div>
              </div>

              <div className="flex items-center mt-6">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium">{t('courseDetail.createdBy')} {course.instructor.name}</p>
                  <div className="flex items-center text-sm text-gray-300">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{t('courseDetail.lastUpdated')} {course.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Preview Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-8">
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-2">
                      {course.originalPrice && (
                        <span className="text-lg text-gray-500 line-through mr-3">
                          {course.originalPrice.toLocaleString()}₫
                        </span>
                      )}
                      <span className="text-3xl font-bold text-gray-900">
                        {course.price.toLocaleString()}₫
                      </span>
                    </div>
                    {course.originalPrice && (
                      <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        {t('courseDetail.discount', { percent: Math.round((1 - course.price / course.originalPrice) * 100) })}
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={handleEnrollClick}
                    disabled={addToCartMutation.isPending || enrollCourseMutation.isPending}
                    className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors mb-3 disabled:opacity-50"
                  >
                    {addToCartMutation.isPending || enrollCourseMutation.isPending 
                      ? 'Processing...' 
                      : t('courseDetail.enrollNow')
                    }
                  </button>
                  
                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors mb-6">
                    {t('courseDetail.addToWishlist')}
                  </button>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{course.studentsCount.toLocaleString()} {t('courseDetail.studentsEnrolled')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{t('courseDetail.totalHours')} {course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <PlayCircle className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{totalLessons} {t('courseDetail.lessons')}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{t('courseDetail.certificate')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('courseDetail.whatYouWillLearn')}</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {course.longDescription}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.skills.map((skill: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('courseDetail.requirements')}</h2>
                <ul className="space-y-2">
                  {course.requirements.map((requirement: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gray-400 mr-3">•</span>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Curriculum */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('courseDetail.courseContent')}</h2>
                <div className="space-y-4">
                  {course.curriculum.map((section: {id: string, title: string, lessons: {id: string, title: string, duration: string, isPreview: boolean}[]}, sectionIndex: number) => (
                    <div key={section.id} className="border border-gray-200 rounded-lg">
                      <div className="bg-gray-50 px-4 py-3 rounded-t-lg">
                        <h3 className="font-semibold text-gray-900">
                          {t('courseDetail.section')} {sectionIndex + 1}: {section.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {section.lessons.length} {t('courseDetail.lessons')}
                        </p>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {section.lessons.map((lesson) => (
                          <div key={lesson.id} className="px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center">
                              <PlayCircle className="h-4 w-4 text-gray-400 mr-3" />
                              <span className="text-gray-700">{lesson.title}</span>
                              {lesson.isPreview && (
                                <span className="ml-2 bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">
                                  {t('courseDetail.preview')}
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('courseDetail.aboutInstructor')}</h3>
                
                <div className="flex items-center mb-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{course.instructor.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      {renderStars(course.instructor.rating)}
                      <span className="ml-2">{course.instructor.rating}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {course.instructor.bio}
                </p>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{course.instructor.studentsCount.toLocaleString()} {t('courses.card.students')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;