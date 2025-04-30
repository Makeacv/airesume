import React from 'react';

interface ResumeDocumentStylesProps {
  colorHex?: string;
}

export function ResumeDocumentStyles({ colorHex = '#8424FF' }: ResumeDocumentStylesProps) {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

      /* Base styles for resume content */
      #resumePreviewContent {
        width: 100%;
        padding: 24px;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      /* Header (personal info) */
      .personal-info-header {
        display: flex;
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
      }
      .personal-info-header .font-medium {
        font-size: 1rem;
      }

      /* Divider line */
      hr {
        border: none;
        border-top: 3px solid ${colorHex};
        margin: 1rem 0;
      }

      /* Section titles */
      .section-title {
        color: ${colorHex};
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }

      /* Experience and education entries */
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
      }
      .experience-header + p,
      .education-header + p {
        font-size: 0.875rem;
        font-weight: 600;
        margin: 0.25rem 0;
      }

      /* Text and list formatting */
      .whitespace-pre-line {
        white-space: pre-wrap;
        word-break: break-word;
      }
      li {
        margin-bottom: 0.25em;
      }

      /* Badges (skills) */
      .badge {
        background-color: ${colorHex} !important;
        color: white !important;
        padding: 6px 16px;
        border-radius: 9999px;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        display: inline-flex;
        align-items: center;
        margin-right: 8px;
      }
      .skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      /* Print-specific styles: A4 layout */
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
          background: white;
        }

        /* Reset zoom from screen preview scaling */
        #resumePreviewContent {
          zoom: 1 !important;
          width: 100%;
          min-height: 297mm;
          margin: 0 auto;
          padding: 0.6cm;
          box-sizing: border-box;
          overflow: visible;
        }

        /* Ensure divider spans full width */
        hr {
          width: 100% !important;
          margin: 1rem 0 !important;
        }
      }
    `}</style>
  );
} 