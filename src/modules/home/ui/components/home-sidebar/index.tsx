import { MainSection } from "./main-section";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

export const HomeSidebar = () => {
  return (
    <Sidebar className="pt-16 z-40 border-none">
      <SidebarContent className="bg-background">
        <MainSection />
      </SidebarContent>
    </Sidebar>
  );
};
