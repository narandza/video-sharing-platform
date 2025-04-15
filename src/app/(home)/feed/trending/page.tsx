import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
  void trpc.videos.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });

  return <HydrateClient>TODO: trending page</HydrateClient>;
};

export default Page;
