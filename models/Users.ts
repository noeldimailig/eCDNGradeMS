import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "teacher" | "student" | "admin" | "parent";
  courses: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["teacher", "student", "admin", "parent"], required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);