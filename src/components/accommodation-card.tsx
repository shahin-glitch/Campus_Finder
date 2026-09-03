"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  Home,
  MessageCircle,
  Users,
  ShieldCheck,
  Navigation,
  CheckCircle2,
} from "lucide-react";
import { Accommodation } from "@/types";
import { generateAccommodationWhatsAppUrl } from "@/lib/whatsapp";
import { formatDate } from "@/lib/utils";

interface AccommodationCardProps {
  accommodation: Accommodation;
}

export function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const whatsAppUrl = generateAccommodationWhatsAppUrl(
    accommodation.name,
    accommodation.area,
    accommodation.monthlyPrice
  );

  return (
    <div className="neomorphic-card flex flex-col overflow-hidden group border border-outline-variant/40 hover:border-primary/40 transition-all duration-300">
      {/* Image Area */}
      <div className="relative h-48 sm:h-56 bg-surface-container-high overflow-hidden">
        <Image
          src={accommodation.mainImage}
          alt={accommodation.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gender / Property Type Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${
              accommodation.gender === "Boys"
                ? "bg-blue-900/90 text-white"
                : accommodation.gender === "Girls"
                ? "bg-rose-900/90 text-white"
                : "bg-purple-900/90 text-white"
            }`}
          >
            {accommodation.gender} {accommodation.type}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3">
          <span className="glass-panel px-2.5 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <span>{accommodation.rating}</span>
          </span>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-primary text-white px-3 py-1 rounded-xl text-sm font-bold shadow-md">
            ₹{accommodation.monthlyPrice.toLocaleString("en-IN")}/mo
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link
              href={`/stay/${accommodation.slug}`}
              className="font-headline text-base sm:text-lg font-bold text-on-background group-hover:text-primary transition-colors line-clamp-1"
            >
              {accommodation.name}
            </Link>
          </div>

          <p className="text-xs text-on-surface-variant flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{accommodation.area}, Mangalore</span>
          </p>

          {/* Distance from Campuses */}
          {accommodation.distanceFromColleges && accommodation.distanceFromColleges.length > 0 && (
            <div className="bg-surface-container-low p-2.5 rounded-xl border border-surface-variant/60 mb-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary mb-1">
                <Navigation className="w-3 h-3" />
                <span>Nearby Campuses:</span>
              </div>
              <ul className="text-[11px] text-on-surface-variant space-y-0.5">
                {accommodation.distanceFromColleges.slice(0, 2).map((dist, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span className="truncate max-w-[160px]">{dist.collegeName}</span>
                    <span className="font-bold text-on-surface">{dist.distance}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Facilities Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {accommodation.facilities.slice(0, 3).map((fac, idx) => (
              <span
                key={idx}
                className="bg-secondary-fixed/50 text-on-secondary-container text-[10px] font-semibold px-2 py-0.5 rounded-md"
              >
                {fac}
              </span>
            ))}
            {accommodation.facilities.length > 3 && (
              <span className="text-[10px] text-on-surface-variant/80 font-semibold self-center">
                +{accommodation.facilities.length - 3} more
              </span>
            )}
          </div>

          {/* Verified Date */}
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 w-fit mb-4">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Verified {formatDate(accommodation.lastVerifiedAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-surface-variant/50">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Enquire on WhatsApp</span>
          </a>

          <Link
            href={`/stay/${accommodation.slug}`}
            className="btn-secondary px-3.5 py-2 rounded-full text-xs font-semibold text-center"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
