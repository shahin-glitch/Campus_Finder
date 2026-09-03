"use client";

import React, { useState, useEffect } from "react";
import {
  UserCheck,
  Search,
  Filter,
  MessageCircle,
  Phone,
  Calendar,
  CheckCircle2,
  Trash2,
  Edit,
  Save,
  X,
  Clock,
} from "lucide-react";
import { Inquiry } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState("");

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/inquiries");
      const json = await res.json();
      if (json.success) {
        setInquiries(json.data);
      }
    } catch (err) {
      console.error(err);
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

  const handleSaveNotes = async (id: string) => {
    try {
      const inq = inquiries.find((i) => i.id === id);
      if (!inq) return;

      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: inq.status, counsellorNotes: tempNotes }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, counsellorNotes: tempNotes } : i))
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (statusFilter !== "All" && inq.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        inq.studentName.toLowerCase().includes(term) ||
        inq.whatsappNumber.includes(term) ||
        inq.collegeName.toLowerCase().includes(term) ||
        inq.courseName.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <UserCheck className="w-5 h-5 text-primary" />
            <span className="text-xs uppercase font-bold tracking-widest text-primary">
              Leads & Admission Inquiries Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface font-display">
            Student Inquiries ({inquiries.length})
          </h1>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {["All", "New", "Contacted", "Interested", "Converted", "Closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-container-low text-on-surface hover:bg-surface-container-high border border-outline-variant/40"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="neomorphic-card p-4 rounded-2xl border border-outline-variant/30 flex items-center gap-3">
        <Search className="w-4 h-4 text-outline" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by student name, phone number, college or course..."
          className="w-full bg-transparent text-xs text-on-surface border-none focus:outline-none"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="text-outline hover:text-primary">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Inquiries Cards / Table */}
      <div className="flex flex-col gap-4">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className="neomorphic-card p-5 rounded-2xl border border-outline-variant/30 flex flex-col lg:flex-row justify-between gap-6"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-on-surface font-display">
                      {inq.studentName}
                    </h3>
                    <span className="text-xs text-on-surface-variant flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{formatDate(inq.createdAt)}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-on-surface-variant mb-4">
                    <p>
                      <strong>WhatsApp:</strong>{" "}
                      <a
                        href={`https://wa.me/${inq.whatsappNumber.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-bold hover:underline"
                      >
                        {inq.whatsappNumber}
                      </a>
                    </p>
                    <p><strong>Qualification:</strong> {inq.qualification}</p>
                    <p><strong>Intake:</strong> {inq.preferredIntake || "2026-2027"}</p>
                    <p className="sm:col-span-2">
                      <strong>College:</strong> {inq.collegeName}
                    </p>
                    <p><strong>Course:</strong> {inq.courseName}</p>
                  </div>

                  {/* Counsellor Notes Box */}
                  <div className="bg-surface-container-low p-3 rounded-xl border border-surface-variant/60 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-on-surface">Counsellor Notes:</span>
                      {editingNotesId === inq.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSaveNotes(inq.id)}
                            className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                          >
                            <Save className="w-3 h-3" /> Save
                          </button>
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="text-outline hover:text-primary"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingNotesId(inq.id);
                            setTempNotes(inq.counsellorNotes || "");
                          }}
                          className="text-primary font-semibold hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <Edit className="w-3 h-3" /> Edit Note
                        </button>
                      )}
                    </div>

                    {editingNotesId === inq.id ? (
                      <textarea
                        rows={2}
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="Add notes from student WhatsApp/Phone conversation..."
                        className="w-full rounded-lg bg-white p-2 text-xs text-on-surface border border-primary/40 focus:outline-none"
                      />
                    ) : (
                      <p className="text-on-surface-variant italic">
                        {inq.counsellorNotes || "No notes logged yet."}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Status & Actions Column */}
              <div className="flex flex-row lg:flex-col justify-between items-end gap-3 shrink-0 border-t lg:border-t-0 lg:border-l border-outline-variant/30 pt-3 lg:pt-0 lg:pl-6">
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">
                    Status Pipeline:
                  </label>
                  <select
                    value={inq.status}
                    onChange={(e) =>
                      handleStatusChange(inq.id, e.target.value as Inquiry["status"])
                    }
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold border cursor-pointer ${
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
                    <option value="New">New Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested / Follow-up</option>
                    <option value="Converted">Converted (Admitted)</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <a
                  href={`https://wa.me/${inq.whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="neomorphic-card rounded-2xl p-10 text-center text-xs text-on-surface-variant">
            No inquiries match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
