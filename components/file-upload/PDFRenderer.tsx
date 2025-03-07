import { FC } from "react";
import Link from "next/link";

import PDFViewer from "../PDFViewer";
import { DeleteButton } from "./DeleteButton";

interface PDFRendererProps {
  value: string;
  onDelete: () => void;
  isPending: boolean;
}

export const PDFRenderer: FC<PDFRendererProps> = ({
  value,
  onDelete,
  isPending,
}) => {
  return (
    <div className="relative w-full">
      <PDFViewer url={value} />
      <DeleteButton
        onClick={onDelete}
        isPending={isPending}
        title="Remove PDF"
      />
      <Link
        href={value}
        target="_blank"
        className="group relative text-zinc-400 transition hover:text-zinc-100"
      >
        View Externally
        <span className="absolute bottom-0 left-0 h-[1px] w-full origin-bottom-left scale-x-0 bg-zinc-400 transition group-hover:scale-x-100 group-hover:bg-zinc-100" />
      </Link>
    </div>
  );
};
