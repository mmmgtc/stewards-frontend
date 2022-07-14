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
import { useSearchParams } from 'react-router-dom';

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

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? '');
  const [orderBy, setOrderBy] = useState(searchParams.get("orderBy") ?? 'descending');
  const [display, setDisplay] = useState(searchParams.get("display") ?? 'health');
  const [time, setTime] = useState(searchParams.get("time") ?? '30d');
  const [stewardsData, setStewardsData] = useState([]);
  const [filteredStewardsData, setFilteredStewardsData] = useState([]);

  /**
   * Find a steward profile by the passed in wallet address and data to search through
   */
  function findStewardByAddress(address, data) {
    return data.find(e => {
      return e.address.toLowerCase() === address.toLowerCase()
    });
  }

  /**
   * Combine steward data from stewards_data.json, which is at the time of writing manually updated, and karma data, which is coming from the karma API.
   */
  async function getStewardsData() {
    const success = res => res.ok ? res.json() : Promise.resolve({});

    const karmaData = fetch("/api.showkarma.xyz/api/dao/delegates?name=gitcoin&pageSize=250&offset=0&workstreamId=6,4,3,7,1,2,5&period=" + time).then(success);
    const stewardsProfileData = fetch("/assets/stewards/stewards_data.json").then(success);

    let ret = [];

    await Promise.all([karmaData, stewardsProfileData]).then(([karmaData, stewardsProfileData]) => {
      karmaData.data.delegates.forEach(element => {
        if (element.publicAddress === '0x01Cf9fD2efa5Fdf178bd635c3E2adF25B2052712') {
          console.log('where is jo');
          console.log(findStewardByAddress(element.publicAddress, stewardsProfileData.data));

        }
        element.profile = findStewardByAddress(element.publicAddress, stewardsProfileData.data);
        ret.push(element);
      });

    }).catch(err => console.error(err));


    return ret;
  }


  function convertToNumber(val) {
    return Number(val);
  }

  /**
   * Apply some filtering to the stewards data
   */
  function filterStewardsData() {
    let clonedData = JSON.parse(JSON.stringify(stewardsData));

    if (search.length > 0) {
      clonedData = clonedData.filter(element => {
        if (element.profile) {
          return element.profile.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
        }
      });
    }

    if (display === 'health') {
      clonedData.sort(function (a, b) {
        return convertToNumber(a.stats[0].gitcoinHealthScore) - convertToNumber(b.stats[0].gitcoinHealthScore);
      });
    } else if (display === 'forum_activity') {
      clonedData.sort(function (a, b) {
        return convertToNumber(a.stats[0].forumActivityScore) - convertToNumber(b.stats[0].forumActivityScore);
      });
    } else if (display === 'voting_weight') {
      clonedData.sort(function (a, b) {
        return convertToNumber(a.stats[0].onChainVotesPct) - convertToNumber(b.stats[0].onChainVotesPct);
      });
    }

    if (orderBy === 'descending') {
      clonedData = clonedData.reverse();
    }

    setFilteredStewardsData(clonedData);
  }

  // Get data on load, as well as if the time changes
  useEffect(() => {
    getStewardsData().then(data => {
      setStewardsData(data);
    });
  }, [time]);

  // Filter when stewardsData changes
  useEffect(() => {
    filterStewardsData();
  }, [stewardsData]);

  // Set the query params and run the filter
  useEffect(() => {
    setSearchParams({ 'search': search, 'display': display, 'orderBy': orderBy, 'time': time });

    filterStewardsData();
  }, [search, orderBy, display]);


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
              onChange={(e) => setSearch(e.target.value)}
              value={search}
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
            defaultValue={display}
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
            defaultValue={orderBy}
            onChange={setOrderBy}
          />
        </GridItem>
        <GridItem>
          <SelectInput
            label="Time"
            options={[{ label: "30 Days", value: "30d" }, { label: "Lifetime", value: "lifetime" }]}
            defaultValue={time}
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
        {filteredStewardsData.map((element, index) => (
          <GridItem key={index}>
            <StewardsCard
              name={element.profile ? element.profile.name : ''}
              gitcoinUsername={element.profile ? element.profile.gitcoin_username : '-'}
              profileImage={element.profile ? element.profile.profile_image : ''}
              stewardsSince={element.profile ? element.profile.steward_since : '-'}
              forumActivity={element.stats[0].forumTopicCount + element.stats[0].forumPostCount}
              workstream={element.profile ? element.profile.workstream : ''}
              votingWeight={element.delegatedVotes / 1000000}
              votingParticipation={element.stats[0].offChainVotesPct}
              statementLink={element.profile ? element.profile.statement_post : ''}
              delegateLink={'https://www.withtally.com/voter/' + element.publicAddress + '/governance/gitcoin'}
              forumActivityLink={element.profile ? 'https://gov.gitcoin.co/u/' + element.profile.gitcoin_username : '/'}
              healthScore={element.stats[0].gitcoinHealthScore}
            />
          </GridItem>
        ))}
      </Grid>
      <Footer />
    </Flex>
  );
};

export default Home;
