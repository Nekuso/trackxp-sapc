import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiGearSixBold } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { DataTable } from "./products-options/data-table";
import { initiateColumns } from "./products-options/columns";
import { useSelector, useDispatch } from "react-redux";
import { setProductsData } from "@/redux/slices/orderCartOptionSlice";

export default function OrderCartOptions({}: {}) {
  const productsOption = useSelector(
    (state: any) => state.orderCartOptionSlice.productsData
  );

  const productsCart = useSelector(
    (state: any) => state.orderCart.productsCart
  );
  const dispatch = useDispatch();

  return (
    <Tabs
      defaultValue="products"
      className="w-full h-full flex max-w-[1840px] flex-col justify-center place-items-center gap-2"
    >
      <div className="w-full flex justify-between">
        <TabsList className="h-fit bg-darkBg border border-lightBorder rounded-lg gap-2">
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
        </TabsList>
      </div>
      <TabsContent
        value="products"
        className="w-full h-full bg-darkBg border border-lightBorder rounded-xl max-h-[500px] min-h-[500px] 2xl:max-h-[600px] 2xl:min-h-[600px]"
      >
        <DataTable
          columns={initiateColumns(dispatch, productsCart)}
          data={productsOption}
        />
      </TabsContent>
      <TabsContent
        value="parts"
        className="w-full h-full bg-yellow-300"
      ></TabsContent>
    </Tabs>
  );
}
