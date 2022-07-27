import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import WorkstreamCard from "../components/WorkstreamCard";

const Workstream = () => {
  return   <Flex
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
  <Grid templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)'}}>
    <GridItem>
    <WorkstreamCard />
    </GridItem>
  </Grid>
</Flex>

}

export default Workstream;