import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import AreaChartComp from "../Charts/AreaChart";
import BarChartComp from "../Charts/BarChartComp";
import { relative } from "path";

interface WorkstreamCardProps {
  title: string;
  discrpition: string;
  objectives: any[];
  gtcBalanceOvertime: string;
  stableCoinBalanceOvertime: string;
  proposals: any[];
  notionPage: string;
  contributors: string;
  gtcBalance: string;
  stableBalance: string;
  stewards: any[];
}

const WorkstreamCard = ({
  title,
  discrpition,
  objectives,
  gtcBalanceOvertime,
  stableCoinBalanceOvertime,
  proposals,
  notionPage,
  contributors,
  gtcBalance,
  stableBalance,
  stewards,
}: WorkstreamCardProps) => {
  return (
    <Box bg="#452885" rounded="1rem" p={2}>
      <VStack>
        <Text
          fontWeight={400}
          fontFamily="inter"
          fontSize={"1.3rem"}
          color="rgba(255, 255, 255, 1)"
        >
          <Link target="_blank" href={notionPage}>
            {title}
          </Link>
        </Text>
        <Text fontSize={15} color="rgba(201, 184, 255, 1)" fontStyle="italic">
          {discrpition}
        </Text>
        {objectives.length > 0 && (
          <Box
            overflowY={"auto"}
            height="10rem"
            w="full"
            bg="rgba(76, 54, 123, 1)"
            rounded="0.8rem"
            p={2}
          >
            <Text
              fontWeight={400}
              fontFamily="inter"
              fontSize={"1.1rem"}
              textDecoration="underline"
              color="rgba(255, 255, 255, 1)"
            >
              Objectives
            </Text>
            <VStack textAlign="left" spacing={2}>
              {objectives.map((obj, index) => (
                <Flex fontSize={12} gap={2} align="flex-start" key={index}>
                  <Text color="rgba(255, 255, 255, 1)" w="fit-content">
                    {obj.title}:
                  </Text>
                  <Text color="rgba(209, 196, 196, 1)">{obj.description}</Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        )}
        <Grid
          w="full"
          color="rgba(255, 255, 255, 1)"
          gap={5}
          templateColumns="repeat(2, 1fr)"
        >
          <GridItem rounded="0.8rem" overflow="hidden" bg="#291555">
            <iframe
              src={gtcBalance}
              style={{
                position: "relative",
                height: "100px",
                width: "100%",
              }}
            />
            <Box w="full" h="10rem" overflow="hidden" bg="#291555">
              {/* <iframe src={gtcBalanceOvertime} /> */}
              {gtcBalanceOvertime !== "-" ? (
                <iframe
                  src={gtcBalanceOvertime}
                  style={{
                    position: "relative",
                    height: "230px",
                    width: "100%",
                    color: "white",
                  }}
                />
              ) : (
                <p>No data found</p>
              )}
            </Box>
          </GridItem>
          <GridItem p={3} bg="#291555" rounded="0.8rem" overflow="hidden">
            {/* <Text fontSize={"1.1rem"}>53.2k GTC</Text> */}
            <iframe
              src={stableBalance}
              style={{
                position: "relative",
                height: "150px",
                width: "100%",
              }}
            />
            <Box w="full" h="10rem" overflow="hidden">
              {/* <iframe src={stableCoinBalanceOvertime} /> */}
              {stableCoinBalanceOvertime !== "-" ? (
                <iframe
                  src={stableCoinBalanceOvertime}
                  style={{
                    position: "relative",
                    height: "230px",
                    width: "100%",
                    color: "white",
                  }}
                />
              ) : (
                <p>No data found</p>
              )}
            </Box>
          </GridItem>
          <GridItem textAlign="left" p={3} rounded="0.8rem" bg="#291555">
            <Text fontSize={"1.1rem"}>Budget Proposals</Text>

            {proposals.map((proposal, index) => (
              <Link
                href={proposal.link}
                target="_blank"
                display="block"
                key={"budgetproposal-" + index}
              >
                {proposal.title}
              </Link>
            ))}
          </GridItem>
          <GridItem p={3} rounded="0.8rem" bg="#291555">
            <Box w="full" h="full">
              <iframe src={contributors} style={{ position: "relative" }} />
              {stewards.length > 0 && (
                <Flex justify="space-between">
                  <Box>
                    <Text
                      fontWeight={400}
                      fontFamily="inter"
                      fontSize={"1.1rem"}
                      color="rgba(255, 255, 255, 1)"
                    >
                      Stewards
                    </Text>
                    <Flex gap={1}>
                      {stewards.map((steward, index) => (
                        <Link
                          isExternal
                          href={
                            "https://gitcoin.co/" + steward.gitcoin_username
                          }
                          key={"steward-" + index}
                        >
                          <Image
                            w="3rem"
                            rounded="full"
                            src={`/assets/stewards/webp/${steward.profile_image}`}
                            alt={steward.name}
                            key={index}
                          />
                        </Link>
                      ))}
                    </Flex>
                  </Box>
                </Flex>
              )}
            </Box>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default WorkstreamCard;
