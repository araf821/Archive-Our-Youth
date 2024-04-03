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
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  email: string;
  message: string;
}

export const EmailTemplate = ({ email, message }: EmailTemplateProps) => (
  <Tailwind>
    <div className="mx-auto mt-12 max-w-md rounded-lg border-2 border-zinc-800 bg-zinc-900 p-6">
      <Section className="mb-[32px]">
        <Img
          src="https://images.squarespace-cdn.com/content/v1/655f7cfae0b8892f9f5e1fe0/1700756792420-K5815X1D7LRG2PVD80NT/YLRL_LOGO.png?format=1500w"
          width="140"
          height="140"
          alt="archive our youth"
          className="mx-auto my-0"
          style={{
            objectFit: "cover",
          }}
        />
      </Section>
      <Text className="mx-0 my-2 p-0 text-center text-[24px] font-medium text-white">
        New Message
      </Text>
      <Text className="font-semibold">
        <span className="text-zinc-400">From:</span>{" "}
        <span
          style={{
            color: "#00F5FF",
          }}
        >
          {email}
        </span>
      </Text>
      <p className="mt-2 whitespace-pre-line text-lg text-zinc-300">
        {message}
      </p>

      <Hr className="my-4 border-4 border-zinc-800" />
      <Text className="text-zinc-200">
        <span className="mr-2">Unsubscribe</span>
        <span className="mr-2">•</span>
        <span>Manage Preferences</span>
      </Text>
    </div>
  </Tailwind>
);
