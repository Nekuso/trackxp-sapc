import { DataTable as PartsDataTable } from "./inventory-table/parts-table/data-table";
import { DataTable as ProductsDataTable } from "./inventory-table/products-table/data-table";
import { DataTable as ServicesDataTable } from "./inventory-table/services-table/data-table";

import { initialState as initiateProductsState } from "./inventory-table/products-table/columns";
import { initialState as initiatePartsState } from "./inventory-table/parts-table/columns";
import { initialState as initiateServicesState } from "./inventory-table/services-table/columns";

import {
  allProductsDisplay,
  allPartsDisplay,
  allServicesDisplay,
} from "@/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiGearSixBold } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function InventoryContent({
  dataProducts,
  dataParts,
  dataServices,
}: {
  dataProducts: allProductsDisplay[];
  dataParts: allPartsDisplay[];
  dataServices: allServicesDisplay[];
}) {
  const branchesSlice = useSelector((state: any) => state.branches);
  const uomsSlice = useSelector((state: any) => state.uoms);
  const brandsSlice = useSelector((state: any) => state.brands);

  return (
    <Tabs
      defaultValue="products"
      className="w-full flex max-w-[1840px] flex-col justify-center place-items-center gap-4"
    >
      <div className="w-full">
        <TabsList className="h-fit bg-darkComponentBg border border-lightBorder rounded-lg gap-2">
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
        {/* Products Tab */}
        <ProductsDataTable
          columns={initiateProductsState(branchesSlice, uomsSlice)}
          data={dataProducts}
        />
      </TabsContent>
      <TabsContent value="parts" className="w-full h-full ">
        {/* Parts Tab */}
        <PartsDataTable
          columns={initiatePartsState(branchesSlice, brandsSlice)}
          data={dataParts}
        />
      </TabsContent>
      <TabsContent value="services" className="w-full h-full">
        <ServicesDataTable
          columns={initiateServicesState(branchesSlice)}
          data={dataServices}
        />
      </TabsContent>
    </Tabs>
  );
}
