import React from "react";
import { ShieldCheck, Info } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface VerifiedBadgeProps {
  lastVerifiedAt?: string | Date | null;
  dataSource?: string;
  className?: string;
  showSource?: boolean;
}

export function VerifiedBadge({
  lastVerifiedAt,
  dataSource = "Campus Finder Audit",
  className = "",
  showSource = true,
}: VerifiedBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 ${className}`}
      title={`Information verified directly by ${dataSource}`}
    >
      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
      <span>Verified {formatDate(lastVerifiedAt)}</span>
      {showSource && dataSource && (
        <span className="hidden sm:inline text-emerald-700/80 font-normal">
          • {dataSource}
        </span>
      )}
    </div>
  );
}
