import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignIn />
    </main>
  );
}
