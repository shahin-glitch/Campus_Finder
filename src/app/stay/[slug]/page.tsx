"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  Home,
  ShieldCheck,
  Phone,
  MessageCircle,
  Navigation,
  CheckCircle2,
  Users,
  CreditCard,
  ArrowRight,
  Wifi,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { INITIAL_ACCOMMODATIONS } from "@/db/seed-data";
import { formatDate } from "@/lib/utils";
import { generateAccommodationWhatsAppUrl } from "@/lib/whatsapp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function StayDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const stay = INITIAL_ACCOMMODATIONS.find((s) => s.slug === slug);

  if (!stay) {
    notFound();
  }

  const whatsAppUrl = generateAccommodationWhatsAppUrl(
    stay.name,
    stay.area,
    stay.monthlyPrice
  );

  const relatedStays = INITIAL_ACCOMMODATIONS.filter((s) => s.id !== stay.id).slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-[1280px] mx-auto w-full px-4 md:px-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-6">
          <Link href="/stay" className="hover:text-primary">
            Stay Finder
          </Link>
          <span>/</span>
          <span className="text-primary font-bold">{stay.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column (Images & Details) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Main Image */}
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-level-1 bg-surface-container-high border border-outline-variant/40">
              <Image
                src={stay.mainImage}
                alt={stay.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary text-white shadow-md">
                  {stay.gender} {stay.type}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="glass-panel px-3 py-1.5 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
                  <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  <span>{stay.rating} ({stay.reviewCount} reviews)</span>
                </span>
              </div>
            </div>

            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface font-display">
                  {stay.name}
                </h1>
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified {formatDate(stay.lastVerifiedAt)}</span>
                </div>
              </div>

              <p className="text-sm text-on-surface-variant flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{stay.area}, Mangalore, Karnataka</span>
              </p>
            </div>

            {/* Pricing Bento */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="neo-card p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low/40">
                <span className="text-xs text-on-surface-variant font-semibold">Monthly Rent</span>
                <div className="text-xl sm:text-2xl font-extrabold text-primary font-display mt-1">
                  ₹{stay.monthlyPrice.toLocaleString("en-IN")}
                </div>
                <span className="text-[11px] text-on-surface-variant">Includes maintenance</span>
              </div>

              <div className="neo-card p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low/40">
                <span className="text-xs text-on-surface-variant font-semibold">Security Deposit</span>
                <div className="text-xl sm:text-2xl font-extrabold text-on-surface font-display mt-1">
                  ₹{(stay.deposit || stay.monthlyPrice * 1.5).toLocaleString("en-IN")}
                </div>
                <span className="text-[11px] text-on-surface-variant">Refundable</span>
              </div>

              <div className="neo-card p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low/40 col-span-2 sm:col-span-1">
                <span className="text-xs text-on-surface-variant font-semibold">Availability</span>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 font-display mt-1">
                  {stay.availableRooms} Rooms
                </div>
                <span className="text-[11px] text-emerald-800 font-semibold">Ready to move in</span>
              </div>
            </div>

            {/* Nearby Campuses */}
            {stay.distanceFromColleges && stay.distanceFromColleges.length > 0 && (
              <div className="neo-card p-6 rounded-2xl border border-outline-variant/30">
                <h3 className="text-base font-bold text-on-surface font-display mb-4 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-primary" />
                  <span>Proximity to Top Mangalore Campuses</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stay.distanceFromColleges.map((d, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-variant/60 text-xs"
                    >
                      <span className="font-semibold text-on-surface">{d.collegeName}</span>
                      <span className="font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded-md">
                        {d.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Facilities & Amenities */}
            <div className="neo-card p-6 rounded-2xl border border-outline-variant/30">
              <h3 className="text-base font-bold text-on-surface font-display mb-4">
                Included Amenities & Services
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {stay.facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-on-surface">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Direct WhatsApp Booking Action) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-6">
              <div className="neo-card p-6 rounded-2xl border border-primary/20 bg-surface-container-lowest shadow-level-2">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct Property Enquiry</span>
                </div>

                <h3 className="text-lg font-bold text-on-surface font-display mb-1">
                  Schedule a Visit or Inquire
                </h3>
                <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                  Chat directly with the property manager to verify room allotment, food menu, and visiting hours.
                </p>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>

                <div className="mt-4 pt-4 border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Contact Phone:</span>
                  <span className="font-bold text-on-surface">{stay.contactPhone}</span>
                </div>
              </div>

              {/* Verified Trust Seal */}
              <div className="neo-card p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Campus Finder Verified</span>
                </div>
                <p className="text-[11px] text-emerald-900/80 leading-relaxed">
                  This accommodation has been physically inspected by our regional field coordinators for hygiene, student safety, and water/power amenities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
