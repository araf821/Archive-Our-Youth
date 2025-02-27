import { FC } from "react";
import { AudioPlayer } from "../ui/AudioPlayer";

interface AudioRendererProps {
  value: string;
  onDelete: () => void;
  isPending: boolean;
}

export const AudioRenderer: FC<AudioRendererProps> = ({
  value,
  onDelete,
  isPending,
}) => {
  return (
    <AudioPlayer
      src={value}
      showDelete
      onDelete={onDelete}
      isPending={isPending}
    />
  );
};
