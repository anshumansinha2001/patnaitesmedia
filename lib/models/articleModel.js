import { Schema, model, models } from "mongoose";

// Create Schema for Articles
const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      unique: [true, "Title is already taken."],
      trim: true,
      minlength: [5, "Title must be at least 5 characters long."],
    },

    slug: {
      type: String,
      required: [true, "Slug is required."],
      trim: true,
      unique: [true, "Slug is already taken."],
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9-]+$/.test(v);
        },
        message: (props) =>
          `'${props.value}' contains invalid characters! Only letters, numbers, and dashes are allowed.`,
      },
    },

    image: {
      type: String,
      required: [true, "Image is required."],
    },

    description: {
      type: String,
      required: [true, "Description is required."],
      minlength: [40, "Description must be at least 40 characters long."],
    },

    author: {
      type: String,
      required: [true, "Author is required."],
    },

    category: {
      type: String,
      required: [true, "Category is required."],
    },
  },
  {
    timestamps: true,
  }
);

// Automatically lowercase slug before saving
articleSchema.pre("save", async function (next) {
  this.slug = this.slug.toLowerCase();
  next();
});

// Create a model if it doesn't exist already
const ArticleModel = models.Article || model("Article", articleSchema);

export default ArticleModel;
