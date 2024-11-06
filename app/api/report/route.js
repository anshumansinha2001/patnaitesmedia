import connectDB from "@/lib/config/db";
import ReportModel from "@/lib/models/reportModel";
import { NextResponse } from "next/server";

// API insert new Report
export async function POST(request) {
  await connectDB();

  try {
    const { articleSlug, articleImage, articleTitle, reason, description } =
      await request.json();

    await ReportModel.create({
      articleSlug,
      articleImage,
      articleTitle,
      reason,
      description,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting report:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to submit report",
    });
  }
}

// API get all Reports
export async function GET() {
  await connectDB();

  try {
    const reports = await ReportModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch reports",
    });
  }
}

// API delete Report
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id"); // Get the 'id' query param
  await connectDB();

  try {
    const deletedReport = await ReportModel.findByIdAndDelete(id);
    if (!deletedReport) {
      return NextResponse.json({ success: false, message: "Report not found" });
    }
    return NextResponse.json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting report:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete report",
    });
  }
}
