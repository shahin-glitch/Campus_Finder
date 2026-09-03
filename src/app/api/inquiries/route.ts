import { NextRequest, NextResponse } from "next/server";
import { InquiryService } from "@/db";
import { inquirySchema } from "@/lib/validation";

export async function GET() {
  try {
    const inquiries = await InquiryService.getAll();
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = inquirySchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, errors: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const newInquiry = await InquiryService.create({
      studentName: validated.data.studentName,
      whatsappNumber: validated.data.whatsappNumber,
      email: validated.data.email || undefined,
      collegeName: validated.data.collegeName,
      courseName: validated.data.courseName,
      qualification: validated.data.qualification,
      preferredIntake: validated.data.preferredIntake || "2026-2027",
      message: validated.data.message || undefined,
    });

    return NextResponse.json({ success: true, data: newInquiry }, { status: 201 });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error submitting inquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, counsellorNotes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updated = await InquiryService.updateStatus(id, status, counsellorNotes);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}
