import FiltersProvider from "@/components/FiltersProvider";
import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div>
      <FiltersProvider />
      {children}
    </div>
  );
};

export default layout;
