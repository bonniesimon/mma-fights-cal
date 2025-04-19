import { Spinner, Box, Container, Flex, Text } from "@chakra-ui/react";
import { useListEvents } from "./hooks/reactQuery/useEvents";
import EventItem from "./components/EventItem";

function App() {
  const { data: { data } = {}, isLoading } = useListEvents();

  if (isLoading) {
    return (
      <Box minH="100vh" bg={"gray.800"} transition="all 0.2s">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="100vh"
        >
          <Spinner size="xl" color="white" />
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="gray.800" minH="100vh" color="white">
      <Flex
        as="header"
        position="sticky"
        top="0"
        bg="gray.800"
        backdropFilter="saturate(180%) blur(5px)"
        w="100%"
        p="3"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
          Fight Schedule
        </Text>
      </Flex>
      <Container bg="gray.800" maxW="container.sm" py={4} color="white">
        {data.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </Container>
    </Box>
  );
}

export default App;
