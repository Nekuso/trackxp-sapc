import { DataTable } from "./employees-table/data-table";
import { columns } from "./employees-table/columns";
import data from "./employees-table/data/data.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEmployees } from "@/hooks/useEmployees";

export default async function Management() {
  const { getEmployees } = await useEmployees();
  const dataEmployees = await getEmployees();

  return (
    <div className="w-full h-full flex justify-center place-items-center">
      <Tabs
        defaultValue="system"
        className="w-full h-full flex max-w-[1840px] max-h-[900px] flex-col justify-center place-items-center gap-4"
      >
        <div className="w-full">
          <TabsList className="p-0 h-fit bg-transparent rounded-none gap-4">
            <TabsTrigger
              value="system"
              className="data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:text-white rounded-none p-0 pb-2"
            >
              System Users
            </TabsTrigger>
            <TabsTrigger
              value="mobile"
              className="data-[state=active]:bg-transparent border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:text-white rounded-none p-0 pb-2"
            >
              Mobile Users
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="system" className="w-full h-full ">
          <DataTable columns={columns} data={dataEmployees} />
        </TabsContent>
        <TabsContent value="mobile" className="w-full h-full bg-red-300">
          {/* <DataTable columns={columns} data={data} /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
