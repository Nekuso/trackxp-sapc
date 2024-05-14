/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import UnderConstruction from "@/components/cards/under-construction";
import { ROLES } from "@/lib/actions/roles";
import { useAuthMiddleware } from "@/lib/actions/useMiddleware";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Analytics() {
  const router = useRouter();
  const { ADMINISTRATOR, MANAGER } = ROLES;
  const currentSession = useSelector((state: any) => state.currentSession);
  const access = useAuthMiddleware([ADMINISTRATOR, MANAGER], currentSession);
  useEffect(() => {
    if (!access.allowed) {
      router.push(access.defaultRoute);
    }
  }, [access.allowed]);
  return (
    <div className="w-full h-full">
      {!access.allowed ? (
        <div className="w-full h-full flex justify-center place-items-center">
          <h1 className="text-xl font-semibold text-slate-200 text-center">
            Unauthorized
          </h1>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center place-items-center">
          <UnderConstruction />
        </div>
      )}
    </div>
  );
}
