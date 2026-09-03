"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Home,
  MapPin,
  SlidersHorizontal,
  X,
  Search,
  Building,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AccommodationCard } from "@/components/accommodation-card";
import { INITIAL_ACCOMMODATIONS } from "@/db/seed-data";
import { Accommodation } from "@/types";
import { MANGALORE_AREAS, ACCOMMODATION_FACILITIES } from "@/lib/constants";

function StayFinderContent() {
  const searchParams = useSearchParams();

  // Filters State
  const [selectedArea, setSelectedArea] = useState<string>(
    searchParams.get("area") || "All Areas"
  );
  const [selectedGender, setSelectedGender] = useState<string>(
    searchParams.get("gender") || "All"
  );
  const [selectedType, setSelectedType] = useState<string>(
    searchParams.get("type") || "All"
  );
  const [priceBudget, setPriceBudget] = useState<string>("");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const a = searchParams.get("area");
    if (a) setSelectedArea(a);
    const g = searchParams.get("gender");
    if (g) setSelectedGender(g);
    const t = searchParams.get("type");
    if (t) setSelectedType(t);
  }, [searchParams]);

  const toggleFacility = (fac: string) => {
    if (selectedFacilities.includes(fac)) {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== fac));
    } else {
      setSelectedFacilities([...selectedFacilities, fac]);
    }
  };

  const clearFilters = () => {
    setSelectedArea("All Areas");
    setSelectedGender("All");
    setSelectedType("All");
    setPriceBudget("");
    setSelectedFacilities([]);
    setSearchTerm("");
  };

  // Filtered accommodations
  const filteredStays = useMemo(() => {
    return INITIAL_ACCOMMODATIONS.filter((stay) => {
      // Area match
      if (selectedArea !== "All Areas" && stay.area !== selectedArea) {
        return false;
      }

      // Gender match
      if (selectedGender !== "All" && stay.gender !== selectedGender) {
        return false;
      }

      // Property type match
      if (selectedType !== "All" && stay.type !== selectedType) {
        return false;
      }

      // Price budget match
      if (priceBudget) {
        if (priceBudget === "under-5k" && stay.monthlyPrice > 5000) return false;
        if (priceBudget === "5k-7k" && (stay.monthlyPrice < 5000 || stay.monthlyPrice > 7000)) return false;
        if (priceBudget === "above-7k" && stay.monthlyPrice < 7000) return false;
      }

      // Facilities match
      if (selectedFacilities.length > 0) {
        const hasAll = selectedFacilities.every((fac) =>
          stay.facilities.includes(fac)
        );
        if (!hasAll) return false;
      }

      // Search keyword match
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchName = stay.name.toLowerCase().includes(term);
        const matchArea = stay.area.toLowerCase().includes(term);
        const matchCollege = stay.distanceFromColleges?.some((d) =>
          d.collegeName.toLowerCase().includes(term)
        );
        if (!matchName && !matchArea && !matchCollege) return false;
      }

      return true;
    });
  }, [
    selectedArea,
    selectedGender,
    selectedType,
    priceBudget,
    selectedFacilities,
    searchTerm,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-[1280px] mx-auto w-full px-4 md:px-10">
        {/* Hero Section */}
        <div className="mb-10 text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <span className="p-1.5 rounded-lg bg-primary-fixed text-primary">
              <Home className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-widest text-primary">
              Stay Finder • Student Accommodation
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-primary font-display tracking-tight mb-3">
            Find a place that feels like home.
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Discover verified student accommodations in Mangalore. Curated Boys hostels, Girls hostels, PGs, and independent rooms close to top college campuses.
          </p>
        </div>

        {/* Layout Wrapper (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <div className="neomorphic-card rounded-2xl p-6 border border-outline-variant/40 flex flex-col gap-6 sticky top-28">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-surface-variant pb-4">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  <h3 className="text-base font-bold text-on-surface font-display">Filters</h3>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Mangalore Area Search & Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Mangalore Neighborhood / Area
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-container-low text-xs font-semibold text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none cursor-pointer"
                  >
                    {MANGALORE_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area === "All Areas" ? "Mangalore (All Areas)" : area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Gender Preference */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Occupant Gender
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                    {["All", "Boys", "Girls"].map((gen) => (
                    <button
                      key={gen}
                      type="button"
                      onClick={() => setSelectedGender(gen)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedGender === gen
                          ? "bg-primary text-white shadow-sm"
                          : "bg-surface-container-low text-on-surface hover:bg-surface-container-high border border-outline-variant/40"
                      }`}
                    >
                      {gen}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Property Type
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                    {["All", "Hostel", "PG"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedType === type
                          ? "bg-primary text-white shadow-sm"
                          : "bg-surface-container-low text-on-surface hover:bg-surface-container-high border border-outline-variant/40"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Price Budget */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Monthly Budget
                </label>
                <select
                  value={priceBudget}
                  onChange={(e) => setPriceBudget(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-surface-container-low text-xs text-on-surface border border-outline-variant/50 focus:border-primary focus:outline-none"
                >
                  <option value="">Any Monthly Price</option>
                  <option value="under-5k">Under ₹5,000 / month</option>
                  <option value="5k-7k">₹5,000 – ₹7,000 / month</option>
                  <option value="above-7k">Above ₹7,000 / month</option>
                </select>
              </div>

              {/* Amenities Checklist */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Desired Amenities
                </label>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                  {ACCOMMODATION_FACILITIES.map((fac) => (
                    <label
                      key={fac}
                      className="flex items-center gap-2 text-xs text-on-surface cursor-pointer hover:text-primary transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFacilities.includes(fac)}
                        onChange={() => toggleFacility(fac)}
                        className="rounded text-primary focus:ring-primary border-outline-variant/60"
                      />
                      <span>{fac}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            {/* Quick Status Bar */}
            <div className="flex justify-between items-center text-xs text-on-surface-variant bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/40">
              <span>
                Found <strong className="text-on-surface">{filteredStays.length}</strong> verified accommodations in Mangalore
              </span>
              {(selectedArea !== "All Areas" || selectedGender !== "All" || selectedType !== "All" || selectedFacilities.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-primary font-bold hover:underline"
                >
                  Clear Active Filters
                </button>
              )}
            </div>

            {filteredStays.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStays.map((stay) => (
                  <AccommodationCard key={stay.id} accommodation={stay} />
                ))}
              </div>
            ) : (
              <div className="neomorphic-card rounded-2xl p-12 text-center flex flex-col items-center gap-4 my-8">
                <div className="w-16 h-16 rounded-full bg-secondary-fixed text-primary flex items-center justify-center">
                  <Home className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface font-display mb-1">
                    No accommodations found in this area
                  </h3>
                  <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                    Try switching to "Mangalore (All Areas)" or clearing selected filters to view available options.
                  </p>
                </div>
                <button
                  onClick={clearFilters}
                  className="btn-primary px-6 py-2.5 rounded-full text-xs font-bold shadow-md mt-2"
                >
                  View All Stays
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function StayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center">Loading Stay Finder...</div>}>
      <StayFinderContent />
    </Suspense>
  );
}
