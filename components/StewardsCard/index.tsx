import { Box, Button, Flex, Image, Link, Text, VStack } from "@chakra-ui/react";

interface StewardsCardProps {
  stewardsSince?: string;
  activity?: number;
  workstream?: string;
  voting?: number;
  participation?: number;
  profile?: string;
}

const StewardsCard = ({
  stewardsSince,
  activity,
  workstream,
  voting,
  participation,
  profile,
}: StewardsCardProps) => {
  return (
    <VStack
      background="#321e5e"
      borderRadius="6px"
      p="0.8rem"
      w={"full"}
      gap="0.8rem"
    >
      <Flex alignItems="center" w="full" justify="space-between">
        <Flex gap="1rem" alignItems="center">
          <Image
            borderRadius="1rem"
            w="100px"
            h="100px"
            src={profile ? profile : `/assets/austintgriffith.png`}
            alt="austin griffith"
          />
          <Box textAlign="left">
            <Text fontSize="1.2rem" fontWeight="bold">
              Austin Griffith
            </Text>
            <Link
              target="_blank"
              href="https://gitcoin.co/austintgriffith"
              color="#42c8b0"
              textDecoration="none"
              _hover={{ color: "#42c8b0" }}
            >
              austingriffith
            </Link>
          </Box>
        </Flex>
        <Box>
          <Text fontSize="1.75rem" fontWeight="bold">
            10/10
          </Text>
          <Image src="/assets/healthSvgs/health_9.svg" alt="health_9" />
        </Box>
      </Flex>
      <Flex justify="space-between" alignItems="center" w="full">
        <Flex gap="1rem" alignItems="center">
          <Image w="40px" h="40px" src="/assets/calender.svg" alt="calender" />
          <Link
            target="_blank"
            href="https://gov.gitcoin.co/t/introducing-stewards-governance/41/213"
            textDecoration="none"
            _hover={{ color: "white" }}
            fontSize="1.2rem"
          >
            Stewards since
          </Link>
        </Flex>
        <Text>{stewardsSince}</Text>
      </Flex>
      <Flex justify="space-between" alignItems="center" w="full">
        <Flex gap="1rem" alignItems="center">
          <Image w="40px" h="40px" src="/assets/forum.svg" alt="calender" />
          <Link
            target="_blank"
            href="https://gov.gitcoin.co/t/introducing-stewards-governance/41/213"
            textDecoration="none"
            _hover={{ color: "white" }}
            fontSize="1.2rem"
          >
            Forum activity
          </Link>
        </Flex>
        <Text>{activity}</Text>
      </Flex>
      <Flex justify="space-between" alignItems="center" w="full">
        <Flex gap="1rem" alignItems="center">
          <Image
            w="40px"
            h="40px"
            src="/assets/workstream.svg"
            alt="calender"
          />
          <Link
            target="_blank"
            href="https://gov.gitcoin.co/t/introducing-stewards-governance/41/213"
            textDecoration="none"
            _hover={{ color: "white" }}
            fontSize="1.2rem"
          >
            Workstream
          </Link>
        </Flex>
        <Text>{workstream}</Text>
      </Flex>
      <Flex justify="space-between" alignItems="center" w="full">
        <Flex gap="1rem" alignItems="center">
          <Image w="40px" h="40px" src="/assets/weight.svg" alt="calender" />
          <Link
            target="_blank"
            href="https://gov.gitcoin.co/t/introducing-stewards-governance/41/213"
            textDecoration="none"
            _hover={{ color: "white" }}
            fontSize="1.2rem"
          >
            Voting weight
          </Link>
        </Flex>
        <Text>{voting}%</Text>
      </Flex>
      <Flex justify="space-between" alignItems="center" w="full">
        <Flex gap="1rem" alignItems="center">
          <Image
            w="40px"
            h="40px"
            src="/assets/participation.svg"
            alt="calender"
          />
          <Link
            target="_blank"
            href="https://gov.gitcoin.co/t/introducing-stewards-governance/41/213"
            textDecoration="none"
            _hover={{ color: "white" }}
            fontSize="1.2rem"
          >
            Vote participation
          </Link>
        </Flex>
        <Text>{participation}%</Text>
      </Flex>
      <Flex alignItems="center" w="full" justify="space-between">
        <Button variant="statement" paddingX="1.5">
          Statement
        </Button>
        <Button variant="delegate">Delegate</Button>
      </Flex>
    </VStack>
  );
};

export default StewardsCard;
