import Image from "next/image";
import Link from "next/link";
import logo from '@/public/images/CDNLogo.png';
import Menu from "@/app/components/menu";
import Navbar from "@/app/components/navbar";
import { Toaster } from "sonner";

export default function StudentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;    
}>) {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className="fixed w-[20%] md:w-[10%] lg:w-[20%] xl:w-[18%] bg-blue-50 p-4 min-h-screen">
                <div className="border-b mb-4 pb-4 border-gray-300">
                    <Link href="/" className="flex items-center lg:justify-start gap-2 hover:bg-blue-100 rounded transition-colors w-full items-center">
                        <Image src={logo} width={40} height={40} alt="CDN Logo"/>
                        <div className="text-start">
                            <span className="hidden lg:block font-semibold text-blue-800">e-CDNGradeMS</span>
                            <span className="text-xs hidden lg:block font-semibold text-amber-500">Colegio De Naujan</span>
                        </div>
                    </Link>
                </div>
                <Menu/>
            </div>

            {/* Main Content */}
            <div className="ml-[20%] md:ml-[10%] lg:ml-[20%] xl:ml-[18%] w-[80%] md:w-[90%] lg:w-[80%] xl:w-[82%] bg-white rounded-lg p-4 flex-col shadow min-h-screen">
                <div className="border-b mb-4 pb-5 border-gray-300">
                    <Navbar/>
                </div>
                <Toaster/>
                {children}
            </div>
        </div>
    );
}