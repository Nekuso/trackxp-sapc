import { DataTable as EmployeesDataTable } from "./employees-table/data-table";
import { DataTable as MobileDataTable } from "./mobile-users-table/data-table";
import { DataTable as BranchesDataTable } from "./branches-table/data-table";
import { initateColumns } from "./employees-table/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeDisplay } from "@/types";
import { useSelector } from "react-redux";
import { columns as MobileColumns } from "./mobile-users-table/columns";
import { columns as BranchColumns } from "./branches-table/columns";

export default function ManagementContent({
  dataEmployees,
  dataMobileUsers,
  dataBranches,
}: {
  dataEmployees: EmployeeDisplay[];
  dataMobileUsers: any;
  dataBranches: any;
}) {
  const branchesSlice = useSelector((state: any) => state.branches);
  const rolesSlice = useSelector((state: any) => state.roles);
  const currentSession = useSelector((state: any) => state.currentSession);
  return (
    <Tabs
      defaultValue="system"
      className="w-full flex max-w-[1840px] flex-col justify-center place-items-center gap-4"
    >
      <div className="w-full">
        <TabsList className="h-fit bg-darkComponentBg border border-lightBorder rounded-lg gap-4">
          <TabsTrigger
            value="system"
            className="data-[state=active]:bg-applicationPrimary  data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300"
          >
            System Users
          </TabsTrigger>
          <TabsTrigger
            value="mobile"
            className="data-[state=active]:bg-applicationPrimary data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300"
          >
            Mobile Users
          </TabsTrigger>

          {currentSession.roles.role === "Administrator" ? (
            <TabsTrigger
              value="branch"
              className="data-[state=active]:bg-applicationPrimary data-[state=active]:text-white rounded-md px-4 py-2 transition-all duration-300"
            >
              Branches
            </TabsTrigger>
          ) : null}
        </TabsList>
      </div>
      <TabsContent value="system" className="w-full h-full ">
        <EmployeesDataTable
          columns={initateColumns(branchesSlice, rolesSlice)}
          data={dataEmployees}
        />
      </TabsContent>
      <TabsContent value="mobile" className="w-full h-full ">
        <MobileDataTable columns={MobileColumns} data={dataMobileUsers} />
      </TabsContent>
      <TabsContent value="branch" className="w-full h-full ">
        <BranchesDataTable columns={BranchColumns} data={dataBranches} />
      </TabsContent>
    </Tabs>
  );
}
