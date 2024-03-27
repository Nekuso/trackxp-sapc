import { Suspense } from "react";
import Loading from "./skeleton";
import ManagementContent from "./management-content";

export default function Management() {
  return (
    <div className="w-full h-full flex justify-center place-items-center no-scrollbar">
      <Suspense fallback={<Loading />}>
        <ManagementContent />
      </Suspense>
    </div>
  );
}
