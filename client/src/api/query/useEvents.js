import { useQuery } from "@tanstack/react-query";
import eventsApi from "../events";

export const useListEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => eventsApi.list(),
  });
};
