import { Schema, model, models } from "mongoose";

// Create Schema for Emails
const emailSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email is already taken."],
      match: [/.+@.+\..+/, "Invalid email format."],
    },
  },
  {
    timestamps: true,
  }
);
const EmailModel = models.Email || model("Email", emailSchema);

export default EmailModel;
