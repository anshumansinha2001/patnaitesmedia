import connectDB from "@/lib/config/db";
import ContactModel from "@/lib/models/contactModel";
import { NextResponse } from "next/server";

// API insert new Contact
export async function POST(request) {
  await connectDB();

  try {
    const { name, email, message } = await request.json();

    await ContactModel.create({
      name,
      email,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting contact:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to submit contact",
    });
  }
}

// API get all Contact
export async function GET() {
  await connectDB();

  try {
    const contacts = await ContactModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
}

// API delete Contact
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id"); // Get the 'id' query param
  await connectDB();

  try {
    const deletedContact = await ContactModel.findByIdAndDelete(id);
    if (!deletedContact) {
      return NextResponse.json({
        success: false,
        message: "Contact not found",
      });
    }
    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Contact:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to delete Contact",
    });
  }
}
