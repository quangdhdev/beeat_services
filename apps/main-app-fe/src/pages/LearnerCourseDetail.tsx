import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Settings, 
  Maximize,
  CheckCircle,
  Circle,
  BookOpen,
  Download,
  MessageSquare,
  Star,
  ArrowLeft
} from 'lucide-react';
import { courses } from '../data/courses';

const LearnerCourseDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === id);  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLesson, setCurrentLesson] = useState('1');
  const [completedLessons, setCompletedLessons] = useState<string[]>(['1', '2']);
  const [activeTab, setActiveTab] = useState('overview');

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">{t('courseDetail.notFound')}</h1>
          <Link
            to="/courses"
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            {t('courseDetail.backToCourses')}
          </Link>
        </div>
      </div>
    );
  };

  const allLessons = course.curriculum.flatMap(section => 
    section.lessons.map(lesson => ({
      ...lesson,
      sectionTitle: section.title
    }))
  );

  const currentLessonData = allLessons.find(lesson => lesson.id === currentLesson);
  const currentLessonIndex = allLessons.findIndex(lesson => lesson.id === currentLesson);
  const progress = (completedLessons.length / allLessons.length) * 100;

  const toggleLessonComplete = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => prev.filter(id => id !== lessonId));
    } else {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLesson(allLessons[currentLessonIndex + 1].id);
    }
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLesson(allLessons[currentLessonIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/courses"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold truncate max-w-md">{course.title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              {t('learning.progress', { percent: Math.round(progress) })}
            </div>
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Video Player */}
        <div className="flex-1 flex flex-col">
          <div className="relative bg-black flex-1 flex items-center justify-center">
            <img
              src={course.thumbnail}
              alt={currentLessonData?.title}
              className="w-full h-full object-cover"
            />
            
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <div className="flex items-center space-x-6">
                <button
                  onClick={goToPreviousLesson}
                  disabled={currentLessonIndex === 0}
                  className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <SkipBack className="h-6 w-6" />
                </button>
                
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </button>
                
                <button
                  onClick={goToNextLesson}
                  disabled={currentLessonIndex === allLessons.length - 1}
                  className="p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <SkipForward className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-pink-400 transition-colors"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                
                <div className="flex-1 bg-gray-600 rounded-full h-1">
                  <div className="bg-pink-500 h-1 rounded-full w-1/3"></div>
                </div>
                
                <span className="text-sm text-gray-300">5:23 / 15:30</span>
                
                <button className="text-white hover:text-pink-400 transition-colors">
                  <Volume2 className="h-5 w-5" />
                </button>
                
                <button className="text-white hover:text-pink-400 transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
                
                <button className="text-white hover:text-pink-400 transition-colors">
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="bg-gray-800 p-6 border-t border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">{currentLessonData?.title}</h2>
                <p className="text-gray-400 text-sm">{currentLessonData?.sectionTitle}</p>
              </div>
              
              <button
                onClick={() => toggleLessonComplete(currentLesson)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  completedLessons.includes(currentLesson)
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {completedLessons.includes(currentLesson) ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
                <span className="text-sm">
                  {completedLessons.includes(currentLesson) ? t('learning.completed') : t('learning.markComplete')}
                </span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 border-b border-gray-700">
              {[
                { id: 'overview', label: t('learning.tabs.overview'), icon: BookOpen },
                { id: 'notes', label: t('learning.tabs.notes'), icon: Download },
                { id: 'qa', label: t('learning.tabs.qa'), icon: MessageSquare },
                { id: 'reviews', label: t('learning.tabs.reviews'), icon: Star }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-3 px-1 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-pink-500 text-pink-400'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4">
              {activeTab === 'overview' && (
                <div className="text-gray-300">
                  <p className="mb-4">
                    Trong bài học này, bạn sẽ học cách thiết lập môi trường Selenium WebDriver 
                    và viết test case đầu tiên của mình. Chúng ta sẽ đi qua từng bước một cách chi tiết.
                  </p>
                  <h4 className="font-semibold mb-2">Nội dung chính:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Cài đặt Java JDK và IDE</li>
                    <li>Thiết lập Maven project</li>
                    <li>Thêm Selenium dependencies</li>
                    <li>Viết test case đầu tiên</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'notes' && (
                <div className="text-gray-300">
                  <p className="text-sm text-gray-400 mb-4">Tài liệu và ghi chú cho bài học này</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span className="text-sm">Selenium Setup Guide.pdf</span>
                      <button className="text-pink-400 hover:text-pink-300">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <span className="text-sm">Sample Code.zip</span>
                      <button className="text-pink-400 hover:text-pink-300">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'qa' && (
                <div className="text-gray-300">
                  <p className="text-sm text-gray-400 mb-4">Đặt câu hỏi về bài học này</p>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <img
                          src="https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                          alt="User"
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">Nguyễn Văn B</p>
                          <p className="text-sm text-gray-300">
                            Làm sao để xử lý khi element không tìm thấy?
                          </p>
                          <p className="text-xs text-gray-500 mt-2">2 giờ trước</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="text-gray-300">
                  <p className="text-sm text-gray-400 mb-4">Đánh giá từ học viên khác</p>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <img
                          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                          alt="User"
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="text-sm font-medium">Trần Thị C</p>
                            <div className="flex">
                              {[1,2,3,4,5].map(star => (
                                <Star key={star} className="h-3 w-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-300">
                            Bài học rất chi tiết và dễ hiểu. Cảm ơn thầy!
                          </p>
                          <p className="text-xs text-gray-500 mt-2">1 ngày trước</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Course Curriculum Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-semibold text-lg">{t('learning.courseContent')}</h3>
            <p className="text-sm text-gray-400 mt-1">
              {t('learning.lessonsCompleted', { completed: completedLessons.length, total: allLessons.length })}
            </p>
          </div>
          
          <div className="p-4 space-y-4">
            {course.curriculum.map((section) => (
              <div key={section.id}>
                <h4 className="font-medium text-gray-300 mb-3">{section.title}</h4>
                <div className="space-y-2">
                  {section.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(lesson.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentLesson === lesson.id
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {completedLessons.includes(lesson.id) ? (
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{lesson.title}</p>
                          <p className="text-xs text-gray-400">{lesson.duration}</p>
                        </div>
                        {lesson.isPreview && (
                          <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded">
                            Preview
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerCourseDetail;