import { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEvents } from "@/hooks/useEvents";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const CalendarView = () => {
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const { data: events, isLoading, error } = useEvents();
  const { toast } = useToast();

  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  // Show error toast if fetch fails
  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load events. Please try again later.",
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-end items-center mb-4">
        <Select
          value={view}
          onValueChange={(value) => handleViewChange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Views.MONTH}>Month</SelectItem>
            <SelectItem value={Views.WEEK}>Week</SelectItem>
            <SelectItem value={Views.DAY}>Day</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[700px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <Calendar
            localizer={localizer}
            events={events || []}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={handleViewChange}
            date={date}
            onNavigate={setDate}
            eventPropGetter={(event) => ({
              className: `bg-${event.color} text-white rounded-lg`,
            })}
          />
        )}
      </div>
    </div>
  );
};