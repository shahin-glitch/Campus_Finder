import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  ShieldCheck,
  Award,
  Users,
  Building,
  CheckCircle2,
  Headset,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-[1280px] mx-auto w-full px-4 md:px-10">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed text-primary text-xs font-bold mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Our Mission & Credibility</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface font-display tracking-tight mb-4">
            Bringing Transparency to Higher Education in Karnataka
          </h1>
          <p className="text-sm sm:text-lg text-on-surface-variant leading-relaxed">
            Campus Finder was built to bridge the gap between aspiring students and authentic collegiate opportunities in Mangalore and surrounding regions.
          </p>
        </div>

        {/* 2-Column Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-level-2 border border-outline-variant/40">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
              alt="Campus Finder Student Discussion"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface font-display">
              Why We Never Invent or Estimate Data
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Choosing a university is one of the most significant investments a family makes. Far too many admission portals publish arbitrary rankings, inflated placement statistics, or outdated fee structures.
            </p>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              At Campus Finder, every tuition fee, placement package, and hostel listing undergoes physical inspection and direct institutional verification. We clearly display the verification date and dataSource on every profile.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/30">
              <div>
                <span className="text-2xl font-extrabold text-primary font-display">100%</span>
                <p className="text-xs text-on-surface-variant mt-0.5">Verified Institutional Data</p>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-primary font-display">15,000+</span>
                <p className="text-xs text-on-surface-variant mt-0.5">Students Guided Successfully</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="neomorphic-card p-8 rounded-2xl border border-outline-variant/30 text-center">
            <div className="w-14 h-14 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-on-surface font-display mb-2">
              Objective University Rankings
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              We rely strictly on NIRF, NAAC, and UGC government frameworks to benchmark institutional excellence.
            </p>
          </div>

          <div className="neomorphic-card p-8 rounded-2xl border border-outline-variant/30 text-center">
            <div className="w-14 h-14 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Building className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-on-surface font-display mb-2">
              Stay Finder Accommodation
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Out-of-state students can safely discover verified hostels and PGs with transparent rent and meal inclusion details.
            </p>
          </div>

          <div className="neomorphic-card p-8 rounded-2xl border border-outline-variant/30 text-center">
            <div className="w-14 h-14 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Headset className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-on-surface font-display mb-2">
              Free WhatsApp Guidance
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Our regional counsellors assist with CET, COMEDK, NEET, and direct management seat allocations without high consulting fees.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
