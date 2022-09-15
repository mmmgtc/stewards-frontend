import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import WorkstreamCard from "../components/WorkstreamCard";
import workstreamDataJson from "../public/assets/workstreams/workstreams.json";
import stewardsProfileData from "../public/assets/stewards/stewards_data.json";
import { useEffect } from "react";
import axios from "axios";

/**
 * Return stewards for a specific workstream
 */
function getStewards(workstream) {
  let ret = stewardsProfileData.data.filter((element) => {
    return (
      element.workstreamsContributor.search(
        workstream.short_name.toUpperCase()
      ) >= 0 ||
      element.workstreamsLead.search(workstream.short_name.toUpperCase()) >= 0
    );
  });

  return ret;
}

function getGtcBalanceGraph(workstream) {
  let ret = workstreamDataJson.filter((e) => {
    return e.slug === workstream.short_name.toUpperCase();
  });

  return ret[0].duneEmbeds.gtcBalanceOverTime;
}

function getStableBalanceGraph(workstream) {
  let ret = workstreamDataJson.filter((e) => {
    return e.slug === workstream.short_name.toUpperCase();
  });

  return ret[0].duneEmbeds.stableCoinBalanceOverTime;
}

const Workstream = ({ workstreamData }) => {
  console.log("workstream Data: ", workstreamData);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="2"
      textAlign="center"
      paddingX="10"
      paddingTop="10"
      paddingBottom="10"
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
          if (index === 0) {
            return;
          }

          console.log("workstream: ", workstream);
          console.log("getStewards(workstream)", getStewards(workstream));

          return (
            <GridItem key={index}>
              <WorkstreamCard
                title={workstream.name}
                description={workstream.description}
                objectives={[]}
                gtcBalanceOvertime={getGtcBalanceGraph(workstream)}
                stableCoinBalanceOvertime={getStableBalanceGraph(workstream)}
                notionPage={workstream.uri}
                contributors={
                  workstream.stats.all_time_contributors.rows[0].count
                }
                gtcBalance={workstream.stats.gtc_balance.rows[0].amount.toFixed(
                  2
                )}
                stableBalance={
                  workstream.stats.stable_coin_balance.rows[0].Stablecoins
                    ? workstream.stats.stable_coin_balance.rows[0].Stablecoins.toFixed(
                        2
                      )
                    : "unavailable"
                }
                stewards={getStewards(workstream)}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export const getStaticProps = async () => {
  const { data } = await axios.get(
    process.env.BACKEND_API + "/api/workstreams/?format=json"
  );

  return {
    props: {
      workstreamData: data,
    },
  };
};

export default Workstream;
