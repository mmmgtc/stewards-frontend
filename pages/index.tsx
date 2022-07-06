import { Box, Button, Flex, Grid, GridItem, Heading, HStack, Input, Link, Text } from "@chakra-ui/react";
import type { NextPage } from "next";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import InputLayout from "../components/InputLayout";

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
      textAlign="center"
    >
      <Heading mb="2rem" textAlign="center">
        Steward Health Cards
      </Heading>
      <Text mb='2rem'>
        The Stewards of Gitcoin DAO play a vital role in driving the Gitcoin
        ecosystem forward through their work in governance and workstreams. In
        an effort to boost transparency the MMM-Workstream have created this
        site with health cards for each Steward that display metrics and links
        on their involvement and engagement in the DAO. Details and discussion
        can be found on the{" "}
        <Link href="https://gov.gitcoin.co/t/introducing-steward-report-cards/8712">
          governance forum
        </Link>
        , to learn more and get involved - visit{" "}
        <Link href="https://gitcoindao.com/">GitcoinDAO.com</Link>
      </Text>
      <Text mb='2rem'>
        Data powered by <Link href="https://www.showkarma.xyz/">Karma</Link>.
      </Text>

      <Grid w='full' templateColumns='repeat(5, 1fr)' gap={6}>
          <GridItem colSpan={2}>
            <InputLayout label="Search">
              <Input border='none' p={0} focusBorderColor="none" color='white' fontSize='1.3rem' placeholder="Name, Address, WorkStream ..." />
            </InputLayout>
          </GridItem>
      </Grid>
    </Flex>
  );
};

export default Home;
