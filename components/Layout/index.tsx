import { Box, Flex, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

interface LayoutProps {
  children: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const homeRoute = router.pathname === '/'

  return (
    <Router>
      <VStack py="4rem">
      <Flex mr={"auto"}>
        <Box
          bg={homeRoute ? "#291555" : "#190C35"}
          paddingX="5"
          paddingY="2"
          textColor={homeRoute ? "#BE59CF" : "#612a6b"}
          fontWeight="semibold"
          fontSize="xl"
          borderTopRightRadius="10px"
          borderTopLeftRadius="10px"
          cursor="pointer"
          onClick={() => router.push('/')}
          zIndex={ homeRoute ? "1" : "0"}
        >
          Stewards
        </Box>
        <Box
          bg={!homeRoute ? "#291555" : "#190C35"}
          paddingX="5"
          paddingY="2"
          textColor={!homeRoute ? "#BE59CF" : "#612a6b"}
          fontWeight="semibold"
          fontSize="xl"
          borderTopRightRadius="10px"
          borderTopLeftRadius="10px"
          cursor="pointer"
          onClick={() => router.push('/workstreams')}
          zIndex={ !homeRoute ? "1" : "0"}
          marginLeft="-.5rem"
        >
          Workstreams
        </Box>
      </Flex>{children}</VStack>
    </Router>
  );
};

export default Layout;
