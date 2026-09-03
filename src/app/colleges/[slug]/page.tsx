"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  GraduationCap,
  Award,
  Building,
  Calendar,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  BookOpen,
  Home,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  Phone,
  FileText,
  Share2,
  Users,
  Check,
  ArrowRight,
  Wifi,
  Monitor,
  HeartPulse,
  Trophy,
  Cpu,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { InquiryModal } from "@/components/inquiry-modal";
import { INITIAL_COLLEGES } from "@/db/seed-data";
import { College } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { generateWhatsAppInquiryUrl } from "@/lib/whatsapp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CollegeDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const college = INITIAL_COLLEGES.find((c) => c.slug === slug);

  if (!college) {
    notFound();
  }

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedCourseForInquiry, setSelectedCourseForInquiry] = useState<string>(
    college.courses && college.courses.length > 0 ? college.courses[0].courseName : ""
  );

  // Quick Sidebar form state
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [sidebarCourse, setSidebarCourse] = useState(
    college.courses && college.courses.length > 0 ? college.courses[0].courseName : "B.Tech CSE"
  );
  const [sidebarQualification, setSidebarQualification] = useState("12th Science / PUC");

  const handleSidebarWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) {
      alert("Please enter your name and phone number to connect with a counsellor.");
      return;
    }

    const waUrl = generateWhatsAppInquiryUrl({
      studentName,
      whatsappNumber: studentPhone,
      collegeName: college.name,
      courseName: sidebarCourse,
      qualification: sidebarQualification,
    });

    // Record to API in background
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentName,
        whatsappNumber: studentPhone,
        collegeName: college.name,
        courseName: sidebarCourse,
        qualification: sidebarQualification,
      }),
    }).catch((err) => console.error(err));

    window.open(waUrl, "_blank");
  };

  const relatedColleges = INITIAL_COLLEGES.filter((c) => c.id !== college.id).slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background antialiased">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section with Cinematic Background & Overlay */}
        <section className="relative h-[65vh] min-h-[480px] w-full flex items-end pb-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={college.bannerImage}
              alt={college.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 hero-overlay" />
          </div>

          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-10">
            <div className="max-w-4xl">
              {/* Accreditations & Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {college.accreditation?.map((acc, idx) => (
                  <span
                    key={idx}
                    className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                  >
                    {acc}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display leading-tight mb-4 drop-shadow-md">
                {college.name}
              </h1>

              {/* Meta Row (Location, Star Rating, Established Year) */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/90 text-sm mb-6">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary-fixed" />
                  <span>{college.location}, {college.state}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="font-bold text-white">{college.rating}</span>
                  <span className="text-white/70">({college.reviewCount}+ Google Reviews)</span>
                </div>

                {college.establishedYear && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary-fixed" />
                    <span>Est. {college.establishedYear}</span>
                  </div>
                )}
              </div>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedCourseForInquiry(college.courses?.[0]?.courseName || "");
                    setInquiryModalOpen(true);
                  }}
                  className="btn-primary px-7 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Get Admission Assistance</span>
                </button>

                {college.googleReviewUrl && (
                  <a
                    href={college.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white px-5 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Google Reviews</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Layout Grid */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column (Main Profile Content) */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              {/* Sticky In-Page Navigation Bar */}
              <div className="sticky top-20 z-30 bg-surface-bright/95 backdrop-blur-md py-3 border-b border-outline-variant/40 overflow-x-auto hide-scrollbar">
                <div className="flex gap-6 min-w-max text-xs sm:text-sm font-bold">
                  <a href="#about" className="text-primary border-b-2 border-primary pb-1">
                    Overview
                  </a>
                  <a href="#courses" className="text-on-surface-variant hover:text-primary transition-colors">
                    Courses & Fees
                  </a>
                  <a href="#placements" className="text-on-surface-variant hover:text-primary transition-colors">
                    Placements
                  </a>
                  <a href="#facilities" className="text-on-surface-variant hover:text-primary transition-colors">
                    Facilities
                  </a>
                  <a href="#reviews" className="text-on-surface-variant hover:text-primary transition-colors">
                    Google Reviews
                  </a>
                </div>
              </div>

              {/* About Section */}
              <section id="about" className="scroll-mt-32">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display">
                    About {college.name.split(" ")[0]}
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified {formatDate(college.lastVerifiedAt)}</span>
                  </span>
                </div>

                <div className="neo-card p-6 sm:p-8 border border-outline-variant/30">
                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-8">
                    {college.about}
                  </p>

                  {/* 3-Column Bento Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-outline-variant/30">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary-fixed p-3 rounded-xl text-primary shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-on-surface">Top Ranking</h4>
                        <p className="text-xs text-on-surface-variant">
                          {college.accreditation?.[0] || "NAAC A++ Certified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-primary-fixed p-3 rounded-xl text-primary shrink-0">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-on-surface">120+ Partners</h4>
                        <p className="text-xs text-on-surface-variant">Global Recruiting Network</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-primary-fixed p-3 rounded-xl text-primary shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-on-surface">15,000+ Alumni</h4>
                        <p className="text-xs text-on-surface-variant">Active Global Mentorship</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Why Choose Section */}
              {college.whyChoose && college.whyChoose.length > 0 && (
                <section>
                  <h3 className="text-lg sm:text-xl font-bold text-on-surface font-display mb-4">
                    Why Choose This Campus?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {college.whyChoose.map((point, idx) => (
                      <div
                        key={idx}
                        className="neo-card p-4 rounded-xl border border-outline-variant/30 flex items-start gap-3 bg-surface-container-low/40"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-on-surface leading-relaxed font-medium">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Courses & Fees Interactive Table */}
              <section id="courses" className="scroll-mt-32">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display">
                      Offered Courses & Verified Fees
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                      Official tuition fees per academic year.
                    </p>
                  </div>
                </div>

                <div className="neo-card overflow-hidden border border-outline-variant/30">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low border-b border-outline-variant/30 text-xs uppercase font-bold text-on-surface">
                          <th className="p-4">Course & Specializations</th>
                          <th className="p-4">Duration</th>
                          <th className="p-4">1st Year Tuition</th>
                          <th className="p-4">Eligibility</th>
                          <th className="p-4 text-right">Inquire</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs sm:text-sm text-on-surface-variant divide-y divide-outline-variant/20">
                        {college.courses?.map((course) => (
                          <tr
                            key={course.id}
                            className="hover:bg-surface-container-low/50 transition-colors"
                          >
                            <td className="p-4">
                              <div className="font-bold text-on-surface text-sm">
                                {course.courseName}
                              </div>
                              {course.specializations && (
                                <div className="text-xs text-primary font-medium mt-0.5">
                                  {course.specializations.join(" • ")}
                                </div>
                              )}
                            </td>
                            <td className="p-4 whitespace-nowrap font-medium text-on-surface">
                              {course.duration}
                            </td>
                            <td className="p-4 whitespace-nowrap font-bold text-primary">
                              {formatCurrency(course.firstYearFee)}
                            </td>
                            <td className="p-4 max-w-xs text-xs">
                              {course.eligibility}
                            </td>
                            <td className="p-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setSelectedCourseForInquiry(course.courseName);
                                  setInquiryModalOpen(true);
                                }}
                                className="btn-secondary px-3 py-1.5 rounded-full text-xs font-bold"
                              >
                                Enquire
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Placements Section */}
              {college.placements && (
                <section id="placements" className="scroll-mt-32">
                  <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display mb-4">
                    Placement & Salary Statistics ({college.placements.year})
                  </h2>

                  <div className="neo-card p-6 sm:p-8 border border-outline-variant/30">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-center sm:text-left">
                      <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/50">
                        <span className="text-xs text-on-surface-variant font-semibold">
                          Placement Success Rate
                        </span>
                        <div className="text-2xl sm:text-3xl font-extrabold text-primary mt-1 font-display">
                          {college.placements.placementPercentage}%
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/50">
                        <span className="text-xs text-on-surface-variant font-semibold">
                          Average Salary Package
                        </span>
                        <div className="text-2xl sm:text-3xl font-extrabold text-on-surface mt-1 font-display">
                          {college.placements.averagePackage}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/50">
                        <span className="text-xs text-on-surface-variant font-semibold">
                          Highest Package Offered
                        </span>
                        <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1 font-display">
                          {college.placements.highestPackage}
                        </div>
                      </div>
                    </div>

                    {/* Top Recruiters */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3">
                        Prominent Campus Recruiters
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {college.placements.topRecruiters.map((recruiter, idx) => (
                          <span
                            key={idx}
                            className="bg-surface-container-low border border-outline-variant/40 px-3 py-1.5 rounded-lg text-xs font-bold text-on-surface"
                          >
                            {recruiter}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Placement Highlights */}
                    {college.placements.highlights && (
                      <div className="pt-4 border-t border-outline-variant/30">
                        <ul className="space-y-1 text-xs text-on-surface-variant">
                          {college.placements.highlights.map((h, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Facilities Section */}
              <section id="facilities" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display mb-4">
                  Campus Facilities & Infrastructure
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {college.facilities?.map((fac) => (
                    <div
                      key={fac.id}
                      className="neo-card p-4 rounded-xl border border-outline-variant/30 flex items-center gap-3 bg-surface-container-low/40"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                        <Building className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-on-surface">
                        {fac.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Authentic Google Reviews Box */}
              <section id="reviews" className="scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display mb-4">
                  Google Maps Reviews & Location
                </h2>

                <div className="neo-card p-6 sm:p-8 border border-outline-variant/30 bg-gradient-to-r from-surface-container-low to-white">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center text-[#F59E0B]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                        <span className="text-xl font-extrabold text-on-surface font-display">
                          {college.rating} / 5.0
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-on-surface-variant max-w-md leading-relaxed">
                        Read unedited feedback, student questions, and verified campus ratings directly on the official Google Business listing.
                      </p>
                    </div>

                    <a
                      href={college.googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary px-6 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap shadow-md"
                    >
                      <span>Open on Google Maps</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column (Sticky Floating Admission Form) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 flex flex-col gap-6">
                {/* Floating Inquiry Card */}
                <div className="neo-card p-6 rounded-2xl border border-primary/20 shadow-level-2 bg-surface-container-lowest">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="p-1.5 rounded-lg bg-primary-fixed text-primary">
                      <MessageCircle className="w-4 h-4" />
                    </span>
                    <span className="text-xs uppercase font-bold tracking-widest text-primary">
                      Instant WhatsApp Counselling
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-on-surface font-display mb-1">
                    Interested in {college.name.split(" ")[0]}?
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-5">
                    Submit your details to chat directly with our regional admission counsellor.
                  </p>

                  <form onSubmit={handleSidebarWhatsAppSubmit} className="flex flex-col gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-on-surface uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-on-surface uppercase tracking-wider mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-on-surface uppercase tracking-wider mb-1">
                        Course Preference
                      </label>
                      <select
                        value={sidebarCourse}
                        onChange={(e) => setSidebarCourse(e.target.value)}
                        className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                      >
                        {college.courses?.map((c) => (
                          <option key={c.id} value={c.courseName}>
                            {c.courseName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-on-surface uppercase tracking-wider mb-1">
                        Highest Qualification
                      </label>
                      <select
                        value={sidebarQualification}
                        onChange={(e) => setSidebarQualification(e.target.value)}
                        className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                      >
                        <option value="12th Science / PUC">12th Science / PUC</option>
                        <option value="12th Commerce">12th Commerce</option>
                        <option value="12th Arts">12th Arts</option>
                        <option value="Diploma / Polytechnic">Diploma</option>
                        <option value="Graduate">Graduate</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full py-3 rounded-xl text-xs font-bold mt-2 flex justify-center items-center gap-2 shadow-md hover:scale-[1.01]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Inquiry on WhatsApp</span>
                    </button>

                    <p className="text-center text-[10px] text-on-surface-variant/80 mt-1">
                      By submitting, you agree to our Terms & Privacy Policy.
                    </p>
                  </form>
                </div>

                {/* Stay Finder Callout Widget */}
                <div className="neo-card p-5 rounded-2xl border border-outline-variant/30 bg-primary/5">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs mb-1">
                    <Home className="w-4 h-4" />
                    <span>Need Accommodation Nearby?</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
                    Explore verified student hostels and PGs near {college.name.split(" ")[0]} in Mangalore.
                  </p>
                  <Link
                    href={`/stay?search=${encodeURIComponent(college.city)}`}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>View Stays in {college.city}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Global Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        collegeName={college.name}
        courseName={selectedCourseForInquiry}
        title={`Admission Assistance - ${college.name}`}
      />
    </div>
  );
}
