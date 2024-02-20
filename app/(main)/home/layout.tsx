import FiltersProvider from "@/components/FiltersProvider";
import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <FiltersProvider />
      {children}
    </>
  );
};

export default layout;
