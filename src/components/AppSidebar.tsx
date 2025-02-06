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

import { useCalendarStore } from "@/stores/calendarStore";

export function AppSidebar() {
  const { activeView, setActiveView } = useCalendarStore();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm hover:bg-gray-100">
              <span>Views</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 py-2">
                <div className="space-y-2">
                  <button 
                    className={`text-sm ${activeView === 'month' ? 'text-blue-500 font-semibold' : ''}`}
                    onClick={() => setActiveView('month')}
                  >
                    Month
                  </button>
                  <div>
                    <button 
                      className={`text-sm ${activeView === 'quarter' ? 'text-blue-500 font-semibold' : ''}`}
                      onClick={() => setActiveView('quarter')}
                    >
                      Quarter
                    </button>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm hover:bg-gray-100">
              <span>Sub-area view</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 py-2">
                <div className="space-y-2">
                  <div className="text-sm">Central Europe</div>
                  <div className="text-sm">Africa</div>
                  <div className="text-sm">Middle East</div>
                  <div className="text-sm">South-East Europe</div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm hover:bg-gray-100">
              <span>Scale</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 py-2">
                <div className="space-y-2">
                  <div className="text-sm">Local</div>
                  <div className="text-sm">Global</div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm hover:bg-gray-100">
              <span>Event Type</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 py-2">
                <div className="space-y-2">
                  <div className="text-sm">In person</div>
                  <div className="text-sm">Digital</div>
                  <div className="text-sm">Hybrid</div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm hover:bg-gray-100">
              <span>CSA view</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-4 py-2">
                <div className="space-y-2">
                  <div className="text-sm">Azure</div>
                  <div className="text-sm">Business Applications</div>
                  <div className="text-sm">Modern Work</div>
                  <div className="text-sm">Security</div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}