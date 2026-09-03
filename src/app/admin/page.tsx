"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Home,
  UserCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowUpRight,
  ShieldCheck,
  Filter,
  Plus,
} from "lucide-react";
import { INITIAL_COLLEGES, INITIAL_COURSES, INITIAL_ACCOMMODATIONS } from "@/db/seed-data";
import { Inquiry } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries");
      const json = await res.json();
      if (json.success) {
        setInquiries(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Inquiry["status"]) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Metrics
  const totalColleges = INITIAL_COLLEGES.length;
  const totalCourses = INITIAL_COURSES.length;
  const totalAccommodations = INITIAL_ACCOMMODATIONS.length;
  const totalLeads = inquiries.length;
  const convertedLeads = inquiries.filter((i) => i.status === "Converted").length;
  const newLeads = inquiries.filter((i) => i.status === "New").length;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase font-bold tracking-widest text-on-surface-variant mb-1">
            Overview
          </p>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface font-display tracking-tight">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-on-surface-variant bg-surface-container-high px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-outline-variant/40">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Status: Healthy & Verified
          </span>
        </div>
      </header>

      {/* KPI Stats Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Stat 1: Total Colleges */}
        <div className="neomorphic-card rounded-2xl p-6 border border-outline-variant/30 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Total Colleges
            </span>
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-on-surface font-display">
              {totalColleges}
            </div>
            <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% verified on-site
            </p>
          </div>
        </div>

        {/* Stat 2: Total Courses */}
        <div className="neomorphic-card rounded-2xl p-6 border border-outline-variant/30 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Active Courses
            </span>
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-on-surface font-display">
              {totalCourses}
            </div>
            <p className="text-xs text-on-surface-variant mt-1">Across 6 academic disciplines</p>
          </div>
        </div>

        {/* Stat 3: Total Accommodations */}
        <div className="neomorphic-card rounded-2xl p-6 border border-outline-variant/30 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Stay Listings (Mangalore)
            </span>
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-on-surface font-display">
              {totalAccommodations}
            </div>
            <p className="text-xs text-emerald-700 font-semibold mt-1">Hostels, PGs & Rooms</p>
          </div>
        </div>

        {/* Stat 4: Total Leads */}
        <div className="neomorphic-card rounded-2xl p-6 border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Total Inquiries & Leads
            </span>
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-primary font-display">
              {totalLeads}
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              <strong className="text-primary">{newLeads} new</strong> pending counsellor action
            </p>
          </div>
        </div>

        {/* Stat 5: Converted Students */}
        <div className="neomorphic-card rounded-2xl p-6 border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Confirmed Admissions
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-emerald-700 font-display">
              {convertedLeads}
            </div>
            <p className="text-xs text-emerald-800 font-medium mt-1">
              High-converting WhatsApp lead pipeline
            </p>
          </div>
        </div>

        {/* Stat 6: Conversion Rate */}
        <div className="neomorphic-card rounded-2xl p-6 border border-outline-variant/30 flex flex-col justify-between bg-primary/5">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Lead Conversion Rate
            </span>
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-primary font-display">
              {totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(0) : "0"}%
            </div>
            <p className="text-xs text-on-surface-variant mt-1">Direct admission guidance</p>
          </div>
        </div>
      </section>

      {/* Live Inquiries Pipeline Table */}
      <section className="neomorphic-card rounded-2xl p-6 border border-outline-variant/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-on-surface font-display">
              Recent Admission Inquiries
            </h2>
            <p className="text-xs text-on-surface-variant">
              Manage student leads, trigger WhatsApp counselling, and update lead pipeline status.
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="btn-secondary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 w-fit"
          >
            <span>View Full Lead Desk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-on-surface-variant">
            Loading student inquiries...
          </div>
        ) : inquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-xs uppercase font-bold text-on-surface border-b border-outline-variant/30">
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">WhatsApp / Phone</th>
                  <th className="p-3.5">Target College</th>
                  <th className="p-3.5">Course</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Lead Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs text-on-surface-variant divide-y divide-outline-variant/20">
                {inquiries.slice(0, 6).map((inq) => (
                  <tr key={inq.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="p-3.5 font-bold text-on-surface">
                      {inq.studentName}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <a
                        href={`https://wa.me/${inq.whatsappNumber.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-semibold hover:underline flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{inq.whatsappNumber}</span>
                      </a>
                    </td>
                    <td className="p-3.5 max-w-[180px] truncate" title={inq.collegeName}>
                      {inq.collegeName}
                    </td>
                    <td className="p-3.5">{inq.courseName}</td>
                    <td className="p-3.5 whitespace-nowrap">{formatDate(inq.createdAt)}</td>
                    <td className="p-3.5">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleStatusChange(inq.id, e.target.value as Inquiry["status"])
                        }
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold border ${
                          inq.status === "New"
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : inq.status === "Contacted"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : inq.status === "Interested"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : inq.status === "Converted"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Interested">Interested</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <a
                        href={`https://wa.me/${inq.whatsappNumber.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 shadow-sm"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Chat</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 text-center text-xs text-on-surface-variant">
            No inquiries received yet. Submit an inquiry from the public website to test lead capture.
          </div>
        )}
      </section>
    </div>
  );
}
