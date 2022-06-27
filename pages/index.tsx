import { Box, Button, Flex, Heading, HStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="2"
    >
      <Heading textAlign="center">Hello, Stewards</Heading>
      {isConnected ? (
        <Button onClick={() => disconnect()}>{address}</Button>
      ) : (
        <Button onClick={() => connect()}>Connect</Button>
      )}
    </Flex>
  );
};

export default Home;
