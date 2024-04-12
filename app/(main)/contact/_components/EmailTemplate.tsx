/* eslint-disable @next/next/no-img-element */
import styles from "./email.module.css";
import {
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  email: string;
  message: string;
  subject: string;
}

export const EmailTemplate = ({
  email,
  message,
  subject,
}: EmailTemplateProps) => (
  <Tailwind>
    <div className="mx-auto mt-12 max-w-md rounded-md border-2 border-zinc-800 bg-zinc-900 p-6">
      <Section className="mb-[32px]">
        <Img
          src="https://images.squarespace-cdn.com/content/v1/655f7cfae0b8892f9f5e1fe0/1700756792420-K5815X1D7LRG2PVD80NT/YLRL_LOGO.png?format=1500w"
          width="200"
          height="100"
          alt="archive our youth"
          className="mx-auto my-0"
          style={{
            objectFit: "contain",
          }}
        />
      </Section>
      <Text className="mx-0 my-2 p-0 text-center text-lg font-semibold text-green-500">
        New Message
      </Text>
      <Hr className="my-4 border-4 border-zinc-800" />
      <Text className="my-0 text-center text-xs font-medium text-zinc-400">
        From
      </Text>
      <Text className="my-0 text-center text-base">
        <Link
          className="text-blue-500 underline underline-offset-4"
          href={`mailto:${email}`}
        >
          {email}
        </Link>
      </Text>
      <Text className="mt-4 text-center text-xs font-medium text-zinc-400">
        Subject
      </Text>
      <Text className="my-0 text-center text-zinc-200">{subject}</Text>
      <Text className="mt-4 whitespace-pre-line break-words text-zinc-100">
        <span className="font-light text-zinc-300">Message: </span>
        {message}
      </Text>
      <Hr className="my-4 border-4 border-zinc-800" />
      {/* <Text className="text-zinc-200">
        <span className="mr-2">Unsubscribe</span>
        <span className="mr-2">•</span>
        <span>Manage Preferences</span>
      </Text> */}
      <Text className="text-center text-xl font-semibold text-green-500">
        <Link className="text-green-500" href="https://archiveouryouth.ca">
          Archive Our Youth
        </Link>
      </Text>
    </div>
  </Tailwind>
);
