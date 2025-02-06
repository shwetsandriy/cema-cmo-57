import { CustomView } from "@/components/CalendarView";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full">
        {/* Header */}
        <header className="w-full bg-[#F2FCE2] shadow-sm py-2 px-4 mb-4 sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto flex items-center">
            <div className="flex items-center gap-2">
              <img
                src="https://www.microsoft.com/favicon.ico"
                alt="Microsoft Logo"
                className="w-6 h-6"
              />
              <span className="text-[#8E9196] font-semibold">Microsoft</span>
            </div>
          </div>
        </header>

        <div className="flex">
          <AppSidebar />
          {/* Main Content */}
          <div className="flex-1 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Calendar</h1>
            <CustomView />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Index;