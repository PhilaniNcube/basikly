import { Database } from "../database.types";
import supabase from "../utils/supabase";

export type Product = Database['public']['Tables']['products']['Row']




const getProducts = async (page: number, size:number) =>  {
  const limit = size ? +size : 25;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1

  let {data, error} = await supabase.from('products').select('*, category(*), brand(*)').order("slug", {ascending:true}).range(from, to);

  if(error) {
    throw new Error(`There was an error, ${error.details}`)
  }

  return data as Product[]
}


export const getFeaturedProducts = async () =>  {

  let {data, error} = await supabase.from('products').select('*, category(*), brand(*)').order("title", {ascending:true}).match({featured:true})

  if(error) {
    throw new Error(`There was an error, ${error.details}`)
  }

  return data as Product[]
}


export const getAllProducts = async () =>  {


  let {data, error} = await supabase.from('products').select('*, category(*), brand(*)').order("slug", {ascending:true});

  if(error) {
    throw new Error(`There was an error, ${error.details}`)
  }

  return data as Product[]
}


export const getProduct = async (slug:string) =>  {


  let {data, error} = await supabase.from('products').select('*, category(*), brand(*)').eq('slug', slug).single()

  if(error) {
    console.log(error)
    throw new Error(`There was an error, ${error.details}`)
  }

  return data as Product
}


export const getProductByCategoryId = async (id:string) => {

    let {data, error} = await supabase.from('products').select('*, category(*), brand(*)').eq('category', id)

      if(error) {
    throw new Error(`There was an error, ${error.details}`)
  }

  return data as Product[]

}


export const getProductBySlug = async (slug:string) => {

    let {data, error} = await supabase.from('products').select('*, category(*), brand(*)').eq('slug', slug).single()

      if(error) {
    throw new Error(`There was an error, ${error.details}`)
  }

  return data as Product

}


export default getProducts
