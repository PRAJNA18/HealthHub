import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  cardId: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000), // Set cardId to current Unix timestamp
  },
  symptoms: {
    type: String,
    required: true,
  },
  tests: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Normalize email to lowercase
      trim: true, // Trim whitespace from email
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum password length
    },
    age: {
      type: Number,
      required: true,
      min: 0, // Ensure age is a positive number
    },
    weight: {
      type: Number,
      required: true,
      min: 0, // Ensure weight is a positive number
    },
    card: [cardSchema], // Array of cardSchema
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
