import { Metadata } from "next";

// 1. Export metadata here
export const metadata: Metadata = {
    title: {
        template: "%s - AI Resume Builder",
        absolute: "Contact Us | We're Here to Help You – Make A CV",
    },
    description:
        "Have questions or need support? Get in touch with the Make A CV team. We're here to help you build better CVs, faster – Make A CV.",
};

// 2. Export a default layout that renders children
export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
