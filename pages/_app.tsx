import "../styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { ShoppingCartProvider } from "../Context/ShoppingCartContext";



const queryClient = new QueryClient()

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());


  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <ShoppingCartProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ShoppingCartProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
