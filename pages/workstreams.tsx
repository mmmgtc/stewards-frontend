import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import WorkstreamCard from "../components/WorkstreamCard";
import workstreamData from "../public/assets/workstreams/workstreams.json";

const Workstream = () => {
  return (
    <Flex
      bg="#291555"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="2"
      textAlign="center"
      paddingTop="10"
      width="100%"
      p={3}
    >
      <Heading mb="2rem" textAlign="center">
        Workstreams
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          "2xl": "repeat(3, 1fr)",
        }}
        w="full"
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
            />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

export default Workstream;
