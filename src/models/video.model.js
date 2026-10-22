
import mongoose from "mongoose";

// TASK 1 — Define the Video schema with validation rules.
// The schema determines which fields a video contains
// and which values are allowed.

const videoSchema = new mongoose.Schema(
  {
    // Video title is required, trimmed, and limited to 120 characters.
    title: {
      type: String,
      required: [true, "Video title is required"],
      trim: true,
      maxlength: [120, "Video title cannot exceed 120 characters"],
    },

    // Reference to the Channel document that owns this video.
    // ObjectId is used to identify a MongoDB document.
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: [true, "Channel ID is required"],
    },

    // Slug is required, stored in lowercase, and must be unique.
    // MongoDB must have the corresponding unique index to enforce
    // uniqueness at the database level.
    slug: {
      type: String,
      required: [true, "Video slug is required"],
      unique: true,
      lowercase: true,
    },

    // Views defaults to zero and cannot be negative.
    views: {
      type: Number,
      default: 0,
      min: [0, "Views cannot be negative"],
    },

    // Status can only be "draft" or "published".
    // New videos default to "draft".
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },

  // Automatically add createdAt and updatedAt timestamps.
  {
    timestamps: true,
  }
);

// Create and export the Video model using a named export.
// Controllers can import it with:
// import { Video } from "../models/video.model.js";
const Video = mongoose.model("Video", videoSchema);

export { Video };
export default Video;
