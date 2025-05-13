import { Metadata } from "next";

import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, caller, trpc } from "@/trpc/server";
import { VideoView } from "@/modules/videos/ui/views/video-view";

export const dynamic = "force-dynamic";
interface PageProps {
  params: Promise<{
    videoId: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { videoId } = await params;
  const video = await caller.videos.getOne({ id: videoId });

  return {
    title: `${video.title} - New Tube`,
    description: `Watch ${video.title}`,
  };
};

const Page = async ({ params }: PageProps) => {
  const { videoId } = await params;

  void trpc.videos.getOne.prefetch({ id: videoId });
  void trpc.comments.getMany.prefetchInfinite({
    videoId: videoId,
    limit: DEFAULT_LIMIT,
  });
  void trpc.suggestions.getMany.prefetchInfinite({
    videoId,
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
};

export default Page;
