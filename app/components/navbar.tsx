import { Search, MessageCircle, Bell, User } from "lucide-react";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";
import { getUserName } from "@/lib/auth/getUsernameServerAction";

// Fetch role dynamically

const Navbar = async () => {
const userRole = await getUserRole(); 
const userName = await getUserName();
  return (
    <div className="flex items-center justify-between">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Search size={14} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Bell size={20} className="text-gray-500" />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-blue-500 text-white rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="leading-3 font-semibold text-gray-600">{userName}</span>
          <span className="text-xs font-semibold text-gray-400 text-right">{userRole}</span>
        </div>
        <div className="rounded-full w-9 h-9 bg-gray-200 flex items-center justify-center">
          <User size={20} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
