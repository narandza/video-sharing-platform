import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";
import { LikedView } from "@/modules/playlists/ui/views/liked-view";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Liked Videos - New Tube",
    description: "See all the videos you liked",
  };
};

const Page = async () => {
  void trpc.playlists.getLiked.prefetchInfinite({ limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <LikedView />
    </HydrateClient>
  );
};

export default Page;
