import { formatDistanceToNow } from "date-fns";
import { VideoGetManyOutput } from "../../types";

interface VideoInfoProps {
  data: VideoGetManyOutput["items"][number];
  onRemove?: () => void;
}
export const VideoInfo = ({ data, onRemove }: VideoInfoProps) => {
  const compactViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact",
    }).format(data.viewCount);
  }, [data.viewCount]);

  const compactDate = useMemo(() => {
    return formatDistanceToNow(data.createdAt, { addSuffix: true });
  }, [data.createdAt]);

  return;
};
