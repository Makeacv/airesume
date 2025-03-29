import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - AI Resume Builder",
    absolute: "About Us | Who We Are & Why We Built This – Make A CV",
  },
  description:
    "Learn more about Make A CV – We're on a mission to make CV building simple, fast, and free for everyone in South Africa. Built for job seekers and recruiters",
};

export default function AboutPage() {
  return (
    <>
      <main className="max-w-3xl mx-auto px-4 py-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-6">
          About Us
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-800 dark:text-zinc-300 mb-6 text-justify">
          Make a CV is a proudly South African start-up with one goal in mind: to make CV creation quick, easy, and stress-free.
        </p>

        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-zinc-400 mb-4 text-justify">
          We understand how frustrating it can be to start a new CV or improve an old one. Whether you&apos;re fresh out of school, switching careers, re-entering the job market, or simply updating your experience, building a CV can often feel overwhelming, confusing, or time-consuming. That&apos;s exactly why we created Make a CV — to take the hassle out of the process and help you get job-ready in minutes.
        </p>

        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-zinc-400 mb-4 text-justify">
          Using smart, AI-powered technology, our tool helps you build a professional CV step by step. You don&apos;t need to be a writer or a designer — just answer a few easy questions and let us guide you through it. From summaries and skills to work experience and layout, everything is designed to help you put your best foot forward.
        </p>

        <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-zinc-400 mb-4 text-justify">
          Make a CV is built with the South African job market in mind. Our templates include all the relevant sections local employers expect to see, such as ID number, language proficiency, and references. Whether you&apos;re applying to work in retail, admin, hospitality, or any other field — we&apos;ve got you covered.
        </p>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Here&apos;s what you can expect from Make a CV:
        </h2>

        <ul className="list-disc list-inside text-base sm:text-lg md:text-xl text-gray-700 dark:text-zinc-300 space-y-2">
          <li>A simple, user-friendly experience that saves you time</li>
          <li>CVs tailored to South African job seekers and employers</li>
          <li>Clean, modern templates that are easy to read and professional</li>
          <li>AI-generated suggestions for summaries, skills, and experience</li>
          <li>The ability to create, edit, and download your CV in PDF format</li>
          <li>No design or writing experience needed — just follow the steps</li>
          <li>Free to use with no complicated setup or login required</li>
        </ul>
      </main>
    </>
  );
}
