import { ResponsiveModal } from "@/components/responsive-modal";

interface ThumbnailUploadModalProps {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ThumbnailUploadModal = ({
  videoId,
  open,
  onChange,
}: ThumbnailUploadModalProps) => {
  return (
    <ResponsiveModal
      title="Upload a thumbnail"
      open={open}
      onOpenChange={onChange}
    >
      <p>helo</p>
    </ResponsiveModal>
  );
};
