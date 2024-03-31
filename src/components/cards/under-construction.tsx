import Image from "next/image";
import UnderConstructionImage from "@/images/under-construction.gif";

export default function UnderConstruction() {
  return (
    <div className="w-[400px] h-[300px] px-3 bg-darkComponentBg border border-lightBorder rounded-xl flex flex-col gap-3 justify-center place-items-center">
      <Image
        src={UnderConstructionImage}
        alt="under construction"
        className="w-[120px] h-[150px]"
      />
      <p className="text-white text-lg font-bold">
        🚧This page is under construction🚧
      </p>
    </div>
  );
}
