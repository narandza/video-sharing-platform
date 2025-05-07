"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import {
  VideoGridCard,
  VideoGridCardSkeleton,
} from "@/modules/videos/ui/components/video-grid-card";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { TriangleAlertIcon } from "lucide-react";

interface HomeVideosSectionProps {
  categoryId?: string;
}

export const HomeVideosSection = ({ categoryId }: HomeVideosSectionProps) => {
  return (
    <Suspense key={categoryId} fallback={<HomeVideosSectionSkeleton />}>
      <ErrorBoundary fallback={<HomeVideosSectionError />}>
        <HomeVideosSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const HomeVideosSectionError = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <TriangleAlertIcon className="size-6 " />
      <p className="text-sm text-muted-foreground">Something went wrong</p>
    </div>
  );
};

const HomeVideosSectionSkeleton = () => {
  return (
    <div className="gap-4 gap-y-10 grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5  [@media(min-width:2200px)]:grid-cols-6">
      {Array.from({ length: 18 }).map((_, index) => (
        <VideoGridCardSkeleton key={index} />
      ))}
    </div>
  );
};

const HomeVideosSectionSuspense = ({ categoryId }: HomeVideosSectionProps) => {
  const [videos, query] = trpc.videos.getMany.useSuspenseInfiniteQuery(
    {
      categoryId,
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <>
      <div className="gap-4 gap-y-10 grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5  [@media(min-width:2200px)]:grid-cols-6">
        {videos.pages
          .flatMap((page) => page.items)
          .map((video) => (
            <VideoGridCard key={video.id} data={video} />
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
