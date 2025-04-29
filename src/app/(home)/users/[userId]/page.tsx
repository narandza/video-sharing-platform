import { HydrateClient, trpc } from "@/trpc/server";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { userId } = await params;

  void trpc.users.getOne.prefetch({ id: userId });

  return (
    <HydrateClient>{/* TODO: <UserView userId={userId} /> */}</HydrateClient>
  );
};

export default Page;
