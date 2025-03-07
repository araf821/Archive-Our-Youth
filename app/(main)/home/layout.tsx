import { FC } from "react";

import FiltersProvider from "@/components/FiltersProvider";

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
