"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Star,
  CheckCircle2,
  X,
} from "lucide-react";
import { INITIAL_COLLEGES } from "@/db/seed-data";
import { College } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminCollegesPage() {
  const [colleges, setColleges] = useState<College[]>(INITIAL_COLLEGES);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState<College | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<College>>({
    name: "",
    slug: "",
    location: "",
    city: "Mangalore",
    state: "Karnataka",
    rating: 4.8,
    reviewCount: 100,
    googleReviewUrl: "https://maps.google.com",
    startingFee: 150000,
    placementRate: 90,
    hasHostel: true,
    bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80",
    about: "",
    dataSource: "Campus Finder Audit",
  });

  const handleOpenCreate = () => {
    setEditingCollege(null);
    setFormData({
      name: "",
      slug: "",
      location: "",
      city: "Mangalore",
      state: "Karnataka",
      rating: 4.8,
      reviewCount: 100,
      googleReviewUrl: "https://maps.google.com",
      startingFee: 150000,
      placementRate: 90,
      hasHostel: true,
      bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80",
      about: "A premier educational institution in Karnataka.",
      dataSource: "Campus Finder Audit",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (college: College) => {
    setEditingCollege(college);
    setFormData(college);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this college profile?")) {
      setColleges(colleges.filter((c) => c.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const slug =
      formData.slug ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (editingCollege) {
      // Update
      setColleges(
        colleges.map((c) =>
          c.id === editingCollege.id
            ? ({
                ...c,
                ...formData,
                slug,
                lastVerifiedAt: new Date().toISOString(),
              } as College)
            : c
        )
      );
    } else {
      // Create
      const newCol: College = {
        ...formData,
        id: `col-${Date.now()}`,
        slug,
        lastVerifiedAt: new Date().toISOString(),
        reviewCount: formData.reviewCount || 50,
      } as College;
      setColleges([newCol, ...colleges]);
    }

    setModalOpen(false);
  };

  const filteredColleges = colleges.filter((c) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(term) ||
      c.location.toLowerCase().includes(term) ||
      c.city.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-xs uppercase font-bold tracking-widest text-primary">
              Institutional Database
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface font-display">
            Manage Colleges ({colleges.length})
          </h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New College</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="neomorphic-card p-4 rounded-2xl border border-outline-variant/30 flex items-center gap-3">
        <Search className="w-4 h-4 text-outline" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by college name, city or location..."
          className="w-full bg-transparent text-xs text-on-surface border-none focus:outline-none"
        />
      </div>

      {/* Colleges Table */}
      <div className="neomorphic-card rounded-2xl overflow-hidden border border-outline-variant/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-xs uppercase font-bold text-on-surface border-b border-outline-variant/30">
                <th className="p-4">College</th>
                <th className="p-4">Location</th>
                <th className="p-4">Starting Fee</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Verified Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs text-on-surface-variant divide-y divide-outline-variant/20">
              {filteredColleges.map((col) => (
                <tr key={col.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg relative overflow-hidden shrink-0 bg-surface-container-high">
                        <Image
                          src={col.bannerImage}
                          alt={col.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/colleges/${col.slug}`}
                          target="_blank"
                          className="font-bold text-on-surface hover:text-primary transition-colors line-clamp-1"
                        >
                          {col.name}
                        </Link>
                        <span className="text-[11px] text-on-surface-variant">
                          {col.accreditation?.[0] || "Autonomous"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">{col.location}</td>
                  <td className="p-4 font-bold text-primary whitespace-nowrap">
                    {formatCurrency(col.startingFee)}/yr
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 font-bold text-on-surface">
                      <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                      <span>{col.rating}</span>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap text-[11px] text-emerald-800">
                    {formatDate(col.lastVerifiedAt)}
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(col)}
                        className="p-1.5 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container-high"
                        title="Edit College"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(col.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100"
                        title="Delete College"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-level-3 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border border-outline-variant/40">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-outline hover:text-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-on-surface font-display mb-4">
              {editingCollege ? "Edit College Information" : "Add New College Profile"}
            </h3>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                  College Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sahyadri College of Engineering"
                  className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                    Location / Area
                  </label>
                  <input
                    type="text"
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Adyar, Mangalore"
                    className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city || ""}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Mangalore"
                    className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                    Starting Annual Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.startingFee || 150000}
                    onChange={(e) =>
                      setFormData({ ...formData, startingFee: Number(e.target.value) })
                    }
                    className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                    Placement Rate (%)
                  </label>
                  <input
                    type="number"
                    value={formData.placementRate || 90}
                    onChange={(e) =>
                      setFormData({ ...formData, placementRate: Number(e.target.value) })
                    }
                    className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                    Star Rating (0-5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.rating || 4.8}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: Number(e.target.value) })
                    }
                    className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                  Official Google Review / Maps URL
                </label>
                <input
                  type="url"
                  value={formData.googleReviewUrl || ""}
                  onChange={(e) => setFormData({ ...formData, googleReviewUrl: e.target.value })}
                  placeholder="https://maps.google.com/..."
                  className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  value={formData.bannerImage || ""}
                  onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                  About & Institutional Highlights
                </label>
                <textarea
                  rows={3}
                  value={formData.about || ""}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2 rounded-xl text-xs font-bold shadow-md"
                >
                  {editingCollege ? "Save Changes" : "Create College"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
