export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

interface Image {
  url:string
  width:number
  height:number
}

interface ICategory {
  id: string
  created_at:string
  title:string
  slug:string
  description:string
  image: Image
}

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          image: Image
          price: number
          description: string
          dimensions: string
          slug: string
          category: ICategory
          title: string
          specifications: string
          colour: string
          published: boolean
          inStock: boolean
        } // The data expected to be returned from a "select" statement.
        Insert: {
           id: string
          created_at?: string
          image?: Image
          price?: number
          description?: string
          dimensions?: string
          slug?: string
          category?: ICategory
          title?: string
          specifications?: string
          colour?: string
          published?: boolean
          inStock?: boolean
        } // The data expected passed to an "insert" statement.
        Update: {
              id: string
          created_at?: string
          image?: Image
          price?: number
          description?: string
          dimensions?: string
          slug?: string
          category?: ICategory
          title?: string
          specifications?: string
          colour?: string
          published?: boolean
          inStock?: boolean
        } // The data expected passed to an "update" statement.
      }
      categories: {
        Row: {
            id: string
            created_at:string
            title:string
            slug:string
            description:string
            image: Image
        }
        Insert: {
           id: string
            created_at?:string
            title?:string
            slug?:string
            description?:string
            image?: Image
        }
        Update: {
            id: string
            created_at?:string
            title?:string
            slug?:string
            description?:string
            image?: Image
        }

      }
      profiles: {
       Row : {
         id: string
        created_at: string
        first_name: string
        last_name: string
        email: string
        role: string
       }
       Insert : {
            id: string
        created_at: string
        first_name?: string
        last_name?: string
        email?: string
        role?: string
       }
       Update : {
               id: string
        created_at: string
        first_name?: string
        last_name?: string
        email?: string
        role?: string
       }
      }
      authorization: {
        Row: {
          role_id: {
            id: string
            created_at: string
            role: string
          }
          profile_id: string
          created_at: string
        }
        Insert :{
            role_id: string
          profile_id: string
          created_at: string
        }
        Update :{
            role_id?: string
          profile_id?: string
          created_at: string
        }
      }
    }
  }
}
