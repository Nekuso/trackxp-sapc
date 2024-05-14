import { QueryData, createClient } from "@supabase/supabase-js";
import createSupabaseBrowserClient from "@/lib/supabase/client";

export const useProgressEntries: any = () => {
  const supabase = createSupabaseBrowserClient();

  const addProgress = async (props: any, duration?: number) => {
    const result = await supabase.from("progress_entries").insert({
      progress_name: props.progress_name,
      description: props.progress_description,
      order_service_id: props.order_service_id,
      tracking_id: props.tracking_id,
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const undoProgress = async (props: any, duration?: number) => {
    const result = await supabase
      .from("progress_entries")
      .delete()
      .eq("id", props.progress_id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };

  return {
    // methods
    addProgress,
    undoProgress,
  };
};
