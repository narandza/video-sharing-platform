import { Metadata } from "next";

import { SignIn } from "@clerk/nextjs";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Sign In - New Tube",
    description: "Sign in to New Tube",
  };
};

export default function Page() {
  return <SignIn />;
}
