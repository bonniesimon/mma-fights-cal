import { Spinner, Box } from "@chakra-ui/react";
import { useListEvents } from "./hooks/reactQuery/useEvents";
import { toIst } from "./utils/date";

function App() {
  const { data: { data } = {}, isLoading } = useListEvents();

  if (isLoading) {
    return (
      <Box minH="100vh" bg="gray.50" transition="all 0.2s">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="100vh"
        >
          <Spinner size="xl" />
        </Box>
      </Box>
    );
  }

  return (
    <>
      {data.map((event) => (
        <div key={event.link}>
          <h3>{event.title}</h3>
          <p>{toIst(event.date)}</p>
        </div>
      ))}
    </>
  );
}

export default App;
