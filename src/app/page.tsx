"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ArrowRight,
  GraduationCap,
  Stethoscope,
  Briefcase,
  Code2,
  Palette,
  Home,
  ShieldCheck,
  GitCompare,
  CreditCard,
  Headset,
  Star,
  ChevronRight,
  CheckCircle2,
  Building,
  Sparkles,
  Users,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { CollegeCard } from "@/components/college-card";
import { AccommodationCard } from "@/components/accommodation-card";
import { InquiryModal } from "@/components/inquiry-modal";
import { ComparisonDrawer } from "@/components/comparison-drawer";
import { INITIAL_COLLEGES, INITIAL_ACCOMMODATIONS, INITIAL_COURSES } from "@/db/seed-data";
import { College } from "@/types";
import { DISCIPLINES } from "@/lib/constants";

export default function HomePage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featuredColleges = INITIAL_COLLEGES.slice(0, 4);
  const featuredAccommodations = INITIAL_ACCOMMODATIONS.slice(0, 3);

  const handleToggleCompare = (college: College) => {
    if (selectedColleges.some((c) => c.id === college.id)) {
      setSelectedColleges(selectedColleges.filter((c) => c.id !== college.id));
    } else {
      if (selectedColleges.length >= 4) {
        alert("You can compare up to 4 colleges at a time.");
        return;
      }
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  const faqs = [
    {
      q: "How does Campus Finder verify college fees and placement data?",
      a: "Our team conducts on-site campus audits, verifies official state fee regulatory committee approvals (like KEA/CET in Karnataka), and validates NIRF/NAAC reports. We never display estimated or fabricated numbers.",
    },
    {
      q: "Is admission counselling on Campus Finder completely free for students?",
      a: "Yes, our guidance, college comparison tools, and initial WhatsApp counsellor chats are 100% free of charge for students and parents.",
    },
    {
      q: "How do I book or inspect student hostels and PGs in Mangalore?",
      a: "Every accommodation listed under our Stay Finder section includes verified physical photographs, distance to nearby college campuses, and direct WhatsApp contact to schedule room visits.",
    },
    {
      q: "Can I apply or inquire for management / NRI quota seats directly?",
      a: "Yes. When you submit an admission inquiry, our senior educational advisors guide you through both merit CET/NEET/COMEDK rounds as well as institutional admission protocols.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background antialiased selection:bg-primary selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="hero-gradient pt-16 sm:pt-24 pb-20 px-4 md:px-10 relative overflow-hidden border-b border-outline-variant/30">
          {/* Decorative Glowing Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-fixed rounded-full blur-[110px] opacity-25 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-secondary-fixed rounded-full blur-[90px] opacity-30 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          <div className="max-w-[1280px] mx-auto text-center relative z-10 flex flex-col items-center">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest border border-primary/20 text-primary text-xs font-bold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Karnataka’s Premier Education & Student Stay Marketplace</span>
            </div>

            {/* Display Headline */}
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface font-display tracking-tight leading-[1.15] mb-5">
                Find the Right College for Your Future
              </h1>
              <p className="text-base sm:text-xl text-on-surface-variant font-normal mb-10 max-w-2xl mx-auto leading-relaxed">
                Explore verified colleges, courses, fee structures, verified placements, authentic reviews, and student accommodations — all in one place.
              </p>
            </div>

            {/* Intelligent Search Bar */}
            <div className="w-full max-w-4xl mb-8">
              <SearchBar />
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <Link
                href="/colleges"
                className="h-12 px-8 rounded-full btn-secondary text-sm font-bold flex items-center gap-2 shadow-sm hover:scale-[1.02]"
              >
                <span>Explore Colleges</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="h-12 px-8 rounded-full btn-primary text-sm font-bold flex items-center gap-2 shadow-md hover:scale-[1.02]"
              >
                <Headset className="w-4 h-4" />
                <span>Talk to a Counsellor</span>
              </button>
            </div>

            {/* Verification Stats Counter Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-16 max-w-4xl w-full pt-10 border-t border-outline-variant/40">
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-primary font-display">120+</span>
                <span className="text-xs sm:text-sm text-on-surface-variant font-medium">Verified Campuses</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-primary font-display">100%</span>
                <span className="text-xs sm:text-sm text-on-surface-variant font-medium">Accurate Fee Data</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-primary font-display">250+</span>
                <span className="text-xs sm:text-sm text-on-surface-variant font-medium">Hostels & PGs</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-primary font-display">15k+</span>
                <span className="text-xs sm:text-sm text-on-surface-variant font-medium">Students Advised</span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section (Bento Grid Style) */}
        <section className="py-20 px-4 md:px-10 bg-surface">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-primary mb-1 block">
                  Academic Streams
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface font-display">
                  Explore by Discipline
                </h2>
                <p className="text-sm sm:text-base text-on-surface-variant mt-1">
                  Discover top educational institutions categorized by professional fields of study.
                </p>
              </div>
              <Link
                href="/courses"
                className="flex items-center gap-1.5 text-primary font-bold text-sm hover:underline"
              >
                <span>View all courses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Engineering (Large Bento Feature) */}
              <Link
                href="/colleges?discipline=Engineering"
                className="neomorphic-card rounded-2xl p-7 lg:col-span-2 lg:row-span-2 flex flex-col justify-between group h-full min-h-[320px] relative overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-outline-variant/30"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary-container text-white flex items-center justify-center mb-6 shadow-md">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-on-surface mb-2 font-display">
                    Engineering & Technology
                  </h3>
                  <p className="text-on-surface-variant text-sm sm:text-base max-w-md leading-relaxed">
                    B.Tech, M.Tech, and Diploma programs in Computer Science, AI & Data Science, Mechanical, ECE, Civil & Robotics across Karnataka.
                  </p>
                </div>

                <div className="mt-8 flex gap-2 flex-wrap relative z-10">
                  <span className="chip px-3 py-1 rounded-full text-xs font-bold">
                    42+ Mangalore Campuses
                  </span>
                  <span className="chip px-3 py-1 rounded-full text-xs font-bold">
                    AI & Machine Learning
                  </span>
                  <span className="chip px-3 py-1 rounded-full text-xs font-bold">
                    Avg Package ₹7.5 LPA
                  </span>
                </div>

                {/* Subtle Decorative Background Graphic */}
                <div className="absolute -bottom-6 -right-6 text-surface-container-high/40 opacity-30 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                  <GraduationCap className="w-48 h-48" />
                </div>
              </Link>

              {/* Medical */}
              <Link
                href="/colleges?discipline=Medical"
                className="neomorphic-card rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 border border-outline-variant/30"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center mb-4">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-1 font-display">
                    Medical & Dental
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    MBBS, BDS, B.Sc Nursing & Allied Health Sciences
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-primary font-bold">
                  <span>14 Top Colleges</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Management */}
              <Link
                href="/colleges?discipline=Management"
                className="neomorphic-card rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 border border-outline-variant/30"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center mb-4">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-1 font-display">
                    Management
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    MBA, BBA, PGDM, Executive Business Analytics
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-primary font-bold">
                  <span>38 Top Colleges</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Computer Applications */}
              <Link
                href="/colleges?discipline=Computer+Apps"
                className="neomorphic-card rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 border border-outline-variant/30"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center mb-4">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-1 font-display">
                    Computer Applications
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    BCA, MCA, Cloud & Cyber Security Specializations
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-primary font-bold">
                  <span>40 Top Colleges</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Arts & Science */}
              <Link
                href="/colleges?discipline=Arts+%26+Science"
                className="neomorphic-card rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 border border-outline-variant/30"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-1 font-display">
                    Commerce & Science
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    B.Com (ACCA), B.Sc, BA Journalism & Media
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-primary font-bold">
                  <span>52 Top Colleges</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Colleges Section */}
        <section className="py-20 px-4 md:px-10 bg-surface-container-low/60 border-y border-outline-variant/30">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-primary mb-1 block">
                  Top Recommended
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface font-display">
                  Featured Institutions in Mangalore
                </h2>
                <p className="text-sm sm:text-base text-on-surface-variant mt-1">
                  Institutions verified with autonomous accreditations, verified placement histories, and on-campus hostel infrastructure.
                </p>
              </div>

              <Link
                href="/colleges"
                className="btn-secondary px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 w-fit"
              >
                <span>View all 120+ colleges</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* College Cards Grid */}
            <div className="flex flex-col gap-6">
              {featuredColleges.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  isCompared={selectedColleges.some((c) => c.id === college.id)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Accommodation Banner (Stay Finder Mangalore) */}
        <section className="py-16 px-4 md:px-10">
          <div className="max-w-[1280px] mx-auto bg-primary-container rounded-[2rem] p-8 md:p-14 relative overflow-hidden shadow-level-3 text-white">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <pattern id="pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="2" fill="currentColor" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#pattern)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left max-w-2xl">
                <div className="flex items-center gap-2 mb-3 justify-center lg:justify-start">
                  <span className="p-1.5 rounded-lg bg-primary-fixed text-primary">
                    <Home className="w-4 h-4" />
                  </span>
                  <span className="text-xs uppercase font-bold tracking-widest text-primary-fixed">
                    Stay Finder • Mangalore
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display mb-3">
                  Looking for a place to stay in Mangalore?
                </h2>
                <p className="text-primary-fixed text-sm sm:text-lg leading-relaxed">
                  Discover verified student accommodations (Boys hostels, Girls hostels, PGs, and Rooms) near top campuses like St. Aloysius, NITK, Yenepoya, and Sahyadri.
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full lg:w-auto justify-center">
                <Link
                  href="/stay?type=Hostel"
                  className="bg-surface text-primary hover:bg-surface-bright px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:scale-105"
                >
                  <Building className="w-4 h-4" />
                  <span>Find Hostels</span>
                </Link>
                <Link
                  href="/stay?type=PG"
                  className="bg-surface text-primary hover:bg-surface-bright px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:scale-105"
                >
                  <Home className="w-4 h-4" />
                  <span>Find PGs</span>
                </Link>
                <Link
                  href="/stay?type=Room"
                  className="bg-transparent border border-primary-fixed text-primary-fixed hover:bg-white/10 px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <span>Explore Rooms</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Campus Finder Section */}
        <section className="py-20 px-4 md:px-10 bg-surface">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <span className="text-xs uppercase font-bold tracking-widest text-primary mb-1 block">
                The Campus Finder Advantage
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface font-display mb-3">
                Why Choose Campus Finder?
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant">
                We eliminate guesswork and student confusion with independently verified institutional records and dedicated WhatsApp counsellor support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center p-7 neomorphic-card rounded-2xl border border-outline-variant/30">
                <div className="w-16 h-16 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center mb-6 shadow-sm">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2 font-display">
                  Verified Information
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Real tuition fees, verified placement packages, and accreditation dates directly audited from authorized sources.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center p-7 neomorphic-card rounded-2xl border border-outline-variant/30">
                <div className="w-16 h-16 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center mb-6 shadow-sm">
                  <GitCompare className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2 font-display">
                  Easy Comparison
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Compare multiple colleges side-by-side on eligibility, fee structures, hostels, and packages to make an informed decision.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center p-7 neomorphic-card rounded-2xl border border-outline-variant/30">
                <div className="w-16 h-16 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center mb-6 shadow-sm">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2 font-display">
                  Transparent Fees
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  No hidden consultancy charges. Access clear breakdowns of 1st year tuition, caution deposits, and hostel fees.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center text-center p-7 neomorphic-card rounded-2xl border border-outline-variant/30">
                <div className="w-16 h-16 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center mb-6 shadow-sm">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2 font-display">
                  Direct Counselling
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Connect one-on-one with experienced education advisors directly via WhatsApp for admission guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Student FAQ Section */}
        <section className="py-20 px-4 md:px-10 bg-surface">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs uppercase font-bold tracking-widest text-primary mb-1 block">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface font-display mb-2">
                Have Questions About Admissions or Stays?
              </h2>
              <p className="text-sm text-on-surface-variant">
                Find quick answers to common queries from students and parents.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="neomorphic-card rounded-2xl overflow-hidden border border-outline-variant/30"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-on-surface"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-surface-variant/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Counselling Final CTA */}
        <section className="py-16 px-4 md:px-10 bg-surface-container-high/40">
          <div className="max-w-4xl mx-auto text-center neomorphic-card rounded-3xl p-8 sm:p-12 border border-primary/20 bg-gradient-to-b from-white to-surface-container-lowest">
            <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto mb-6 shadow-md">
              <Headset className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface font-display mb-4">
              Need Personalized Guidance for 2026 Admissions?
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
              Talk directly to our educational advisors. We evaluate your marks, budget, and career goals to find the best college in Karnataka.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setInquiryModalOpen(true)}
                className="btn-primary px-8 py-3.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Talk to a Counsellor on WhatsApp</span>
              </button>
              <Link
                href="/colleges"
                className="btn-secondary px-8 py-3.5 rounded-full text-sm font-bold"
              >
                Browse Colleges Directory
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Floating Comparison Bar */}
      <ComparisonDrawer
        selectedColleges={selectedColleges}
        onRemove={(id) => setSelectedColleges(selectedColleges.filter((c) => c.id !== id))}
        onClear={() => setSelectedColleges([])}
      />

      {/* Global Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}
