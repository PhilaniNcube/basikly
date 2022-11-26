import { Database } from "../database.types";
import supabase from "../utils/supabase";

export type Brand = Database["public"]["Tables"]["brand"]["Row"];

const getBrands = async () => {
  let { data, error } = await supabase.from("brand").select("*");

  if (error) {
    throw new Error(error.details);
  }

  return data as Brand[];
};

const getBrandBySlug = async (slug: string) => {

  let { data, error } = await supabase
    .from("brand")
    .select("*")
    .eq("slug", slug)
    .single();



  if (error) {

       throw new Error(error.details);
  }

  return data as Brand;
};

export { getBrands, getBrandBySlug };
