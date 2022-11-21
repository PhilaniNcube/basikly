import supabase from "../utils/supabase"

export const createDraftProduct = async () => {

 const { data, error } = await supabase
  .from('products')
  .insert([
    { slug: Math.random(), title: 'Draft Product', description:'', dimensions: '', specifications: '', colour: ''  },
  ]).select('*')

  return data

}
