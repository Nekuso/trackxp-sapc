import Navbar from "@/components/navbar";
import Image from "next/image";
import SearchIcon from "@/icons/search-icon.svg";
import AndroidIcon from "@/icons/android-icon.svg";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start place-items-center gap-20">
      <div className="w-full h-auto flex justify-center sticky top-0 shadow-[0 4px 30px rgba(0, 0, 0, 0.1)] bg-[rgba(0, 0, 0, 0.61)] backdrop-blur-sm">
        <Navbar />
      </div>
      <section className="w-full flex flex-col place-items-center gap-7">
        <h1 className="font-black uppercase text-center leading-[120%] text-5xl">
          We take <mark className="text-homePrimary bg-transparent">care</mark>{" "}
          of your
          <br></br>{" "}
          <mark className="text-homePrimary bg-transparent">Vehicle</mark> like
          it’s our own!
        </h1>
        <h5 className="text-lg text-center text-lightGray">
          The best genuine parts and high quality services for your car needs.
          <br></br>
          Only here at Sentro Autoparts!
        </h5>

        <div className="w-full flex justify-center place-items-center gap-4">
          {/* Search Bar */}
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
          {/* Download App */}
          <button className="w-fit h-autp px-5 py-3 flex bg-white border border-white text-black rounded-full text-xs font-bold justify-center place-items-center gap-2">
            <Image
              src={AndroidIcon}
              alt="android icon"
              className="h-full"
            ></Image>
            DOWNLOAD APP
          </button>
        </div>
        <div className="w-fit flex justify-center place-items-center gap-6">
          <div className="w-fit flex justify-center place-items-center gap-3">
            <h1 className="text-5xl font-bold leading-[120%]">30K</h1>
            <p className="text-md leading-[120%]">
              Satisfied <br /> Customers
            </p>
          </div>
          <div className="w-[2px] h-8 bg-lightGray"></div>
          <div className="w-fit flex justify-center place-items-center gap-3">
            <h1 className="text-5xl font-bold leading-[120%]">5K</h1>
            <p className="text-md leading-[120%]">
              Mobile <br /> Downloads
            </p>
          </div>
        </div>
      </section>
      <section className="h-screen"></section>
    </div>
  );
}
