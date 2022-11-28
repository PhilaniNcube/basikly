import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { manrope } from "../../components/Shared/Navbar";
import SignIn from "../../components/Shared/SignIn";

const Account = () => {

const user = useUser()


  return <>
  {!user ? <SignIn /> : (
        <>
           <Head>
            <title>{user.email}</title>
           </Head>
           <main className={`${manrope.className} max-w-7xl mx-auto py-12 px-4`}>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">{user.email}</h1>

            <div className="w-full mt-4 h-screen">
              <h2 className="text-3xl text-slate-700">My Orders</h2>
            </div>
           </main>
        </>
        )
        }
  </>;
};
export default Account;
