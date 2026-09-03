import React from "react";
import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { DEFAULT_COUNSELLOR } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant/60 w-full mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-primary tracking-tight font-display">
                Campus Finder
              </span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Your trusted, verified discovery and admission counselling platform for premier colleges and student accommodations in Mangalore & Karnataka.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>100% Verified Campus & Fee Data</span>
            </div>
          </div>

          {/* Explore Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-on-surface-variant">
              <li>
                <Link href="/colleges" className="hover:text-primary transition-colors">
                  Colleges Directory
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Top Courses & Degrees
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-primary transition-colors">
                  Compare Colleges
                </Link>
              </li>
              <li>
                <Link href="/stay" className="hover:text-primary transition-colors">
                  Stay Finder (Hostels & PGs)
                </Link>
              </li>
              <li>
                <Link href="/colleges?city=Mangalore" className="hover:text-primary transition-colors">
                  Mangalore Institutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Support & Counsellor */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              Student Counselling
            </h4>
            <div className="flex flex-col gap-3 text-sm text-on-surface-variant">
              <a
                href={`https://wa.me/${DEFAULT_COUNSELLOR.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{DEFAULT_COUNSELLOR.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{DEFAULT_COUNSELLOR.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>MG Road, Mangalore, Karnataka</span>
              </div>
            </div>
          </div>

          {/* Legal & About */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-on-surface-variant">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Campus Finder
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-primary transition-colors">
                  Administrator Portal
                </Link>
              </li>
              <li>
                <span className="text-xs text-on-surface-variant/70">
                  Data updated regularly through direct institutional audits.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-12 pt-8 border-t border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-on-surface-variant">
            © {new Date().getFullYear()} Campus Finder. All rights reserved. All college logos and trademarks belong to their respective institutions.
          </p>
          <p className="text-xs text-on-surface-variant font-medium">
            Verified Educational Guidance for Karnataka
          </p>
        </div>
      </div>
    </footer>
  );
}
