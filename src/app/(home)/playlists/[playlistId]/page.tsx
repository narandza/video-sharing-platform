import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic ";

interface PageProps {
  params: Promise<{ playlistId: string }>;
}
const Page = async ({ params }: PageProps) => {
  const { playlistId } = await params;

  void trpc.playlists.getVideos.prefetchInfinite({
    playlistId,
    limit: DEFAULT_LIMIT,
  });
  return (
    <HydrateClient>
      <div className="">TODO: Playlist View</div>
    </HydrateClient>
  );
};

export default Page;
