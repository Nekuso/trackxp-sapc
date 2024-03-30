import { Suspense } from "react";
import Loading from "./skeleton";
import UserContent from "./user-content";

export default function User({ params }: { params: any }) {
  return (
    <div className="w-full h-full flex justify-center place-items-center">
      <Suspense fallback={<Loading />}>
        <UserContent params={params} />
      </Suspense>
    </div>
  );
}
