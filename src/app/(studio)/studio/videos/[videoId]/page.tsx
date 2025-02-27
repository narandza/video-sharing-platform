import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ videoId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { videoId } = await params;

  void trpc.studio.getOne({ id: videoId });

  return (
    <HydrateClient>
      <VideoView videoId={videoID} />
    </HydrateClient>
  );
};

export default Page;
