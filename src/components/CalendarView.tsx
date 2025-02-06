import React, { useMemo, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, Navigate, DateLocalizer } from 'react-big-calendar'
import { luxonLocalizer } from 'react-big-calendar'
import { DateTime } from 'luxon'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEvents } from "@/hooks/useEvents";
import { format, startOfMonth, endOfMonth, getDay, isSameDay, addMonths, eachDayOfInterval, startOfDay } from "date-fns";

function QuarterView({
  date,
  localizer,
  events,
  max = localizer.endOf(new Date(), 'day'),
  min = localizer.startOf(new Date(), 'day'),
  scrollToTime = localizer.startOf(new Date(), 'day'),
  ...props
}) {
  const [selectedDayEvents, setSelectedDayEvents] = useState(null);
  const monthsInQuarter = useMemo(() => {
    const start = startOfMonth(date);
    return Array.from({ length: 3 }, (_, i) => addMonths(start, i));
  }, [date]);

  const quarterEvents = events.filter((event) => {
    const eventStart = new Date(event.start);
    return monthsInQuarter.some((rangeDate) => {
      return localizer.lte(eventStart, localizer.endOf(rangeDate, 'day')) &&
        localizer.gte(eventStart, localizer.startOf(rangeDate, 'day'));
    });
  });

  return (
    <div className="quarter-view grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
      {monthsInQuarter.map((month, index) => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);
        const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

        const firstDayOfWeek = getDay(monthStart);
        const today = startOfDay(new Date());

        return (
          <div key={index} className="border p-4 rounded-lg bg-white shadow-md h-full mx-auto flex flex-col" style={{ width: '100%' }}>
            <h3 className="font-bold text-center text-xl mb-4">
              {format(monthStart, "MMMM yyyy")}
            </h3>
            <div className="grid grid-cols-7 gap-1 text-center text-lg font-bold bg-gray-100 p-2 rounded">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 mt-1 flex-grow">
              {Array(firstDayOfWeek).fill(null).map((_, i) => (
                <div key={`empty-${i}`} className="p-3"></div>
              ))}
              {daysInMonth.map((day, i) => {
                const isToday = isSameDay(day, today);
                const dayEvents = events.filter((event) => isSameDay(new Date(event.start), day));
                const visibleEvents = dayEvents.slice(0, 2);
                const hiddenEvents = dayEvents.length - visibleEvents.length;

                return (
                  <div 
                    key={i} 
                    className={`relative border p-2 min-h-[80px] bg-white ${isToday ? 'bg-[#eff6ff]' : ''}`}
                  >
                    <span className={`text-lg ${isToday ? 'font-bold' : 'font-normal'}`}>
                      {format(day, "dd")}
                    </span>
                    {visibleEvents.map((event) => (
                      <div 
                        key={event.id} 
                        style={{ backgroundColor: '#3174ad' }}
                        className="bg-blue-500 text-white text-sm rounded p-2 mt-2 overflow-hidden"
                      >
                        {event.title}
                      </div>
                    ))}
                    {hiddenEvents > 0 && (
                      <button
                        className="text-sm text-blue-500 mt-2"
                        style={{ color: '#3174ad' }}
                        onClick={() => setSelectedDayEvents({ date: day, events: dayEvents })}
                      >
                        +{hiddenEvents} more
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {selectedDayEvents && (
        <div 
          className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center"
          onClick={() => setSelectedDayEvents(null)}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-2xl mb-4">
              {format(selectedDayEvents.date, "EEEE MMM d")}
            </h3>
            <ul>
              {selectedDayEvents.events.map((event) => (
                <li key={event.id} style={{ backgroundColor: '#3174ad' }} className="bg-blue-500 text-white p-3 rounded mt-2">{event.title}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

QuarterView.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
};

QuarterView.range = (date, { localizer }) => {
  const start = localizer.startOf(date, 'quarter');
  const end = localizer.endOf(start, 'quarter');

  let current = start;
  const range = [];

  while (localizer.lte(current, end, 'day')) {
    range.push(current);
    current = localizer.add(current, 1, 'day');
  }

  return range;
};

QuarterView.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, 'month');
    case Navigate.NEXT:
      return localizer.add(date, 3, 'month');
    default:
      return date;
  }
};

QuarterView.title = (date) => {
  const startOfQuarter = new Date(date);
  const endOfQuarter = new Date(date);
  endOfQuarter.setMonth(startOfQuarter.getMonth() + 3);

  const formatDate = (d) => {
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${month}.${year}`;
  };

  return `${formatDate(startOfQuarter)} - ${formatDate(endOfQuarter)}`;
};

export const CustomView = ({ activeView, setActiveView, selectedArea, selectedEventType, selectedCsa  }) => {
  const { data: events, isLoading, error } = useEvents(selectedArea, selectedEventType, selectedCsa);
  const [date, setDate] = useState(new Date());
  // const [activeView, setActiveView] = useState(Views.MONTH); // Track the active view
  const localizer = luxonLocalizer(DateTime);
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: {
        month: true,
        quarter: QuarterView,
      },
    }),
    []
  );

  const calendarContainerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (calendarContainerRef.current) {
        const quarterViewElement = calendarContainerRef.current.querySelector('.quarter-view');
  
          if (activeView === "quarter") {
          const containerHeight = quarterViewElement.clientHeight;
            const calendarElement = calendarContainerRef.current.querySelector('.rbc-calendar');
            if (calendarElement) {
              calendarContainerRef.current.style.height = `${containerHeight + 90}px`;
            }
          } else {
            const calendarElement = calendarContainerRef.current.querySelector('.rbc-calendar');
            if (calendarElement) {
              calendarContainerRef.current.style.height = 'auto';
            }
          }
      }
    }, 0); 
  }, [activeView, date]);

  return (
    <div ref={calendarContainerRef} className="bg-white rounded-lg shadow-lg p-4">
      <div  className="h-[700px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.MONTH}
            date={date}
            views={views}
            view={activeView}
            onNavigate={setDate}
            onView={setActiveView}
            messages={{
              quarter: 'Quarter'
            }}
            popup
          />
        )}
      </div>
    </div>
  );
};
