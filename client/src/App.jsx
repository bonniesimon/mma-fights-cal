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
    <Box
      minH="100vh"
      color="white"
      bgGradient="linear(to-br, gray.900 60%, gray.800 100%)"
      transition="all 0.2s"
    >
      <Flex
        as="header"
        position="sticky"
        top="0"
        zIndex={100}
        bg="rgba(26, 32, 44, 0.95)"
        boxShadow="lg"
        w="100%"
        px={{ base: 4, md: 8 }}
        py={3}
        alignItems="center"
        justifyContent="center"
        backdropFilter="saturate(180%) blur(6px)"
      >
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="extrabold"
          letterSpacing="tight"
          textAlign="center"
          color="blue.50"
        >
          Fight Schedule
        </Text>
      </Flex>
      <Container
        maxW="container.md"
        py={{ base: 6, md: 10 }}
        px={{ base: 2, md: 0 }}
      >
        {data.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </Container>
    <Box as="footer" w="100%" py={4} mt={8} bg="gray.900" textAlign="center" borderTop="1px" borderColor="gray.700">
      <Text color="gray.400" fontSize="sm">
        © {new Date().getFullYear()} Made by a fight fan
      </Text>
    </Box>
    </Box>
  );
}

export default App;
