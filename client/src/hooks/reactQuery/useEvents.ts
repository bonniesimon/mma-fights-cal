import { useQuery } from "@tanstack/react-query";
import eventsApi from "../../api/events";

import { Event } from "../../types";

export const useListEvents = () => {
  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: () => eventsApi.list(),
  });
};

interface ShowEventArgs {
  eventId: string;
  enabled: boolean;
}

export const useShowEvents = ({ eventId, enabled }: ShowEventArgs) =>
  useQuery<Event, Error>({
    queryKey: ["events", eventId],
    queryFn: () => eventsApi.show(eventId),
    enabled,
  });
