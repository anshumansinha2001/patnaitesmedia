import { Schema, model, models } from "mongoose";

// Create Schema for Between Ad
const betweenAdsSchema = new Schema(
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
const BetweenAdsModel =
  models.BetweenAds || model("BetweenAds", betweenAdsSchema);

export default BetweenAdsModel;
