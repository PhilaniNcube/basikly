import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Trigger this middleware to run on the `/secret-page` route
export const config = {
  matcher:  ['/admin', '/admin/:path', '/admin/:path*']
};



export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const {data: {user}} = await supabase.auth.getUser()

  console.log(user)

  // Check auth condition
  // console.log(data.user?.id)

  const {error, data} = await supabase.from('authorization').select('*, profile_id(*), role_id(*)').eq('profile_id', user?.id).single()



  if( error !== null ) {
  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/';
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.next()
  } else if (data?.role_id?.role !== 'admin') {
        const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/';
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.next()
  } else if(data?.role_id?.role === 'admin') {
    console.log('This is an admin user', data)
    return NextResponse.next()
  } else {
      // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/';
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.next()
  }




}
