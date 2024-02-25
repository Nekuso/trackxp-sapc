"use client";
import Navbar from "@/components/navbar";
import Image from "next/image";
import SearchIcon from "@/icons/search-icon.svg";
import AndroidIcon from "@/icons/android-icon.svg";
import Object1 from "@/images/home-object-1.png";
import Object2 from "@/images/home-object-2.png";
import Object3 from "@/images/home-object-3.png";
import VideoImage from "@/images/video-image.png";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start place-items-center gap-[15vw] md:gap-28 overflow-hidden">
      <div className="w-full h-auto flex justify-center sticky top-0 z-50 shadow-[0 4px 30px rgba(0, 0, 0, 0.1)] bg-[rgba(0, 0, 0, 0.61)] backdrop-blur-sm">
        <Navbar />
      </div>
      <section className="w-full flex flex-col place-items-center gap-7">
        <h1 className="relative text-[8vw] md:text-5xl font-black uppercase text-center leading-[120%]">
          We take <mark className="text-homePrimary bg-transparent">care</mark>{" "}
          of your
          <br className="hidden md:block"></br>{" "}
          <mark className="text-homePrimary bg-transparent">Vehicle</mark> like
          it’s our own!
          <div className="absolute flex justify-center place-items-center -bottom-[-80%] -right-20 md:bottom-[80%] md:-right-60 w-28 md:w-auto">
            <div className="absolute blob-gradient"></div>
            <Image
              src={Object1}
              alt="Object1"
              className="relative w-full h-full"
            />
          </div>
          <div className="absolute top-[-60%] -left-10 md:top-[-120%] md:-left-44 w-16 md:w-auto">
            <div className="absolute blob-gradient"></div>
            <Image src={Object2} alt="Object2" className="w-full h-full" />
          </div>
          <div className="absolute bottom-[-25%] -left-10 md:bottom-[-260%] md:-left-20 w-20 md:w-auto">
            <div className="absolute blob-gradient"></div>
            <Image src={Object3} alt="Object3" className="w-full h-full" />
          </div>
        </h1>
        <h5 className="text-md md:text-lg text-center text-lightGray">
          The best genuine parts and high quality services for your car needs.
          <br className="hidden md:block"></br>
          Only here at Sentro Autoparts!
        </h5>

        <div className="w-full flex justify-center place-items-center gap-2">
          <div className="w-72 flex justify-center place-items-center border border-lightGray rounded-full px-1 py-1">
            <input
              type="text"
              placeholder="Tracking ID"
              className="w-full h-full bg-transparent outline-none px-4 text-sm"
            />
            <button className="bg-homePrimary p-3 rounded-full shadow-homePrimary">
              <Image
                src={SearchIcon}
                alt="search icon"
                className="w-full h-full"
              ></Image>
            </button>
          </div>
          <button className="flex w-fit h-autp px-7 py-3 bg-white border border-white text-black rounded-full text-xs font-bold justify-center place-items-center gap-2">
            <Image
              src={AndroidIcon}
              alt="android icon"
              className="h-full"
            ></Image>
            DOWNLOAD
          </button>
        </div>
        <div className="w-fit flex justify-center place-items-center gap-6">
          <div className="w-fit flex justify-center place-items-center gap-3">
            <h1 className="text-[8vw] md:text-5xl font-bold leading-[120%]">
              30K
            </h1>
            <p className="text-sm md:text-md leading-[120%]">
              Satisfied <br /> Customers
            </p>
          </div>
          <div className="w-[2px] h-8 bg-lightGray"></div>
          <div className="w-fit flex justify-center place-items-center gap-3">
            <h1 className="text-[8vw] md:text-5xl font-bold leading-[120%]">
              5K
            </h1>
            <p className="text-sm md:text-md leading-[120%]">
              Mobile <br /> Downloads
            </p>
          </div>
        </div>
      </section>
      <section className="h-screen flex justify-center place-items-center">
        <div className="w-full h-full">
          <Image
            src={VideoImage}
            alt="Object1"
            className="w-full opacity-40"
          ></Image>
        </div>
      </section>
    </div>
  );
}
