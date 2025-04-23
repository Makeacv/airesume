import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, FileText, ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      description: "Active users this month",
    },
    {
      title: "Blog Posts",
      value: "45",
      icon: FileText,
      description: "Published articles",
    },
    {
      title: "Page Views",
      value: "23.5K",
      icon: BarChart,
      description: "Views this month",
    },
  ];

  const recentActivity = [
    {
      action: "New user registration",
      subject: "John Doe",
      time: "2 hours ago",
    },
    {
      action: "Blog post published",
      subject: "Getting Started with AI",
      time: "6 hours ago",
    },
    {
      action: "User profile updated",
      subject: "Jane Smith",
      time: "Yesterday",
    },
    {
      action: "New comment on",
      subject: "Machine Learning Basics",
      time: "2 days ago",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-orange-500">Admin Dashboard</h1>
        <div className="space-x-2">
          <Link href="/admin/blogs">
            <Button variant="outline" className="gap-2">
              <BookOpen className="h-4 w-4" />
              View Blogs
            </Button>
          </Link>
          <Link href="/admin/blogs/new">
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gray-50 dark:bg-zinc-800/50">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground pt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2 bg-gray-50 dark:bg-zinc-800/50">
            <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200 dark:divide-zinc-700">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-4 flex justify-between">
                  <div>
                    <span className="text-sm text-gray-600 dark:text-zinc-400">
                      {activity.action}{" "}
                    </span>
                    <span className="text-sm font-medium">
                      {activity.subject}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-zinc-500">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 bg-gray-50 dark:bg-zinc-800/50">
            <CardTitle className="text-lg font-medium">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <Link 
              href="/admin/blogs"
              className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-orange-500" />
                <span className="font-medium">Manage Blog Posts</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
            <Link 
              href="#"  //"/admin/users" 
              className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-orange-500" />
                <span className="font-medium">User Management</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
            <Link 
              href="#"  //"/admin/settings" 
              className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md transition-colors"
            >
              <div className="flex items-center gap-3">
                <BarChart className="h-5 w-5 text-orange-500" />
                <span className="font-medium">Analytics & Reports</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 