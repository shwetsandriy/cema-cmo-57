import {
  ChevronDown,
  Users,
  Calendar,
  Clock,
  MapPin,
  Monitor,
  Shield,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function AppSidebar({ setActiveView, activeView, selectedArea, setSelectedArea, selectedEventType, setSelectedEventType, selectedCsa, setSelectedCsa, selectedScale, setSelectedScale  }) {
  const areaMap = {
    "All": "All",
    "Central Europe": "Central Europe",
    "Africa": "Africa",
    "Middle East": "Middle East",
    "South-East Europe": "Southeastern Europe",
    "Cross-CEMA": "CEMA HQ"
  };

  const eventTypeMap = {
    "All": "All",
    "In person": "In-person",
    "Digital": "Digital",
    "Hybrid": "Hybrid",
  };

  const eventScaleMap = {
    "All": "All",
    "Local": "Local Scale",
    "Global": "Global Scale"
  };
  return (
    <Sidebar style={{ marginTop: "5vh" }}>
      <SidebarContent>
        <SidebarGroup>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm hover:bg-gray-100">
              <span>View</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 py-2">
                <div className="flex flex-col items-start space-y-2">
                  <button 
                    className={`text-sm ${activeView === "month" ? "text-blue-500 font-bold" : ""}`}
                    onClick={() => setActiveView("month")}
                  >
                    Month
                  </button>
                  <button 
                    className={`text-sm ${activeView === "quarter" ? "text-blue-500 font-bold" : ""}`}
                    onClick={() => setActiveView("quarter")}
                  >
                    Quarter
                  </button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          {/* Sub-area view Section */}
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm hover:bg-gray-100">
              <span>Sub-Area</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 py-2">
                <div className="flex flex-col items-start space-y-2">
                  {Object.keys(areaMap).map((area) => (
                    <button
                      key={area}
                      className={`text-sm ${selectedArea === areaMap[area] ? "text-blue-500 font-bold" : ""}`}
                      onClick={() => setSelectedArea(areaMap[area])}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Scale Section */}
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm hover:bg-gray-100">
              <span>Event Scale</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 py-2">
                <div className="flex flex-col items-start space-y-2">
                {Object.keys(eventScaleMap).map((scale) => (
                    <button
                      key={scale}
                      className={`text-sm ${selectedScale === eventScaleMap[scale] ? "text-blue-500 font-bold" : ""}`}
                      onClick={() => setSelectedScale(eventScaleMap[scale])}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Event Type Section */}
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm hover:bg-gray-100">
              <span>Event Type</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 py-2">
                <div className="flex flex-col items-start space-y-2">
                {Object.keys(eventTypeMap).map((eventType) => (
                    <button
                      key={eventType}
                      className={`text-sm ${selectedEventType === eventTypeMap[eventType] ? "text-blue-500 font-bold" : ""}`}
                      onClick={() => setSelectedEventType(eventTypeMap[eventType])}
                    >
                      {eventType}
                    </button>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* CSA view Section */}
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm hover:bg-gray-100">
              <span>Cross Solution Area</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 py-2">
                <div className="flex flex-col items-start space-y-2">
                  {['All','Azure', 'xCSA', 'Modern Work', 'Security', 'BizApps'].map((csa) => (
                    <button 
                      key={csa} 
                      className={`text-sm ${selectedCsa === csa ? "text-blue-500 font-bold" : ""}`}
                      onClick={() => setSelectedCsa(csa)}
                    >
                      {csa}
                    </button>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
