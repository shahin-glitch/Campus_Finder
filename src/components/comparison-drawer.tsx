"use client";

import React from "react";
import Link from "next/link";
import { GitCompare, X, ArrowRight } from "lucide-react";
import { College } from "@/types";

interface ComparisonDrawerProps {
  selectedColleges: College[];
  onRemove: (collegeId: string) => void;
  onClear: () => void;
}

export function ComparisonDrawer({
  selectedColleges,
  onRemove,
  onClear,
}: ComparisonDrawerProps) {
  if (selectedColleges.length === 0) return null;

  const compareUrl = `/compare?ids=${selectedColleges.map((c) => c.id).join(",")}`;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-surface-container-lowest/95 backdrop-blur-xl border border-primary/30 rounded-2xl p-4 shadow-level-3 animate-in slide-in-from-bottom-6 duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-surface">
              Compare Colleges ({selectedColleges.length}/4)
            </h4>
            <p className="text-xs text-on-surface-variant">
              Select up to 4 institutions to compare side-by-side
            </p>
          </div>
        </div>

        {/* Selected Badges */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto py-1 hide-scrollbar">
          {selectedColleges.map((col) => (
            <div
              key={col.id}
              className="flex items-center gap-1.5 bg-primary-fixed text-primary px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
            >
              <span className="truncate max-w-[120px]">{col.name.split(" ")[0]}</span>
              <button
                onClick={() => onRemove(col.id)}
                className="p-0.5 hover:bg-primary/20 rounded-full"
                aria-label="Remove"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
          <button
            onClick={onClear}
            className="text-xs text-on-surface-variant hover:text-primary px-2 py-1"
          >
            Clear
          </button>

          <Link
            href={compareUrl}
            className="btn-primary text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
