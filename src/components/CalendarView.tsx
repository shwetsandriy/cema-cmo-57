import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEvents } from "@/hooks/useEvents";
import { useToast } from "@/components/ui/use-toast";

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

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load events. Please try again later.",
      });
    }
  }, [error, toast]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
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