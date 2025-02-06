import { useQuery } from "@tanstack/react-query";

const API_URL = "https://prod-03.uaenorth.logic.azure.com/workflows/8b23911d89764c8b8f7232aa1266e00c/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=tInMTOIIpKCAGEyK0L1reHgO-4vRyby-2St_V9Tw_5I";

interface ApiResponse {
  value: Value[];
}

interface Value {
  Title: string;
  field_10: string;
  field_3: { Value: string };
  field_1: { Value: string };
  field_6: { Value: string };
}

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  color: string;
}

const fetchEvents = async (areaFilter, eventTypeFilter, csaFilter): Promise<CalendarEvent[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  const data: ApiResponse = await response.json();

  const filteredEvents = data.value.filter(event => 
    (areaFilter === "All" || event.field_3?.Value === areaFilter) &&
    (eventTypeFilter === "All" || event.field_6?.Value === eventTypeFilter) &&
    (csaFilter === "All" || event.field_1?.Value === csaFilter)
  );

  return filteredEvents.map((event, index) => ({
    title: event.Title,
    region: event.field_3?.Value,
    csa: event.field_1?.Value,
    eventType: event.field_6?.Value,
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

export const useEvents = (areaFilter, eventTypeFilter, csaFilter) => {
  return useQuery({
    queryKey: ["events", areaFilter, eventTypeFilter, csaFilter],
    queryFn: () => fetchEvents(areaFilter, eventTypeFilter, csaFilter),
  });
};
