import { useQuery } from "@tanstack/react-query";

const API_URL = "https://prod-03.uaenorth.logic.azure.com/workflows/8b23911d89764c8b8f7232aa1266e00c/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=tInMTOIIpKCAGEyK0L1reHgO-4vRyby-2St_V9Tw_5I";

interface ApiResponse {
  value: Value[];
}

interface Value {
  Title: string;
  field_10: string;
}

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  color: string;
}

const fetchEvents = async (): Promise<CalendarEvent[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  const data: ApiResponse = await response.json();

  return data.value.map((event, index) => ({
    title: event.Title,
    start: new Date(Date.UTC(
      new Date(event.field_10).getUTCFullYear(),
      new Date(event.field_10).getUTCMonth(),
      new Date(event.field_10).getUTCDate(),
      new Date(event.field_10).getUTCHours(),
      new Date(event.field_10).getUTCMinutes()
    )), 
    end: new Date(Date.UTC(
      new Date(event.field_10).getUTCFullYear(),
      new Date(event.field_10).getUTCMonth(),
      new Date(event.field_10).getUTCDate(),
      new Date(event.field_10).getUTCHours(),
      new Date(event.field_10).getUTCMinutes()
    )),
    color: ["purple-500", "teal-500", "pink-500"][index % 3],
  }));
};

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
};
