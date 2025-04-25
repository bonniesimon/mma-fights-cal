import { Flex, Text, Box } from "@chakra-ui/react";
import TruncatableTooltipText from "./TruncatableTooltipText";
import { Fight } from "../types";

interface Props {
  fight: Fight;
}
const FightItem = ({ fight }: Props) => {
  return (
    <Box
      mb={4}
      p={4}
      borderRadius="lg"
      boxShadow={fight.main ? "0 0 0 3px #ECC94B" : "md"}
      bg={fight.main ? "yellow.700" : "gray.600"}
      border={fight.main ? "2px solid #ECC94B" : "1px solid #444"}
      position="relative"
    >
      <Flex
        align="center"
        justify="space-between"
        wrap={{ base: "wrap", md: "nowrap" }}
      >
        <Flex align="center" flex={1} minW={0} gap={3}>
          <Box boxSize="60px" minW="60px">
            <img
              src={fight.fighterA.picture}
              alt={fight.fighterA.name}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fff",
              }}
            />
          </Box>
          <Box minW={0}>
            <Flex align="center" gap={2} mb={1} whiteSpace="nowrap" minW={0}>
              <a
                href={fight.fighterA.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TruncatableTooltipText
                  fontWeight="bold"
                  fontSize="lg"
                  maxW="120px"
                >
                  {fight.fighterA.name}
                </TruncatableTooltipText>
              </a>
              <img
                src={fight.fighterA.country}
                alt="flag"
                style={{
                  width: 20,
                  height: 14,
                  borderRadius: 2,
                  marginLeft: 4,
                }}
              />
            </Flex>
            <Text fontSize="sm" color="gray.200">
              {fight.fighterA.record}
            </Text>
          </Box>
        </Flex>

        <Flex
          direction="column"
          align="center"
          justify="center"
          mx={6} // increased margin for more space
          minW="80px"
        >
          <Text fontWeight="bold" fontSize="xl" color="yellow.200">
            VS
          </Text>
          <Text fontSize="sm" color="gray.300">
            {fight.weight} lbs
          </Text>
        </Flex>

        <Flex align="center" flex={1} minW={0} gap={3} justify="flex-end">
          <Box minW={0} textAlign="right">
            <Flex
              align="center"
              gap={2}
              mb={1}
              justify="flex-end"
              whiteSpace="nowrap"
              minW={0}
            >
              <img
                src={fight.fighterB.country}
                alt="flag"
                style={{
                  width: 20,
                  height: 14,
                  borderRadius: 2,
                  marginRight: 4,
                }}
              />
              <a
                href={fight.fighterB.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TruncatableTooltipText
                  fontWeight="bold"
                  fontSize="lg"
                  maxW="120px"
                >
                  {fight.fighterB.name}
                </TruncatableTooltipText>
              </a>
            </Flex>
            <Text fontSize="sm" color="gray.200">
              {fight.fighterB.record}
            </Text>
          </Box>
          <Box boxSize="60px" minW="60px">
            <img
              src={fight.fighterB.picture}
              alt={fight.fighterB.name}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fff",
              }}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default FightItem;
