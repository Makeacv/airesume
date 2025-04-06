import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import flag from "@/app/(main)/avatars/flag.png";

export const metadata: Metadata = {
  title: {
    template: "%s - AI CV Builder",
    absolute: "Free CV Builder South Africa | Fast & Easy AI Tool | Make A CV",
  },
  description:
    "Create a professional CV in minutes with our free AI tool. It’s mobile-friendly and built for South Africans. No signup or credit card needed. Sign up now!",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FileText, Send, Brain } from "lucide-react"
import { Metadata } from "next";

const stats = [
  { number: "98%", label: "More likely to get hired" },
  { number: "150K+", label: "Satisfied customers" },
  { number: "10%", label: "Better pay with our AI CV builder" },
];

const companies = [
  {
    name: "Career Junction",
    logo: "/logos/careerjunction-white.png",
    logoDark: "/logos/CAREERJUNCTION.png",
    url: "https://www.careerjunction.co.za/" // or your desired link
  },
  {
    name: "Careers24",
    logo: "/logos/careers24-white.png",
    logoDark: "/logos/CAREERS24.png",
    url: "https://www.careers24.com/"
  },
  {
    name: "Indeed",
    logo: "/logos/indeed-white.png",
    logoDark: "/logos/INDEED.png",
    url: "https://za.indeed.com/"
  },
  {
    name: "LinkedIn",
    logo: "/logos/linkedin-white1.png",
    logoDark: "/logos/LINKEDIN.png",
    url: "https://za.linkedin.com/jobs"
  },
  {
    name: "PNET",
    logo: "/logos/pnet-white1.png",
    logoDark: "/logos/PNET.png",
    url: "https://www.pnet.co.za/"
  },
];

const reviews = [
  {
    name: "David L.",
    role: "Software Developer",
    content: "CV Pro's AI features helped me highlight my technical skills perfectly. The smart suggestions for keywords got my CV past ATS systems, and I landed interviews at three top tech companies!",
    rating: 5,
    date: "Feb 15, 2025"
  },
  {
    name: "Rachel S.",
    role: "Marketing Manager",
    content: "The premium templates are worth every penny. I was able to create a stunning CV that stood out from the crowd. The AI writing assistant helped me quantify my achievements brilliantly.",
    rating: 5,
    date: "Mar 1, 2025"
  },
  {
    name: "Michael P.",
    role: "Recent Graduate",
    content: "As a fresh graduate, I was struggling to create my first professional CV. CV Pro's AI suggestions helped me transform my academic projects into compelling professional experiences.",
    rating: 5,
    date: "Jan 28, 2025"
  },
  {
    name: "Emma T.",
    role: "Career Switcher",
    content: "Switching from teaching to UX design seemed daunting, but CV Pro helped me translate my transferable skills perfectly. The AI tool knew exactly how to phrase my experience for tech companies.",
    rating: 5,
    date: "Feb 20, 2025"
  },
  {
    name: "James W.",
    role: "Sales Executive",
    content: "The custom color schemes and formatting options helped my CV stand out while staying professional. Already recommended CV Pro to my entire sales team!",
    rating: 5,
    date: "Mar 5, 2025"
  },
  {
    name: "Nina K.",
    role: "Project Manager",
    content: "The ability to create multiple versions of my CV for different roles is fantastic. The AI suggestions for each job application are spot-on. Worth every penny of the premium subscription!",
    rating: 5,
    date: "Feb 8, 2025"
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-100 to-white dark:from-black dark:via-gray-900 dark:to-black px-4 pt-24 pb-12">
        <div className="container mx-auto flex flex-col items-center gap-6 md:flex-row 2xl:px-40 xl:px-24 lg:px-16">
          <div className="flex-1 space-y-4 text-center md:text-left max-md:my-10">
            <div className="space-y-2 max-md:space-y-0">
              <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight dark:text-white max-md:text-left">
                Create
              </h1>
              <div className="flex justify-start md:justify-start max-lg:text-left">
                <span className="block text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#FB6520] to-[#FB6520] bg-clip-text text-transparent">
                  Your Perfect CV
                </span>
              </div>
              <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight dark:text-white max-md:text-left">
                In Under 2 Minutes
              </h1>
            </div>

            <div>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 max-md:text-left">
                Design a standout professional CV with our AI builder.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-md:text-left">
                It&apos;s Easy, Fast and Free.
              </p>
            </div>

            <div className="flex flex-row gap-2 sm:items-center sm:justify-start mt-2 items-center ">
              <Link href="/resumes" className="min-w-[100px]">
                <Button
                  size="lg"
                  className="w-40 bg-[#FB6520] text-white hover:bg-[#FB6520] transition-colors"
                >
                  Get Started For Free
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">No credit card required</p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-start gap-2 md:justify-start mt-2">
              <div className="flex -space-x-2">
                {/* 🇿🇦 Flag */}
                <div className="relative h-8 w-8 rounded-full border-2 border-white ring-1 ring-gray-200 overflow-hidden">
                  <Image
                    src={flag}
                    alt="South African Flag"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Trusted by South Africans alike.
              </p>
            </div>
          </div>

          {/* Preview Image */}
          <div className="relative flex-1 mt-6 md:mt-0 md:max-w-[450px]">
            {/* <div className="absolute -inset-1 bg-gradient-to-r from-[#FB6520] to-[#FB6530] opacity-30 blur"></div> */}
            <Image
              src="/homepage_banner.jpg"
              alt="Hero Banner"
              height={1000}
              width={450}
              className=""
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white dark:bg-black py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-3xl text-center md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Brain className="mx-auto mb-4 h-12 w-12 text-[#FB6520]" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Step 1: Create your account</h3>
              <p className="text-gray-600 dark:text-gray-400">Signup for your free account, no credit card required, and start building you CV - no strings attached.
              </p>
            </div>
            <div className="text-center">
              <Send className="mx-auto mb-4 h-12 w-12 text-[#FB6520]" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Step 2: Let AI Do the Magic</h3>
              <p className="text-gray-600 dark:text-gray-400">Insert your personal information and follow the AI prompts to create your CV. It wont take long!</p>
            </div>
            <div className="text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-[#FB6520]" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Step 3: Download your CV</h3>
              <p className="text-gray-600 dark:text-gray-400">Finished creating? Download your CV in PDF format and kick-start your job search.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Looking for Work Section */}
      <section className="bg-white dark:bg-black py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Grid layout: Left text + Right image */}
          <div className="grid md:grid-cols-2 items-center gap-12">
            {/* Left Column: Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-4xl mb-6 font-bold text-gray-900 dark:text-white">
                Create Your CV the Smart Way
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify mb-4">
                Let&apos;s be honest — writing a CV can be stressful and confusing,
                especially when you are not sure what to say or how it should look.
                But if you want to land a job, you need one. A solid CV is your foot
                in the door, your first impression, and the first thing employers look at.
              </p>
              <p className="leading-relaxed text-justify text-gray-600 dark:text-gray-400">
                That&apos;s why we built <span className="font-bold">makeacv.ai</span> — to make the whole process quick,
                easy, and 100% free for anyone in Africa. No typing from scratch,
                no fancy skills needed. Just answer a few simple questions and in under
                2 minutes, our smart AI creates a professional CV for you. Download it,
                apply for jobs, and get noticed. It works on your phone, doesn&apos;t cost a
                cent, and there&apos;s zero sign-up needed. Just your best chance at landing
                the job — made easy.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="flex justify-center">
              <Image
                src="/looking_for_work.png" // Replace with your actual image path
                alt="Laptop showing a CV example"
                width={550}
                height={400}
                quality={100}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="border-y dark:border-gray-800 bg-white dark:bg-black py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text- text-center md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
            Apply now at these South African Job Portals
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {companies.map((company) => (
              <a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-16 w-40 transition-transform hover:scale-105 "
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  className="object-contain dark:hidden"
                  priority
                />
                <Image
                  src={company.logoDark}
                  alt={`${company.name} logo`}
                  fill
                  className="hidden object-contain dark:block"
                  priority
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Companies Section */}
      <section className="bg-white dark:bg-black py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Grid layout: Left text + Right image */}
          <div className="grid md:grid-cols-2 items-center gap-12">
            {/* Left Column: Image */}
            <div className="flex justify-center">
              <Image
                src="/cv.jpg" // Replace with your actual image path
                alt="CV"
                width={550}
                height={400}
                quality={100}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Right Column: Text */}
            <div>
              <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Power Up Your CV Services with AI
              </h2>
              <p className="leading-relaxed text-justify text-gray-600 dark:text-gray-400 mb-4">
                If you are a recruiter, career coach, or someone who helps others build CVs — <span className="font-bold">makeacv.ai</span> is the tool you&apos;ve been waiting for. Create professional, job-ready CVs for your clients in just minutes. Our smart AI does the heavy lifting — no formatting stress, no wasted time. With our premium package, you can save and manage multiple CVs, edit them anytime, and keep everything organised in one place. It’s fast, efficient, and built to help you deliver more value, in less time. Whether you’re working with students, job seekers, or professionals — we help you help them.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Recruitment Companies Section */}

      {/* Customer Reviews Section */}
      <section className="py-20 bg-gray-50 dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text- text-center md:text-4xl font-bold text-gray-900 dark:text-white">What Our Users Say</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12">Join thousands of successful job seekers</p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow dark:border dark:border-gray-800 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#FB6520]/10 dark:bg-[#FB6520]/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-[#FB6520]">
                      {review.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold dark:text-white">{review.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{review.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {Array(review.rating).fill(0).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-3">{review.content}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y dark:border-gray-800 bg-white dark:bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-[#FB6520]">{stat.number}</p>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-center sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 dark:text-gray-300">Choose the plan that&apos;s right for you</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="rounded-lg border-2 border-[#FB6520] bg-white dark:bg-black/40 p-8 shadow-md relative backdrop-blur-sm">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FB6520] text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Free</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">For job seekers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold dark:text-white">R0.00</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-16">
                {[
                  "Use of our AI CV tool",
                  "Limited to 1 CV",
                  "PDF download",
                  "ATS-friendly",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 dark:text-gray-300">
                    <Check className="h-5 w-5 text-[#FB6520]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/resumes" className="block">
                <Button className="w-full bottom-0 bg-[#FB6520] text-white hover:bg-[#FB6520]">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="rounded-lg border-2  bg-white dark:bg-black/40 p-8 shadow-md relative backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Premium</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">For Agencies</p>
              <div className="mb-6">
                <span className="text-4xl font-bold dark:text-white">R250.00</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-6">
                {[
                  "Use of our AI CV tool",
                  "Up to 200 CVs",
                  "Design Customisation",
                  "PDF download",
                  "ATS-friendly",
                  "Support",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 dark:text-gray-300">
                    <Check className="h-5 w-5 text-[#FB6520]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/resumes" className="block">
                <Button className="w-full bg-[#FB6520] text-white hover:bg-[#FB6520]">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12">Everything you need to know about our platform</p>
          <div className="max-w-3xl mx-auto grid gap-6">
            {[
              {
                q: "How does the AI CV builder work?",
                a: "Our AI analyzes your experience and skills to create tailored, ATS-friendly CVs. It suggests improvements and formats everything professionally."
              },
              {
                q: "Is it really free to get started?",
                a: "Yes! You can create your first CV completely free. No credit card required to get started."
              },
              {
                q: "Can I export my CV to PDF?",
                a: "Yes, you can export your CV to PDF. The exports are high-quality and print-ready."
              },
              {
                q: "Will my CV be ATS-friendly?",
                a: "Absolutely! All our templates are designed to pass Applicant Tracking Systems (ATS) with flying colors."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm"
              >
                <h3 className="font-semibold mb-2 dark:text-white">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#FB6520] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Join thousands of job seekers who trust our platform
          </h2>
          <p className="mb-8 text-lg text-white/90 max-w-2xl mx-auto">
            Join 150,000+ professionals who trust our platform
          </p>
          <Button
            size="lg"
            className="min-w-[200px] bg-white text-black hover:bg-gray-100 transition-all duration-300"
          >
            <Link href="/resumes">
              Get Started for Free
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
