"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Clock, Building, CreditCard, Search } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { InquiryModal } from "@/components/inquiry-modal";
import { INITIAL_COURSES } from "@/db/seed-data";
import { DISCIPLINES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export default function CoursesPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const filteredCourses = INITIAL_COURSES.filter((course) => {
    if (selectedDiscipline !== "All" && course.discipline !== selectedDiscipline) {
      return false;
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        course.name.toLowerCase().includes(term) ||
        course.discipline.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-[1280px] mx-auto w-full px-4 md:px-10">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <span className="p-1.5 rounded-lg bg-primary-fixed text-primary">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-widest text-primary">
              Academic Degrees & Courses
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface font-display tracking-tight mb-2">
            Explore Courses & Degree Programs
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Browse high-demand undergraduate and postgraduate courses offered across top institutions in Karnataka with verified fee averages and career prospects.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Stream Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
            {["All", ...DISCIPLINES.map((d) => d.name)].map((discipline) => (
              <button
                key={discipline}
                onClick={() => setSelectedDiscipline(discipline)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedDiscipline === discipline
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-container-low text-on-surface hover:bg-surface-container-high border border-outline-variant/40"
                }`}
              >
                {discipline}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search course name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low text-xs text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="neomorphic-card p-6 rounded-2xl border border-outline-variant/30 flex flex-col justify-between group hover:border-primary/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-primary-fixed text-primary text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {course.discipline}
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{course.duration}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-on-surface font-display mb-2 group-hover:text-primary transition-colors">
                  {course.name}
                </h3>

                <div className="flex items-center gap-4 text-xs text-on-surface-variant my-4">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-primary shrink-0" />
                    <span>{course.collegeCount || 30}+ Colleges</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-primary shrink-0" />
                    <span>Avg {formatCurrency(course.avgFee || 150000)}/yr</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-surface-variant/50">
                <Link
                  href={`/colleges?search=${encodeURIComponent(course.name.split(" ")[0])}`}
                  className="btn-primary text-xs font-semibold px-4 py-2 rounded-full flex-grow text-center flex items-center justify-center gap-1.5"
                >
                  <span>Explore Colleges</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-surface-container-low p-6 border border-outline-variant/30">
          <p className="text-base font-semibold text-on-surface text-center sm:text-left">
            Not sure which course is right for you?
          </p>
          <button
            onClick={() => setInquiryModalOpen(true)}
            className="btn-secondary text-xs font-semibold px-5 py-2.5 rounded-full whitespace-nowrap"
          >
            Talk to a Counsellor
          </button>
        </div>
      </main>

      <Footer />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        title="Get Free Admission Counselling & Details"
      />
    </div>
  );
}
