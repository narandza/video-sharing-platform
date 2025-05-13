import { Metadata } from "next";

import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, caller, trpc } from "@/trpc/server";
import { VideosView } from "@/modules/playlists/ui/views/videos-view";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ playlistId: string }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { playlistId } = await params;

  const playlist = await caller.playlists.getOne({ id: playlistId });

  return {
    title: `${playlist.name} - New Tube`,
    description: `Watch videos from ${playlist.name} playlist`,
  };
};

const Page = async ({ params }: PageProps) => {
  const { playlistId } = await params;

  void trpc.playlists.getOne.prefetch({ id: playlistId });
  void trpc.playlists.getVideos.prefetchInfinite({
    playlistId,
    limit: DEFAULT_LIMIT,
  });
  return (
    <HydrateClient>
      <VideosView playlistId={playlistId} />
    </HydrateClient>
  );
};

export default Page;
