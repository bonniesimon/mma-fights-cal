import { Spinner, Box, Container } from "@chakra-ui/react";
import { useListEvents } from "./hooks/reactQuery/useEvents";
import { toIst } from "./utils/date";
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
    <Box bg="gray.800" minH="100vh">
      <Container bg="gray.800" maxW="container.sm" py={4} color="white">
        {data.map((event) => (
          <EventItem
            key={event.link}
            title={event.title}
            date={toIst(event.date)}
          />
        ))}
      </Container>
    </Box>
  );
}

export default App;
