import { FC } from "react";
import { DeleteButton } from "./DeleteButton";

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
    <div className="w-full space-y-2 text-center">
      <audio src={value} controls className="w-full" />
      <DeleteButton
        onClick={onDelete}
        isPending={isPending}
        title="Remove audio"
        variant="text"
      />
    </div>
  );
};
