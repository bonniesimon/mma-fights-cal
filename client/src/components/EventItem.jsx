import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { Calendar, ChevronRight } from "lucide-react";

const EventItem = ({ title, date }) => {
  return (
    <Box
      p={4}
      my={4}
      bg="gray.700"
      borderRadius="lg"
      boxShadow="md"
      cursor="pointer"
      transition="all 0.2s"
    >
      <Flex justifyContent="space-between" alignItems="center" color="white">
        <Box>
          <Text fontWeight="medium">{title}</Text>
          <Flex alignItems="center" mt={1}>
            <Icon as={Calendar} color="gray.300" w={3} h={3} mr={1} />
            <Text fontSize="sm" color="gray.300">
              {date}
            </Text>
          </Flex>
        </Box>
        <Flex>
          <Icon as={Calendar} color="white" mr={2} />
          <Icon as={ChevronRight} color="white" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default EventItem;
