import { DataTable } from "./employees-table/data-table";
import { columns } from "./employees-table/columns";
import data from "./employees-table/data/data.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeDisplay } from "@/types";
import { HomeIcon } from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";

export default function ManagementContent({
  dataEmployees,
  branches,
  roles,
}: {
  dataEmployees: EmployeeDisplay[];
  branches: any;
  roles: any;
}) {
  const branchesData = branches.map((branch: any) => ({
    value: branch?.branch_name,
    label: branch?.branch_name,
    icon: HomeIcon,
  }));
  const rolesData = roles.map((role: any) => ({
    value: role?.role,
    label: role?.role,
    icon: PersonIcon,
  }));

  return (
    <Tabs
      defaultValue="system"
      className="w-full flex max-w-[1840px] flex-col justify-center place-items-center gap-2"
    >
      <div className="w-full">
        <TabsList className="h-fit bg-lightBorder rounded-lg gap-4">
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
        </TabsList>
      </div>
      <TabsContent value="system" className="w-full h-full ">
        <DataTable
          columns={columns}
          data={dataEmployees}
          branchesData={branchesData}
          rolesData={rolesData}
        />
      </TabsContent>
      <TabsContent
        value="mobile"
        className="w-full h-[725px] 2xl:h-[800px] bg-red-300"
      >
        {/* <DataTable columns={columns} data={data} /> */}
      </TabsContent>
    </Tabs>
  );
}
