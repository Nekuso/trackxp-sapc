import Image from "next/image";

export default function MostVehicle({
  img,
  count,
  percent,
  type,
}: {
  img: any;
  count: any;
  percent: any;
  type: any;
}) {
  return (
    <div className="w-fit h-fit">
      <Image src={img} alt="SmallVehicle" />
      <div className="w-full flex place-items-center justify-between">
        <h3 className="text-2xl font-bold flex place-items-center gap-2">
          {count}{" "}
          <span className="text-xs font-normal text-green-300">
            +{percent}% from last month
          </span>
        </h3>
        <span className="text-sm font-semibold">{type}</span>
      </div>
    </div>
  );
}
