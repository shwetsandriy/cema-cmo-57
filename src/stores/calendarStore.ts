import { create } from 'zustand';

type CalendarView = 'month' | 'quarter';

interface CalendarState {
  view: CalendarView;
  setView: (view: CalendarView) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  view: 'month',
  setView: (view) => set({ view }),
}));