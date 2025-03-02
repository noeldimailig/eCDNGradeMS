"use client";

import React, { useState, useEffect } from "react";
import { getGrades } from "@/lib/grades/getGrades";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface Grade {
    id: string;
    student_id: string | null;
    studentName: string | null;
    midtermGrade: number | null;
    tentativeFinalGrade: number | null;
    finalGrade: number | null;
    courseId: string | null;
    courseCode: string | null;
    yearLevel: number | null;
    courseDescription: string | null;
    remarks: string | null;
    academicYear: string | null;
    semester: string | null;
}

const GradesPage = () => {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Map tab label to numeric year level
    const yearMap: { [key: string]: number } = {
        "FIRST YEAR": 1,
        "SECOND YEAR": 2,
        "THIRD YEAR": 3,
        "FOURTH YEAR": 4,
    };

    useEffect(() => {
        const fetchGradesData = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedGrades = await getGrades();
                setGrades(fetchedGrades as Grade[]);
            } catch (err: any) {
                setError(err.message || "Failed to fetch grades.");
            } finally {
                setLoading(false);
            }
        };

        fetchGradesData();
    }, []);

    const studentInfo = grades.length > 0 ? grades[0] : null;

    const filterGrades = (yearLevel: number, semester: string) => {
        return grades.filter(
            (grade) => grade.yearLevel === yearLevel && grade.semester === semester
        );
    };

    // Function to get the correct academic year for a given year level
    const getAcademicYear = (yearLevel: number) => {
        const filteredGrades = grades.filter((grade) => grade.yearLevel === yearLevel);
        
        // Find the most recent academic year for the given year level
        if (filteredGrades.length > 0) {
            return filteredGrades[0].academicYear; // Assuming academicYear is consistent for that year level
        }
        return "N/A"; // Fallback in case no grades are found
    };

    return (
        <div>
            <nav className="text-sm mb-4">
                <ul className="flex gap-2 text-gray-500">
                <li>
                    <Link href="/student/dashboard" className="hover:underline">Dashboard</Link>
                </li>
                <li>/</li>
                <li className="text-blue-600 font-medium">Grades</li>
                </ul>
            </nav>

            {loading ?(
                <div className="space-y-3 p-4">
                    <div className="animate-pulse bg-gray-200 h-6 w-1/4 rounded"></div>
                    <div className="animate-pulse bg-gray-300 h-8 w-full rounded"></div>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-gray-200 h-6 w-full rounded"></div>
                    ))}
                </div>
            ) : (
                <Tabs defaultValue="FIRST YEAR" className="w-full">
                    <TabsList className="flex space-x-4 p-5" variant={"underline"}>
                        {Object.keys(yearMap).map((year) => (
                            <TabsTrigger key={year} value={year} variant={"underline"} className="font-semibold text-slate-700">
                                {year}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {Object.keys(yearMap).map((year) => (
                        <TabsContent key={year} value={year} className="p-4">
                            <Table className="min-w-full">
                                <TableHeader className="bg-slate-100">
                                    <TableRow className="bg-slate-700 hover:bg-slate-700">
                                        <TableHead colSpan={6} className="text-white font-semibold text-center">STUDENT INFORMATION</TableHead>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead colSpan={3} className="text-slate-500"><span className="text-slate-600">NAME:</span> {studentInfo?.studentName?.toUpperCase()}</TableHead>
                                        <TableHead colSpan={3} className="text-slate-500"><span className="text-slate-600">DEPARTMENT:</span> BSIS DEPARTMENT</TableHead>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead colSpan={3} className="text-slate-500"><span className="text-slate-600">PROGRAM:</span> BACHELOR OF SCIENCE IN INFORMATION SYSTEMS</TableHead>
                                        <TableHead colSpan={3} className="text-slate-500"><span className="text-slate-600">MAJOR:</span> NONE</TableHead>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead colSpan={3} className="text-slate-500"><span className="text-slate-600">SCHOOL ID:</span> {studentInfo?.student_id}</TableHead>
                                        <TableHead colSpan={3} className="text-slate-500"><span className="text-slate-600">STATUS:</span> CONTINUING</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableHeader className="bg-slate-100">
                                    <TableRow className="bg-slate-700 hover:bg-slate-700">
                                        <TableHead colSpan={6} className="text-white font-semibold text-center">
                                            ACADEMIC YEAR {getAcademicYear(yearMap[year])}
                                        </TableHead>
                                    </TableRow>
                                    <TableRow className="bg-slate-300 hover:bg-slate-300">
                                        <TableHead colSpan={6} className="text-slate-600 font-semibold text-start">FIRST SEMESTER</TableHead>
                                    </TableRow>
                                    <TableRow className="bg-slate-100 hover:bg-slate-100">
                                        <TableHead className="text-slate-600 font-semibold">COURSE CODE</TableHead>
                                        <TableHead className="text-slate-600 font-semibold">COURSE DESCRIPTION</TableHead>
                                        <TableHead className="text-slate-600 font-semibold">MIDTERM GRADE</TableHead>
                                        <TableHead className="text-slate-600 font-semibold">TENTATIVE FINAL GRADE</TableHead>
                                        <TableHead className="text-slate-600 font-semibold">FINAL GRADE</TableHead>
                                        <TableHead className="text-slate-600 font-semibold">REMARKS</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filterGrades(yearMap[year], "FIRST SEMESTER").length > 0 ? (
                                        filterGrades(yearMap[year], "FIRST SEMESTER").map((grade) => (
                                            <TableRow key={grade.id} className="hover:bg-slate-50">
                                                <TableCell>{grade.courseCode}</TableCell>
                                                <TableCell>{grade.courseDescription}</TableCell>
                                                <TableCell>{grade.midtermGrade}</TableCell>
                                                <TableCell>{grade.tentativeFinalGrade}</TableCell>
                                                <TableCell>{grade.finalGrade}</TableCell>
                                                <TableCell>{grade.remarks}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center text-gray-500">
                                                No data available
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                            <Table className="min-w-full">
                                <TableHeader className="bg-slate-100">
                                    <TableRow className="bg-slate-300 hover:bg-slate-300">
                                        <TableHead colSpan={6} className="text-slate-600 font-semibold text-start">SECOND SEMESTER</TableHead>
                                    </TableRow>
                                    <TableRow className="bg-slate-100 hover:bg-slate-100">
                                        <TableHead className="text-slate-600 font-semibold">COURSE CODE</TableHead>
                                        <TableHead className="text-slate-600 font-semibold">COURSE DESCRIPTION</TableHead>
                                        <TableHead className="text-slate-600 font-semibold">MIDTERM GRADE</TableHead>
                                        <TableHead className="text-slate-600 font-semibold">TENTATIVE FINAL GRADE</TableHead>
                                        <TableHead className="text-slate-600 font-semibold">FINAL GRADE</TableHead>
                                        <TableHead className="text-slate-600 font-semibold">REMARKS</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filterGrades(yearMap[year], "SECOND SEMESTER").length > 0 ? (
                                        filterGrades(yearMap[year], "SECOND SEMESTER").map((grade) => (
                                            <TableRow key={grade.id} className="hover:bg-slate-50">
                                                <TableCell>{grade.courseCode}</TableCell>
                                                <TableCell>{grade.courseDescription}</TableCell>
                                                <TableCell>{grade.midtermGrade}</TableCell>
                                                <TableCell>{grade.tentativeFinalGrade}</TableCell>
                                                <TableCell>{grade.finalGrade}</TableCell>
                                                <TableCell>{grade.remarks}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center text-gray-500">
                                                No data available
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TabsContent>
                    ))}
                </Tabs>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default GradesPage;
