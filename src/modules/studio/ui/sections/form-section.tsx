"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface FormSectionProps {
  videoId: string;
}

export const FormSection = ({ videoId }: FormSectionProps) => {
  return (
    <Suspense fallback={<FormSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <FormSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const FormSectionSkeleton = () => {
  return <div className="">skeleton</div>;
};

const FormSectionSuspense = ({ videoId }: FormSectionProps) => {
  const [video] = trpc.studio.getOne.useSuspenseQuery({ id: videoId });

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="">
        <h1 className="text-2xl font-bold">Video details</h1>
        <p className="text-xs text-muted-foreground">
          Manage your video details
        </p>
      </div>
      <div className="flex items-center gap-x-2">
        <Button type="submit" disabled={false}>
          Save
        </Button>
      </div>
    </div>
  );
};
