import connectDB from "@/lib/config/db";
import ArticleModel from "@/lib/models/articleModel";
import { NextResponse } from "next/server";
import { writeFile, unlink, fs, mkdir, access } from "fs/promises";
import { constants } from "fs";
import cloudinary from "@/lib/cloudinary";

const LoadDB = async () => {
  await connectDB();
};
LoadDB();

// API Endpoint to get all articles
export async function GET(request) {
  const slug = request.nextUrl.searchParams.get("slug");
  try {
    if (slug) {
      const article = await ArticleModel.findOne({ slug });
      return NextResponse.json({
        success: true,
        article,
      });
    } else {
      const articles = await ArticleModel.find().sort({ createdAt: -1 });
      return NextResponse.json({
        success: true,
        articles,
      });
    }
  } catch (error) {
    console.error("Error fetching articles:", error);

    return NextResponse.json(
      {
        success: false,
        error: true,
        message: error.message || "Failed to fetch articles",
      },
      { status: 500 }
    );
  }
}

// API Endpoint for creating a new article
export async function POST(request) {
  let imagePath = ""; // Store image path to delete later if needed
  try {
    const formData = await request.formData();

    // Validate image
    const image = formData.get("image");
    if (!image) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Image file is required",
        },
        { status: 400 }
      );
    }

    // Convert the image file to buffer
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    // Save the image temporarily on the server (optional)
    const timestamp = Date.now();
    const publicDir = "./public"; // Directory where images will be saved

    // Check if the 'public' directory exists, if not, create it
    try {
      await access(publicDir, constants.F_OK); // Check if directory exists
    } catch (err) {
      await mkdir(publicDir, { recursive: true }); // Create the directory if it doesn't exist
      console.log(`Directory ${publicDir} created.`);
    }

    imagePath = `${publicDir}/${timestamp}_${image.name}`; // Define image path
    await writeFile(imagePath, buffer);

    // Upload the image to Cloudinary and convert it to WebP format
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "patnaitesNews_images", // Optional folder in Cloudinary
      format: "webp", // Convert to WebP
    });

    // Remove the temporarily saved file from the server
    await unlink(imagePath);

    // Prepare the news data with Cloudinary URL
    const newsData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      image: result.secure_url, // Cloudinary URL
      slug: formData.get("slug"),
      author: formData.get("author"),
    };

    // Insert article into the database
    await ArticleModel.create(newsData);
    console.log("News Data inserted successfully");

    // Return success response
    return NextResponse.json({
      success: true,
      message: "New Article inserted successfully",
    });
  } catch (error) {
    // If any error occurs, delete the temporary image file if it exists
    if (imagePath) {
      try {
        await unlink(imagePath); // Remove the temporary image file
        console.log(`Temp image file ${imagePath} deleted due to failure`);
      } catch (deleteError) {
        console.error("Failed to delete temp image file:", deleteError);
      }
    }

    console.error("Error inserting article:", error);

    return NextResponse.json(
      {
        success: false,
        error: true,
        message: error.message || "Failed to insert article",
      },
      { status: 500 }
    );
  }
}

// API Endpoint for updating an article configuration
export async function PUT(request) {
  const id = request.nextUrl.searchParams.get("id"); // Get the article ID from query params

  try {
    const article = await ArticleModel.findById(id);

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Article not found",
        },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    // Check if a new image is provided
    const newImage = formData.get("image");
    let newImageUrl = article.image; // Default to existing image URL

    if (newImage) {
      // Delete old image from Cloudinary
      const oldImageUrl = article.image;
      const oldPublicId = oldImageUrl.split("/").pop().split(".")[0]; // Extract public ID

      try {
        await cloudinary.uploader.destroy(
          `patnaitesNews_images/${oldPublicId}`
        );
        console.log(
          `Cloudinary old image with public ID ${oldPublicId} deleted successfully`
        );
      } catch (err) {
        console.error("Error deleting old image from Cloudinary:", err.message);
      }

      // Convert the new image file to buffer
      const imageByteData = await newImage.arrayBuffer();
      const buffer = Buffer.from(imageByteData);

      // Save the new image temporarily on the server
      const timestamp = Date.now();
      const publicDir = "./public"; // Temp directory for saving image

      // Check if 'public' directory exists, create if not
      try {
        await access(publicDir, constants.F_OK); // Check if directory exists
      } catch (err) {
        await mkdir(publicDir, { recursive: true }); // Create the directory if it doesn't exist
        console.log(`Directory ${publicDir} created.`);
      }

      const newImagePath = `${publicDir}/${timestamp}_${newImage.name}`; // Define image path
      await writeFile(newImagePath, buffer);

      // Upload the new image to Cloudinary and convert it to WebP format
      const result = await cloudinary.uploader.upload(newImagePath, {
        folder: "patnaitesNews_images", // Optional folder in Cloudinary
        format: "webp", // Convert to WebP
      });

      // Remove the temporarily saved new image file
      await unlink(newImagePath);

      // Update the new image URL
      newImageUrl = result.secure_url;
    }

    // Prepare updated news data
    const updatedNewsData = {
      title: formData.get("title") || article.title,
      description: formData.get("description") || article.description,
      category: formData.get("category") || article.category,
      image: newImageUrl, // New image URL or the existing one
      slug: formData.get("slug") || article.slug,
      author: formData.get("author") || article.author,
    };

    // Update the article in the database
    await ArticleModel.findByIdAndUpdate(id, updatedNewsData, { new: true });
    console.log("Article updated successfully");

    return NextResponse.json({
      success: true,
      message: "Article updated successfully",
      updatedArticle: updatedNewsData,
    });
  } catch (error) {
    console.error("Error updating article:", error.message);

    return NextResponse.json(
      {
        success: false,
        error: true,
        message: error.message || "Failed to update article",
      },
      { status: 500 }
    );
  }
}

// API Endpoint for deleting an article configuration
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  try {
    const article = await ArticleModel.findById(id);

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Article not found",
        },
        { status: 404 }
      );
    }

    // Extract the Cloudinary public ID from the stored image URL
    const imageUrl = article.image;
    const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID from the image URL

    // Try to delete the image from Cloudinary
    try {
      await cloudinary.uploader.destroy(`patnaitesNews_images/${publicId}`);
      console.log(
        `Cloudinary image with public ID ${publicId} deleted successfully`
      );
    } catch (err) {
      console.error("Error deleting image from Cloudinary:", err.message);
    }

    // Delete the article from the database after the image is handled
    await ArticleModel.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Article and associated image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting article:", error.message);
    return NextResponse.json(
      {
        success: false,
        error: true,
        message: error.message || "Failed to delete article",
      },
      { status: 500 }
    );
  }
}
