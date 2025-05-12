import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";
import { HistoryView } from "@/modules/playlists/ui/views/history-view";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "History - New Tube",
    description: "See all videos you watched.",
  };
};

const Page = async () => {
  void trpc.playlists.getHistory.prefetchInfinite({ limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <HistoryView />
    </HydrateClient>
  );
};

export default Page;
