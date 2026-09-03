"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  TrendingUp,
  CreditCard,
  BookOpen,
  Home,
  GitCompare,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Check,
} from "lucide-react";
import { College } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { InquiryModal } from "./inquiry-modal";

interface CollegeCardProps {
  college: College;
  isCompared?: boolean;
  onToggleCompare?: (college: College) => void;
}

export function CollegeCard({
  college,
  isCompared = false,
  onToggleCompare,
}: CollegeCardProps) {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <>
      <div className="neomorphic-card flex flex-col lg:flex-row overflow-hidden group border border-outline-variant/40 hover:border-primary/40 transition-all duration-300">
        {/* Image Area */}
        <div className="lg:w-1/3 relative h-56 sm:h-64 lg:h-auto min-h-[240px] bg-surface-container-high overflow-hidden">
          <Image
            src={college.bannerImage}
            alt={college.name}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Rating Badge Overlay */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="glass-panel px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
              <span>{college.rating}</span>
              {college.reviewCount > 0 && (
                <span className="text-[10px] text-on-surface-variant font-normal">
                  ({college.reviewCount})
                </span>
              )}
            </span>
          </div>

          {/* Featured / Accreditation Pill */}
          {college.accreditation && college.accreditation.length > 0 && (
            <div className="absolute bottom-4 left-4">
              <span className="bg-primary/90 text-white backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                {college.accreditation[0]}
              </span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 lg:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-3 mb-2">
              <div>
                <Link
                  href={`/colleges/${college.slug}`}
                  className="font-headline text-lg sm:text-xl font-bold text-on-background group-hover:text-primary transition-colors line-clamp-1"
                >
                  {college.name}
                </Link>
                <p className="text-sm text-on-surface-variant flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{college.location}</span>
                </p>
              </div>

              {/* Google Reviews Outbound Link */}
              {college.googleReviewUrl && (
                <a
                  href={college.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-on-surface-variant hover:text-primary bg-surface-container-low hover:bg-surface-container-high px-2.5 py-1.5 rounded-lg border border-outline-variant/50 transition-colors"
                  title="View authentic Google Reviews and Map"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="hidden sm:inline">Google Reviews</span>
                </a>
              )}
            </div>

            {/* Key Stats Bento */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 my-4">
              <div className="flex flex-col gap-0.5 p-2.5 bg-surface-container-low rounded-xl border border-surface-variant/50">
                <div className="flex items-center gap-1 text-primary">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-on-surface-variant">Starting Fees</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-on-background">
                  {formatCurrency(college.startingFee)}/yr
                </span>
              </div>

              <div className="flex flex-col gap-0.5 p-2.5 bg-surface-container-low rounded-xl border border-surface-variant/50">
                <div className="flex items-center gap-1 text-primary">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-on-surface-variant">Placement</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-on-background">
                  {college.placementRate || 85}%
                </span>
              </div>

              <div className="flex flex-col gap-0.5 p-2.5 bg-surface-container-low rounded-xl border border-surface-variant/50">
                <div className="flex items-center gap-1 text-primary">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-on-surface-variant">Top Courses</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-on-background truncate">
                  {college.courses && college.courses.length > 0
                    ? Array.from(
                        new Set(
                          college.courses.map((course) =>
                            course.courseName.replace(/^(B\.Tech|M\.Tech)\s+/i, "")
                          )
                        )
                      )
                        .slice(0, 2)
                        .join(", ")
                    : "B.Tech, MBA"}
                </span>
              </div>

              <div className="flex flex-col gap-0.5 p-2.5 bg-surface-container-low rounded-xl border border-surface-variant/50">
                <div className="flex items-center gap-1 text-primary">
                  <Home className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-on-surface-variant">Hostel</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-on-background">
                  {college.hasHostel ? "Available" : "External PGs"}
                </span>
              </div>
            </div>

            {/* Verification Date Stamp */}
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Information verified on {formatDate(college.lastVerifiedAt)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-surface-variant/50">
            <Link
              href={`/colleges/${college.slug}`}
              className="btn-secondary text-xs sm:text-sm font-semibold px-4 py-2 rounded-full text-center"
            >
              View College
            </Link>

            {onToggleCompare && (
              <button
                onClick={() => onToggleCompare(college)}
                className={`text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-colors ${
                  isCompared
                    ? "bg-primary text-white"
                    : "bg-transparent border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
              >
                {isCompared ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <GitCompare className="w-3.5 h-3.5" />
                    <span>Compare</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => setInquiryModalOpen(true)}
              className="btn-primary text-xs sm:text-sm font-semibold px-5 py-2 rounded-full flex-grow sm:flex-grow-0 text-center flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Enquire Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        collegeName={college.name}
        title={`Inquire for ${college.name}`}
      />
    </>
  );
}
