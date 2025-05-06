"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { toast } from "sonner";

export const SubscriptionsSection = () => {
  return (
    <Suspense fallback={<SubscriptionsSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <SubscriptionsSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const SubscriptionsSkeleton = () => {
  return <>Loading</>;
};

const SubscriptionsSuspense = () => {
  const utils = trpc.useUtils();

  const [subscriptions, query] =
    trpc.subscriptions.getMany.useSuspenseInfiniteQuery(
      {
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const unsubscribe = trpc.subscriptions.remove.useMutation({
    onSuccess: (data) => {
      toast.success("Unsubscribed");
      utils.subscriptions.getMany.invalidate();
      utils.videos.getManySubscribed.invalidate();
      utils.users.getOne.invalidate({ id: data.creatorId });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return <>UI</>;
};
