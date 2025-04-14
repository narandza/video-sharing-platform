import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface HomeVideosSectionProps {
  categoryId?: string;
}

export const HomeVideosSection = ({ categoryId }: HomeVideosSectionProps) => {
  return (
    <Suspense fallback={<HomeVideosSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <HomeVideosSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const HomeVideosSectionSkeleton = () => {
  return <div className="">loading...</div>;
};

const HomeVideosSectionSuspense = ({ categoryId }: HomeVideosSectionProps) => {
  return <div className="">home videos section</div>;
};
