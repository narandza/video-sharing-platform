import { ResponsiveModal } from "@/components/responsive-modal";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import { Loader2Icon } from "lucide-react";

interface PlaylistAddModalProps {
  open: boolean;
  videoId: string;
  onOpenChange: (open: boolean) => void;
}

export const PlaylistAddModal = ({
  open,
  videoId,
  onOpenChange,
}: PlaylistAddModalProps) => {
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.playlists.getManyForVideo.useInfiniteQuery(
    { limit: DEFAULT_LIMIT, videoId },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: !!videoId && open,
    }
  );

  const handleOpenChange = (newOpen: boolean) => {
    utils.playlists.getManyForVideo.reset();

    onOpenChange(newOpen);
  };

  return (
    <ResponsiveModal
      title="Add to playlist"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <div className="flex flex-col gap-2">
        {isLoading && (
          <div className="flex justify-center p-4">
            <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {JSON.stringify(data)}
      </div>
    </ResponsiveModal>
  );
};
