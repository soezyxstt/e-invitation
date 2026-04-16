import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/logout-button";
import { LayoutDashboard, ScrollText, MessageCircle, ScanLine } from "lucide-react";

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
      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-stone-700 transition hover:bg-sage-green/15 hover:text-stone-900"
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
    <div className="flex min-h-screen bg-primary-cream text-stone-800">
      <aside className="flex w-56 shrink-0 flex-col border-r border-muted-gold/40 bg-sage-green/15">
        <div className="border-b border-muted-gold/35 px-4 py-4">
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
          <NavLink href="/admin/rsvps" icon={MessageCircle}>
            RSVP Tamu
          </NavLink>
          <NavLink href="/admin/check-in" icon={ScanLine}>
            Check-in Scanner
          </NavLink>
        </nav>
        <div className="border-t border-muted-gold/35 p-3">
          <LogoutButton />
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-6">{children}</main>
    </div>
  );
}
