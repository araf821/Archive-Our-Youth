"use client";

import { FC } from "react";

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
