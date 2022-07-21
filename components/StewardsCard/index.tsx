import { Box, Button, Flex, Image, Link, Text, VStack } from "@chakra-ui/react";

interface StewardsCardProps {
  name?: string;
  stewardsSince?: string;
  workstreams?: Array<WorkstreamProps>;
  votingWeight?: number;
  votingParticipation?: number;
  gitcoinUsername?: string;
  profileImage?: string;
  statementLink?: string;
  delegateLink?: string;
  forumActivity?: number;
  forumActivityLink?: string;
  healthScore?: number;
}

interface WorkstreamProps {
  title?: string;
  uri?: string;
}

// Ensure healh scores between 1 - 10, or '-' are returned
function getHealthcore(healthScore) {
  return healthScore > 0 ? (healthScore > 10 ? 10 : healthScore) : 0;
}

// Ensure healh scores between 1 - 10, or '-' are returned
function getVotingWeight(votingWeight) {
  if (votingWeight > 0.05) {
    return votingWeight.toFixed(2) + "%";
  } else if (votingWeight >= 0.005) {
    return votingWeight.toFixed(3) + "%";
  } else {
    return 0;
  }
}

function getWorkstreams(workstreams) {
  let ret = "";
  if (workstreams.length > 0) {
    workstreams.forEach((element) => {
      ret +=
        '<a href="' +
        element.uri +
        '" class="workstream" target="_blank">' +
        element.title +
        "</a>";
    });
    return ret;
  } else {
    return "-";
  }
}

const StewardsCard = ({
  name,
  stewardsSince,
  forumActivity,
  workstreams,
  votingWeight,
  votingParticipation,
  gitcoinUsername,
  profileImage,
  statementLink,
  delegateLink,
  forumActivityLink,
  healthScore,
}: StewardsCardProps) => {
  return (
    <VStack
      background="#321e5e"
      borderRadius="6px"
      // p="0.8rem"
      w={"full"}
      gap="0.8rem"
    >
      <Flex alignItems="center" w="full" justify="space-between">
        <Flex gap="1rem" alignItems="center">
          <Image
            borderRadius="1rem"
            w={{ sm: "100px", base: "70px" }}
            h={{ sm: "100px", base: "70px" }}
            src={
              profileImage
                ? `/assets/stewards/webp/` + profileImage
                : "/assets/stewards/unknown.webp"
            }
            alt={name ? name : "-"}
          />
          <Box textAlign="left">
            <Text fontSize={{ sm: "1.2rem", base: "0.9rem" }} fontWeight="bold">
              {name.length > 0 ? name : "-"}
            </Text>
            <Link
              isExternal
              href={"https://gitcoin.co/" + gitcoinUsername}
              color="#42c8b0"
              textDecoration="none"
              _hover={{ color: "#42c8b0" }}
              fontSize={{ sm: "1.2rem", base: "0.9rem" }}
            >
              {gitcoinUsername}
            </Link>
          </Box>
        </Flex>
        <Box marginRight="1rem">
          <Text
            fontSize={{ sm: "1.8rem", base: "1.2rem" }}
            fontWeight="bold"
            align="right"
          >
            {getHealthcore(healthScore) > 0
              ? getHealthcore(healthScore) + "/10"
              : "-/10"}
          </Text>
          <Image
            src={
              "/assets/healthSvgs/health_" + getHealthcore(healthScore) + ".svg"
            }
            width={{ sm: "full", base: "5rem" }}
            alt={"Health score of " + getHealthcore(healthScore)}
          />
        </Box>
      </Flex>
      <Flex
        justify="space-between"
        alignItems="center"
        w="full"
        paddingX={"1rem"}
      >
        <Flex gap="1rem" alignItems="center">
          <Image
            w={{ sm: "40px", base: "30px" }}
            h={{ sm: "40px", base: "30px" }}
            src="/assets/calender.svg"
            alt="calender"
          />
          <Link
            isExternal
            href={statementLink}
            textDecoration="none"
            _hover={{ color: "white" }}
            fontSize={{ sm: "1.2rem", base: "0.9rem" }}
          >
            Stewards since
          </Link>
        </Flex>
        <Text fontSize={{ sm: "1.2rem", base: "0.9rem" }}>{stewardsSince}</Text>
      </Flex>
      <Flex
        justify="space-between"
        alignItems="center"
        w="full"
        paddingX={"1rem"}
      >
        <Flex gap="1rem" alignItems="center">
          <Image
            w={{ sm: "40px", base: "30px" }}
            h={{ sm: "40px", base: "30px" }}
            src="/assets/forum.svg"
            alt="calender"
          />
          <Link
            isExternal
            href={forumActivityLink}
            textDecoration="none"
            _hover={{ color: "white" }}
            fontSize={{ sm: "1.2rem", base: "0.9rem" }}
          >
            Forum activity
          </Link>
        </Flex>
        <Text fontSize={{ sm: "1.2rem", base: "0.9rem" }}>
          {forumActivity > 0 ? forumActivity : "-"}
        </Text>
      </Flex>
      <Flex
        justify="space-between"
        alignItems="center"
        w="full"
        paddingX={"1rem"}
      >
        <Flex gap="1rem" alignItems="center">
          <Image
            w={{ sm: "40px", base: "30px" }}
            h={{ sm: "40px", base: "30px" }}
            src="/assets/workstream.svg"
            alt="calender"
          />
          <Link
            isExternal
            href="https://gitcoindao.com"
            textDecoration="none"
            _hover={{ color: "white" }}
            fontSize={{ sm: "1.2rem", base: "0.9rem" }}
          >
            Workstream
          </Link>
        </Flex>
        <Text fontSize={{ sm: "1.2rem", base: "0.9rem" }} align="right">
          <span
            dangerouslySetInnerHTML={{ __html: getWorkstreams(workstreams) }}
          />
        </Text>
      </Flex>
      <Flex
        justify="space-between"
        alignItems="center"
        w="full"
        paddingX={"1rem"}
      >
        <Flex gap="1rem" alignItems="center">
          <Image
            w={{ sm: "40px", base: "30px" }}
            h={{ sm: "40px", base: "30px" }}
            src="/assets/weight.svg"
            alt="calender"
          />
          <Link
            isExternal
            href={delegateLink}
            textDecoration="none"
            _hover={{ color: "white" }}
            fontSize={{ sm: "1.2rem", base: "0.9rem" }}
          >
            Voting weight
          </Link>
        </Flex>
        <Text fontSize={{ sm: "1.2rem", base: "0.9rem" }}>
          {getVotingWeight(votingWeight)}
        </Text>
      </Flex>
      <Flex
        justify="space-between"
        alignItems="center"
        w="full"
        paddingX={"1rem"}
      >
        <Flex gap="1rem" alignItems="center">
          <Image
            w={{ sm: "40px", base: "30px" }}
            h={{ sm: "40px", base: "30px" }}
            src="/assets/participation.svg"
            alt="calender"
          />
          <Link
            isExternal
            href="https://snapshot.org/#/gitcoindao.eth"
            textDecoration="none"
            _hover={{ color: "white" }}
            fontSize={{ sm: "1.2rem", base: "0.9rem" }}
          >
            Vote participation
          </Link>
        </Flex>
        <Text fontSize={{ sm: "1.2rem", base: "0.9rem" }}>
          {votingParticipation > 0 ? votingParticipation + "%" : "-"}
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        w="full"
        justify="space-between"
        paddingX={"1rem"}
        paddingY={"1rem"}
      >
        <Button variant="statement" paddingX="1.5">
          <Link
            isExternal
            color="white"
            href={statementLink}
            textDecoration="none"
            fontSize={{ sm: "1.2rem", base: "0.9rem" }}
          >
            Statement
          </Link>
        </Button>
        <Button variant="delegate">
          <Link
            isExternal
            color="white"
            href={delegateLink}
            textDecoration="none"
            fontSize={{ sm: "1.2rem", base: "0.9rem" }}
          >
            Delegate
          </Link>
        </Button>
      </Flex>
    </VStack>
  );
};

export default StewardsCard;
