"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles, MapPin, BookOpen, GraduationCap } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  initialQuery?: string;
  className?: string;
}

export function SearchBar({
  placeholder = "Search colleges, courses or locations (e.g. NITK, Surathkal, B.Tech, MBA)...",
  initialQuery = "",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) {
      router.push("/colleges");
    } else {
      router.push(`/colleges?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const quickPills = [
    { label: "Engineering Mangalore", q: "Engineering Mangalore" },
    { label: "NITK Surathkal", q: "NITK" },
    { label: "Medical / MBBS", q: "Medical" },
    { label: "B.Tech AI & Data Science", q: "Data Science" },
    { label: "Hostels in Bejai", q: "Bejai" },
  ];

  return (
    <div className={`w-full ${className}`}>
      <form
        onSubmit={handleSearch}
        className="w-full neomorphic-card rounded-2xl p-2.5 sm:p-3 flex flex-col md:flex-row gap-2.5 items-center border border-outline-variant/40 focus-within:border-primary/60 transition-all shadow-level-1"
      >
        <div className="flex-1 w-full relative flex items-center">
          <Search className="w-5 h-5 text-outline absolute left-4 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className="w-full h-12 sm:h-14 pl-12 pr-4 rounded-xl bg-surface-container-low/50 text-sm sm:text-base text-on-surface placeholder:text-outline border border-transparent focus:border-primary/40 focus:bg-white focus:outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto h-12 sm:h-14 px-7 rounded-xl btn-primary font-bold text-sm sm:text-base flex items-center justify-center gap-2 whitespace-nowrap shadow-md shrink-0"
        >
          <span>Search Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Suggested Quick Searches */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-on-surface-variant">
        <span className="font-semibold text-primary flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Popular:
        </span>
        {quickPills.map((pill) => (
          <button
            key={pill.q}
            type="button"
            onClick={() => {
              setQuery(pill.q);
              router.push(`/colleges?search=${encodeURIComponent(pill.q)}`);
            }}
            className="bg-surface-container-low hover:bg-primary-fixed hover:text-primary px-3 py-1 rounded-full text-xs font-medium border border-outline-variant/30 transition-colors"
          >
            {pill.label}
          </button>
        ))}
      </div>
    </div>
  );
}
