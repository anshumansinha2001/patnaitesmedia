import BottomAdsModel from "@/lib/models/bottomAdsModel";
import { NextResponse } from "next/server";
import {
  deleteCloudinaryImage,
  handleError,
  uploadImageToCloudinary,
} from "@/lib/cloudinaryUtils";

// API Endpoint for creating a new advertisement
export async function POST(request) {
  try {
    const formData = await request.formData();

    // Validate image and link
    const image = formData.get("image");
    const link = formData.get("link");

    // Upload image to Cloudinary
    const imageUrl = await uploadImageToCloudinary(image, "patnaitesAds");

    // Prepare the ad data
    const adData = { image: imageUrl, link };

    // Insert ad into the database
    await BottomAdsModel.create(adData);
    return NextResponse.json({
      success: true,
      message: "New Ad inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting ad:", error);
    return handleError(error.message || "Failed to insert ad");
  }
}

// API Endpoint for updating an advertisement
export async function PUT(request) {
  const id = request.nextUrl.searchParams.get("id");

  try {
    const ad = await BottomAdsModel.findById(id);
    if (!ad) {
      return handleError("Ad not found", 404);
    }

    const formData = await request.formData();
    const newImage = formData.get("image");
    const newLink = formData.get("link") || ad.link;

    // Handle image update if a new image is provided
    let newImageUrl = ad.image;
    if (newImage && newImage.size > 0) {
      await deleteCloudinaryImage(ad.image, "patnaitesAds");
      newImageUrl = await uploadImageToCloudinary(newImage, "patnaitesAds");
    }

    // Prepare updated ad data
    const updatedAdData = { image: newImageUrl, link: newLink };

    // Update the ad in the database
    await BottomAdsModel.findByIdAndUpdate(id, updatedAdData, { new: true });
    return NextResponse.json({
      success: true,
      message: "Ad updated successfully",
      updatedAd: updatedAdData,
    });
  } catch (error) {
    console.error("Error updating ad:", error);
    return handleError(error.message || "Failed to update ad");
  }
}

// API Endpoint for fetching all ads or a specific ad by ID
export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id"); // Get the 'id' query param

  try {
    // If 'id' is present, fetch the specific ad
    if (id) {
      const ad = await BottomAdsModel.findById(id);

      if (!ad) {
        return handleError("Ad not found", 404);
      }

      return NextResponse.json({
        success: true,
        message: "Ad fetched successfully",
        ad,
      });
    } else {
      // Otherwise, fetch all ads
      const ads = await BottomAdsModel.find().sort({ createdAt: -1 });

      return NextResponse.json({
        success: true,
        message: "All ads fetched successfully",
        ads,
      });
    }
  } catch (error) {
    console.error("Error fetching ads:", error);
    return handleError(error.message || "Failed to fetch ads");
  }
}

// API Endpoint for deleting an ad by ID
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id"); // Get the 'id' query param

  if (!id) {
    return handleError("Ad ID is required for deletion", 400);
  }

  try {
    const ad = await BottomAdsModel.findById(id);

    if (!ad) {
      return handleError("Ad not found", 404);
    }

    // Delete the ad image from Cloudinary
    await deleteCloudinaryImage(ad.image, "patnaitesAds");

    // Delete the ad from the database
    await BottomAdsModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Ad deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting ad:", error);
    return handleError(error.message || "Failed to delete ad");
  }
}
