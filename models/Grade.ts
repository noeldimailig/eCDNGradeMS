import mongoose, { Document, Schema } from "mongoose";

export interface IGrade extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  quiz: number;
  recitation: number;
  laboratory: number;
  attendance: number;
  performance: number;
  requirements: number;
  majorExam: number;
  period: "Midterm" | "Finals";
  finalGrade: number;
}

const gradeSchema: Schema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  quiz: { type: Number, default: 0 },
  recitation: { type: Number, default: 0 },
  laboratory: { type: Number, default: 0 },
  attendance: { type: Number, default: 0 },
  performance: { type: Number, default: 0 },
  requirements: { type: Number, default: 0 },
  majorExam: { type: Number, default: 0 },
  period: { type: String, enum: ["Midterm", "Finals"], required: true },
  finalGrade: { type: Number, default: 0 },
});

export default mongoose.models.Grade || mongoose.model<IGrade>("Grade", gradeSchema);