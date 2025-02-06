import { CustomView } from "@/components/CalendarView";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

const Index = () => {
  const [activeView, setActiveView] = useState("month"); 
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedEventType, setSelectedEventType] = useState("All");
  const [selectedCsa, setSelectedCsa] = useState("All");
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex flex-col">
        {/* Header */}
        <header className="w-full bg-[#F2FCE2] shadow-sm py-2 px-4 sticky top-0 z-50">
          <div className="mx-auto flex items-center justify-start gap-2">
            <img
              src="https://www.microsoft.com/favicon.ico"
              alt="Microsoft Logo"
              className="w-6 h-6"
            />
            <span className="text-[#8E9196] font-semibold text-lg">Microsoft</span>
          </div>
        </header>

        {/* Sidebar + Main Content */}
        <div className="flex flex-1">
          <AppSidebar 
            setActiveView={setActiveView} 
            activeView={activeView}  
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea} 
            selectedEventType={selectedEventType}
            setSelectedEventType={setSelectedEventType}
            selectedCsa={selectedCsa}
            setSelectedCsa={setSelectedCsa}/>
          <div className="flex-1 px-4 py-4">
            <img src="banner.png"></img>
            {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">Calendar</h1> */}
            <CustomView 
              activeView={activeView} 
              setActiveView={setActiveView} 
              selectedArea={selectedArea}
              selectedEventType={selectedEventType}
              selectedCsa={selectedCsa} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
