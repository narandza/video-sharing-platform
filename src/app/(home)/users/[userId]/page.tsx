import { Metadata } from "next";

import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, caller, trpc } from "@/trpc/server";
import { UserView } from "@/modules/users/ui/views/user-view";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { userId } = await params;

  const user = await caller.users.getOne({ id: userId });

  return {
    title: `${user.name} - New Tube`,
    description: `Explore videos and content by ${user.name}.`,
  };
};

const Page = async ({ params }: PageProps) => {
  const { userId } = await params;

  void trpc.users.getOne.prefetch({ id: userId });
  void trpc.videos.getMany.prefetchInfinite({ userId, limit: DEFAULT_LIMIT });

  return (
    <HydrateClient>
      <UserView userId={userId} />
    </HydrateClient>
  );
};

export default Page;
