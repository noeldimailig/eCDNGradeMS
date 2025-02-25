import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
  name: string;
  type: "Laboratory" | "GenEd/ProfEd" | "Physical Education";
  students: mongoose.Types.ObjectId[];
  teacher: mongoose.Types.ObjectId;
}

const courseSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Laboratory", "GenEd/ProfEd", "Physical Education"], required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);