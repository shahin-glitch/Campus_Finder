"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Headset,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DEFAULT_COUNSELLOR } from "@/lib/constants";
import { generateWhatsAppInquiryUrl } from "@/lib/whatsapp";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Admission Guidance");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please fill in your name and phone number.");
      return;
    }

    const waUrl = generateWhatsAppInquiryUrl({
      studentName: name,
      whatsappNumber: phone,
      collegeName: subject,
      courseName: message || "General Consultation",
      qualification: "Student",
    });

    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 max-w-[1280px] mx-auto w-full px-4 md:px-10">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed text-primary text-xs font-bold mb-3">
            <Headset className="w-4 h-4" />
            <span>Student & Parent Helpdesk</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface font-display tracking-tight mb-2">
            Get in Touch with Our Counsellors
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Have questions about college cutoffs, fee structures, or hostel bookings in Mangalore? We are here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="neomorphic-card p-6 rounded-2xl border border-outline-variant/30 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-on-surface">WhatsApp Advisory</h3>
                <p className="text-xs text-on-surface-variant mt-0.5 mb-2">
                  Fastest response within 15 minutes during office hours.
                </p>
                <a
                  href={`https://wa.me/${DEFAULT_COUNSELLOR.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Chat on WhatsApp: +91 {DEFAULT_COUNSELLOR.whatsappNumber.slice(2)}</span>
                </a>
              </div>
            </div>

            <div className="neomorphic-card p-6 rounded-2xl border border-outline-variant/30 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-on-surface">Phone Support</h3>
                <p className="text-xs text-on-surface-variant mt-0.5 mb-2">
                  Monday to Saturday: 9:00 AM – 7:00 PM IST
                </p>
                <span className="text-xs font-bold text-on-surface">{DEFAULT_COUNSELLOR.phone}</span>
              </div>
            </div>

            <div className="neomorphic-card p-6 rounded-2xl border border-outline-variant/30 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-on-surface">Email Inquiries</h3>
                <p className="text-xs text-on-surface-variant mt-0.5 mb-2">
                  Send official documents or campus partnership inquiries.
                </p>
                <span className="text-xs font-bold text-on-surface">{DEFAULT_COUNSELLOR.email}</span>
              </div>
            </div>

            <div className="neomorphic-card p-6 rounded-2xl border border-outline-variant/30 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-on-surface">Regional Headquarters</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {DEFAULT_COUNSELLOR.address}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="neomorphic-card p-8 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest shadow-level-2">
              <h2 className="text-xl font-bold text-on-surface font-display mb-1">
                Send Us a Message
              </h2>
              <p className="text-xs text-on-surface-variant mb-6">
                Fill in your query and we will get back to you via WhatsApp or phone.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ananya Pai"
                        className="w-full rounded-xl input-field p-3 text-xs text-on-surface"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl input-field p-3 text-xs text-on-surface"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full rounded-xl input-field p-3 text-xs text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl input-field p-3 text-xs text-on-surface"
                    >
                      <option value="Admission Guidance">Admission Guidance</option>
                      <option value="Fee Breakdown & Cutoffs">Fee Breakdown & Cutoffs</option>
                      <option value="Hostel / PG Booking">Hostel / PG Booking</option>
                      <option value="College Partnership">College Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                      Your Message / Details
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your current marks, course of interest, or budget..."
                      className="w-full rounded-xl input-field p-3 text-xs text-on-surface"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Message on WhatsApp</span>
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-on-surface font-display">
                    Thank You for Reaching Out!
                  </h3>
                  <p className="text-xs text-on-surface-variant max-w-sm">
                    Our counselling desk will connect with you on WhatsApp shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-primary hover:underline mt-2"
                  >
                    Submit Another Query
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
