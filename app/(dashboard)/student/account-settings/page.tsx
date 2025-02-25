"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { getSections } from "@/lib/data";

export type Section = {
  id: string;
  name: string;
};

export default function AccountSettings() {
  const [yearLevel, setYearLevel] = useState("Select Year Level");
  const [section, setSection] = useState("Select Section");
  const [status, setStatus] = useState("Select Status");
  const [dbSections, setDbSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const result = await getSections();
        setDbSections(result);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, []);

  // Find the selected section's name based on the `section` state (which holds the ID)
  const selectedSectionName = dbSections.find((sec) => sec.id === section)?.name || "Select Section";

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    console.log("Form submitted!");
    // Access form data
    const formData = new FormData(e.currentTarget);
    const studentId = formData.get("studentId") as string; // Get the Student ID input value
    const yearLevelValue = yearLevel; // Get the selected year level
    const sectionId = section; // Get the selected section ID
    const statusValue = status; // Get the selected status

    // Log or process the form data
    console.log("Form Data:", {
      studentId,
      yearLevel: yearLevelValue,
      sectionId,
      sectionName: selectedSectionName, // Optional: Include the section name for reference
      status: statusValue,
    });
  };

  return (
    <div className="p-4">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-4">
        <ul className="flex gap-2 text-gray-500">
          <li>
            <Link href="/student/dashboard" className="hover:underline">Dashboard</Link>
          </li>
          <li>/</li>
          <li className="text-blue-600 font-medium">Account Settings</li>
        </ul>
      </nav>
      
      {/* Account Settings Form */}
      <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-none max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <Input
              type="text"
              name="studentId" // Add a name attribute to access the value in the form submission
              placeholder="Enter Student ID"
              className="mt-1 border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year Level</label>
            <Select onValueChange={setYearLevel}>
              <SelectTrigger className="mt-1 border border-gray-300 rounded-md p-2 w-full">
                <SelectValue placeholder="Select Year Level">{yearLevel}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st Year">1st Year</SelectItem>
                <SelectItem value="2nd Year">2nd Year</SelectItem>
                <SelectItem value="3rd Year">3rd Year</SelectItem>
                <SelectItem value="4th Year">4th Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Section</label>
            <Select onValueChange={setSection} value={section}>
              <SelectTrigger className="mt-1 border border-gray-300 rounded-md p-2 w-full">
                <SelectValue placeholder="Select Section">{selectedSectionName}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {dbSections.map((sec) => (
                  <SelectItem key={sec.id} value={sec.id}>{sec.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <Select onValueChange={setStatus}>
              <SelectTrigger className="mt-1 border border-gray-300 rounded-md p-2 w-full">
                <SelectValue placeholder="Select Status">{status}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Continuing">Continuing</SelectItem>
                <SelectItem value="Irregular">Irregular</SelectItem>
                <SelectItem value="Transferee">Transferee</SelectItem>
                <SelectItem value="Dropped">Dropped</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition duration-200">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}