import { Separator } from "@/components/ui/separator";
import { MainSection } from "./main-section";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { PersonalSection } from "./personal-section";

export const StudioSidebar = () => {
  return (
    <Sidebar className="pt-16 z-40 border-none" collapsible="icon">
      <SidebarContent className="bg-background">
        <MainSection />
        <Separator />
        <PersonalSection />
      </SidebarContent>
    </Sidebar>
  );
};
