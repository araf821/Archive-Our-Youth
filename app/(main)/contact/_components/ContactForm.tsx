"use client";

import { Button } from "@/components/ui/button";
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
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { contact } from "@/actions/contact";
import { toast } from "sonner";

type Props = {};

const ContactForm = ({}: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContactFormValidator>>({
    resolver: zodResolver(ContactFormValidator),
    defaultValues: {
      contactType: ContactType.GENERAL,
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ContactFormValidator>) => {
    console.log(values);

    startTransition(async () => {
      await contact(values)
        .then(() => {
          console.log("sent");
          toast.success("Email sent successfully!");
        })
        .catch(() => {
          toast.error("Something went wrong. Please try again later.");
        });
    });
  };

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
                      {field.value}
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

        <Button variant="outline" className="mt-6 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default ContactForm;
