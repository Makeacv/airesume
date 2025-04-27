"use client";

import LoadingButton from "@/components/LoadingButton";
import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import useWindowSize from "@/hooks/useWindowSize";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Edit, MoreVertical, Printer, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { useReactToPrint } from "react-to-print";
import { deleteResume } from "./actions";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { width: screenWidth } = useWindowSize();

  const handlePrintDesktop = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "CV",
  });

  const handlePrint = () => {
    const isMobile = screenWidth < 769;
    
    if (isMobile && contentRef.current) {
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${resume.title || "Resume"}</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }

                body {
                  background: white;
                  width: 100%;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }

                #resumePreviewContent {
                  width: 100%;
                  padding: 24px;
                  font-family: 'Inter', sans-serif;
                }

                /* Strengths section specific styles */
                .section-title {
                  color: #8424FF;
                  font-size: 20px;
                  font-weight: 600;
                  margin-bottom: 16px;
                }

                .skills-container {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 8px;
                  width: 100%;
                }

                .badge {
                  background-color: #8424FF !important;
                  color: white !important;
                  padding: 6px 16px;
                  border-radius: 9999px;
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 20px;
                  display: inline-flex;
                  align-items: center;
                  white-space: nowrap;
                  text-transform: lowercase;
                }

                /* Preserve other necessary styles */
                .space-y-6 { margin-top: 1.5rem; }
                .space-y-3 { margin-top: 0.75rem; }
                .break-inside-avoid { break-inside: avoid; }
                .flex { display: flex; }
                .flex-wrap { flex-wrap: wrap; }
                .gap-2 { gap: 0.5rem; }

                @media print {
                  @page {
                    size: A4;
                    margin: 0.6cm;
                  }

                  body {
                    width: 100%;
                    min-height: 100vh;
                  }

                  #resumePreviewContent {
                    width: 100%;
                  }

                  .badge {
                    background-color: #8424FF !important;
                    color: white !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
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

        const styleSheet = printWindow.document.createElement("style");
        styleSheet.textContent = `
          .badge {
            background-color: #8424FF !important;
            color: white !important;
          }
        `;
        printWindow.document.head.appendChild(styleSheet);
        
        printWindow.document.close();
        
        setTimeout(() => {
          try {
            printWindow.focus();
            printWindow.print();
          } catch (e) {
            console.error("Print failed:", e);
            handlePrintDesktop();
          }
        }, 500);
      } else {
        handlePrintDesktop();
      }
    } else {
      handlePrintDesktop();
    }
  };

  const wasUpdated = resume.updatedAt !== resume.createdAt;

  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || "No title"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            contentRef={contentRef}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
      <MoreMenu resumeId={resume.id} onPrintClick={handlePrint} />
    </div>
  );
}

interface MoreMenuProps {
  resumeId: string;
  onPrintClick: () => void;
}

function MoreMenu({ resumeId, onPrintClick }: MoreMenuProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0.5 top-0.5"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={onPrintClick}
          >
            <Printer className="size-4" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem
          // onClick={onPrintClick}
          >
            <Link
              href={`/editor?resumeId=${resumeId}`}
              className="flex items-center gap-2"
            >
              <Edit className="size-4" />
              Edit
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationDialog
        resumeId={resumeId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </>
  );
}

interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConfirmationDialog({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) {
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again.",
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete resume?</DialogTitle>
          <DialogDescription>
            This will permanently delete this resume. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </LoadingButton>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
