"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  GraduationCap,
} from "lucide-react";
import { INITIAL_COURSES } from "@/db/seed-data";
import { Course } from "@/types";
import { DISCIPLINES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [formData, setFormData] = useState<Partial<Course>>({
    name: "",
    slug: "",
    discipline: "Engineering",
    level: "Undergraduate",
    duration: "4 Years",
    avgFee: 200000,
    collegeCount: 30,
  });

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setFormData({
      name: "",
      slug: "",
      discipline: "Engineering",
      level: "Undergraduate",
      duration: "4 Years",
      avgFee: 200000,
      collegeCount: 30,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData(course);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const slug =
      formData.slug ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (editingCourse) {
      setCourses(
        courses.map((c) =>
          c.id === editingCourse.id ? ({ ...c, ...formData, slug } as Course) : c
        )
      );
    } else {
      const newCourse: Course = {
        ...formData,
        id: `course-${Date.now()}`,
        slug,
      } as Course;
      setCourses([newCourse, ...courses]);
    }

    setModalOpen(false);
  };

  const filteredCourses = courses.filter((c) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return c.name.toLowerCase().includes(term) || c.discipline.toLowerCase().includes(term);
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-xs uppercase font-bold tracking-widest text-primary">
              Course Management
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface font-display">
            Academic Courses ({courses.length})
          </h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="neomorphic-card p-4 rounded-2xl border border-outline-variant/30 flex items-center gap-3">
        <Search className="w-4 h-4 text-outline" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by course title or discipline..."
          className="w-full bg-transparent text-xs text-on-surface border-none focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="neomorphic-card rounded-2xl overflow-hidden border border-outline-variant/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-xs uppercase font-bold text-on-surface border-b border-outline-variant/30">
                <th className="p-4">Course Name</th>
                <th className="p-4">Discipline</th>
                <th className="p-4">Level</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Avg Annual Fee</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs text-on-surface-variant divide-y divide-outline-variant/20">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4 font-bold text-on-surface">{course.name}</td>
                  <td className="p-4 whitespace-nowrap">
                    <span className="bg-primary-fixed text-primary px-2.5 py-0.5 rounded-full font-semibold text-[11px]">
                      {course.discipline}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap">{course.level}</td>
                  <td className="p-4 whitespace-nowrap">{course.duration}</td>
                  <td className="p-4 font-bold text-primary whitespace-nowrap">
                    {formatCurrency(course.avgFee || 150000)}/yr
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(course)}
                        className="p-1.5 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container-high"
                        title="Edit Course"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-level-3 p-6 sm:p-8 relative border border-outline-variant/40">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-outline hover:text-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-on-surface font-display mb-4">
              {editingCourse ? "Edit Course Details" : "Add New Academic Course"}
            </h3>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. B.Tech Artificial Intelligence & Data Science"
                  className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                    Academic Stream / Discipline
                  </label>
                  <select
                    value={formData.discipline || "Engineering"}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  >
                    {DISCIPLINES.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration || "4 Years"}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 4 Years"
                    className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                  Estimated Average Annual Fee (₹)
                </label>
                <input
                  type="number"
                  value={formData.avgFee || 200000}
                  onChange={(e) =>
                    setFormData({ ...formData, avgFee: Number(e.target.value) })
                  }
                  className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2 rounded-xl text-xs font-bold shadow-md"
                >
                  {editingCourse ? "Save Changes" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
