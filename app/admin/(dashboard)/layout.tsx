import type { Metadata } from "next";
import AdminSidebarClient from "@/components/admin/AdminSidebarClient";
import { getServerUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | AirTouch Stance",
    template: "%s | Admin | AirTouch Stance",
  },
};


export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <AdminSidebarClient userEmail={user.email}>{children}</AdminSidebarClient>
  );
}
