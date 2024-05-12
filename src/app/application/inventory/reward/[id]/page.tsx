/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import RewardContent from "./reward-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useRewards } from "@/hooks/useRewards";
import RewardNotFound from "./not-found";
import { useRouter } from "next/navigation";
import { ROLES } from "@/lib/actions/roles";
import { useSelector } from "react-redux";
import { useAuthMiddleware } from "@/lib/actions/useMiddleware";

export default function Reward({ params }: { params: any }) {
  const router = useRouter();
  const { ADMINISTRATOR, MANAGER } = ROLES;
  const currentSession = useSelector((state: any) => state.currentSession);
  const access = useAuthMiddleware([ADMINISTRATOR, MANAGER], currentSession);
  if (!access.allowed) {
    router.push(access.defaultRoute);
    return null;
  }

  const { getReward, currentRewardData } = useRewards();
  const [error, setError] = useState(false);

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getReward(params.id, 2000);
      if (result) setError(result);
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("reward-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "rewards" },
          (payload: any) => {
            getReward(params.id, 0);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, []);

  return (
    <div className="w-full flex justify-center place-items-center">
      {error ? (
        <RewardNotFound />
      ) : currentRewardData.length === 0 ? (
        <Loading />
      ) : (
        <RewardContent params={params} reward={currentRewardData} />
      )}
    </div>
  );
}
