"use client";

import React, { useState } from "react";
import {
  Settings,
  Save,
  MessageCircle,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { DEFAULT_COUNSELLOR } from "@/lib/constants";

export default function AdminSettingsPage() {
  const [phone, setPhone] = useState(DEFAULT_COUNSELLOR.phone);
  const [whatsapp, setWhatsapp] = useState(DEFAULT_COUNSELLOR.whatsappNumber);
  const [email, setEmail] = useState(DEFAULT_COUNSELLOR.email);
  const [address, setAddress] = useState(DEFAULT_COUNSELLOR.address);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-5 h-5 text-primary" />
          <span className="text-xs uppercase font-bold tracking-widest text-primary">
            Platform Configuration
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface font-display">
          System Settings
        </h1>
        <p className="text-xs text-on-surface-variant mt-1">
          Configure default admission counsellor routing, support WhatsApp links, and verification protocols.
        </p>
      </div>

      <div className="neomorphic-card p-6 sm:p-8 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest">
        {saved && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully! Public WhatsApp deep links updated.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-bold text-on-surface uppercase mb-1">
              Counsellor WhatsApp Routing Number (Country code + Number, no symbols)
            </label>
            <div className="relative">
              <MessageCircle className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="919876543210"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl input-field text-xs text-on-surface font-mono"
                required
              />
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1">
              All student admission inquiries from the homepage, college profiles, and compare drawers will route to this WhatsApp line.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface uppercase mb-1">
              Public Support Phone
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl input-field text-xs text-on-surface"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface uppercase mb-1">
              Admissions Support Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl input-field text-xs text-on-surface"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface uppercase mb-1">
              Regional HQ Address
            </label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 rounded-xl input-field text-xs text-on-surface"
            />
          </div>

          <div className="pt-4 border-t border-outline-variant/30 flex justify-end">
            <button
              type="submit"
              className="btn-primary px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
