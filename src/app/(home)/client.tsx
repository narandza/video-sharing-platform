"use client";

import { trpc } from "@/trpc/client";

export const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({
    text: "Jova",
  });

  return <div className="">{data.greeting}</div>;
};
