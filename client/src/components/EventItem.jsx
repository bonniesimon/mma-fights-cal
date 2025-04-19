import {
  Box,
  Flex,
  Text,
  Icon,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link,
} from "@chakra-ui/react";
import { Calendar, ChevronRight } from "lucide-react";
import EventModal from "./EventModal";
import { toIst } from "../utils/date";
import { generateGoogleCalendarLink } from "../utils/calendarLink";

const EventItem = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { title, eventId, date } = event;

  const googleCalendarLink = generateGoogleCalendarLink(event);

  return (
    <>
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
                {toIst(date)}
              </Text>
            </Flex>
          </Box>
          <Flex>
            <Link isExternal href={googleCalendarLink}>
              <Icon as={Calendar} color="white" mr={2} />
            </Link>
            <Icon as={ChevronRight} color="white" onClick={onOpen} />
          </Flex>
        </Flex>
      </Box>
      <EventModal
        eventId={eventId}
        title={title}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default EventItem;
