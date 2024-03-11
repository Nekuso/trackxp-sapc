import { DataTable } from "./data-table";
import { columns } from "./columns";
import data from "./data/data.json";

export default function Management() {
  return (
    <div className="w-full h-full flex justify-center place-items-center">
      <div className="w-full h-full max-w-[1840px] max-h-[900px] flex flex-col justify-between gap-6 ">
        {/* <div className="w-full py-14 bg-darkComponentBg rounded-xl"></div> */}

        <div className="w-full h-full flex gap-6 ">
          <DataTable columns={columns} data={data} />
          {/* <div className="w-[40%] h-full bg-darkComponentBg rounded-xl"></div> */}
        </div>
      </div>
    </div>
  );
}
