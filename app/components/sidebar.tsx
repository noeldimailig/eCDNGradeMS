import Link from "next/link";

interface SidebarLink {
  href: string;
  label: string;
}

export default function Sidebar({ role }: { role: string }) {
  let links: SidebarLink[] = [];

  if (role === "student") {
    links = [
      { href: "/dashboard/student", label: "Dashboard" },
      { href: "/dashboard/student/class", label: "Class" },
      { href: "/dashboard/student/personal-info", label: "Personal Info" },
      { href: "/dashboard/student/family-info", label: "Family Info" },
    ];
  } else if (role === "instructor") {
    links = [
      { href: "/dashboard/instructor", label: "Dashboard" },
      { href: "/dashboard/instructor/courses", label: "Courses" },
    ];
  } else if (role === "admin") {
    links = [
      { href: "/dashboard/admin", label: "Dashboard" },
      { href: "/dashboard/admin/manage-users", label: "Manage Users" },
    ];
  }

  return (
    <nav className="w-64 bg-gray-800 text-white h-screen p-4">
      <ul>
        {links.map((link) => (
          <li key={link.href} className="mb-2">
            <Link href={link.href} className="block p-2 hover:bg-gray-700 rounded">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
