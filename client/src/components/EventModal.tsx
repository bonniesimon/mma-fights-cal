import {
  ModalBody,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  SkeletonText,
  Box,
  Link,
} from "@chakra-ui/react";
import { useShowEvents } from "../hooks/reactQuery/useEvents";
import { formatUtcToLocal } from "../utils/date";
import FightItem from "./FightItem";
import { generateGoogleCalendarLink } from "../utils/calendarLink";
import { Fight } from "../types";
import { ReactNode } from "react";

interface Props {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal = ({ eventId, isOpen, onClose }: Props) => {
  const { data, isLoading } = useShowEvents({
    eventId,
    enabled: isOpen,
  });

  const validateFights = (fights: Fight[]) =>
    Array.isArray(fights) && fights.length > 0;

  const mainFights = data?.fights.filter((fight) => fight.main) || [];
  const nonMainFights = data?.fights.filter((fight) => !fight.main) || [];

  if (!data || isLoading) {
    return (
      <ModalWrapper {...{ isOpen, onClose }}>
        <ModalCloseButton />
        <ModalHeader>
          <SkeletonText noOfLines={1} skeletonHeight={5} p={3} />
        </ModalHeader>
        <ModalBody>
          <SkeletonText noOfLines={5} p={3} />
        </ModalBody>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper {...{ isOpen, onClose }}>
      <ModalHeader>{data.title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box mb={4}>
          <Text>{formatUtcToLocal(data.date)}</Text>
        </Box>
        <Box>
          <Box width="fit-content" mx="auto">
            <Text
              fontSize="xs"
              fontWeight="bold"
              color="yellow.300"
              bg="gray.800"
              px={2}
              py={1}
              mb="2"
              borderRadius="md"
            >
              Main Event
            </Text>
          </Box>
          {validateFights(mainFights) ? (
            mainFights.map((fight) => (
              <FightItem
                key={fight.fighterA.name + fight.fighterB.name}
                fight={fight}
              />
            ))
          ) : (
            <Text color="gray.400">No fights available.</Text>
          )}
          <Box width="fit-content" mx="auto">
            <Text
              fontSize="xs"
              fontWeight="bold"
              color="yellow.300"
              bg="gray.800"
              px={2}
              py={1}
              mb="2"
              borderRadius="md"
            >
              Prelims Event
            </Text>
          </Box>
          {validateFights(nonMainFights) ? (
            nonMainFights.map((fight) => (
              <FightItem
                key={fight.fighterA.name + fight.fighterB.name}
                fight={fight}
              />
            ))
          ) : (
            <Text color="gray.400">No fights available.</Text>
          )}
        </Box>
      </ModalBody>

      <ModalFooter>
        <ModalCloseButton />
        <Link isExternal href={`${generateGoogleCalendarLink(data)}`}>
          <Button>Add to Calendar</Button>
        </Link>
      </ModalFooter>
    </ModalWrapper>
  );
};

const ModalWrapper = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="gray.700" color="white">
        {children}
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
