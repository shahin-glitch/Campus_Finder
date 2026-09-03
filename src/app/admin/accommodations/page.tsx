"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Star,
  CheckCircle2,
  X,
  MessageCircle,
} from "lucide-react";
import { INITIAL_ACCOMMODATIONS } from "@/db/seed-data";
import { Accommodation } from "@/types";
import { formatDate } from "@/lib/utils";
import { MANGALORE_AREAS } from "@/lib/constants";

export default function AdminAccommodationsPage() {
  const [stays, setStays] = useState<Accommodation[]>(INITIAL_ACCOMMODATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStay, setEditingStay] = useState<Accommodation | null>(null);

  const [formData, setFormData] = useState<Partial<Accommodation>>({
    name: "",
    slug: "",
    type: "Hostel",
    gender: "Boys",
    area: "Bejai",
    city: "Mangalore",
    monthlyPrice: 6000,
    deposit: 10000,
    rating: 4.8,
    reviewCount: 50,
    mainImage: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    facilities: ["High-speed Wi-Fi", "Food Included (3 Meals)", "24/7 Security"],
    contactPhone: "+91 98765 43210",
    whatsappPhone: "919876543210",
    availableRooms: 4,
    isAvailable: true,
  });

  const handleOpenCreate = () => {
    setEditingStay(null);
    setFormData({
      name: "",
      slug: "",
      type: "Hostel",
      gender: "Boys",
      area: "Bejai",
      city: "Mangalore",
      monthlyPrice: 6000,
      deposit: 10000,
      rating: 4.8,
      reviewCount: 50,
      mainImage: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      facilities: ["High-speed Wi-Fi", "Food Included (3 Meals)", "24/7 Security"],
      contactPhone: "+91 98765 43210",
      whatsappPhone: "919876543210",
      availableRooms: 4,
      isAvailable: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (stay: Accommodation) => {
    setEditingStay(stay);
    setFormData(stay);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this accommodation?")) {
      setStays(stays.filter((s) => s.id !== id));
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

    if (editingStay) {
      setStays(
        stays.map((s) =>
          s.id === editingStay.id
            ? ({
                ...s,
                ...formData,
                slug,
                lastVerifiedAt: new Date().toISOString(),
              } as Accommodation)
            : s
        )
      );
    } else {
      const newStay: Accommodation = {
        ...formData,
        id: `stay-${Date.now()}`,
        slug,
        lastVerifiedAt: new Date().toISOString(),
        dataSource: "Physical Property Verification",
      } as Accommodation;
      setStays([newStay, ...stays]);
    }

    setModalOpen(false);
  };

  const filteredStays = stays.filter((s) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return s.name.toLowerCase().includes(term) || s.area.toLowerCase().includes(term);
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Home className="w-5 h-5 text-primary" />
            <span className="text-xs uppercase font-bold tracking-widest text-primary">
              Stay Finder Inventory
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface font-display">
            Manage Accommodations ({stays.length})
          </h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Accommodation</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="neomorphic-card p-4 rounded-2xl border border-outline-variant/30 flex items-center gap-3">
        <Search className="w-4 h-4 text-outline" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by property name, area or type..."
          className="w-full bg-transparent text-xs text-on-surface border-none focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="neomorphic-card rounded-2xl overflow-hidden border border-outline-variant/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-xs uppercase font-bold text-on-surface border-b border-outline-variant/30">
                <th className="p-4">Property</th>
                <th className="p-4">Type / Gender</th>
                <th className="p-4">Area</th>
                <th className="p-4">Monthly Rent</th>
                <th className="p-4">Rooms</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs text-on-surface-variant divide-y divide-outline-variant/20">
              {filteredStays.map((stay) => (
                <tr key={stay.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg relative overflow-hidden shrink-0 bg-surface-container-high">
                        <Image
                          src={stay.mainImage}
                          alt={stay.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/stay/${stay.slug}`}
                          target="_blank"
                          className="font-bold text-on-surface hover:text-primary transition-colors line-clamp-1"
                        >
                          {stay.name}
                        </Link>
                        <span className="text-[11px] text-on-surface-variant">
                          Verified {formatDate(stay.lastVerifiedAt)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className="bg-primary-fixed text-primary px-2 py-0.5 rounded text-[11px] font-bold">
                      {stay.gender} {stay.type}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap font-medium text-on-surface">
                    {stay.area}, Mangalore
                  </td>
                  <td className="p-4 font-bold text-primary whitespace-nowrap">
                    ₹{stay.monthlyPrice.toLocaleString("en-IN")}/mo
                  </td>
                  <td className="p-4 whitespace-nowrap font-semibold text-emerald-700">
                    {stay.availableRooms} available
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(stay)}
                        className="p-1.5 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container-high"
                        title="Edit Accommodation"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(stay.id)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100"
                        title="Delete"
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-level-3 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border border-outline-variant/40">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-outline hover:text-primary"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-on-surface font-display mb-4">
              {editingStay ? "Edit Accommodation Details" : "Add Student Accommodation"}
            </h3>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                  Property Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Royal Palms Luxury Boys Hostel"
                  className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                    Property Type
                  </label>
                  <select
                    value={formData.type || "Hostel"}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as Accommodation["type"] })
                    }
                    className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  >
                    <option value="Hostel">Hostel</option>
                    <option value="PG">PG</option>
                    <option value="Room">Room</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender || "Boys"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value as Accommodation["gender"] })
                    }
                    className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  >
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                    <option value="Co-ed">Co-ed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                    Mangalore Area
                  </label>
                  <select
                    value={formData.area || "Bejai"}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  >
                    {MANGALORE_AREAS.filter((a) => a !== "All Areas").map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                    Monthly Rent (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyPrice || 6000}
                    onChange={(e) =>
                      setFormData({ ...formData, monthlyPrice: Number(e.target.value) })
                    }
                    className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                    Available Rooms
                  </label>
                  <input
                    type="number"
                    value={formData.availableRooms || 3}
                    onChange={(e) =>
                      setFormData({ ...formData, availableRooms: Number(e.target.value) })
                    }
                    className="w-full rounded-xl input-field p-2.5 text-xs text-on-surface"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase mb-1">
                  Property Image URL
                </label>
                <input
                  type="url"
                  value={formData.mainImage || ""}
                  onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
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
                  {editingStay ? "Save Changes" : "Create Accommodation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
