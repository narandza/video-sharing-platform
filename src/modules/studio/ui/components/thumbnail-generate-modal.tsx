import { trpc } from "@/trpc/client";
import { ResponsiveModal } from "@/components/responsive-modal";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ThumbnailGenerateModalProps {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  prompt: z.string().min(10),
});

export const ThumbnailGenerateModal = ({
  videoId,
  open,
  onOpenChange,
}: ThumbnailGenerateModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  // const utils = trpc.useUtils();

  const generateThumbnail = trpc.videos.generateThumbnail.useMutation({
    onSuccess: () => {
      toast.success("Background job started", {
        description: "This may take some time",
      });
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    generateThumbnail.mutate({
      prompt: values.prompt,
      id: videoId,
    });
  };

  return (
    <ResponsiveModal
      title="Upload a thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none"
                    cols={30}
                    rows={5}
                    placeholder="A description of wanted thumbnail"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={generateThumbnail.isPending}>
              Generate
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveModal>
  );
};
