import { Metadata } from "next";

import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";
import { SubscriptionsView } from "@/modules/subscriptions/ui/views/subscriptions-view";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Subscriptions - New Tube",
    description: "See all the channels and creators you're subscribed to.",
  };
};

const Page = async () => {
  void trpc.subscriptions.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });
  return (
    <HydrateClient>
      <SubscriptionsView />
    </HydrateClient>
  );
};

export default Page;
