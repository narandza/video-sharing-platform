"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";

import { trpc } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { CommentForm } from "@/modules/comments/ui/components/comment-form";
import { CommentItem } from "@/modules/comments/ui/components/comment-item";

interface CommentSectionProps {
  videoId: string;
}

export const CommentsSection = ({ videoId }: CommentSectionProps) => {
  return (
    <Suspense fallback={<CommentSectionSkeleton />}>
      <ErrorBoundary fallback={<CommentsSectionError />}>
        <CommentsSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CommentsSectionError = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <TriangleAlertIcon className="size-10 " />
      <p className="text-sm text-muted-foreground mt-2">Something went wrong</p>
    </div>
  );
};

const CommentSectionSkeleton = () => {
  return (
    <div className="mt-6 flex justify-center items-center ">
      <Loader2Icon className="size-7 text-muted-foreground animate-spin" />
    </div>
  );
};

const CommentsSectionSuspense = ({ videoId }: CommentSectionProps) => {
  const [comments, query] = trpc.comments.getMany.useSuspenseInfiniteQuery(
    {
      videoId,
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold">
          {comments.pages[0].totalCount} comments
        </h1>
        <CommentForm videoId={videoId} />
        <div className="flex flex-col gap-4 mt-2">
          {comments.pages
            .flatMap((page) => page.items)
            .map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          <InfiniteScroll
            hasNextPage={query.hasNextPage}
            isFetchingNextPage={query.isFetchingNextPage}
            fetchNextPage={query.fetchNextPage}
          />
        </div>
      </div>
    </div>
  );
};
