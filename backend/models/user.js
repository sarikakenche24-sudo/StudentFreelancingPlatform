import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["student", "client", "admin"],
      default: "student"
    },

    college: {
      type: String,
      default: ""
    },

    course: {
      type: String,
      default: ""
    },

    year: {
      type: String,
      default: ""
    },

    bio: {
      type: String,
      default: ""
    },

    skills: {
      type: [String],
      default: []
    },

    github: {
      type: String,
      default: ""
    },

    portfolio: {
      type: String,
      default: ""
    },

    profileImage: {
      type: String,
      default: ""
    },

    rating: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;