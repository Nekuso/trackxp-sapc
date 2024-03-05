"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/sapsc-logo-light.png";
import { FcGoogle } from "react-icons/fc";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      let { data: dataUser, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (dataUser) {
        console.log(dataUser);
        router.refresh();
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error);
    }
  };

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm px-5 py-2.5 rounded-md bg-foregroundBg text-white border border-lightBorder"
              />
            </div>
          </div>
          <button
            className="w-full text-white text-sm px-5 py-2.5 text-center  bg-homePrimary font-bold rounded-lg shadow-md hover:shadow-homePrimary transition-all duration-300 "
            onClick={() => handleLogin()}
          >
            Login
          </button>
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
