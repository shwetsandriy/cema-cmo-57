import { useQuery } from "@tanstack/react-query";

const API_URL = "https://prod-03.uaenorth.logic.azure.com/workflows/8b23911d89764c8b8f7232aa1266e00c/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=tInMTOIIpKCAGEyK0L1reHgO-4vRyby-2St_V9Tw_5I";

interface ApiEvent {
  title: string;
  start_date: string;
  end_date: string;
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
    throw new Error('Failed to fetch events');
  }
  const data: ApiEvent[] = await response.json();
  
  // Transform API data to calendar events format
  return data.map((event, index) => ({
    title: event.title,
    start: new Date(event.start_date),
    end: new Date(event.end_date),
    color: ['purple-500', 'teal-500', 'pink-500'][index % 3], // Rotate through our color scheme
  }));
};

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
};