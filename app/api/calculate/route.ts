// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/data";
// import Grade, { IGrade } from "@/models/Grade";

// interface RequestBody {
//   courseType: "Laboratory" | "GenEd/ProfEd" | "Physical Education";
//   grades: Omit<IGrade, "student" | "course" | "period" | "finalGrade">;
// }

// export async function POST(request: Request) {
//   await dbConnect();

//   const { courseType, grades }: RequestBody = await request.json();

//   let finalGrade: number;
//   switch (courseType) {
//     case "Laboratory":
//       finalGrade = (grades.quiz * 0.20) + (grades.recitation * 0.10) + (grades.laboratory * 0.30) + (grades.attendance * 0.10) + (grades.majorExam * 0.30);
//       break;
//     case "GenEd/ProfEd":
//       finalGrade = (grades.quiz * 0.15) + (grades.recitation * 0.20) + (grades.attendance * 0.10) + (grades.performance * 0.15) + (grades.requirements * 0.10) + (grades.majorExam * 0.30);
//       break;
//     case "Physical Education":
//       finalGrade = (grades.quiz * 0.15) + (grades.recitation * 0.10) + (grades.attendance * 0.10) + (grades.performance * 0.35) + (grades.requirements * 0.10) + (grades.majorExam * 0.20);
//       break;
//     default:
//       return NextResponse.json({ error: "Invalid course type" }, { status: 400 });
//   }

//   // Save the grade to MongoDB
//   const grade = new Grade({ ...grades, finalGrade, period: "Midterm" }); // Example period
//   await grade.save();

//   return NextResponse.json({ finalGrade }, { status: 200 });
// }