'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/auth/auth-provider';
import { Shield, LayoutDashboard, Users, BookOpen, MessageSquare, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/people', label: 'People', icon: Users },
  { href: '/sources', label: 'Sources', icon: BookOpen, disabled: true },
  { href: '/claims', label: 'Claims', icon: MessageSquare, disabled: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { admin, logout } = useAuth();

  return (
    <aside className="flex h-full w-56 flex-col border-r bg-card">
      <div className="flex items-center gap-2 border-b px-4 py-4">
        <Shield className="h-6 w-6 text-primary" />
        <span className="text-sm font-semibold">Bharat Knowledge</span>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                item.disabled && 'opacity-40 pointer-events-none',
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
              {item.disabled && (
                <span className="ml-auto text-[10px] text-muted-foreground">
                  Soon
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t px-4 py-3 space-y-2">
        {admin && (
          <p className="text-xs text-muted-foreground truncate" title={admin.email}>
            {admin.name}
          </p>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
