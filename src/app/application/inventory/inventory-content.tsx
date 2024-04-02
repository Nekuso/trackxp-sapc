import { DataTable } from "./inventory-table/data-table";
import { initialState } from "./inventory-table/columns";
import data from "./inventory-table/data/data.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allProductsDisplay } from "@/types";
import { PiGearSixBold } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function InventoryContent({
  dataProducts,
}: {
  dataProducts: allProductsDisplay[];
}) {
  const branchesSlice = useSelector((state: any) => state.branches);
  const uomsSlice = useSelector((state: any) => state.uoms);

  return (
    <Tabs
      defaultValue="products"
      className="w-full flex max-w-[1840px] flex-col justify-center place-items-center gap-2"
    >
      <div className="w-full">
        <TabsList className="h-fit bg-lightBorder rounded-lg gap-2">
          <TabsTrigger
            value="products"
            className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-white/60
            data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <BsBoxSeam />
            Products
          </TabsTrigger>
          <TabsTrigger
            value="parts"
            className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-white/80
            data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <PiGearSixBold />
            Parts
          </TabsTrigger>
          <TabsTrigger
            value="services"
            className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-white/80
            data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
          >
            <FaHandsHelping />
            Services
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="products" className="w-full h-full ">
        <DataTable
          columns={initialState(branchesSlice, uomsSlice)}
          data={dataProducts}
        />
      </TabsContent>
      <TabsContent
        value="parts"
        className="w-full h-[725px] 2xl:h-[800px] bg-red-300"
      >
        {/* <DataTable columns={columns} data={data} /> */}
      </TabsContent>
      <TabsContent
        value="services"
        className="w-full h-[725px] 2xl:h-[800px] bg-red-300"
      >
        {/* <DataTable columns={columns} data={data} /> */}
      </TabsContent>
    </Tabs>
  );
}
