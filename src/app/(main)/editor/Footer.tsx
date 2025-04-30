/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileUserIcon, PenLineIcon } from "lucide-react";
import Link from "next/link";
import { steps } from "./steps";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";
import useWindowSize from "@/hooks/useWindowSize";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
  isSaving: boolean;
  resumeData: any;
  contentRef: any;
}

export default function Footer({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  setShowSmResumePreview,
  resumeData,
  isSaving,
  contentRef,
}: FooterProps) {
  const router = useRouter();
  const { width: screenWidth } = useWindowSize();
  
  const reactToPrintDesktop = useReactToPrint({
    contentRef,
    documentTitle: resumeData?.title || "CV",
  });
  
  const handlePrint = () => {
    const isMobile = screenWidth < 769;
    
    if (isMobile && contentRef.current) {
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        const resumeColorHex = resumeData?.colorHex || "#8424FF";
        
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${resumeData?.title || "Resume"}</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }

                body {
                  background: white;
                  width: 210mm;
                  min-height: 297mm;
                  margin: 0;
                  padding: 0;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  color-adjust: exact !important;
                }

                #resumePreviewContent {
                  width: 100%;
                  padding: 24px;
                  font-family: 'Inter', sans-serif;
                }

                /* Personal info header */
                .personal-info-header {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  gap: 16px;
                }
                .personal-info-header img {
                  width: 100px;
                  height: 100px;
                  object-fit: cover;
                }
                .personal-info-header .text-3xl {
                  font-size: 2rem;
                  margin: 0;
                  color: ${resumeColorHex};
                }
                .personal-info-header .font-medium {
                  font-size: 1rem;
                  color: ${resumeColorHex};
                }

                /* Divider lines */
                hr {
                  border: none;
                  border-top: 3px solid ${resumeColorHex};
                  margin: 1rem 0;
                  width: 100%;
                }

                /* Section titles */
                .section-title {
                  color: ${resumeColorHex};
                  font-size: 1.25rem;
                  font-weight: 600;
                  margin-bottom: 0.75rem;
                }

                /* Work/Education entries */
                .experience-header,
                .education-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-start;
                  gap: 8px;
                }
                .experience-header .text-sm,
                .education-header .text-sm {
                  font-size: 0.875rem;
                  font-weight: 600;
                  color: ${resumeColorHex};
                }
                .experience-header + p,
                .education-header + p {
                  font-size: 0.875rem;
                  font-weight: 600;
                  margin: 0.25rem 0;
                }

                /* Skills section */
                .skills-container {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 8px;
                  width: 100%;
                }

                .badge {
                  background-color: ${resumeColorHex} !important;
                  color: white !important;
                  padding: 6px 16px;
                  border-radius: 9999px;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 20px;
                  display: inline-flex;
                  align-items: center;
                  white-space: nowrap;
                }

                /* Utility classes */
                .space-y-6 > * + * { margin-top: 1.5rem; }
                .space-y-3 > * + * { margin-top: 0.75rem; }
                .break-inside-avoid { break-inside: avoid; }
                .flex { display: flex; }
                .flex-wrap { flex-wrap: wrap; }
                .gap-2 { gap: 0.5rem; }
                .whitespace-pre-line {
                  white-space: pre-wrap;
                  word-break: break-word;
                }

                @media print {
                  @page {
                    size: A4 portrait;
                    margin: 0.6cm;
                  }

                  html, body {
                    width: 210mm;
                    height: 297mm;
                    margin: 0;
                    padding: 0;
                  }

                  #resumePreviewContent {
                    width: 100%;
                    min-height: 297mm;
                    margin: 0 auto;
                    padding: 0.6cm;
                    box-sizing: border-box;
                  }
                }
              </style>
            </head>
            <body>
              <div id="resumePreviewContent">
                ${contentRef.current.innerHTML}
              </div>
            </body>
          </html>
        `);
        
        printWindow.document.close();
        
        setTimeout(() => {
          try {
            printWindow.focus();
            printWindow.print();
          } catch (e) {
            console.error("Print failed:", e);
            reactToPrintDesktop();
          }
        }, 500);
      } else {
        reactToPrintDesktop();
      }
    } else {
      reactToPrintDesktop();
    }
  };

  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Next step
          </Button>
          {!nextStep && (
            <Button
              onClick={() => router.push('/resumes')}
            >
              Save{" "}
            </Button>
          )}
          {!nextStep && (
            <Button
              onClick={handlePrint}
            >
              Download
            </Button>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
          className="md:hidden"
          title={showSmResumePreview ? "Show input form" : "Show CV preview"}
        >
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p
            className={cn(
              "text-muted-foreground opacity-0",
              isSaving && "opacity-100",
            )}
          >
            Saving...
          </p>
        </div>
      </div>
    </footer>
  );
}
