import { delay } from "@/lib/utils";

interface PortalContentProps {}

const PortalContent = async ({}: PortalContentProps) => {
  await delay(5000);

  return <div className="flex-1">PortalContent</div>;
};

export default PortalContent;
