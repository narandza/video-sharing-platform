import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Sign Up - New Tube",
    description: "Create an account",
  };
};

export default function Page() {
  return <SignUp />;
}
