import { Box, Flex, Text, Icon, useDisclosure, Link } from "@chakra-ui/react";
import { Calendar, ChevronRight } from "lucide-react";
import EventModal from "./EventModal";
import { formatUtcToLocal } from "../utils/date";
import { generateGoogleCalendarLink } from "../utils/calendarLink";
import { Event } from "../types";

interface Props {
  event: Event;
}

const EventItem = ({ event }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { title, eventId, date } = event;

  const googleCalendarLink = generateGoogleCalendarLink(event);

  return (
    <>
      <Box
        role="group"
        p={5}
        my={5}
        bg="gray.700"
        borderRadius="2xl"
        boxShadow="lg"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{
          boxShadow: "0 4px 24px 0 rgba(236, 201, 75, 0.12)",
          bg: "gray.600",
          transform: "translateY(-2px) scale(1.012)",
        }}
        _active={{
          boxShadow: "0 2px 10px 0 rgba(236, 201, 75, 0.08)",
          bg: "gray.800",
        }}
        onClick={onOpen}
      >
        <Flex justifyContent="space-between" alignItems="center" color="white">
          <Box minW={0}>
            <Text
              fontWeight="bold"
              fontSize={{ base: "md", md: "lg" }}
              isTruncated
              mb={1}
              _groupHover={{ color: "yellow.300" }}
            >
              {title}
            </Text>
            <Flex alignItems="center" mt={1} gap={1}>
              <Icon as={Calendar} color="gray.400" w={4} h={4} />
              <Text fontSize="sm" color="gray.300" isTruncated>
                {formatUtcToLocal(date)}
              </Text>
            </Flex>
          </Box>
          <Flex alignItems="center" gap={1}>
            <Link
              isExternal
              href={googleCalendarLink}
              onClick={(e) => e.stopPropagation()}
              display="flex"
              alignItems="center"
              _hover={{ color: "yellow.300" }}
              aria-label="Add to Google Calendar"
            >
              <Icon as={Calendar} color="yellow.300" boxSize={5} />
            </Link>
            <Box
              as="span"
              ml={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              bg="yellow.400"
              color="gray.900"
              boxSize={8}
              _groupHover={{ bg: "yellow.300" }}
              transition="background 0.2s"
            >
              <Icon as={ChevronRight} boxSize={5} />
            </Box>
          </Flex>
        </Flex>
      </Box>
      <EventModal eventId={eventId} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default EventItem;
