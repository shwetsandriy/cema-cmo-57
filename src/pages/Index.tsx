import { CustomView } from "@/components/CalendarView";

const Index = () => {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Calendar</h1>
        <CustomView />
      </div>
    </div>
  );
};

export default Index;