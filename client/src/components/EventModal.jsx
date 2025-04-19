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
} from "@chakra-ui/react";
import { useShowEvents } from "../hooks/reactQuery/useEvents";
import { toIst } from "../utils/date";
import FightItem from "./FightItem";

const EventModal = ({ eventId, isOpen, onClose }) => {
  const { data: { data } = {}, isLoading } = useShowEvents({
    eventId,
    enabled: isOpen,
  });

  console.log(data);

  if (!isOpen) return;

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
          <Text>{toIst(data.date)}</Text>
        </Box>
        <Box>
          {Array.isArray(data.fights) && data.fights.length > 0 ? (
            data.fights.map((fight) => <FightItem fight={fight} />)
          ) : (
            <Text color="gray.400">No fights available.</Text>
          )}
        </Box>
      </ModalBody>

      <ModalFooter>
        <ModalCloseButton />
        <Button>Add to Calendar</Button>
      </ModalFooter>
    </ModalWrapper>
  );
};

const ModalWrapper = ({ isOpen, onClose, children }) => {
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
