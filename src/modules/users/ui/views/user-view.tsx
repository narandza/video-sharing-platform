import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface UserViewProps {
  userId: string;
}

export const UserView = ({ userId }: UserViewProps) => {
  return (
    <Suspense fallback={<UserViewSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <UserViewSuspense userId={userId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const UserViewSkeleton = () => {
  return <div className="">Loading...</div>;
};

const UserViewSuspense = ({ userId }: UserViewProps) => {
  const [user] = trpc.users.getOne.useSuspenseQuery({ id: userId });

  return <div className="">{JSON.stringify(user)}</div>;
};
