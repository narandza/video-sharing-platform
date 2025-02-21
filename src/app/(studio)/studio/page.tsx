import { HydrateClient, trpc } from "@/trpc/server";

const Page = async () => {
  void trpc.studio.getMany.prefetchInfinite();

  return <HydrateClient>studio</HydrateClient>;
};

export default Page;
