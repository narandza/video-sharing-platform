"use client";

import { trpc } from "@/trpc/client";

interface FormSectionProps {
  videoId: string;
}

export const FormSection = ({ videoId }: FormSectionProps) => {
  const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });

  return <div className="">{JSON.stringify(video)}</div>;
};
