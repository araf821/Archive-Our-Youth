"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ContactFormValidator, ContactType } from "@/lib/validators/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { contact } from "@/actions/contact";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type Props = {};

const ContactForm = ({}: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [emailSent, setEmailSent] = useState(() => {
    const now = new Date().getTime();
    const sentMessageTime = localStorage.getItem("sentMessageTime");
    if (!sentMessageTime) return false;

    if (now - parseInt(sentMessageTime) > 1 * 60 * 60 * 1000) {
      // Delete the local storage after 1 hour
      localStorage.removeItem("sentMessageTime");
      return false;
    } else {
      return true;
    }
  });

  const form = useForm<z.infer<typeof ContactFormValidator>>({
    resolver: zodResolver(ContactFormValidator),
    defaultValues: {
      contactType: ContactType.GENERAL,
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof ContactFormValidator>) => {
    startTransition(async () => {
      await contact(values)
        .then(() => {
          toast.success("Email sent successfully!");
          setEmailSent(true);
          localStorage.setItem(
            "sentMessageTime",
            new Date().getTime().toString(),
          );
        })
        .catch((e: Error) => {
          if (e.message === "Bad Request") {
            toast.error("Invalid fields provided!");
            return;
          }

          if (e.message === "Email not sent!") {
            toast.error(
              "Email could not be sent due to a server error. Try again later.",
            );
            return;
          }

          toast.error("Something went wrong. Please try again later.");
        });
    });
  };

  if (!isMounted) return null;

  if (emailSent) {
    return (
      <div className="mt-6 rounded-sm bg-zinc-800 px-3 py-4">
        <h3 className="mb-2.5 text-lg font-medium md:text-xl">
          We&apos;ve received your message!
        </h3>
        <p className="mb-6 text-zinc-400 max-md:text-sm">
          We&apos;ll get back to you as soon as possible. Please wait a little
          while if you would like to send another message. If this is urgent,
          contact{" "}
          <Link
            href={"mailto:younglives@edu.yorku.ca"}
            className="text-green-500 underline underline-offset-4"
          >
            younglives@edu.yorku.ca
          </Link>
          .
        </p>

        <Link
          className={buttonVariants({
            variant: "ghost",
            className: "bg-[#2f2f2f] hover:bg-zinc-700",
          })}
          href={"/home"}
        >
          Back Home
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="contactType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300 md:text-base">
                Type of Inquiry
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <SelectTrigger className="morph-sm bg-zinc-800 focus:outline-none focus:outline-zinc-500">
                    <SelectValue className="text-zinc-50">
                      {field.value === ContactType.GENERAL
                        ? "General"
                        : "Technical"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="border-zinc-700 bg-zinc-800 text-zinc-50">
                    <SelectItem className="py-2.5" value={ContactType.GENERAL}>
                      General
                    </SelectItem>
                    <SelectItem className="py-2.5" value={ContactType.TECH}>
                      Technical
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel className="md:text-base">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  disabled={isPending}
                  placeholder="username@email.com"
                  className="morph-sm text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel className="md:text-base">Message</FormLabel>
              <textarea
                {...field}
                disabled={isPending}
                placeholder="Your message..."
                className="morph-sm min-h-[180px] w-full rounded-md bg-zinc-800 px-2.5 py-2 outline-none focus:outline focus:outline-zinc-700 disabled:pointer-events-none disabled:opacity-50"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="outline" className="mt-6 w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default ContactForm;
