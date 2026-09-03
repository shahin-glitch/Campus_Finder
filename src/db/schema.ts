import { pgTable, text, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";

export const colleges = pgTable("colleges", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  location: text("location").notNull(),
  city: text("city").notNull().default("Mangalore"),
  state: text("state").notNull().default("Karnataka"),
  rating: numeric("rating", { precision: 3, scale: 1 }).notNull().default("4.5"),
  reviewCount: integer("review_count").notNull().default(0),
  googleReviewUrl: text("google_review_url").notNull().default("https://maps.google.com"),
  startingFee: integer("starting_fee").notNull().default(100000),
  highestPackage: text("highest_package").default("₹24 LPA"),
  averagePackage: text("average_package").default("₹6.5 LPA"),
  placementRate: integer("placement_rate").default(85),
  hasHostel: boolean("has_hostel").notNull().default(true),
  bannerImage: text("banner_image").notNull(),
  logoImage: text("logo_image"),
  about: text("about").notNull(),
  whyChoose: text("why_choose"), // JSON string array
  establishedYear: integer("established_year").default(2000),
  accreditation: text("accreditation"), // JSON string array (e.g. ["NAAC A++", "UGC Approved"])
  dataSource: text("data_source").notNull().default("Campus Finder Audit"),
  lastVerifiedAt: timestamp("last_verified_at").defaultNow(),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  discipline: text("discipline").notNull(), // Engineering, Medical, Management, etc.
  level: text("level").notNull().default("Undergraduate"),
  duration: text("duration").notNull().default("4 Years"),
  collegeCount: integer("college_count").default(0),
  avgFee: integer("avg_fee").default(150000),
  createdAt: timestamp("created_at").defaultNow(),
});

export const collegeCourses = pgTable("college_courses", {
  id: text("id").primaryKey(),
  collegeId: text("college_id").references(() => colleges.id, { onDelete: "cascade" }).notNull(),
  courseName: text("course_name").notNull(),
  discipline: text("discipline").notNull(),
  duration: text("duration").notNull(),
  firstYearFee: integer("first_year_fee").notNull(),
  annualFee: integer("annual_fee").notNull(),
  specializations: text("specializations"), // JSON array
  eligibility: text("eligibility").notNull(),
  seats: integer("seats"),
});

export const placements = pgTable("placements", {
  id: text("id").primaryKey(),
  collegeId: text("college_id").references(() => colleges.id, { onDelete: "cascade" }).notNull(),
  year: integer("year").notNull().default(2024),
  placementPercentage: integer("placement_percentage").notNull().default(90),
  averagePackage: text("average_package").notNull().default("₹6.5 LPA"),
  highestPackage: text("highest_package").notNull().default("₹28 LPA"),
  topRecruiters: text("top_recruiters"), // JSON array string
  highlights: text("highlights"), // JSON array string
});

export const facilities = pgTable("facilities", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  category: text("category").default("General"),
});

export const collegeFacilities = pgTable("college_facilities", {
  collegeId: text("college_id").references(() => colleges.id, { onDelete: "cascade" }).notNull(),
  facilityId: text("facility_id").references(() => facilities.id, { onDelete: "cascade" }).notNull(),
});

export const accommodations = pgTable("accommodations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(), // Hostel, PG, Room
  gender: text("gender").notNull(), // Boys, Girls, Co-ed
  area: text("area").notNull(), // Kottara, Bejai, Kadri, Kankanady, Valencia, Deralakatte, Surathkal
  city: text("city").notNull().default("Mangalore"),
  monthlyPrice: integer("monthly_price").notNull(),
  deposit: integer("deposit"),
  rating: numeric("rating", { precision: 3, scale: 1 }).notNull().default("4.5"),
  reviewCount: integer("review_count").notNull().default(0),
  mainImage: text("main_image").notNull(),
  images: text("images"), // JSON array
  distanceFromColleges: text("distance_from_colleges"), // JSON array [{collegeName, distance}]
  facilities: text("facilities"), // JSON array
  contactPhone: text("contact_phone").notNull(),
  whatsappPhone: text("whatsapp_phone").notNull(),
  availableRooms: integer("available_rooms").notNull().default(3),
  isAvailable: boolean("is_available").notNull().default(true),
  dataSource: text("data_source").notNull().default("Campus Finder Verified Hostels"),
  lastVerifiedAt: timestamp("last_verified_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: text("id").primaryKey(),
  studentName: text("student_name").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  email: text("email"),
  collegeName: text("college_name").notNull(),
  courseName: text("course_name").notNull(),
  qualification: text("qualification").notNull(),
  preferredIntake: text("preferred_intake"),
  message: text("message"),
  status: text("status").notNull().default("New"), // New, Contacted, Interested, Converted, Closed
  counsellorNotes: text("counsellor_notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const admins = pgTable("admins", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
  id: text("id").primaryKey().default("default"),
  counsellorPhone: text("counsellor_phone").notNull().default("+91 98765 43210"),
  counsellorEmail: text("counsellor_email").notNull().default("admissions@campusfinder.in"),
  supportWhatsApp: text("support_whatsapp").notNull().default("919876543210"),
  announcementText: text("announcement_text"),
  updatedAt: timestamp("updated_at").defaultNow(),
});
