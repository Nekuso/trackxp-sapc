"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/sapsc-logo-light.png";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center place-items-center overflow-hidden">
      <div className="flex flex-col gap-10 p-6 place-items-center md:min-w-[450px] h-auto bg-darkGray rounded-2xl shadow-lg border border-lightBorder">
        <Link href="/">
          <Image src={Logo} alt="Sentro Auto Parts & Service Center" />
        </Link>
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col w-full gap-3">
              <label htmlFor="email" className="text-sm">
                Email:
              </label>
              <input
                title="email"
                type="text"
                placeholder="Enter your email"
                className="w-full text-sm px-5 py-2.5 rounded-md bg-foregroundBg text-white border border-lightBorder "
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <label htmlFor="password" className="text-sm">
                Password:
              </label>
              <input
                title="password"
                type="password"
                placeholder="••••••••••"
                className="w-full text-sm px-5 py-2.5 rounded-md bg-foregroundBg text-white border border-lightBorder"
              />
            </div>
          </div>
          <Link
            href={"/application"}
            className="w-full text-white text-sm px-5 py-2.5 text-center  bg-homePrimary font-bold rounded-lg shadow-md hover:shadow-homePrimary transition-all duration-300 "
          >
            Login
          </Link>
          <div className="w-full flex  justify-center place-items-center text-black text-sm px-5 py-2.5 text-center  bg-white font-bold rounded-lg shadow-xl gap-4 hover:cursor-pointer">
            <FcGoogle className="text-2xl" />
            Login with Google
          </div>
        </div>
        <h3 className="text-white text-sm flex gap-3">
          Having trouble logging in?{" "}
          <Link
            href={"/"}
            className="text-sm font-bold underline underline-offset-4"
          >
            Contact Admin
          </Link>
        </h3>
      </div>
    </div>
  );
}
