import { dummyItems } from "@/lib/data";
import { FC, Fragment } from "react";
import CollageItem from "./CollageItem";

interface CollageProps {}

const Collage: FC<CollageProps> = ({}) => {
  return (
    <div className="grid grid-cols-2 items-center overflow-hidden bg-black sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {[...dummyItems, ...dummyItems, ...dummyItems].map((item, index) => (
        <Fragment key={index}>
          <CollageItem key={index} item={item} />
        </Fragment>
      ))}
    </div>
  );
};

export default Collage;
