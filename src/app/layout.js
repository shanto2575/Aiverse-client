import dns from "node:dns";
dns.setServers(['1.1.1.1', '1.0.0.1']);

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Promptly | Premium AI Prompt Ecosystem",
  description: "Discover, create, and share high-quality AI prompts in a premium community ecosystem.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body 
        className={`${inter.className} min-h-screen flex flex-col bg-[#ebdcc9] text-[#2c221e] selection:bg-[#2c221e] selection:text-[#ebdcc9] relative overflow-x-hidden`}
      >
        {/* Header - Fixed or Sticky according to modern UI */}
        <header className="sticky top-0 z-50 border-b border-[#dfcbaf] bg-[#ebdcc9]/90 backdrop-blur-md">
          <Navbar />
        </header>

        {/* Dynamic Main Content with Layout Constraints */}
        <main className="flex-1 w-full relative z-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-[#dfcbaf] bg-[#ebdcc9]">
          <Footer />
        </footer>
         <Toaster />
      </body>
    </html>
  );
}