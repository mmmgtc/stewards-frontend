import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import WorkstreamCard from "../components/WorkstreamCard";
import workstreamData from "../public/assets/workstreams/workstreams.json";
import stewardsProfileData from "../public/assets/stewards/stewards_data.json";
import { useEffect } from "react";
import axios from "axios";
import * as cheerio from "cheerio";

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

const Workstream = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="2"
      textAlign="center"
      paddingTop="10"
      width="100%"
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
        {workstreamData.map((workstream, index) => (
          <GridItem key={index}>
            <WorkstreamCard
              title={workstream.title}
              discrpition={workstream.description}
              objectives={workstream.objectives}
              gtcBalanceOvertime={workstream.duneEmbeds.gtcBalanceOverTime}
              stableCoinBalanceOvertime={
                workstream.duneEmbeds.stableCoinBalanceOverTime
              }
              proposals={workstream.budgetProposals}
              notionPage={workstream.uri}
              contributors={workstream.duneEmbeds.allTimeContributors}
              gtcBalance={workstream.duneEmbeds.gtcBalance}
              stableBalance={workstream.duneEmbeds.stableCoinBalance}
              stewards={getStewards(workstream)}
            />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

// export const getStaticProps = async () => {
//   const { data } = await axios.get(
//     "https://dune.com/embeds/1074330/1843176/e6a89acd-1ff1-49a2-ba76-cfb90f4869ad"
//   );
//   const $ = cheerio.load(data);
//   console.log($.html());

//   return {
//     props: {
//       hello: "hello",
//     },
//   };
// };

export default Workstream;
