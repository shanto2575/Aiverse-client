"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, LogIn, UserPlus } from "lucide-react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  // console.log(session)
  const user = session?.user;
  // console.log(user)

  if (pathname.includes('dashboard')) {
    return null;
  }


  const isActive = (path) => pathname === path;
  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  }


  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <nav className="w-full bg-[#ebdcc9] border border-[#dfcbaf] rounded-full px-6 py-3 shadow-md md:shadow-lg flex items-center justify-between transition-all duration-300">

        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl md:text-2xl font-black text-[#2c221e] tracking-tight">
            Alverse
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6 text-sm font-semibold text-[#2c221e]">
            <Link
              href="/"
              className={`hover:opacity-80 transition-opacity ${isActive('/') ? 'underline underline-offset-4 decoration-2 text-orange-700' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/all-prompts"
              className={`hover:opacity-80 transition-opacity ${isActive('/all-prompts') ? 'underline underline-offset-4 decoration-2 text-orange-700' : ''}`}
            >
              All Prompts
            </Link>
          </div>

          {user ? (
            <div className="flex items-center gap-3 sm:gap-4 border-l border-[#dfcbaf] pl-4 sm:pl-6">
              <Link
                href={`/dashboard/${user?.role}`}
                className="flex items-center gap-2 bg-transparent hover:bg-[#9274b9]/20 text-[#8241c3] border border-[#25232c]/15 px-4 py-1.5 rounded-xl text-sm font-bold transition-all duration-200"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="">Dashboard</span>
              </Link>

              <Link href={`/dashboard/${user?.role}`}>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    width={300}
                    height={200}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#2c221e]/30 group-hover:scale-105 transition-transform"
                  />
                  <span className="text-sm font-bold text-[#2c221e] hidden md:inline">
                    {user.name}
                  </span>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-transparent hover:bg-[#2c221e] hover:text-[#ebdcc9] text-[#2c221e] border border-[#2c221e]/20 px-3 py-1.5 rounded-xl text-sm font-bold transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3 border-l border-[#dfcbaf] pl-4 sm:pl-6">
              <Link
                href="/signin"
                className="flex items-center gap-1.5 bg-transparent text-[#2c221e] hover:bg-[#2c221e]/5 px-4 py-2 rounded-xl text-sm font-bold transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>

              <Link
                href="/signup"
                className="flex items-center gap-1.5 bg-[#2c221e] text-[#ebdcc9] hover:bg-[#4a3b35] px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span className=" xs:inline">Register</span>
              </Link>
            </div>
          )}
        </div>

      </nav>
    </div>
  );
}