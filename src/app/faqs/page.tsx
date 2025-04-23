/* eslint-disable react/no-unescaped-entities */

import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 
   "FAQ for free CV builder - Make a CV AI"
  ,
  description:
    "Find all the answers to your questions on our FAQ page. If you don't find the answer here, reach out to us.",
};
export default function Page() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          <p className="text-gray-500 mt-2">Everything you need to know about our platform</p>
        </div>

        <div className="grid md:grid-cols-2 gap-y-8 gap-x-12">
          {/* FAQ Item 1 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">What is MakeACV.AI?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              MakeACV.AI is a free AI-powered CV builder designed to help you create professional CVs quickly and easily. No design skills or writing experience needed. Just answer a few questions and get a CV in minutes.
            </p>
          </div>

          {/* FAQ Item 2 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">Is MakeACV.AI really free?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. MakeACV.AI offers a completely free plan that allows you to create, edit, and download one CV. Premium features like additional templates, up to 250 CV’s, cover letters, and custom sections are available in the paid for premium plan.

            </p>
          </div>

          {/* FAQ Item 3 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">Do I need to sign up to use MakeACV.AI?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, you will need to signup with your email address or Gmail account. However, creating an account lets you save your progress, make updates later, and access your CVs from any device.
            </p>
          </div>

          {/* FAQ Item 4 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">How does the AI work?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our smart AI asks you a few questions about your experience, education, and skills. Based on your answers, it generates a professionally worded and formatted CV tailored to your industry.
            </p>
          </div>

          {/* FAQ Item 5 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">Can I edit my CV after it's created?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Absolutely. You can easily make edit or changes to your CV via mobile or desktop
            </p>
          </div>

          {/* FAQ Item 6 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">Can I use MakeACV.AI on my mobile device?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes! MakeACV.AI is mobile-friendly, allowing you to build and edit your CV on the go from your smartphone or tablet.
            </p>
          </div>

          {/* FAQ Item 7 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">Is the CV template ATS-friendly?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. The MakeACV.AI template is designed to be compatible with “Applicant Tracking Systems” (ATS), ensuring your CV can be read by most hiring software.
            </p>
          </div>

          {/* FAQ Item 8 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">Is my information safe?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We take your privacy seriously. Your data is encrypted and never shared with third parties. You can delete your account and all associated data at any time. We may however from time to time communicate via email for new features or account changes.
            </p>
          </div>

          {/* FAQ Item 9 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">Can I create multiple CVs for different job applications?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Users can create one CV on the free plan. If you would like to create and manage multiple CVs tailored to different roles or industries, you will need to upgrade to a premium plan.

            </p>
          </div>

          {/* FAQ Item 10 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">Do you offer cover letters or portfolios too?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We are re currently working on adding AI-generated cover letters and portfolio options. Stay tuned for updates.
            </p>
          </div>

          {/* FAQ Item 11 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">Can I use MakeACV.AI on my mobile device?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes! MakeACV.AI is mobile-friendly, allowing you to build and edit your CV on the go from your smartphone or tablet.
            </p>
          </div>

          {/* FAQ Item 12 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">Can I add references to my CV?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Currently, references cannot be added through the AI builder, but you can manually include them in your final CV once it’s downloaded.
            </p>
          </div>

          {/* FAQ Item 13 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">What formats can I download my CV in?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              You can download your CV as a PDF, which is the preferred format for job applications. Other formats may be added in future updates.
            </p>
          </div>

          {/* FAQ Item 14 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">Do I need any special software to use MakeACV.AI?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              No special software is required. MakeACV.AI works directly in your web browser (Desktop or mobile). All you need is an internet connection and a device to access it.
            </p>
          </div>

          {/* FAQ Item 15 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">How long does it take to create a CV with MakeACV.AI?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              On average, it takes about 2 to 10 minutes to complete your CV, depending on the amount of information you input. The AI works quickly to generate your CV, and you can make edits as needed.
            </p>
          </div>

          {/* FAQ Item 16 */}
          <div className="border dark:border-gray-800 rounded-lg p-6 bg-gray-50 dark:bg-black/40 backdrop-blur-sm">
            <h3 className="font-semibold mb-2 dark:text-white">I need help. How can I contact support?
  </h3>
            <p className="text-gray-600 dark:text-gray-300">
              You can reach our friendly support team via email at info@makeacv.co.za.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
