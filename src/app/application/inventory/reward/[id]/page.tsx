/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import RewardContent from "./reward-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useRewards } from "@/hooks/useRewards";
import { useUOMS } from "@/hooks/useUOMS";
import RewardNotFound from "./not-found";

export default function Reward({ params }: { params: any }) {
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
