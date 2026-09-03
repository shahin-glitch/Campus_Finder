"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  GraduationCap,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CollegeCard } from "@/components/college-card";
import { ComparisonDrawer } from "@/components/comparison-drawer";
import { INITIAL_COLLEGES } from "@/db/seed-data";
import { College } from "@/types";
import { COLLEGE_CITIES, DISCIPLINES } from "@/lib/constants";

function CollegesDirectoryContent() {
  const searchParams = useSearchParams();

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCities, setSelectedCities] = useState<string[]>(
    searchParams.get("city") ? [searchParams.get("city")!] : []
  );
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(
    searchParams.get("discipline") || ""
  );
  const [selectedFeeRange, setSelectedFeeRange] = useState<string>("");
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyWithHostel, setOnlyWithHostel] = useState<boolean>(false);
  const [minPlacementRate, setMinPlacementRate] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Comparison State
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);

  useEffect(() => {
    const q = searchParams.get("search");
    if (q) setSearchTerm(q);
    const d = searchParams.get("discipline");
    if (d) setSelectedDiscipline(d);
    const c = searchParams.get("city");
    if (c) setSelectedCities([c]);
  }, [searchParams]);

  const handleToggleCity = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

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

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCities([]);
    setSelectedDiscipline("");
    setSelectedFeeRange("");
    setMinRating(0);
    setOnlyWithHostel(false);
    setMinPlacementRate(0);
    setSortBy("recommended");
  };

  // Filtered and sorted colleges
  const filteredColleges = useMemo(() => {
    return INITIAL_COLLEGES.filter((col) => {
      // Search term matching
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchName = col.name.toLowerCase().includes(term);
        const matchLoc = col.location.toLowerCase().includes(term) || col.city.toLowerCase().includes(term);
        const matchAbout = col.about.toLowerCase().includes(term);
        const matchCourses = col.courses?.some(
          (c) =>
            c.courseName.toLowerCase().includes(term) ||
            c.discipline.toLowerCase().includes(term) ||
            c.specializations?.some((s) => s.toLowerCase().includes(term))
        );
        if (!matchName && !matchLoc && !matchAbout && !matchCourses) {
          return false;
        }
      }

      // City filter
      if (selectedCities.length > 0) {
        if (!selectedCities.includes(col.city)) return false;
      }

      // Discipline filter
      if (selectedDiscipline) {
        const hasDiscipline = col.courses?.some(
          (c) => c.discipline.toLowerCase() === selectedDiscipline.toLowerCase()
        );
        if (!hasDiscipline) return false;
      }

      // Fee Range filter
      if (selectedFeeRange) {
        if (selectedFeeRange === "under-1l" && col.startingFee > 100000) return false;
        if (selectedFeeRange === "1l-2.5l" && (col.startingFee < 100000 || col.startingFee > 250000)) return false;
        if (selectedFeeRange === "2.5l-5l" && (col.startingFee < 250000 || col.startingFee > 500000)) return false;
        if (selectedFeeRange === "above-5l" && col.startingFee < 500000) return false;
      }

      // Rating filter
      if (minRating > 0 && col.rating < minRating) return false;

      // Hostel filter
      if (onlyWithHostel && !col.hasHostel) return false;

      // Placement filter
      if (minPlacementRate > 0 && (col.placementRate || 0) < minPlacementRate) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "recommended") {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        return b.rating - a.rating;
      }
      if (sortBy === "rating_desc") return b.rating - a.rating;
      if (sortBy === "fee_asc") return a.startingFee - b.startingFee;
      if (sortBy === "placement_desc") return (b.placementRate || 0) - (a.placementRate || 0);
      if (sortBy === "popular_desc") return b.reviewCount - a.reviewCount;
      return 0;
    });
  }, [
    searchTerm,
    selectedCities,
    selectedDiscipline,
    selectedFeeRange,
    minRating,
    onlyWithHostel,
    minPlacementRate,
    sortBy,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-[1280px] mx-auto w-full px-4 md:px-10">
        {/* Header Title & Mobile Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="text-xs uppercase font-bold tracking-widest text-primary">
                Colleges Directory
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface font-display tracking-tight">
              Explore Top Colleges in Karnataka
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Showing {filteredColleges.length} verified colleges matching your criteria.
            </p>
          </div>

          {/* Sort Control & Mobile Filter Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high text-xs font-bold text-on-surface border border-outline-variant/60"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>Filters</span>
              {(selectedCities.length > 0 || selectedDiscipline || selectedFeeRange || minRating > 0 || onlyWithHostel) && (
                <span className="w-2 h-2 rounded-full bg-primary" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-on-surface-variant whitespace-nowrap hidden sm:inline">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl px-3 py-2 text-xs font-semibold bg-surface-container-low border border-outline-variant/50 text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="rating_desc">Highest Rating</option>
                <option value="placement_desc">Best Placements</option>
                <option value="fee_asc">Lowest Fees</option>
                <option value="popular_desc">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar Filters (Desktop Sticky) */}
          <aside className="hidden md:block md:col-span-4 lg:col-span-3">
            <div className="neomorphic-card p-6 rounded-2xl border border-outline-variant/40 sticky top-28 flex flex-col gap-6 max-h-[calc(100vh-140px)] overflow-y-auto hide-scrollbar">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-surface-variant pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  <h2 className="text-base font-bold text-on-surface font-display">Filters</h2>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Keyword Search */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Keywords
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name, course..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-container-low text-xs text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Discipline Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Discipline / Stream
                </label>
                <select
                  value={selectedDiscipline}
                  onChange={(e) => setSelectedDiscipline(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-surface-container-low text-xs text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none"
                >
                  <option value="">All Disciplines</option>
                  {DISCIPLINES.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City / Location Checkboxes */}
              <div className="flex flex-col gap-2.5">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  City / Location
                </label>
                <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {COLLEGE_CITIES.filter((c) => c !== "All Cities").map((city) => (
                    <label
                      key={city}
                      className="flex items-center gap-2 text-xs text-on-surface cursor-pointer hover:text-primary transition-colors py-0.5"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(city)}
                        onChange={() => handleToggleCity(city)}
                        className="rounded text-primary focus:ring-primary border-outline-variant/60"
                      />
                      <span>{city}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Starting Fee Range */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Annual Starting Fee
                </label>
                <select
                  value={selectedFeeRange}
                  onChange={(e) => setSelectedFeeRange(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-surface-container-low text-xs text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none"
                >
                  <option value="">Any Fee Budget</option>
                  <option value="under-1l">Under ₹1.0 Lakh / yr</option>
                  <option value="1l-2.5l">₹1.0 Lakh – ₹2.5 Lakhs</option>
                  <option value="2.5l-5l">₹2.5 Lakhs – ₹5.0 Lakhs</option>
                  <option value="above-5l">Above ₹5.0 Lakhs</option>
                </select>
              </div>

              {/* Minimum Rating */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Minimum Rating
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: "Any", val: 0 },
                    { label: "4.0+", val: 4.0 },
                    { label: "4.5+", val: 4.5 },
                  ].map((r) => (
                    <button
                      key={r.val}
                      type="button"
                      onClick={() => setMinRating(r.val)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors ${
                        minRating === r.val
                          ? "bg-primary text-white border-primary"
                          : "bg-surface-container-low text-on-surface border-outline-variant/40 hover:border-primary"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hostel Availability & Placement Checkboxes */}
              <div className="flex flex-col gap-2 pt-2 border-t border-surface-variant">
                <label className="flex items-center gap-2 text-xs font-medium text-on-surface cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyWithHostel}
                    onChange={(e) => setOnlyWithHostel(e.target.checked)}
                    className="rounded text-primary focus:ring-primary border-outline-variant/60"
                  />
                  <span>On-Campus Hostel Available</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-on-surface cursor-pointer">
                  <input
                    type="checkbox"
                    checked={minPlacementRate === 90}
                    onChange={(e) => setMinPlacementRate(e.target.checked ? 90 : 0)}
                    className="rounded text-primary focus:ring-primary border-outline-variant/60"
                  />
                  <span>90%+ Placement Rate Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Colleges Listing Area */}
          <section className="col-span-1 md:col-span-8 lg:col-span-9 flex flex-col gap-6">
            {/* Active Filters Tag Pills */}
            {(selectedCities.length > 0 || selectedDiscipline || selectedFeeRange || minRating > 0 || onlyWithHostel) && (
              <div className="flex flex-wrap items-center gap-2 bg-surface-container-low p-3 rounded-xl border border-outline-variant/40 text-xs">
                <span className="font-bold text-primary">Active Filters:</span>
                {selectedCities.map((city) => (
                  <span
                    key={city}
                    className="bg-primary-fixed text-primary px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1"
                  >
                    {city}
                    <button onClick={() => handleToggleCity(city)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedDiscipline && (
                  <span className="bg-primary-fixed text-primary px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    {selectedDiscipline}
                    <button onClick={() => setSelectedDiscipline("")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedFeeRange && (
                  <span className="bg-primary-fixed text-primary px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    {selectedFeeRange}
                    <button onClick={() => setSelectedFeeRange("")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {minRating > 0 && (
                  <span className="bg-primary-fixed text-primary px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    {minRating}+ Stars
                    <button onClick={() => setMinRating(0)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {onlyWithHostel && (
                  <span className="bg-primary-fixed text-primary px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    Hostel Included
                    <button onClick={() => setOnlyWithHostel(false)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-primary font-bold hover:underline ml-auto"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Results Grid */}
            {filteredColleges.length > 0 ? (
              <div className="flex flex-col gap-6">
                {filteredColleges.map((college) => (
                  <CollegeCard
                    key={college.id}
                    college={college}
                    isCompared={selectedColleges.some((c) => c.id === college.id)}
                    onToggleCompare={handleToggleCompare}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="neomorphic-card rounded-2xl p-12 text-center flex flex-col items-center gap-4 my-8">
                <div className="w-16 h-16 rounded-full bg-secondary-fixed text-primary flex items-center justify-center">
                  <Search className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface font-display mb-1">
                    No colleges match your filter criteria
                  </h3>
                  <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                    Try clearing selected filters or searching with alternative keywords such as "NITK", "Aloysius", or "Engineering".
                  </p>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="btn-primary px-6 py-2.5 rounded-full text-xs font-bold shadow-md mt-2"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />

      {/* Comparison Drawer */}
      <ComparisonDrawer
        selectedColleges={selectedColleges}
        onRemove={(id) => setSelectedColleges(selectedColleges.filter((c) => c.id !== id))}
        onClear={() => setSelectedColleges([])}
      />
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center">Loading colleges directory...</div>}>
      <CollegesDirectoryContent />
    </Suspense>
  );
}
