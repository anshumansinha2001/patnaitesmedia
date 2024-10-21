import { Schema, model, models } from "mongoose";

// Create Schema for Bootom Ad
const bottomAdsSchema = new Schema(
  {
    link: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: [true, "Image is required."],
    },
  },
  {
    timestamps: true,
  }
);

// Create a model if it doesn't exist already
const BottomAdsModel = models.BottomAds || model("BottomAds", bottomAdsSchema);

export default BottomAdsModel;
