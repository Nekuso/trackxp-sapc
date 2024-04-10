import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import UpdateProductButton from "./update-order/update-order-dialog";
import DeleteProductButton from "./delete-order/delete-product-dialog";
import Barcode from "react-barcode";
import { FaRegCopy } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast as sonner } from "sonner";

export default function OrderContent({ order }: any) {
  return (
    <div className="w-full h-[805px] 2xl:h-[882px] flex max-w-[1840px] justify-center place-items-center">
      <div className="w-[1000px] 2xl:w-[1200px] h-[600px] 2xl:h-[680px] flex justify-center rounded-xl gap-4">
        <pre className="w-[500px] 2xl:w-[600px] h-[600px] 2xl:h-[680px] bg-darkComponentBg border border-lightBorder rounded-xl p-4 flex flex-col gap-4">
          <code className="text-white text-lg overflow-y-scroll">
            {JSON.stringify(order, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
}
