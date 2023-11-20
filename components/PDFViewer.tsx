"use client";

import { FC } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

interface PDFViewerProps {
  url: string;
}

const PDFViewer: FC<PDFViewerProps> = ({ url }) => {
  return (
    <div className="relative aspect-[1/1.3] w-full bg-white">
      <iframe
        onResize={() => {}}
        src={`https://docs.google.com/gview?url=${url}&embedded=true`}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
};

export default PDFViewer;
