import Link from "next/link";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { MessageSquareIcon, MoreVerticalIcon, Trash2Icon } from "lucide-react";

import { trpc } from "@/trpc/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth, useClerk } from "@clerk/nextjs";
import { UserAvatar } from "@/components/user-avatar";

import { CommentsGetManyOutput } from "../../types";

interface CommentItemProps {
  comment: CommentsGetManyOutput["items"][number];
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  const { clerk } = useClerk();
  const { userId } = useAuth();

  const utils = trpc.useUtils();
  const remove = trpc.comments.remove.useMutation({
    onSuccess: () => {
      toast.success("Comment deleted");
      utils.comments.getMany.invalidate({ videoId: comment.videoId });
    },
    onError: (error) => {
      toast.error("Something went wrong");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  return (
    <div className="">
      <div className="flex gap-4">
        <Link href={`/users/${comment.userId}`}>
          <UserAvatar
            size="lg"
            imageUrl={comment.user.imageUrl}
            name={comment.user.name}
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/users/${comment.userId}`}>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-medium text-sm pb-1.5">
                {comment.user.name}
              </span>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(comment.updatedAt, {
                  addSuffix: true,
                })}
              </div>
            </div>
          </Link>
          <p className="text-sm">{comment.value}</p>
          {/* TODO: Reactions */}
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>
              <MessageSquareIcon className="size-4" />
              Reply
            </DropdownMenuItem>
            {comment.user.clerkId === userId && (
              <DropdownMenuItem
                onClick={() => remove.mutate({ id: comment.id })}
              >
                <Trash2Icon className="size-4" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
