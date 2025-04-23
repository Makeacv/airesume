import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

const ADMIN_EMAILS = ["isadeoye02@gmail.com", "info@makeacv.co.za"];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      redirect("/sign-in");
    }

    if (!ADMIN_EMAILS.includes(user.emailAddresses[0].emailAddress)) {
      redirect("/");
    }

    return <AdminLayoutClient>{children}</AdminLayoutClient>;
  } catch (error) {
    console.error("Admin layout error:", error);
    redirect("/sign-in");
  }
}
