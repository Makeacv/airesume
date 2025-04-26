import { Metadata } from "next";
import LayoutWithNavbar from "@/components/layout/LayoutWithNavbar";

// 1. Export metadata here
export const metadata: Metadata = {
    title: "Blog | Insights & Tips – Make A CV",
    description: "Explore our blog for insights, tips, and resources on CV building, job hunting, and career development. Stay informed and empowered with Make A CV.",
    keywords: "CV building, resume tips, career development, job hunting, professional development, career advice",
    openGraph: {
        title: "Blog | Insights & Tips – Make A CV",
        description: "Explore our blog for insights, tips, and resources on CV building, job hunting, and career development.",
        type: "website",
        url: "/blog",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog | Insights & Tips – Make A CV",
        description: "Explore our blog for insights, tips, and resources on CV building, job hunting, and career development.",
    },
};

// 2. Export a default layout that renders children
export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LayoutWithNavbar>
            <main className="pt-20 min-h-screen bg-white dark:bg-black">
                {children}
            </main>
        </LayoutWithNavbar>
    );
}
