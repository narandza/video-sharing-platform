"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";

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
  const [subscriptions, query] =
    trpc.subscriptions.getMany.useSuspenseInfiniteQuery(
      {
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  return <>UI</>;
};
