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
  const [orderBy, setOrderBy] = useState(searchParams.get("orderBy") ?? 'forum_activity');
  const [display, setDisplay] = useState(searchParams.get("display") ?? 'descending');
  const [time, setTime] = useState(searchParams.get("time") ?? '30d');
  const [stewardsData, setStewardsData] = useState([]);
  const [filteredStewardsData, setFilteredStewardsData] = useState([]);

  /**
   * Find a steward profile by the passed in wallet address and data to search through
   */
  function findStewardByAddress(address, data) {
    return data.find(e => {
      return e.address === address
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
        element.profile = findStewardByAddress(element.publicAddress, stewardsProfileData.data);
        ret.push(element);
      });

    }).catch(err => console.error(err));

    return ret;
  }

  /**
   * Apply some filtering to the stewards data
   */
  function filterStewardsData(data) {
    let clonedData = JSON.parse(JSON.stringify(data));

    if (search.length > 0) {
      clonedData = clonedData.filter(element => {
        if (element.profile) {
          return element.profile.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
        }
      });
    }

    // TODO:::The fields on which sorting happens needs to be checked, e.g. health
    if (orderBy === 'health') {
      clonedData.sort(function (a, b) {
        return a.stats[0].karmaScore - b.stats[0].karmaScore;
      });
    } else if (orderBy === 'forum_activity') {
      console.log('forum_activity');
      clonedData.sort(function (a, b) {
        return a.stats[0].forumActivityScore - b.stats[0].forumActivityScore;
      });
    } else if (orderBy === 'voting_weight') {
      clonedData.sort(function (a, b) {
        return parseInt(a.stats[0].onChainVotesPct) - parseInt(b.stats[0].onChainVotesPct);
      });
    }

    if (display === 'descending') {
      clonedData = clonedData.reverse();
    }

    console.log('clonedData: ', clonedData);


    setFilteredStewardsData(clonedData);
  }

  // Get data on load, as well as if the time changes
  useEffect(() => {
    getStewardsData().then(data => {
      setStewardsData(data);
      filterStewardsData(data);
    });
  }, [time]);


  // Set the query params
  useEffect(() => {
    setSearchParams({ 'search': search, 'orderBy': orderBy, 'display': display, 'time': time });

    filterStewardsData(stewardsData);
  }, [search, orderBy, display, time]);


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
            defaultValue={orderBy}
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
            defaultValue={display}
            onChange={setDisplay}
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
              name={element.profile ? element.profile.name : '-'}
              gitcoinUsername={element.profile ? element.profile.gitcoin_username : '-'}
              profileImage={element.profile ? element.profile.profile_image : ''}
              stewardsSince={element.profile ? element.profile.steward_since : '-'}
              activity={element.stats[0].forumActivityScore}
              workstream={element.workstreams.map(item => { return item.name }).join(',')}
              voting={element.stats[0].delegatedVotes / 1000000}
              participation="0"
              statementLink={element.profile ? element.profile.statement_post : ''}
              delegateLink={'https://www.withtally.com/voter/' + element.address + '/governance/gitcoin'}
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
