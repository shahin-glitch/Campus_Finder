"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  GraduationCap,
  Home,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Headset,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Leads & Inquiries", href: "/admin/inquiries", icon: UserCheck },
    { name: "Colleges", href: "/admin/colleges", icon: GraduationCap },
    { name: "Accommodations", href: "/admin/accommodations", icon: Home },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-surface-bright text-on-surface antialiased">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-surface-container-lowest border-r border-outline-variant/40 fixed inset-y-0 z-40 p-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold text-primary tracking-tight font-display">
              Campus Finder
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary/70 -mt-1">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1.5 flex-grow">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info & View Website */}
        <div className="pt-6 border-t border-outline-variant/30 flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-between text-xs font-bold text-primary hover:underline px-2"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-3 px-2 pt-2">
            <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center text-xs font-bold shrink-0">
              AU
            </div>
            <div className="overflow-hidden text-left">
              <p className="text-xs font-bold text-on-surface truncate">Admin Desk</p>
              <p className="text-[10px] text-on-surface-variant truncate">admin@campusfinder.in</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-surface-container-lowest border-b border-outline-variant/40 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="text-base font-extrabold text-primary font-display">
              Admin Portal
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-lg text-primary hover:bg-surface-container-high"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Dropdown Nav */}
        {mobileOpen && (
          <div className="md:hidden bg-surface-container-lowest border-b border-outline-variant/40 p-4 flex flex-col gap-2 shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold ${
                    isActive ? "bg-primary text-white" : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="text-xs font-bold text-primary hover:underline px-3 py-2 mt-2 border-t border-outline-variant/30 flex items-center justify-between"
            >
              <span>Back to Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Content Body */}
        <main className="p-4 sm:p-8 lg:p-10 max-w-[1280px] w-full mx-auto flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}
