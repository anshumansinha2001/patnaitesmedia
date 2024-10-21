import { access, mkdir, writeFile, unlink } from "fs/promises";
import { constants } from "fs";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

// Utility function to upload an image to Cloudinary and convert it to WebP
export async function uploadImageToCloudinary(image, folder) {
  const timestamp = Date.now();
  const buffer = Buffer.from(await image.arrayBuffer());
  const publicDir = "./public";
  const imagePath = `${publicDir}/${timestamp}_${image.name}`;

  // Ensure 'public' directory exists
  await ensureDirectoryExists(publicDir);

  // Save the image temporarily
  await writeFile(imagePath, buffer);

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(imagePath, {
    folder,
    format: "webp", // Convert to WebP
  });

  // Delete the temporarily saved file
  await unlink(imagePath);

  return result.secure_url; // Return Cloudinary URL
}

// Utility function to ensure a directory exists
async function ensureDirectoryExists(directory) {
  try {
    await access(directory, constants.F_OK);
  } catch {
    await mkdir(directory, { recursive: true });
  }
}

// Utility function to delete Cloudinary image
export async function deleteCloudinaryImage(imageUrl, folder) {
  const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID
  await cloudinary.uploader.destroy(`${folder}/${publicId}`);
}

// Utility function to handle errors
export function handleError(message, status = 500) {
  return NextResponse.json(
    {
      success: false,
      error: true,
      message,
    },
    { status }
  );
}
