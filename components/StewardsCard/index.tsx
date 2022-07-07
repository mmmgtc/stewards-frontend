import { Box, Button, Flex, Image, Link, Text, VStack } from "@chakra-ui/react";

const StewardsCard = ({}) => {
  return (
    <VStack
      background="#321e5e"
      borderRadius="6px"
      p="0.8rem"
      w={"full"}
      gap='0.8rem'
    >
      <Flex alignItems='center' w='full' justify='space-between'>
        <Flex gap="1rem" alignItems='center'>
          <Image borderRadius='1rem' w='100px' h='100px' src="/assets/austintgriffith.png" alt='austin griffith'/>
          <Box textAlign='left'>
            <Text>Austin Griffith</Text>
            <Link target='_blank' href="https://gitcoin.co/austintgriffith">austingriffith</Link>
          </Box>
        </Flex>
        <Box>
          <Text>10/10</Text>
          <Image src='/assets/healthSvgs/health_9.svg' alt="health_9" />
        </Box>
      </Flex>
      <Flex justify='space-between' alignItems='center' w='full'>
        <Flex gap='1rem' alignItems='center'>
          <Image w='40px' h='40px' src='/assets/calender.svg' alt="calender" />
          <Link target='_blank' href="https://gov.gitcoin.co/t/introducing-stewards-governance/41/213">Stewards since</Link>
        </Flex>
        <Text>2022-04-04</Text>
      </Flex>
      <Flex justify='space-between' alignItems='center' w='full'>
        <Flex gap='1rem' alignItems='center'>
          <Image w='40px' h='40px' src='/assets/calender.svg' alt="calender" />
          <Link target='_blank' href="https://gov.gitcoin.co/t/introducing-stewards-governance/41/213">Stewards since</Link>
        </Flex>
        <Text>2022-04-04</Text>
      </Flex>
      <Flex justify='space-between' alignItems='center' w='full'>
        <Flex gap='1rem' alignItems='center'>
          <Image w='40px' h='40px' src='/assets/calender.svg' alt="calender" />
          <Link target='_blank' href="https://gov.gitcoin.co/t/introducing-stewards-governance/41/213">Stewards since</Link>
        </Flex>
        <Text>2022-04-04</Text>
      </Flex>
      <Flex justify='space-between' alignItems='center' w='full'>
        <Flex gap='1rem' alignItems='center'>
          <Image w='40px' h='40px' src='/assets/calender.svg' alt="calender" />
          <Link target='_blank' href="https://gov.gitcoin.co/t/introducing-stewards-governance/41/213">Stewards since</Link>
        </Flex>
        <Text>2022-04-04</Text>
      </Flex>
      <Flex justify='space-between' alignItems='center' w='full'>
        <Flex gap='1rem' alignItems='center'>
          <Image w='40px' h='40px' src='/assets/calender.svg' alt="calender" />
          <Link target='_blank' href="https://gov.gitcoin.co/t/introducing-stewards-governance/41/213">Stewards since</Link>
        </Flex>
        <Text>2022-04-04</Text>
      </Flex>
      <Flex alignItems='center' w='full' justify='space-between'>
        <Button variant='statement'>Statement</Button>
        <Button variant='delegate'>Delegate</Button>
      </Flex>
    </VStack>
  );
};

export default StewardsCard;
