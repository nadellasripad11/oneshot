'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Plus,
  FileText,
  Archive,
  Zap,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '/dashboard', icon: Home },
  { label: 'New Task', href: '/dashboard/new-task', icon: Plus },
  { label: 'Tasks', href: '/dashboard/tasks', icon: FileText },
  { label: 'Templates', href: '/dashboard/templates', icon: Archive },
  { label: 'Saved Results', href: '/dashboard/results', icon: Zap },
  { label: 'Usage', href: '/dashboard/usage', icon: Zap },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed bottom-4 right-4 z-50 p-3 bg-accent text-white rounded-lg hover:bg-opacity-90"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative left-0 top-0 h-screen w-64 bg-bg-secondary border-r border-border-light p-6 overflow-y-auto z-40 transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="mb-12">
          <Link href="/dashboard" className="text-2xl font-bold text-accent">
            OneShot
          </Link>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  active
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-primary'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
