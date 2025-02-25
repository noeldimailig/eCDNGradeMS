import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AccountSettings() {
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
      <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-none">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <Input type="text" placeholder="Enter Student ID" className="mt-1 border border-gray-300 rounded-md p-2 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year Level</label>
            <Input type="text" placeholder="Enter Year Level" className="mt-1 border border-gray-300 rounded-md p-2 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Section</label>
            <Input type="text" placeholder="Enter Section" className="mt-1 border border-gray-300 rounded-md p-2 w-full" />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md">Save Changes</Button>
        </form>
      </div>
    </div>
  );
}
