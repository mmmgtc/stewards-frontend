import { Box, Button, Flex, Image, Link, Text, VStack } from "@chakra-ui/react";

interface StewardsCardProps {
  name?: string;
  stewardsSince?: string;
  activity?: number;
  workstream?: string;
  voting?: number;
  participation?: string;
  gitcoinUsername?: string;
  profileImage?: string;
  statementLink?: string;
  delegateLink?: string;
  forumActivityLink?: string;
  healthScore?: number;
}

const StewardsCard = ({
  name,
  stewardsSince,
  activity,
  workstream,
  voting,
  participation,
  gitcoinUsername,
  profileImage,
  statementLink,
  delegateLink,
  forumActivityLink,
  healthScore
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
            src={profileImage ? `/assets/stewards/` + profileImage : '/assets/stewards/unknown.png'}
            alt={name}
          />
          <Box textAlign="left">
            <Text fontSize="1.2rem" fontWeight="bold">
              {name}
            </Text>
            <Link
              target="_blank"
              href={'https://gitcoin.co/' + gitcoinUsername}
              color="#42c8b0"
              textDecoration="none"
              _hover={{ color: "#42c8b0" }}
            >
              {gitcoinUsername}
            </Link>
          </Box>
        </Flex>
        <Box>
          <Text fontSize="1.75rem" fontWeight="bold">
            {healthScore}
          </Text>
          <Image src={'/assets/healthSvgs/health_' + (healthScore ? healthScore : 0) + '.svg'} alt={'Health score of ' + (healthScore ? healthScore : 0)} />
        </Box>
      </Flex>
      <Flex justify="space-between" alignItems="center" w="full">
        <Flex gap="1rem" alignItems="center">
          <Image w="40px" h="40px" src="/assets/calender.svg" alt="calender" />
          <Link
            target="_blank"
            href={statementLink}
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
            href={forumActivityLink}
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
            href="https://gitcoindao.com"
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
            href={delegateLink}
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
            href="https://snapshot.org/#/gitcoindao.eth"
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
          <Link color="white" href={statementLink} textDecoration="none"
          >Statement</Link>
        </Button>
        <Button variant="delegate">
          <Link color="white" href={delegateLink} textDecoration="none"
          >Delegate</Link>
        </Button>
      </Flex>
    </VStack>
  );
};

export default StewardsCard;
