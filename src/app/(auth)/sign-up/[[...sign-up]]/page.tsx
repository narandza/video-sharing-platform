import { Metadata } from "next";

import { SignUp } from "@clerk/nextjs";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Sign Up - New Tube",
    description: "Create an account",
  };
};

export default function Page() {
  return <SignUp />;
}
