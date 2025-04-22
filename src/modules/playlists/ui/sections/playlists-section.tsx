"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";

export const PlaylistsSection = () => {
  return (
    <Suspense fallback={<PlaylistsSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <PlaylistsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const PlaylistsSectionSkeleton = () => {
  return <>Loading...</>;
};

const PlaylistsSectionSuspense = () => {
  const [videos, query] = trpc.playlists.getHistory.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return <>section</>;
};
