import "../styles/globals.css";
import "@fontsource/poppins";
import "@fontsource/space-mono";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
//import { WagmiConfig, createClient } from "wagmi";
//import { getDefaultProvider } from "ethers";
import { theme } from "../theme";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../components/Layout"), { ssr: false });

// const client = createClient({
//   autoConnect: true,
//   provider: getDefaultProvider(),
// });

  // return (
  //   <ChakraProvider theme={theme}>
  //     <WagmiConfig client={client}>
  //       <Layout>
  //         <Component {...pageProps} />
  //       </Layout>
  //     </WagmiConfig>
  //   </ChakraProvider>
  // );


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
