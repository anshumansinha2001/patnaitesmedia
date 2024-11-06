import { Schema, model, models } from "mongoose";

// Create Schema for Report
const reportSchema = new Schema(
  {
    articleSlug: {
      type: String,
      required: true,
    },
    articleImage: {
      type: String,
      required: true,
    },
    articleTitle: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const ReportModel = models.Report || model("Report", reportSchema);

export default ReportModel;
