import { Button } from "@chakra-ui/react";
import { useListEvents } from "./hooks/reactQuery/useEvents";
import { toIst } from "./utils/date";

function App() {
  const { data: { data } = {}, isLoading } = useListEvents();

  if (isLoading) {
    return <h1>Loading</h1>;
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
