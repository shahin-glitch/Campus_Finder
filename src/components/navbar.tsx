"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X, Headset, Home, BookOpen, GitCompare, Building, Sparkles } from "lucide-react";
import { InquiryModal } from "./inquiry-modal";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Colleges", href: "/colleges", icon: GraduationCap },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Compare", href: "/compare", icon: GitCompare },
    { name: "Stay Finder", href: "/stay", icon: Home, highlight: true },
    { name: "About", href: "/about", icon: Building },
    { name: "Contact", href: "/contact", icon: Headset },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 glass-nav transition-all duration-300">
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-4 md:px-10 h-20">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-primary tracking-tight font-display">
                Campus Finder
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary/70 -mt-1 hidden sm:block">
                College & Stay Guidance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-all duration-200 relative py-1 ${
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary"
                      : "text-on-surface-variant hover:text-primary"
                  } ${link.highlight ? "text-primary/90 hover:text-primary flex items-center gap-1.5" : ""}`}
                >
                  {link.name}
                  {link.highlight && (
                    <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Mangalore
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="hidden lg:inline-flex text-xs font-semibold text-on-surface-variant/80 hover:text-primary px-2.5 py-1 rounded-md hover:bg-surface-container-high transition-colors"
            >
              Admin
            </Link>

            <button
              onClick={() => setInquiryModalOpen(true)}
              className="hidden md:flex items-center gap-2 h-10 px-5 rounded-full btn-primary text-sm font-semibold shadow-sm"
            >
              <Headset className="w-4 h-4" />
              <span>Talk to a Counsellor</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-primary hover:bg-surface-container-high transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-t border-outline-variant/40 px-4 py-6 flex flex-col gap-4 shadow-xl">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </div>
                  {link.highlight && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isActive ? "bg-white text-primary" : "bg-primary/10 text-primary"}`}>
                      Mangalore
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-outline-variant/30 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setInquiryModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 h-12 rounded-xl btn-primary text-sm font-bold shadow-md"
              >
                <Headset className="w-4 h-4" />
                <span>Talk to a Counsellor</span>
              </button>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-surface-container-low text-on-surface-variant text-xs font-semibold"
              >
                Admin Panel Login
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        title="Connect with an Expert Admission Counsellor"
      />
    </>
  );
}
