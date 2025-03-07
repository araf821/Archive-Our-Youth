import { FC } from "react";

import { DeleteButton } from "./DeleteButton";

interface VideoRendererProps {
  value: string;
  onDelete: () => void;
  isPending: boolean;
}

export const VideoRenderer: FC<VideoRendererProps> = ({
  value,
  onDelete,
  isPending,
}) => {
  return (
    <div className="relative aspect-video max-h-[40vh] w-full border border-border-dark">
      <video
        src={value}
        controls
        className="h-full w-full rounded-sm object-contain"
      />
      <DeleteButton
        onClick={onDelete}
        isPending={isPending}
        title="Remove video"
      />
    </div>
  );
};
