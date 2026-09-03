import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import {
  INITIAL_COLLEGES,
  INITIAL_COURSES,
  INITIAL_ACCOMMODATIONS,
  INITIAL_INQUIRIES,
} from "./seed-data";
import { College, Accommodation, Course, Inquiry, SiteSettings } from "@/types";
import { DEFAULT_COUNSELLOR } from "@/lib/constants";

// Global in-memory storage for active session CRUD state
let memoryColleges: College[] = [...INITIAL_COLLEGES];
let memoryAccommodations: Accommodation[] = [...INITIAL_ACCOMMODATIONS];
let memoryCourses: Course[] = [...INITIAL_COURSES];
let memoryInquiries: Inquiry[] = [...INITIAL_INQUIRIES];
let memorySettings: SiteSettings = {
  counsellorPhone: DEFAULT_COUNSELLOR.phone,
  counsellorEmail: DEFAULT_COUNSELLOR.email,
  supportWhatsApp: DEFAULT_COUNSELLOR.whatsappNumber,
  announcementText: "Admissions open for 2026-2027 academic session. Talk to our counsellor for direct merit guidance.",
};

// PostgreSQL pool instance if DATABASE_URL is provided
let pool: Pool | null = null;
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    });
    dbInstance = drizzle(pool, { schema });
  } catch (err) {
    console.warn("PostgreSQL connection failed, falling back to verified in-memory store:", err);
  }
}

export const db = dbInstance;

// Data Access Layer
export const CollegeService = {
  async getAll(): Promise<College[]> {
    return memoryColleges;
  },

  async getBySlug(slug: string): Promise<College | null> {
    const college = memoryColleges.find((c) => c.slug === slug);
    return college || null;
  },

  async getById(id: string): Promise<College | null> {
    const college = memoryColleges.find((c) => c.id === id);
    return college || null;
  },

  async create(college: Omit<College, "id">): Promise<College> {
    const newCollege: College = {
      ...college,
      id: `col-${Date.now()}`,
      lastVerifiedAt: new Date().toISOString(),
    };
    memoryColleges.unshift(newCollege);
    return newCollege;
  },

  async update(id: string, updates: Partial<College>): Promise<College | null> {
    const idx = memoryColleges.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    memoryColleges[idx] = {
      ...memoryColleges[idx],
      ...updates,
      lastVerifiedAt: updates.lastVerifiedAt || new Date().toISOString(),
    };
    return memoryColleges[idx];
  },

  async delete(id: string): Promise<boolean> {
    const initialLen = memoryColleges.length;
    memoryColleges = memoryColleges.filter((c) => c.id !== id);
    return memoryColleges.length < initialLen;
  },
};

export const AccommodationService = {
  async getAll(): Promise<Accommodation[]> {
    return memoryAccommodations;
  },

  async getBySlug(slug: string): Promise<Accommodation | null> {
    return memoryAccommodations.find((a) => a.slug === slug) || null;
  },

  async create(acc: Omit<Accommodation, "id">): Promise<Accommodation> {
    const newAcc: Accommodation = {
      ...acc,
      id: `stay-${Date.now()}`,
      lastVerifiedAt: new Date().toISOString(),
    };
    memoryAccommodations.unshift(newAcc);
    return newAcc;
  },

  async update(id: string, updates: Partial<Accommodation>): Promise<Accommodation | null> {
    const idx = memoryAccommodations.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    memoryAccommodations[idx] = {
      ...memoryAccommodations[idx],
      ...updates,
      lastVerifiedAt: updates.lastVerifiedAt || new Date().toISOString(),
    };
    return memoryAccommodations[idx];
  },

  async delete(id: string): Promise<boolean> {
    const initialLen = memoryAccommodations.length;
    memoryAccommodations = memoryAccommodations.filter((a) => a.id !== id);
    return memoryAccommodations.length < initialLen;
  },
};

export const CourseService = {
  async getAll(): Promise<Course[]> {
    return memoryCourses;
  },

  async create(course: Omit<Course, "id">): Promise<Course> {
    const newCourse: Course = {
      ...course,
      id: `course-${Date.now()}`,
    };
    memoryCourses.push(newCourse);
    return newCourse;
  },

  async update(id: string, updates: Partial<Course>): Promise<Course | null> {
    const idx = memoryCourses.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    memoryCourses[idx] = { ...memoryCourses[idx], ...updates };
    return memoryCourses[idx];
  },

  async delete(id: string): Promise<boolean> {
    const initialLen = memoryCourses.length;
    memoryCourses = memoryCourses.filter((c) => c.id !== id);
    return memoryCourses.length < initialLen;
  },
};

export const InquiryService = {
  async getAll(): Promise<Inquiry[]> {
    return memoryInquiries;
  },

  async create(inquiry: Omit<Inquiry, "id" | "status" | "createdAt">): Promise<Inquiry> {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: "New",
      createdAt: new Date().toISOString(),
    };
    memoryInquiries.unshift(newInquiry);
    return newInquiry;
  },

  async updateStatus(
    id: string,
    status: Inquiry["status"],
    counsellorNotes?: string
  ): Promise<Inquiry | null> {
    const idx = memoryInquiries.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    memoryInquiries[idx] = {
      ...memoryInquiries[idx],
      status,
      counsellorNotes: counsellorNotes !== undefined ? counsellorNotes : memoryInquiries[idx].counsellorNotes,
    };
    return memoryInquiries[idx];
  },

  async delete(id: string): Promise<boolean> {
    const initialLen = memoryInquiries.length;
    memoryInquiries = memoryInquiries.filter((i) => i.id !== id);
    return memoryInquiries.length < initialLen;
  },
};

export const SettingsService = {
  async get(): Promise<SiteSettings> {
    return memorySettings;
  },

  async update(updates: Partial<SiteSettings>): Promise<SiteSettings> {
    memorySettings = { ...memorySettings, ...updates };
    return memorySettings;
  },
};
