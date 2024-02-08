import Navbar from "@/components/navbar";
import Image from "next/image";
import SearchIcon from "@/icons/search-icon.svg";
import AndroidIcon from "@/icons/android-icon.svg";

export default function landingPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start place-items-center gap-16">
      <Navbar />
      <section className="w-full flex flex-col place-items-center gap-7">
        <h1 className="text-5xl font-black uppercase text-center leading-[120%]">
          We take <mark className="text-homePrimary bg-transparent">care</mark>{" "}
          of your
          <br></br>{" "}
          <mark className="text-homePrimary bg-transparent">Vehicle</mark> like
          it’s our own!
        </h1>
        <h5 className="text-lg text-center text-gray">
          The best genuine parts and high quality services for your car needs.
          <br></br>
          Only here at Sentro Autoparts!
        </h5>
        <div className="w-full flex justify-center place-items-center gap-4">
          <div className="w-72 flex justify-center place-items-center border border-white rounded-full px-2 py-2">
            <input
              type="text"
              placeholder="Tracking ID"
              className="w-full h-full bg-transparent outline-none px-4 text-xs"
            />
            <button className="bg-homePrimary p-3 rounded-full shadow-homePrimary">
              <Image
                src={SearchIcon}
                alt="search icon"
                className="w-full h-full"
              ></Image>
            </button>
          </div>
          <button className="w-fit h-autp px-6 py-4 flex bg-white text-black rounded-full text-xs font-bold justify-center place-items-center gap-2">
            <Image
              src={AndroidIcon}
              alt="android icon"
              className="h-full"
            ></Image>
            DOWNLOAD APP
          </button>
        </div>
      </section>
    </div>
  );
}
