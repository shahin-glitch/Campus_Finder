import { z } from "zod";

export const inquirySchema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters").max(100),
  whatsappNumber: z
    .string()
    .min(10, "Please enter a valid 10-digit WhatsApp number")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+\s()-]+$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  collegeName: z.string().min(2, "Please select or specify a college"),
  courseName: z.string().min(1, "Please select a course"),
  qualification: z.string().min(1, "Please select your qualification"),
  preferredIntake: z.string().optional(),
  message: z.string().max(500).optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
