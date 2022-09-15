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
  description: string;
  objectives: any[];
  gtcBalanceOvertime: string;
  stableCoinBalanceOvertime: string;
  notionPage: string;
  contributors: string;
  gtcBalance: string;
  stableBalance: string;
  stewards: any[];
}

const WorkstreamCard = ({
  title,
  description,
  objectives,
  gtcBalanceOvertime,
  stableCoinBalanceOvertime,
  notionPage,
  contributors,
  gtcBalance,
  stableBalance,
  stewards,
}: WorkstreamCardProps) => {
  console.log(title);
  console.log(description);
  console.log(gtcBalanceOvertime);
  console.log(stableCoinBalanceOvertime);
  console.log("contributors:====", contributors);
  console.log(gtcBalance);
  console.log(stableBalance);
  console.log(stewards);
  return (
    <Box bg="#452885" rounded="1rem" p={2} minHeight="400px">
      <VStack>
        <Text
          fontWeight={400}
          fontFamily="inter"
          fontSize={"1.3rem"}
          color="rgba(255, 255, 255, 1)"
        >
          {notionPage && (
            <Link target="_blank" href={notionPage}>
              {title}
            </Link>
          )}
          {!notionPage && <Text>{title}</Text>}
        </Text>
        <Text
          fontSize={15}
          color="rgba(201, 184, 255, 1)"
          width={{ lg: "35rem" }}
          fontStyle="italic"
        >
          {description}
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
            <Text fontSize={"1.1rem"}>{gtcBalance} GTC</Text>
            <Box w="full" h="10rem" overflow="hidden" bg="#291555">
              {gtcBalanceOvertime !== "-" ? (
                <iframe
                  src={gtcBalanceOvertime}
                  style={{
                    position: "relative",
                    height: "190px",
                    width: "100%",
                    color: "white",
                  }}
                />
              ) : (
                <p>No data found</p>
              )}
            </Box>
          </GridItem>
          <GridItem p={0} bg="#291555" rounded="0.8rem" overflow="hidden">
            <Text fontSize={"1.1rem"}>{stableBalance} USDC</Text>

            <Box w="full" h="10rem" overflow="hidden">
              {/* {stableCoinBalanceOvertime !== "-" ? (
                <Text fontSize={"1.1rem"}>{stableCoinBalanceOvertime}</Text>
              ) : (
                <p>No data found</p>
              )} */}
              {stableCoinBalanceOvertime !== "-" ? (
                <iframe
                  src={stableCoinBalanceOvertime}
                  style={{
                    position: "relative",
                    height: "190px",
                    width: "100%",
                    color: "white",
                  }}
                />
              ) : (
                <p>No data found</p>
              )}
            </Box>
          </GridItem>
        </Grid>
        <Grid
          w="full"
          color="rgba(255, 255, 255, 1)"
          gap={5}
          templateColumns="1fr"
        >
          {stewards.length > 0 && (
            <GridItem textAlign="center" p={3} rounded="0.8rem" bg="#291555">
              <Box w="full" h="full">
                <Flex justify="space-between">
                  <Text
                    fontWeight={400}
                    fontFamily="inter"
                    fontSize={"1.1rem"}
                    color="rgba(255, 255, 255, 1)"
                  >
                    Current Stewards
                  </Text>
                  <Text textAlign="right">
                    Total Contributors: {contributors}
                  </Text>
                </Flex>
                <Flex>
                  <Box>
                    <Flex gap={1}>
                      {stewards.length > 0 &&
                        stewards.map((steward, index) => (
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
              </Box>
            </GridItem>
          )}
        </Grid>
        {/* <GridItem p={3} rounded="0.8rem" bg="#291555"></GridItem> */}
      </VStack>
    </Box>
  );
};

export default WorkstreamCard;
