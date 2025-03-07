import { FC } from "react";
import { Loader2 } from "lucide-react";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div className="mx-auto flex h-[80dvh] w-full max-w-screen-md items-center justify-center">
      <Loader2 className="animate-spin text-green-500/75 md:h-10 md:w-10" />
    </div>
  );
};

export default loading;
