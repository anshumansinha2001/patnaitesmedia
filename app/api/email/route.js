import connectDB from "@/lib/config/db";
import EmailModel from "@/lib/models/emailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await connectDB();
};
LoadDB();

// API insert new Email
export async function POST(request) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, error: true, message: "Email is required" },
        { status: 400 }
      );
    }

    // Create the new email entry
    await EmailModel.create({ email });

    return NextResponse.json({
      success: true,
      message: "Email added successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "You have already subscribed.",
        },
        { status: 409 }
      );
    }

    console.error("Error adding email:", error);
    return NextResponse.json(
      { success: false, error: true, message: "Failed to add email" },
      { status: 500 }
    );
  }
}

// API get all Emails
export async function GET(request) {
  try {
    const emails = await EmailModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, emails });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json(
      { success: false, error: true, message: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}

// API delete Email
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Email deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting email:", error);
    return NextResponse.json(
      { success: false, error: true, message: "Failed to delete email" },
      { status: 500 }
    );
  }
}
