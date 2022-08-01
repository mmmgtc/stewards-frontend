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
import Iframe from "react-iframe";
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
  // const objectives = [
  //   {
  //     label: "Objective",
  //     description:
  //       " Lorem ipsum is placeholder text commonly used in the graphic, print,and publishing industries for previewing layouts and visual mockups.",
  //   },
  //   {
  //     label: "Objective",
  //     description:
  //       " Lorem ipsum is placeholder text commonly used in the graphic, print,and publishing industries for previewing layouts and visual mockups.",
  //   },
  //   {
  //     label: "Objective",
  //     description:
  //       " Lorem ipsum is placeholder text commonly used in the graphic, print,and publishing industries for previewing layouts and visual mockups.",
  //   },
  //   {
  //     label: "Objective",
  //     description:
  //       " Lorem ipsum is placeholder text commonly used in the graphic, print,and publishing industries for previewing layouts and visual mockups.",
  //   },
  // ];

  // const proposals = ["proposal 1", "proposal 2", "proposal 3", "proposal 4"];

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
          <GridItem
            bg="rgba(76, 54, 123, 1)"
            rounded="0.8rem"
            overflow="hidden"
          >
            <iframe
              src={gtcBalance}
              style={{
                position: "relative",
                height: "100px",
                width: "100%",
              }}
            />
            <Box w="full" h="10rem" overflow="hidden">
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
          <GridItem
            p={3}
            bg="rgba(76, 54, 123, 1)"
            rounded="0.8rem"
            overflow="hidden"
          >
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
          <GridItem
            textAlign="left"
            p={3}
            bg="rgba(76, 54, 123, 1)"
            rounded="0.8rem"
          >
            <Text fontSize={"1.1rem"}>Budget Proposals</Text>

            {proposals.map((proposal, index) => (
              <Link
                href={proposal.link}
                target="_blank"
                display="block"
                key={index}
              >
                {proposal.title}
              </Link>
            ))}
          </GridItem>
          <GridItem p={3} bg="rgba(76, 54, 123, 1)" rounded="0.8rem">
            <Box w="full" h="full">
              {/* <BarChartComp data={data} /> */}
            </Box>
          </GridItem>
        </Grid>
        <Flex w="full" alignItems={"center"} justify="space-between">
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
                  href={"https://gitcoin.co/" + steward.gitcoin_username}
                >
                  <Image
                    w="1.75rem"
                    rounded="full"
                    src={`/assets/stewards/webp/${steward.profile_image}`}
                    alt={steward.name}
                    key={index}
                  />
                </Link>
              ))}
            </Flex>
          </Box>
          <Box height={"5rem"} overflow="hidden">
            <Text
              fontWeight={400}
              fontFamily="inter"
              fontSize={"1.1rem"}
              color="rgba(255, 255, 255, 1)"
            >
              All time contributors
            </Text>
            {/* <Text
              fontWeight={400}
              fontFamily="inter"
              fontSize={"1.3rem"}
              color="rgba(255, 255, 255, 1)"
            >
              65
            </Text> */}
            <iframe
              src={contributors}
              style={{ position: "relative", height: "300px" }}
            />
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default WorkstreamCard;
