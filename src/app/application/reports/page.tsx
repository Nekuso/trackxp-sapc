import UnderConstruction from "@/components/cards/under-construction";
import { ROLES } from "@/lib/actions/roles";
import { useAuthMiddleware } from "@/lib/actions/useMiddleware";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Reports() {
  const router = useRouter();
  const { ADMINISTRATOR, MANAGER } = ROLES;
  const currentSession = useSelector((state: any) => state.currentSession);
  const access = useAuthMiddleware([ADMINISTRATOR, MANAGER], currentSession);
  if (!access.allowed) {
    router.push(access.defaultRoute);
    return null;
  }

  return (
    <div className="w-full h-full flex justify-center place-items-center">
      <UnderConstruction />
    </div>
  );
}
