"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { trpc } from "@/trpc/client";
import { Separator } from "@/components/ui/separator";

import {
  UserPageInfo,
  UserPageInfoSkeleton,
} from "../components/user-page-info";
import {
  UserPageBanner,
  UserPageBannerSkeleton,
} from "../components/user-page-banner";
import { TriangleAlertIcon } from "lucide-react";

interface UserViewProps {
  userId: string;
}

export const UserSection = ({ userId }: UserViewProps) => {
  return (
    <Suspense fallback={<UserSectionSkeleton />}>
      <ErrorBoundary fallback={<UserSectionError />}>
        <UserSectionSuspense userId={userId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const UserSectionError = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <TriangleAlertIcon className="size-10 " />
      <p className="text-sm text-muted-foreground mt-2">Something went wrong</p>
    </div>
  );
};

const UserSectionSkeleton = () => {
  return (
    <div className="flex flex-col">
      <UserPageBannerSkeleton />
      <UserPageInfoSkeleton />

      <Separator />
    </div>
  );
};

const UserSectionSuspense = ({ userId }: UserViewProps) => {
  const [user] = trpc.users.getOne.useSuspenseQuery({ id: userId });

  return (
    <div className="flex flex-col">
      <UserPageBanner user={user} />
      <UserPageInfo user={user} />

      <Separator />
    </div>
  );
};
