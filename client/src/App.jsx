import "./App.css";
import { useListEvents } from "./api/query/useEvents";

function App() {
  const { data, isLoading } = useListEvents();

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      {data.data.map((event) => (
        <h1 key={event.link}>{event.title}</h1>
      ))}
    </>
  );
}

export default App;
