"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchStudentId } from "@/lib/student/fetchStudentID"; // Function to query DB
import { updateStudentId } from "@/lib/student/updateStudentId";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";

const studentIdSchema = z
  .string()
  .min(9, "Student ID must be at least 9 characters")
  .max(10, "Student ID must not exceed 10 characters");

const StudentDashboard = () => {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // New state to control modal
  const router = useRouter();

  // Fetch student ID from the database on mount
  useEffect(() => {
    const checkStudentId = async () => {
      try {
        const fetchedStudentId = await fetchStudentId(); // Query DB for student ID
        setStudentId(fetchedStudentId);
        setModalOpen(!fetchedStudentId); // Open modal if studentId is null
      } catch (error) {
        console.error("Error fetching student ID:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStudentId();
  }, []);

  const handleSubmit = async () => {
    const validation = studentIdSchema.safeParse(studentId);

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      toast("Error", { description: validation.error.errors[0].message });
      return;
    }

    try {
      const result = await updateStudentId(studentId!);
      if (result) {
        toast("Success", { description: "Student ID saved successfully!" });
        setStudentId(studentId); // Update state to reflect the new ID
        setModalOpen(false); // Close the modal after successful update
        router.refresh();
      }
    } catch (error) {
      toast("Error", { description: "Failed to update Student ID." });
    }
  };

  if (isLoading) return <p>Loading...</p>; // Show loading state while fetching data

  return (
    <Dialog open={modalOpen}>
      <DialogContent>
        <DialogTitle>Set Up Your Account</DialogTitle>
        <DialogDescription>
          You must enter your Student ID to access the platform.
        </DialogDescription>
        <Input
          value={studentId || ""}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end mt-4">
          <Button className="bg-blue-700" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDashboard;
