import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/logout-button";
import { LayoutDashboard, ScrollText } from "lucide-react";

function NavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-stone-700 transition hover:bg-[#dce0d4] hover:text-stone-900"
    >
      <Icon size={14} className="shrink-0 text-stone-500" />
      {children}
    </Link>
  );
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const label = session?.user?.name ?? session?.user?.username ?? "Admin";

  return (
    <div className="flex min-h-screen bg-[#f5f0e6] text-stone-800">
      <aside className="flex w-56 shrink-0 flex-col border-r border-[#c4b8a8]/80 bg-[#e8ebe3]">
        <div className="border-b border-[#c4b8a8]/60 px-4 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
            Sentuh Undang
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-stone-900">{label}</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          <NavLink href="/admin" icon={LayoutDashboard}>
            Ringkasan
          </NavLink>
          <NavLink href="/admin/invitations" icon={ScrollText}>
            Undangan
          </NavLink>
        </nav>
        <div className="border-t border-[#c4b8a8]/60 p-3">
          <LogoutButton />
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-6">{children}</main>
    </div>
  );
}
