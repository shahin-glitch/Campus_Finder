import { DEFAULT_COUNSELLOR } from "./constants";

export interface WhatsAppInquiryPayload {
  studentName: string;
  whatsappNumber: string;
  collegeName: string;
  courseName: string;
  qualification: string;
  preferredIntake?: string;
  counsellorPhone?: string;
}

export function generateWhatsAppInquiryUrl(payload: WhatsAppInquiryPayload): string {
  const targetPhone = (payload.counsellorPhone || DEFAULT_COUNSELLOR.whatsappNumber).replace(/\D/g, "");
  
  const textLines = [
    `🎓 *Campus Finder - Admission Inquiry*`,
    ``,
    `Hello Counsellor, I am interested in admission at *${payload.collegeName || "a college"}*.`,
    ``,
    `👤 *Student Name:* ${payload.studentName}`,
    `📱 *WhatsApp:* ${payload.whatsappNumber}`,
    `📚 *Course Interested:* ${payload.courseName}`,
    `🎓 *Highest Qualification:* ${payload.qualification}`,
    payload.preferredIntake ? `🗓 *Preferred Intake:* ${payload.preferredIntake}` : null,
    ``,
    `Please provide fee structure, eligibility criteria, and admission guidance. Thank you!`,
  ].filter(Boolean);

  const message = textLines.join("\n");
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}

export function generateAccommodationWhatsAppUrl(
  propertyName: string,
  propertyArea: string,
  price: number,
  studentName?: string
): string {
  const targetPhone = DEFAULT_COUNSELLOR.whatsappNumber.replace(/\D/g, "");
  
  const textLines = [
    `🏠 *Stay Finder - Accommodation Inquiry*`,
    ``,
    `Hello, I would like to inquire about availability for:`,
    `🏢 *Property:* ${propertyName}`,
    `📍 *Location:* ${propertyArea}, Mangalore`,
    `💰 *Price:* ₹${price.toLocaleString("en-IN")}/month`,
    studentName ? `👤 *My Name:* ${studentName}` : null,
    ``,
    `Please share room availability, food options, and visiting details.`,
  ].filter(Boolean);

  const message = textLines.join("\n");
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}
