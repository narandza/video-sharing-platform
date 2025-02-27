import { trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ videoId: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { videoId } = await params;

  void trpc.studio.getOne({ id: videoId });

  return <div className="">video id</div>;
};

export default Page;
