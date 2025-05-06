"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { toast } from "sonner";
import Link from "next/link";
import { SubscriptionItem } from "../components/subscription-item";
import { InfiniteScroll } from "@/components/infinite-scroll";

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

  return (
    <>
      <div className="flex flex-col gap-4">
        {subscriptions.pages
          .flatMap((page) => page.items)
          .map((subscription) => (
            <Link
              key={subscription.creatorId}
              href={`/users/${subscription.user.id}`}
            >
              <SubscriptionItem
                name={subscription.user.name}
                imageUrl={subscription.user.imageUrl}
                subscriberCount={subscription.user.subscriberCount}
                onUnsubscribe={() => {
                  unsubscribe.mutate({ userId: subscription.creatorId });
                }}
                disabled={unsubscribe.isPending}
              />
            </Link>
          ))}
      </div>
      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </>
  );
};
