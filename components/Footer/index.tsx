/* eslint-disable @next/next/no-img-element */
import { Box, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <VStack gap={10} mt={"20"}>
      <footer>
        <Link href="https://m-m-m.xyz/" target="_blank">
          <img src="assets/mmm.svg" alt="mmm" width="96" height="32" />
        </Link>
      </footer>
      <section id="gitcoindao">
        <Link href="https://gitcoindao.com" target="_blank">
          <img src="assets/gitcoindao.svg" alt="gitcoindao" width="188" height="58" />
        </Link>
      </section>
    </VStack>
  );
};

export default Footer;
