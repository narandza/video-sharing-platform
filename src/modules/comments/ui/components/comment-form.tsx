import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import { commentInsertSchema } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CommentFormProps {
  videoId: string;
  onSuccess?: () => void;
}

export const CommentForm = ({ videoId, onSuccess }: CommentFormProps) => {
  const { user } = useUser();

  const form = useForm<z.infer<typeof commentInsertSchema>>({
    resolver: zodResolver(commentInsertSchema.omit({ userId: true })),
    defaultValues: {
      videoId,
      value: "",
    },
  });

  return (
    <form className="flex gap-4 group">
      <UserAvatar
        size="lg"
        imageUrl={user?.imageUrl || "/user- placeholder.svg"}
        name={user?.username || "User"}
      />
      <div className="flex-1">
        <Textarea
          placeholder="Add a comment"
          className="resize-none bg-transparent overflow-hidden min-h-0"
        />
        <div className="justify-end gap-2 mt-2 flex">
          <Button type="submit" size="sm">
            Comment
          </Button>
        </div>
      </div>
    </form>
  );
};
