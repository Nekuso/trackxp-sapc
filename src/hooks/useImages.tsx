import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useState } from "react";

export const useImages: any = () => {
  const supabase = createSupabaseBrowserClient();
  const [allImagesData, setAllImagesData] = useState<any>([]);
  const [currentImageData, setCurrentImageData] = useState<any>([]);

  const createImage = async (props: any, duration?: any) => {
    const imageResult = await supabase.storage
      .from("images")
      .upload(props.image_url, props.image);

    if (imageResult.error) {
      return imageResult.error;
    }
    const result = await supabase.from("image_entries").insert({
      order_service_id: props.id,
      image_url: `https://yqprqylnhxlropdxjoho.supabase.co/storage/v1/object/public/images/${props.image_url}`,
      file_name: props.file_name,
    });

    await new Promise((resolve) => setTimeout(resolve, duration));

    // return data;
  };
  const getImages = async (props: any) => {
    const result = await supabase
      .from("image_entries")
      .select(
        `
            id,
            order_service_id,
            image_url,
            file_name,
            created_at
        `
      )
      .eq("order_service_id", props.id)
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }

    return setAllImagesData(data);
  };
  const getImage = async (id: string, duration?: number) => {
    const { data, error } = await supabase
      .from("image_entries")
      .select(
        `
      id,
      unit_name
    `
      )
      .eq("id", id);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentImageData(data);
  };

  const deleteImage = async (props: any, duration?: number) => {
    const result = await supabase
      .from("image_entries")
      .delete()
      .eq("id", props.id);

    const bucketResult = await supabase.storage
      .from("images")
      .remove([props.file_name]);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return result;
  };

  return {
    // states
    allImagesData,
    currentImageData,

    // methods
    createImage,
    getImages,
    getImage,
    deleteImage,
  };
};
