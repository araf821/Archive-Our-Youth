import { delay } from "@/lib/utils";

interface pageProps {}

const page = async ({}: pageProps) => {
  await delay(4000);

  return <div>page</div>;
};

export default page;
