
import { info } from "console";
import { Database } from "../database.types";
import supabase from "../utils/supabase";

export type Category = Database['public']['Tables']['categories']['Row']

const getCategories = async () =>  {

  let { data, error } = await supabase
  .from('categories')
  .select('*')

  if(error) {
    throw new Error(error.details)
  }

  return data as Category[]

}


export {getCategories}



