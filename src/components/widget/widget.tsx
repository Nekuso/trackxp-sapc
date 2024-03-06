import Image from "next/image";

export default function MostVehicle({
  title,
  icon,
  amount,
  percent,
}: {
  title: any;
  icon: any;
  amount: any;
  percent: any;
}) {
  return (
    <div className="w-full h-full bg-darkComponentBg rounded-xl border border-lightBorder shadow-xl">
      <div className="w-full h-full p-5 flex flex-col justify-between">
        <div className="w-full flex justify-between place-items-center">
          <h3 className="text-sm font-semibold">{title}</h3>
          {icon}
        </div>
        <h1 className="text-2xl font-bold">{amount}</h1>
        <span className="text-xs text-green-300">{percent}</span>
      </div>
    </div>
  );
}
