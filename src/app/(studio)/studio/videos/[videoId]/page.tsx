import { HydrateClient, trpc } from "@/trpc/server";
import { VideoView } from "@/modules/studio/ui/views/video-view";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Video Settings - New Tube",
    description: "Modify your content",
  };
};

interface PageProps {
  params: Promise<{ videoId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { videoId } = await params;

  void trpc.studio.getOne.prefetch({ id: videoId });
  void trpc.categories.getMany.prefetch();

  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
};

export default Page;
