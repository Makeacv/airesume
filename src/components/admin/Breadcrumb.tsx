"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, Home, ArrowLeft } from "lucide-react";

export function Breadcrumb() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin") {
    return (
      <div className="flex items-center py-2 text-sm text-gray-600 dark:text-zinc-400">
        <Home className="h-4 w-4 mr-1" />
        <span>Dashboard</span>
      </div>
    );
  }

  const segments = pathname.split('/').filter(Boolean);

  const isEditPage = segments.includes('edit');
  const slugIndex = segments.indexOf('edit') + 1;

  if (isEditPage && (!segments[slugIndex] || segments[slugIndex] === undefined)) {
    return (
      <div 
        className="flex items-center py-2 text-sm text-gray-600 dark:text-zinc-400 cursor-pointer"
        onClick={() => router.push('/admin/blogs')}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to Blog List</span>
      </div>
    );
  }

  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;

    const isDynamicSegment = segment.startsWith('[') && segment.endsWith(']');

    let title = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (segments[index-1] === 'edit') {
      title = "Edit Post";
    }
    
    return {
      href: isDynamicSegment ? '#' : href,
      title,
      isLast,
      isDynamic: isDynamicSegment
    };
  });

  return (
    <div className="flex items-center py-2 text-sm">
      <Link 
        href="/admin" 
        className="text-gray-600 hover:text-orange-500 dark:text-zinc-400 dark:hover:text-orange-400 flex items-center"
      >
        <Home className="h-4 w-4 mr-1" />
        <span>Dashboard</span>
      </Link>
      
      {breadcrumbs.slice(1).map((breadcrumb) => {
        if (breadcrumb.isDynamic) return null;
        
        return (
          <div key={breadcrumb.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-zinc-500" />
            
            {breadcrumb.isLast ? (
              <span className="text-orange-500 dark:text-orange-400 font-medium">
                {breadcrumb.title}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="text-gray-600 hover:text-orange-500 dark:text-zinc-400 dark:hover:text-orange-400"
              >
                {breadcrumb.title}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
} 