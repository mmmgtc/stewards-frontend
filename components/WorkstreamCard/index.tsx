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

const WorkstreamCard = ({}) => {
  const objectives = [
    {
      label: "Objective",
      description:
        " Lorem ipsum is placeholder text commonly used in the graphic, print,and publishing industries for previewing layouts and visual mockups.",
    },
    {
      label: "Objective",
      description:
        " Lorem ipsum is placeholder text commonly used in the graphic, print,and publishing industries for previewing layouts and visual mockups.",
    },
    {
      label: "Objective",
      description:
        " Lorem ipsum is placeholder text commonly used in the graphic, print,and publishing industries for previewing layouts and visual mockups.",
    },
    {
      label: "Objective",
      description:
        " Lorem ipsum is placeholder text commonly used in the graphic, print,and publishing industries for previewing layouts and visual mockups.",
    },
  ];

  const stewards = ["adamsc1-ddg", "adamstallard", "amsos", "chase"];

  const proposals = ["proposal 1", "proposal 2", "proposal 3", "proposal 4"];
  return (
    <Box bg="#452885" rounded="1rem" p={2}>
      <VStack>
        <Text
          fontWeight={400}
          fontFamily="inter"
          fontSize={"1.3rem"}
          color="rgba(255, 255, 255, 1)"
        >
          Merch Memes & Marketing
        </Text>
        <Text fontSize={15} color="rgba(201, 184, 255, 1)" fontStyle="italic">
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
        </Text>
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
                  {obj.label}:
                </Text>
                <Text color="rgba(209, 196, 196, 1)">{obj.description}</Text>
              </Flex>
            ))}
          </VStack>
        </Box>
        <Grid
          w="full"
          color="rgba(255, 255, 255, 1)"
          gap={5}
          templateColumns="repeat(2, 1fr)"
        >
          <GridItem p={3} bg="rgba(76, 54, 123, 1)" rounded="0.8rem">
            <Text fontSize={"1.1rem"}>53.2k GTC</Text>
            <Box>Graphs</Box>
          </GridItem>
          <GridItem p={3} bg="rgba(76, 54, 123, 1)" rounded="0.8rem">
            <Text fontSize={"1.1rem"}>53.2k GTC</Text>
            <Box>Graphs</Box>
          </GridItem>
          <GridItem
            textAlign="left"
            p={3}
            bg="rgba(76, 54, 123, 1)"
            rounded="0.8rem"
          >
            <Text fontSize={"1.1rem"}>Budget Proposals</Text>

            {proposals.map((proposal, index) => (
              <Link display="block" key={index}>
                {proposal}
              </Link>
            ))}
          </GridItem>
          <GridItem p={3} bg="rgba(76, 54, 123, 1)" rounded="0.8rem">
            <Box>Graphs</Box>
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
                <Image
                  w="1.75rem"
                  rounded="full"
                  src={`/assets/stewards/webp/${steward}.webp`}
                  alt={steward}
                  key={index}
                />
              ))}
            </Flex>
          </Box>
          <Box>
            <Text
              fontWeight={400}
              fontFamily="inter"
              fontSize={"1.1rem"}
              color="rgba(255, 255, 255, 1)"
            >
              All time contributors
            </Text>
            <Text
              fontWeight={400}
              fontFamily="inter"
              fontSize={"1.3rem"}
              color="rgba(255, 255, 255, 1)"
            >
              65
            </Text>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default WorkstreamCard;
