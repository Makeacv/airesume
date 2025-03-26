import resumePreview from "@/assets/resume-preview.jpg";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import amazonLogo from "@/logos/amazon.svg";
import appleLogo from "@/logos/apple.svg";
import bookingLogo from "@/logos/booking.svg";
import googleLogo from "@/logos/google.svg";
import metaLogo from "@/logos/meta.svg";
import amazonLogoDark from "@/logos/amazon-dark.svg";
import metaLogoDark from "@/logos/meta-dark.svg";
import appleLogoDark from "@/logos/apple-dark.svg";
import googleLogoDark from "@/logos/google-dark.svg";
import bookingLogoDark from "@/logos/booking-dark.svg";
import ThemeToggle from "@/components/ThemeToggle"; 
import flag from "@/app/(main)/avatars/flag.png";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FileText, Send, Brain, Video, Globe } from "lucide-react"

const stats = [
  { number: "98%", label: "More likely to get hired" },
  { number: "150K+", label: "Satisfied customers" },
  { number: "10%", label: "Better pay with our AI resume builder" },
];

const companies = [
  { 
    name: "Amazon", 
    logo: amazonLogo,
    logoDark: amazonLogoDark,
    url: "https://www.amazon.jobs" // or your desired link
  },
  { 
    name: "Meta", 
    logo: metaLogo,
    logoDark: metaLogoDark,
    url: "https://www.metacareers.com"
  },
  { 
    name: "Apple", 
    logo: appleLogo,
    logoDark: appleLogoDark,
    url: "https://www.apple.com/careers"
  },
  { 
    name: "Google", 
    logo: googleLogo,
    logoDark: googleLogoDark,
    url: "https://careers.google.com"
  },
  { 
    name: "Booking.com", 
    logo: bookingLogo,
    logoDark: bookingLogoDark,
    url: "https://careers.booking.com"
  },
];

const reviews = [
  {
    name: "David L.",
    role: "Software Developer",
    content: "Resume Pro's AI features helped me highlight my technical skills perfectly. The smart suggestions for keywords got my resume past ATS systems, and I landed interviews at three top tech companies!",
    rating: 5,
    date: "Feb 15, 2024"
  },
  {
    name: "Rachel S.",
    role: "Marketing Manager",
    content: "The premium templates are worth every penny. I was able to create a stunning resume that stood out from the crowd. The AI writing assistant helped me quantify my achievements brilliantly.",
    rating: 5,
    date: "Mar 1, 2024"
  },
  {
    name: "Michael P.",
    role: "Recent Graduate",
    content: "As a fresh graduate, I was struggling to create my first professional resume. Resume Pro's AI suggestions helped me transform my academic projects into compelling professional experiences.",
    rating: 5,
    date: "Jan 28, 2024"
  },
  {
    name: "Emma T.",
    role: "Career Switcher",
    content: "Switching from teaching to UX design seemed daunting, but Resume Pro helped me translate my transferable skills perfectly. The AI tool knew exactly how to phrase my experience for tech companies.",
    rating: 5,
    date: "Feb 20, 2024"
  },
  {
    name: "James W.",
    role: "Sales Executive",
    content: "The custom color schemes and formatting options helped my resume stand out while staying professional. Already recommended Resume Pro to my entire sales team!",
    rating: 5,
    date: "Mar 5, 2024"
  },
  {
    name: "Nina K.",
    role: "Project Manager",
    content: "The ability to create multiple versions of my resume for different roles is fantastic. The AI suggestions for each job application are spot-on. Worth every penny of the premium subscription!",
    rating: 5,
    date: "Feb 8, 2024"
  },
  {
    name: "Oliver B.",
    role: "Graphic Designer",
    content: "Finally, a resume builder that understands creative professionals! The templates are modern yet professional, and the AI helps showcase both technical and creative skills perfectly.",
    rating: 5,
    date: "Mar 10, 2024"
  },
  {
    name: "Lisa M.",
    role: "Healthcare Professional",
    content: "The industry-specific keywords suggested by the AI were incredibly helpful. Secured interviews at top hospitals within weeks of using my new resume!",
    rating: 5,
    date: "Feb 25, 2024"
  },
  {
    name: "Carlos R.",
    role: "Business Analyst",
    content: "The premium features are game-changing. The AI helped me highlight my data analysis achievements, and the export options made it easy to maintain consistent formatting.",
    rating: 5,
    date: "Mar 8, 2024"
  }
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Navigation Bar */}
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b dark:border-gray-800">
  <div className="mx-auto max-w-7xl px-4">
    <div className="flex h-16 items-center justify-between">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
  {/* Light mode logo */}
  <Image
    src="/logo.png"
    alt="Logo"
    width={120}
    height={40}
    className="h-10 w-auto block dark:hidden"
  />

  {/* Dark mode logo */}
  <Image
    src="/logodark.png"
    alt="Logo dark"
    width={120}
    height={40}
    className="h-10 w-auto hidden dark:block"
  />
</Link>

      {/* Centered Navigation Links */}

      {/* CTA Buttons */}
     {/* Navigation Items */}
     
<div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
<ThemeToggle />
  <Link href="/resumes" className="hover:text-orange-500 transition">Home</Link>
  <Link href="/blog" className="hover:text-orange-500 transition">Blog</Link>
  <Link href="/about" className="hover:text-orange-500 transition">About</Link>
  <Link href="/contact" className="hover:text-orange-500 transition">Contact</Link>

  {/* Spacer */}
  <div className="ml-1 flex items-center gap-4">
    <Link href="/resumes">
      <Button variant="ghost">Sign in</Button>
    </Link>
    <Link href="/resumes">
      <Button variant="premium">Get Started</Button>
    </Link>
  </div>
</div>
    </div>
  </div>
</nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-100 to-white dark:from-black dark:via-gray-900 dark:to-black px-4 pt-24 pb-12">
        <div className="container mx-auto flex flex-col items-center gap-6 md:flex-row">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl dark:text-white">
                Create 
              </h1>
              <div className="flex justify-center md:justify-start">
                <span className="block text-3xl font-extrabold sm:text-4xl md:text-5xl bg-gradient-to-r from-[#FB6520] to-[#FB6520] bg-clip-text text-transparent">
                  Your Perfect CV
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl dark:text-white">
                In Under 2 Minutes
              </h1>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
              Design a standout professional CV with our AI builder. It&apos;s Easy, Fast and Free.
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center mt-2">
              <Link href="/resumes" className="min-w-[100px]">
                <Button 
                  size="lg" 
                  className="w-full bg-[#FB6520] text-white hover:bg-[#FB6520] transition-colors"
                >
                  Get Started Free
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">No credit card required</p>
            </div>
            
           {/* Trust Indicators */}
<div className="flex items-center justify-center gap-2 md:justify-start mt-2">
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
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FB6520] to-[#FB6530] opacity-30 blur"></div>
            <Image
              src={resumePreview}
              alt="Resume preview"
              width={450}
              className="relative rounded-lg shadow-xl transition-all hover:scale-105"
            />
          </div>
        </div>
      </section>


         {/* How It Works Section */}
         <section className="bg-white dark:bg-black py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">How It Works</h2>
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
    
    {/* ✅ Section Title */}
    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
      Looking for Work?
    </h2>

    {/* Grid layout: Left Text + Right Image */}
    <div className="grid md:grid-cols-2 items-center gap-12">
      
      {/* Left: Text Content */}
      <div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let Make a CV help you create a standout resume that gets noticed.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Build your CV in just minutes</li>
          <li>Download in PDF format instantly</li>
          <li>No experience or login required</li>
        </ul>
        <div className="mt-6">
          <a
            href="/resumes"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
          >
            Start Now – It&apos;s Free
          </a>
        </div>
      </div>

      {/* Right: Image */}
      <div className="flex justify-center">
        <Image
          src="/jobseeker.png" // ✅ Replace with your real image
          alt="Job Seeker Example"
          width={350}
          height={350}
          className="rounded-xl shadow-lg object-contain"
        />
      </div>
    </div>
  </div>
</section>

      {/* Company Logos Section */}
      <section className="border-y dark:border-gray-800 bg-white dark:bg-black py-12">
        <div className="container mx-auto px-4">
          <h3 className="mb-8 text-center text-xl font-medium text-gray-600 dark:text-gray-300">
            Our customers have been hired at:
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
  {companies.map((company) => (
    <a
      key={company.name}
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative h-16 w-40 transition-transform hover:scale-105"
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
{/* Recruitment Companies Section */}
<section className="bg-gray-50 dark:bg-black py-20">
  <div className="max-w-7xl mx-auto px-4">

    {/* Section Title */}
    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
      Recruitment Companies & Employers
    </h2>

    {/* Grid layout: Left Text + Right Image */}
    <div className="grid md:grid-cols-2 items-center gap-12">

      {/* Image */}
      <div className="flex justify-center">
        <Image
          src="/recruiters.png" // Replace with your recruiter/company image
          alt="Recruitment Example"
          width={350}
          height={350}
          className="rounded-xl shadow-lg object-contain"
        />
      </div>

      {/* right: Text Content */}
      <div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Are you hiring? Partner with Make a CV to access job seekers with ready-to-use, professional resumes.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Receive polished, AI-enhanced CVs</li>
          <li>Save time with standardized formats</li>
          <li>Connect with job seekers across industries</li>
        </ul>
        <div className="mt-6">
          <a
            href="/contact"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
          >
            Partner With Us
          </a>
        </div>
      </div>

      

    </div>
  </div>
</section>

      {/* Customer Reviews Section */}
      <section className="py-20 bg-gray-50 dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 dark:text-white">What Our Users Say</h2>
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
                
                <p className="text-gray-600 dark:text-gray-300 mb-3">{review.content}</p>
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
      <section className="py-20 bg-gray-50 dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 dark:text-gray-300">Choose the plan that&apos;s right for you</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="rounded-lg border bg-white dark:bg-black/40 p-8 shadow-sm dark:border-gray-800 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Basic</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">For serious job seekers</p>
              <div className="mb-6">
                <span className="text-4xl font-bold dark:text-white">$9.99</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-6">
                {[
                  "Create & download resumes",
                  "Limited to 2 resumes",
                  "ATS-friendly",
                  "PDF download",
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

            {/* Premium Plan */}
            <div className="rounded-lg border-2 border-[#FB6520] bg-white dark:bg-black/40 p-8 shadow-md relative backdrop-blur-sm">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FB6520] text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Premium</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">For professionals</p>
              <div className="mb-6">
                <span className="text-4xl font-bold dark:text-white">$19.99</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-6">
                {[
                  "Everything in Basic",
                  "Infinite resumes",
                  "Design customizations",
                  "AI-Powered Resume Builder",
                  "Priority support",
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
          <h2 className="text-3xl font-bold text-center mb-4 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12">Everything you need to know about our platform</p>
          
          <div className="max-w-3xl mx-auto grid gap-6">
            {[
              {
                q: "How does the AI resume builder work?",
                a: "Our AI analyzes your experience and skills to create tailored, ATS-friendly resumes. It suggests improvements and formats everything professionally."
              },
              {
                q: "Is it really free to get started?",
                a: "Yes! You can create your first resume completely free. No credit card required to get started."
              },
              {
                q: "Can I export my resume to PDF?",
                a: "Yes, you can export your resume to PDF. The exports are high-quality and print-ready."
              },
              {
                q: "Will my resume be ATS-friendly?",
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
            Ready to Land Your Dream Job?
          </h2>
          <p className="mb-8 text-lg text-white/90 max-w-2xl mx-auto">
            Join 150,000+ professionals who trust our platform
          </p>
          <Button 
            size="lg" 
            className="min-w-[200px] bg-white text-black hover:bg-gray-100 transition-all duration-300"
          >
            <Link href="/resumes">
              Get Started Free
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
