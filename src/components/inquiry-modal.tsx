"use client";

import React, { useState } from "react";
import { X, MessageCircle, Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { generateWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { inquirySchema, InquiryFormData } from "@/lib/validation";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  collegeName?: string;
  courseName?: string;
  title?: string;
}

export function InquiryModal({
  isOpen,
  onClose,
  collegeName = "",
  courseName = "",
  title = "Get Free Admission Counselling & Details",
}: InquiryModalProps) {
  const [formData, setFormData] = useState<InquiryFormData>({
    studentName: "",
    whatsappNumber: "",
    email: "",
    collegeName: collegeName || "St. Aloysius Institute of Technology & Management",
    courseName: courseName || "B.Tech Computer Science & Engineering",
    qualification: "12th Science / PUC",
    preferredIntake: "2026-2027",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = inquirySchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      // 1. Submit inquiry to API
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // 2. Generate WhatsApp link
      const waUrl = generateWhatsAppInquiryUrl({
        studentName: formData.studentName,
        whatsappNumber: formData.whatsappNumber,
        collegeName: formData.collegeName,
        courseName: formData.courseName,
        qualification: formData.qualification,
        preferredIntake: formData.preferredIntake,
      });

      setWhatsAppUrl(waUrl);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      // Fallback: still generate WhatsApp URL
      const waUrl = generateWhatsAppInquiryUrl({
        studentName: formData.studentName,
        whatsappNumber: formData.whatsappNumber,
        collegeName: formData.collegeName,
        courseName: formData.courseName,
        qualification: formData.qualification,
        preferredIntake: formData.preferredIntake,
      });
      setWhatsAppUrl(waUrl);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-level-3 p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border border-outline-variant/50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-primary-fixed text-primary">
                <MessageCircle className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-bold tracking-widest text-primary">
                Direct Counsellor Desk
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-2 font-display">
              {title}
            </h3>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              Fill out this quick form to receive official fee breakdowns, eligibility criteria, and instant guidance directly on WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Student Name */}
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-xl input-field p-3 text-sm text-on-surface"
                />
                {errors.studentName && (
                  <p className="text-xs text-red-600 mt-1">{errors.studentName}</p>
                )}
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl input-field p-3 text-sm text-on-surface"
                />
                {errors.whatsappNumber && (
                  <p className="text-xs text-red-600 mt-1">{errors.whatsappNumber}</p>
                )}
              </div>

              {/* Target College */}
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  College Interested In <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  placeholder="College Name"
                  className="w-full rounded-xl input-field p-3 text-sm text-on-surface"
                />
                {errors.collegeName && (
                  <p className="text-xs text-red-600 mt-1">{errors.collegeName}</p>
                )}
              </div>

              {/* Course */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                    Course <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    placeholder="e.g. B.Tech CSE / MBA"
                    className="w-full rounded-xl input-field p-3 text-sm text-on-surface"
                  />
                  {errors.courseName && (
                    <p className="text-xs text-red-600 mt-1">{errors.courseName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                    Current Qualification <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full rounded-xl input-field p-3 text-sm text-on-surface"
                  >
                    <option value="12th Science / PUC">12th Science / PUC</option>
                    <option value="12th Commerce">12th Commerce</option>
                    <option value="12th Arts">12th Arts</option>
                    <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                    <option value="Undergraduate (Graduated)">Undergraduate (Graduated)</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
              </div>

              {/* Preferred Intake */}
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  Preferred Intake
                </label>
                <select
                  value={formData.preferredIntake}
                  onChange={(e) => setFormData({ ...formData, preferredIntake: e.target.value })}
                  className="w-full rounded-xl input-field p-3 text-sm text-on-surface"
                >
                  <option value="2026-2027 (Immediate)">2026-2027 (Immediate)</option>
                  <option value="2027-2028 (Next Year)">2027-2028 (Next Year)</option>
                  <option value="Lateral Entry">Lateral Entry</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 rounded-xl font-semibold text-sm mt-3 flex justify-center items-center gap-2 shadow-md hover:scale-[1.01]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Saving & Connecting...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    <span>Submit & Open WhatsApp</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-on-surface-variant/80 mt-1">
                🔒 Your details are 100% private. We connect you directly with authorized counsellors.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-on-surface font-display mb-1">
                Inquiry Submitted Successfully!
              </h3>
              <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
                Your admission request has been recorded. Click below to launch WhatsApp and start chatting with your allocated counsellor immediately.
              </p>
            </div>

            <div className="w-full bg-surface-container-low p-4 rounded-xl border border-outline-variant/40 text-left text-xs text-on-surface-variant space-y-1 my-2">
              <p><strong className="text-on-surface">Student:</strong> {formData.studentName}</p>
              <p><strong className="text-on-surface">Target College:</strong> {formData.collegeName}</p>
              <p><strong className="text-on-surface">Course:</strong> {formData.courseName}</p>
            </div>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Chat with Counsellor on WhatsApp</span>
            </a>

            <button
              onClick={onClose}
              className="text-xs font-semibold text-on-surface-variant hover:text-primary mt-2"
            >
              Done / Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
