import { Schema, model, models } from "mongoose";

// Create Schema for Contact
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const ContactModel = models.Contact || model("Contact", contactSchema);

export default ContactModel;
