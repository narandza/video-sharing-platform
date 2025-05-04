"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { trpc } from "@/trpc/client";
import { UserAvatar } from "@/components/user-avatar";
import { DEFAULT_LIMIT } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeleton = () => {
  <>
    {[1, 2, 3, 4].map((i) => (
      <SidebarMenuItem key={i}>
        <SidebarMenuButton disabled>
          <Skeleton className="size-6 rounded-full shrink-0" />
          <Skeleton className="h-4 w-full" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))}
  </>;
};

export const SubscriptionsSection = () => {
  const pathname = usePathname();

  const { data } = trpc.subscriptions.getMany.useInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <SidebarGroup className="">
      <SidebarGroupLabel>Subscriptions</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {data?.pages
            .flatMap((page) => page.items)
            .map((subscription) => (
              <SidebarMenuItem
                key={`${subscription.creatorId}-${subscription.viewerId}`}
              >
                <SidebarMenuButton
                  tooltip={subscription.user.name}
                  asChild
                  isActive={pathname === `/users/${subscription.user.id}`}
                >
                  <Link
                    href={`/users/${subscription.user.id}`}
                    className="flex items-center gap-4"
                  >
                    <UserAvatar
                      size="xs"
                      imageUrl={subscription.user.imageUrl}
                      name={subscription.user.name}
                    />
                    <span className="text-sm">{subscription.user.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
