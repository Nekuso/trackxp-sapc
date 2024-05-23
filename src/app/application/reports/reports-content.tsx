import { DataTable as OrderServicesDataTable } from "./reports-table/service-orders-table/data-table";
import { DataTable as OrdersDataTable } from "./reports-table/orders-table/data-table";

import { initialState as initiateOrdersState } from "./reports-table/orders-table/columns";
import { initialState as initiatePartsState } from "./reports-table/service-orders-table/columns";

import {
  allPurchaseOrderServicesDisplay,
  allPurchaseOrdersDisplay,
} from "@/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiGearSixBold } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFilteredOrderServices } from "@/redux/slices/filteredOrderServices";

export default function TransactonsContent({
  dataOrders,
  dataOrderService,
}: {
  dataOrders: allPurchaseOrdersDisplay[];
  dataOrderService: allPurchaseOrderServicesDisplay[];
}) {
  const branchesSlice = useSelector((state: any) => state.branches);
  const currentSession = useSelector((state: any) => state.currentSession);

  return (
    <Tabs
      defaultValue={"order_service"}
      className="w-full flex max-w-[1840px] flex-col justify-center place-items-center gap-4"
    >
      <div className="w-full flex justify-between">
        <TabsList className="h-fit bg-darkComponentBg border border-lightBorder rounded-lg gap-2">
          {currentSession.roles.role === "Administrator" ||
          currentSession.roles.role === "Manager" ||
          currentSession.roles.role === "Staff" ||
          currentSession.roles.role === "Cashier" ||
          currentSession.roles.role === "Supervisor" ? (
            <TabsTrigger
              value="order_service"
              className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-white/80
            data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
            >
              <PiGearSixBold />
              Services
            </TabsTrigger>
          ) : null}
          {currentSession.roles.role === "Administrator" ||
          currentSession.roles.role === "Manager" ||
          currentSession.roles.role === "Cashier" ? (
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-applicationPrimary data-[state=inactive]:hover:bg-applicationPrimary/80
            data-[state=inactive]:hover:text-white/60
            data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300 flex gap-2"
            >
              <BsBoxSeam />
              Orders
            </TabsTrigger>
          ) : null}
        </TabsList>
      </div>

      {currentSession.roles.role === "Administrator" ||
      currentSession.roles.role === "Manager" ||
      currentSession.roles.role === "Cashier" ? (
        <TabsContent value="orders" className="w-full h-full ">
          {/* Regular Orders Tab */}
          <OrdersDataTable
            columns={initiateOrdersState(branchesSlice)}
            data={dataOrders}
          />
        </TabsContent>
      ) : null}
      {currentSession.roles.role === "Administrator" ||
      currentSession.roles.role === "Manager" ||
      currentSession.roles.role === "Staff" ||
      currentSession.roles.role === "Cashier" ||
      currentSession.roles.role === "Supervisor" ? (
        <TabsContent value="order_service" className="w-full h-full ">
          {/* Service Order Tab */}
          <OrderServicesDataTable
            columns={initiatePartsState(branchesSlice)}
            data={dataOrderService}
          />
        </TabsContent>
      ) : null}
    </Tabs>
  );
}
