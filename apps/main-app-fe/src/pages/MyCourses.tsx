import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Play,
  Clock,
  CheckCircle,
  BookOpen,
  Award,
  Calendar,
  Filter,
  Search,
  TrendingUp,
  X,
} from "lucide-react";
import { useEnrolledCoursesQuery } from "../hooks/queries/courseQueries";
import { EnrolledCourse } from "../types/Course";

const MyCourses: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const {
    data: coursesData,
    isLoading,
    error,
  } = useEnrolledCoursesQuery({
    status: filterStatus !== "all" ? filterStatus : undefined,
    search: searchTerm || undefined,
  });

  const enrolledCourses = coursesData?.courses || [];
  const stats = coursesData?.stats || {
    totalCourses: 0,
    inProgress: 0,
    completed: 0,
    certificatesEarned: 0,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {t("myCourses.title")}
          </h1>
          <p className="text-lg text-gray-600">{t("myCourses.description")}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalCourses}
                </p>
                <p className="text-sm text-gray-600">
                  {t("myCourses.stats.totalCourses")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.inProgress}
                </p>
                <p className="text-sm text-gray-600">
                  {t("myCourses.stats.inProgress")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completed}
                </p>
                <p className="text-sm text-gray-600">
                  {t("myCourses.stats.completed")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-pink-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.certificatesEarned}
                </p>
                <p className="text-sm text-gray-600">
                  {t("myCourses.stats.certificates")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder={t("myCourses.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:shadow-md text-gray-900 placeholder-gray-500 transition-all duration-200 hover:border-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              {/* Search backdrop effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none -z-10"></div>
            </div>

            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 shadow-sm hover:border-gray-400 transition-all duration-200"
              >
                <option value="all">{t("myCourses.filters.all")}</option>
                <option value="in-progress">
                  {t("myCourses.filters.inProgress")}
                </option>
                <option value="completed">
                  {t("myCourses.filters.completed")}
                </option>
                <option value="not-started">
                  {t("myCourses.filters.notStarted")}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Error loading courses</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
            >
              Retry
            </button>
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrolledCourses.map((course: EnrolledCourse) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex">
                  <div className="relative w-48 h-32 flex-shrink-0">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    {course.certificateEarned && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                        <Award className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-xs font-medium text-pink-600 bg-pink-50 px-2 py-1 rounded">
                          {course.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 mt-2 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Bởi {course.instructor}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>
                          {t("myCourses.progress", {
                            percent: course.progress,
                          })}
                        </span>
                        <span>
                          {t("myCourses.lessons", {
                            completed: course.completedLessons,
                            total: course.totalLessons,
                          })}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            course.progress === 100
                              ? "bg-green-500"
                              : "bg-pink-500"
                          }`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {t("myCourses.lastAccessed", {
                            time: course.lastAccessed,
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {t("myCourses.enrolled", { date: course.enrolledDate })}
                      </div>

                      <Link
                        to={`/learn/${course.id}`}
                        className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center text-sm font-medium"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {course.progress === 0
                          ? t("myCourses.startLearning")
                          : course.progress === 100
                          ? t("myCourses.review")
                          : t("myCourses.continueLearning")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t("myCourses.noResults.title")}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? t("myCourses.noResults.searchDescription")
                : t("myCourses.noResults.emptyDescription")}
            </p>
            {!searchTerm && (
              <Link
                to="/courses"
                className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors inline-flex items-center"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                {t("myCourses.noResults.exploreCourses")}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
