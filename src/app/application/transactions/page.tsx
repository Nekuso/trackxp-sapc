"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Tasks from "./data/tasks.json";
import UnderConstruction from "@/components/cards/under-construction";

export default function Transactions() {
  return (
    <div className="w-full h-full flex justify-center place-items-center">
      {/* <div className="w-full h-full max-w-[1840px] max-h-[900px] flex flex-col justify-between gap-6 ">
        <div className="w-full h-full flex">
          <DataTable columns={columns} data={Tasks} />
        </div>
      </div> */}

      <UnderConstruction />
    </div>
  );
}
