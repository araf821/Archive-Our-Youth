import { Loader2 } from "lucide-react";
import { FC } from "react";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div>
      <Loader2 className="animate-spin w-10 h-10 text-green-500" />
    </div>
  );
};

export default loading;
