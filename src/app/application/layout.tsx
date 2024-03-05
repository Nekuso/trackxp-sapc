import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import SideBar from "@/components/sidebar/sideBar";
import TopBar from "@/components/topbar/topBar";

const montserrat = Montserrat({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="relative flex place-items-center justify-center w-sreen h-screen bg-darkBg p-8 gap-12 max-md:hidden">
          <SideBar />
          <div className="flex flex-col gap-6 justify-between w-full h-full">
            <TopBar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
