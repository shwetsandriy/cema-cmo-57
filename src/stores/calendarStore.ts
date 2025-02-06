import { create } from 'zustand';

type CalendarStore = {
  activeView: string;
  setActiveView: (view: string) => void;
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  activeView: 'month',
  setActiveView: (view) => set({ activeView: view }),
}));