import Footer from "@/components/Footer";
import { Metadata } from "next";

// 1. Export metadata here
export const metadata: Metadata = {
    title: {
        template: "%s - AI CV Builder",
        absolute: "Blog | Insights & Tips – Make A CV",
    },
    description:
        "Explore our blog for insights, tips, and resources on CV building, job hunting, and career development. Stay informed and empowered with Make A CV.",
};

// 2. Export a default layout that renders children
export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>
        {children}
        <Footer />
    </>;
}
