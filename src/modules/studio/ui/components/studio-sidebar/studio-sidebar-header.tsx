import { SidebarHeader } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export const StudioSidebarHeader = () => {
  const { user } = useUser();

  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Link href="/users/current"></Link>
    </SidebarHeader>
  );
};
