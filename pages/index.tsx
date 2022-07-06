import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import InputLayout from "../components/InputLayout";
import SelectInput from "../components/SelectInput";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const [orderBy, setOrderBy] = useState("");
  const [display, setDisplay] = useState("ascending");
  const [time, setTime] = useState("");

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
      <Text mb="2rem">
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
      <Text mb="2rem">
        Data powered by <Link href="https://www.showkarma.xyz/">Karma</Link>.
      </Text>

      <Grid w="full" templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem colSpan={2}>
          <InputLayout label="Search">
            <Input
              border="none"
              p={0}
              focusBorderColor="none"
              color="white"
              fontSize="1.3rem"
              placeholder="Name, Address, WorkStream ..."
            />
          </InputLayout>
        </GridItem>
        <GridItem>
          <SelectInput
            label="Order by"
            options={[
              { label: "health", value: "health" },
              { label: "Forum Activity", value: "forum_activity" },
              { label: "Voting Weight", value: "voting_weight" },
            ]}
            onChange={setDisplay}
          />
        </GridItem>
        <GridItem>
          <SelectInput
            label="Display"
            options={[
              { label: "Descending", value: "descending" },
              { label: "Ascending", value: "ascending" },
            ]}
            onChange={setOrderBy}
          />
        </GridItem>
        <GridItem>
          <SelectInput
            label="Time"
            options={[{ label: "Lifetime", value: "lifetime" }]}
            onChange={setTime}
          />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Home;
