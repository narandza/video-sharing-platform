import { Metadata } from "next";

import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";
import { PlaylistsView } from "@/modules/playlists/ui/views/playlists-view";

export const dynamic = "force-dynamic";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Playlists - New Tube",
    description: "See all the playlist you have created",
  };
};

const Page = async () => {
  void trpc.playlists.getMany.prefetchInfinite({ limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <PlaylistsView />
    </HydrateClient>
  );
};

export default Page;
