"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  GitCompare,
  X,
  Plus,
  Star,
  ShieldCheck,
  Building,
  TrendingUp,
  CreditCard,
  Home,
  MessageCircle,
  ExternalLink,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { InquiryModal } from "@/components/inquiry-modal";
import { INITIAL_COLLEGES } from "@/db/seed-data";
import { College } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

function CompareContent() {
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [targetCollegeForInquiry, setTargetCollegeForInquiry] = useState("");

  useEffect(() => {
    const idsParam = searchParams.get("ids");
    if (idsParam) {
      const ids = idsParam.split(",").filter((id) => INITIAL_COLLEGES.some((c) => c.id === id));
      if (ids.length > 0) {
        setSelectedIds(ids.slice(0, 4));
        return;
      }
    }
    // Default 2 colleges if no query params
    setSelectedIds(["col-st-aloysius", "col-nitk"]);
  }, [searchParams]);

  const comparedColleges = selectedIds
    .map((id) => INITIAL_COLLEGES.find((c) => c.id === id))
    .filter(Boolean) as College[];

  const handleAddCollege = (collegeId: string) => {
    if (!selectedIds.includes(collegeId) && selectedIds.length < 4) {
      setSelectedIds([...selectedIds, collegeId]);
    }
  };

  const handleRemoveCollege = (collegeId: string) => {
    setSelectedIds(selectedIds.filter((id) => id !== collegeId));
  };

  const availableCollegesToAdd = INITIAL_COLLEGES.filter(
    (c) => !selectedIds.includes(c.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-[1280px] mx-auto w-full px-4 md:px-10">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <span className="p-1.5 rounded-lg bg-primary-fixed text-primary">
              <GitCompare className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-widest text-primary">
              Side-by-Side Comparison
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface font-display tracking-tight mb-2">
            Compare Top Colleges in Karnataka
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Evaluate annual tuition fees, verified placements, NAAC ratings, and campus infrastructure across multiple institutions simultaneously.
          </p>
        </div>

        {/* Add More Colleges Dropdown Selector */}
        {selectedIds.length < 4 && availableCollegesToAdd.length > 0 && (
          <div className="neomorphic-card p-4 rounded-2xl border border-outline-variant/40 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
              <Plus className="w-4 h-4 text-primary" />
              <span>Add another college to compare ({selectedIds.length}/4 selected):</span>
            </div>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleAddCollege(e.target.value);
                  e.target.value = "";
                }
              }}
              defaultValue=""
              className="py-2 px-3 rounded-xl bg-surface-container-low text-xs font-semibold text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none w-full sm:w-auto"
            >
              <option value="" disabled>
                Select College to Add...
              </option>
              {availableCollegesToAdd.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.city})
                </option>
              ))}
            </select>
          </div>
        )}

        {comparedColleges.length > 0 ? (
          <div className="neomorphic-card rounded-2xl overflow-hidden border border-outline-variant/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                {/* College Cards Header Row */}
                <thead>
                  <tr className="bg-surface-container-low/80 border-b border-outline-variant/40">
                    <th className="p-5 w-48 text-xs uppercase font-bold text-on-surface">
                      Comparison Metric
                    </th>
                    {comparedColleges.map((college) => (
                      <th key={college.id} className="p-5 align-top min-w-[240px]">
                        <div className="flex flex-col gap-3">
                          <div className="relative h-32 rounded-xl overflow-hidden bg-surface-container-high">
                            <Image
                              src={college.bannerImage}
                              alt={college.name}
                              fill
                              className="object-cover"
                            />
                            <button
                              onClick={() => handleRemoveCollege(college.id)}
                              className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                              title="Remove from comparison"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div>
                            <Link
                              href={`/colleges/${college.slug}`}
                              className="text-sm font-bold text-on-surface hover:text-primary transition-colors line-clamp-2"
                            >
                              {college.name}
                            </Link>
                            <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                              <Building className="w-3 h-3 text-primary shrink-0" />
                              <span>{college.location}</span>
                            </p>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Comparison Matrix Rows */}
                <tbody className="text-xs sm:text-sm text-on-surface-variant divide-y divide-outline-variant/20">
                  {/* Google Rating */}
                  <tr className="hover:bg-surface-container-low/30">
                    <td className="p-4 font-bold text-on-surface">Rating & Reviews</td>
                    {comparedColleges.map((c) => (
                      <td key={c.id} className="p-4">
                        <div className="flex items-center gap-1 font-bold text-on-surface">
                          <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                          <span>{c.rating} / 5.0</span>
                          <span className="text-xs text-on-surface-variant font-normal">
                            ({c.reviewCount} reviews)
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Starting Fees */}
                  <tr className="hover:bg-surface-container-low/30">
                    <td className="p-4 font-bold text-on-surface">Starting Annual Fee</td>
                    {comparedColleges.map((c) => (
                      <td key={c.id} className="p-4 font-extrabold text-primary text-base">
                        {formatCurrency(c.startingFee)}/yr
                      </td>
                    ))}
                  </tr>

                  {/* Accreditation */}
                  <tr className="hover:bg-surface-container-low/30">
                    <td className="p-4 font-bold text-on-surface">Accreditations</td>
                    {comparedColleges.map((c) => (
                      <td key={c.id} className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {c.accreditation?.map((acc, i) => (
                            <span
                              key={i}
                              className="bg-primary-fixed text-primary px-2 py-0.5 rounded text-[11px] font-semibold"
                            >
                              {acc}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Placement Rate & Average Package */}
                  <tr className="hover:bg-surface-container-low/30">
                    <td className="p-4 font-bold text-on-surface">Placement Stats</td>
                    {comparedColleges.map((c) => (
                      <td key={c.id} className="p-4">
                        <div className="font-bold text-on-surface">
                          {c.placementRate || 85}% Placed
                        </div>
                        <div className="text-xs text-on-surface-variant">
                          Avg Package: <strong className="text-primary">{c.averagePackage}</strong>
                        </div>
                        <div className="text-xs text-emerald-700">
                          Highest: {c.highestPackage}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Top Courses */}
                  <tr className="hover:bg-surface-container-low/30">
                    <td className="p-4 font-bold text-on-surface">Key Courses</td>
                    {comparedColleges.map((c) => (
                      <td key={c.id} className="p-4">
                        <ul className="space-y-1 text-xs">
                          {c.courses?.slice(0, 3).map((crs) => (
                            <li key={crs.id} className="flex justify-between gap-1">
                              <span className="font-medium text-on-surface">{crs.courseName}</span>
                              <span className="text-primary font-bold">{formatCurrency(crs.firstYearFee)}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Hostel Availability */}
                  <tr className="hover:bg-surface-container-low/30">
                    <td className="p-4 font-bold text-on-surface">Hostel Facilities</td>
                    {comparedColleges.map((c) => (
                      <td key={c.id} className="p-4">
                        <div className="flex items-center gap-1.5 font-semibold text-on-surface">
                          <Home className="w-4 h-4 text-primary" />
                          <span>{c.hasHostel ? "On-Campus Hostel Available" : "External Student PGs"}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Verification Info */}
                  <tr className="hover:bg-surface-container-low/30">
                    <td className="p-4 font-bold text-on-surface">Data Verification</td>
                    {comparedColleges.map((c) => (
                      <td key={c.id} className="p-4 text-xs text-emerald-800">
                        <div className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified {formatDate(c.lastVerifiedAt)}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Action CTAs */}
                  <tr className="bg-surface-container-low/50">
                    <td className="p-4 font-bold text-on-surface">Take Action</td>
                    {comparedColleges.map((c) => (
                      <td key={c.id} className="p-4">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => {
                              setTargetCollegeForInquiry(c.name);
                              setInquiryModalOpen(true);
                            }}
                            className="btn-primary py-2 rounded-xl text-xs font-bold w-full flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Enquire on WhatsApp</span>
                          </button>
                          <Link
                            href={`/colleges/${c.slug}`}
                            className="btn-secondary py-1.5 rounded-xl text-xs font-semibold text-center"
                          >
                            View Full Profile
                          </Link>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="neomorphic-card rounded-2xl p-12 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary-fixed text-primary flex items-center justify-center">
              <GitCompare className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface font-display mb-1">
                No colleges selected for comparison
              </h3>
              <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                Select 2 or more colleges from our directory to compare their tuition fees, placements, and facilities.
              </p>
            </div>
            <Link
              href="/colleges"
              className="btn-primary px-6 py-2.5 rounded-full text-xs font-bold shadow-md mt-2"
            >
              Browse Colleges Directory
            </Link>
          </div>
        )}
      </main>

      <Footer />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        collegeName={targetCollegeForInquiry}
        title={`Admissions Guidance for ${targetCollegeForInquiry}`}
      />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center">Loading comparison table...</div>}>
      <CompareContent />
    </Suspense>
  );
}
