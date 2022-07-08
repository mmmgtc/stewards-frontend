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
import { useState, useEffect } from "react";
// import { useAccount, useConnect, useDisconnect } from "wagmi";
// import { InjectedConnector } from "wagmi/connectors/injected";
import Footer from "../components/Footer";
import InputLayout from "../components/InputLayout";
import SelectInput from "../components/SelectInput";
import StewardsCard from "../components/StewardsCard";

const Home: NextPage = () => {
  // const { address, isConnected } = useAccount();
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });
  // const { disconnect } = useDisconnect();

  const [orderBy, setOrderBy] = useState("");
  const [display, setDisplay] = useState("ascending");
  const [time, setTime] = useState("");

  /**
   * Find a steward profile by the passed in wallet address and data to search through
   */
function findStewardByAddress(address, data) {
  return data.find(e => {
    if (e.address === address) {
//      console.log('found', e);
    }
    return e.address === address});
}

/**
 * Combine steward data from stewards_data.json, which is at the time of writing manually updated, and karma data, which is coming from the karma API.
 */
async function getStewardsData() {
  const success = res => res.ok ? res.json() : Promise.resolve({});

  const karmaData = fetch("/api.showkarma.xyz/api/dao/delegates?name=gitcoin&pageSize=250&offset=0&workstreamId=6,4,3,7,1,2,5&period=30d").then(success);
  const stewardsProfileData = fetch("/assets/stewards/stewards_data.json").then(success);

  let ret = [];

  await Promise.all([karmaData, stewardsProfileData]).then(([karmaData, stewardsProfileData]) => {
    karmaData.data.delegates.forEach(element => {
      element.profile = findStewardByAddress(element.publicAddress, stewardsProfileData.data);
      console.log(element);
      ret.push(element);
    });

}).catch(err => console.error(err));

 return ret;
}

const [stewardsData, setStewardsData] = useState([]);

// Get data on load
useEffect(() => {
  getStewardsData().then(data => {
  setStewardsData(data);
});
},[]);



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

      <Grid
        mb="2rem"
        w="full"
        templateColumns={{ lg: "repeat(5, 1fr)", base: "repeat(1, 1fr)" }}
        gap={6}
      >
        <GridItem colSpan={{ lg: 2, base: 1 }}>
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
              { label: "Health", value: "health" },
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
      <Grid
        w="full"
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap={"2rem"}
      >
        {stewardsData.map((element, index) => (
          <GridItem key={index}>
            <StewardsCard
              name={element.profile ? element.profile.name : 'Unknown'}
              gitcoinUsername={element.profile ? element.profile.gitcoin_username : 'Unknown'}
              profileImage={element.profile ? element.profile.profile_image : ''}
              stewardsSince={element.profile ? element.profile.steward_since : ''}
              activity={6}
              workstream="MMM Lead"
              voting={0.01}
              participation={67}
            />
          </GridItem>
        ))}
      </Grid>
      <Footer />
    </Flex>
  );
};

export default Home;
