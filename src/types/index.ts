export interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  googleReviewUrl: string;
  startingFee: number;
  highestPackage?: string;
  averagePackage?: string;
  placementRate?: number;
  hasHostel: boolean;
  bannerImage: string;
  logoImage?: string;
  about: string;
  whyChoose?: string[];
  establishedYear?: number;
  accreditation?: string[]; // ['NAAC A++', 'UGC Approved', 'NIRF Rank 40']
  dataSource: string;
  lastVerifiedAt: string;
  isFeatured?: boolean;
  courses?: CollegeCourse[];
  facilities?: Facility[];
  placements?: PlacementRecord;
}

export interface Course {
  id: string;
  name: string;
  slug: string;
  discipline: string; // Engineering, Medical, Management, Computer Apps, Arts & Science, Law, Pharmacy, etc.
  level: string; // UG, PG, Diploma
  duration: string;
  collegeCount?: number;
  avgFee?: number;
}

export interface CollegeCourse {
  id: string;
  collegeId: string;
  courseName: string;
  discipline: string;
  duration: string;
  firstYearFee: number;
  annualFee: number;
  specializations?: string[];
  eligibility: string;
  seats?: number;
}

export interface Facility {
  id: string;
  name: string;
  icon: string;
  category?: string;
}

export interface PlacementRecord {
  id: string;
  collegeId: string;
  year: number;
  placementPercentage: number;
  averagePackage: string;
  highestPackage: string;
  topRecruiters: string[];
  highlights?: string[];
}

export interface Accommodation {
  id: string;
  name: string;
  slug: string;
  type: "Hostel" | "PG" | "Room";
  gender: "Boys" | "Girls" | "Co-ed";
  area: string; // Kottara, Bejai, Kadri, Kankanady, Valencia, Deralakatte, Surathkal
  city: string;
  monthlyPrice: number;
  deposit?: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  images?: string[];
  distanceFromColleges?: { collegeName: string; distance: string }[];
  facilities: string[];
  contactPhone: string;
  whatsappPhone: string;
  availableRooms: number;
  isAvailable: boolean;
  dataSource: string;
  lastVerifiedAt: string;
}

export interface Inquiry {
  id: string;
  studentName: string;
  whatsappNumber: string;
  email?: string;
  collegeName: string;
  courseName: string;
  qualification: string;
  preferredIntake: string;
  message?: string;
  status: "New" | "Contacted" | "Interested" | "Converted" | "Closed";
  counsellorNotes?: string;
  createdAt: string;
}

export interface SiteSettings {
  counsellorPhone: string;
  counsellorEmail: string;
  supportWhatsApp: string;
  announcementText?: string;
}
