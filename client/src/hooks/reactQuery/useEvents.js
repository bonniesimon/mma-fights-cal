import { useQuery } from "@tanstack/react-query";
import eventsApi from "../../api/events";

export const useListEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => eventsApi.list(),
  });
};

export const useShowEvents = ({ eventId, enabled }) =>
  useQuery({
    queryKey: ["events", eventId],
    queryFn: () => eventsApi.show(eventId),
    enabled,
  });
