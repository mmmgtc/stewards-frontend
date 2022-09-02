import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import WorkstreamCard from "../components/WorkstreamCard";
import workstreamData from "../public/assets/workstreams/workstreams.json";
import stewardsProfileData from "../public/assets/stewards/stewards_data.json";
import { useEffect } from "react";
import axios from "axios";

/**
 * Return stewards for a specific workstream
 */
function getStewards(workstream) {
  let ret = stewardsProfileData.data.filter((element) => {
    return (
      element.workstreamsContributor.search(workstream.slug) >= 0 ||
      element.workstreamsLead.search(workstream.slug) >= 0
    );
  });

  return ret;
}

const Workstream = ({workstreamData}) => {

  console.log('workstream Data: ', workstreamData);
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="2"
      textAlign="center"
      paddingTop="10"
      width="full"
    >
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          "2xl": "repeat(3, 1fr)",
        }}
        gap={5}
        justifyItems="center"
      >
        {workstreamData.map((workstream, index) => {
          if(index === 0 ) {
            return
          }
          return(
          <GridItem key={index}>
            <WorkstreamCard
              title={workstream.name}
              discrpition={workstream.description}
              objectives={[]}
              gtcBalanceOvertime={workstream.stats.gtc_balance.rows[0].amount}
              stableCoinBalanceOvertime={
                workstream.stats.stable_coin_balance.value
              }
              proposals={[]}
              notionPage={workstream.uri}
              contributors={workstream.stats.all_time_contributors}
              gtcBalance={workstream.stats.gtc_balance}
              stableBalance={workstream.stats.stable_coin_balance}
              stewards={getStewards(workstream)}
            />
          </GridItem>
        )})}
      </Grid>
    </Flex>
  );
};

export const getStaticProps = async () => {
  const { data } = await axios.get(
    "https://staging.api.daostewards.xyz/api/workstreams/?format=json"
  );

  return {
    props: {
      workstreamData: data,
    },
  };
};

export default Workstream;
