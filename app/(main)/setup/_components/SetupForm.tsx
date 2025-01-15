"use client";

import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/input";
import { UserSetupValidator } from "@/lib/validators/user-setup";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface SetupFormProps {
  user: User;
}

const SetupForm: FC<SetupFormProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserSetupValidator>>({
    resolver: zodResolver(UserSetupValidator),
    defaultValues: {
      name: user.name,
      imageUrl: user.imageUrl || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserSetupValidator>) => {
    setIsLoading(true);

    try {
      await axios.put("/api/user/setup", values);
      toast.success("You're good to go!");
      router.push("/home");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        "Something went wrong. Account could not be created at this time.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="morph-lg relative mx-auto mt-6 flex w-full max-w-lg flex-col gap-6 overflow-hidden rounded-xl border-border-dark bg-zinc-900 px-4 py-8 md:px-6"
      >
        <h2 className="mb-4 mt-2 text-center text-xl text-zinc-200 md:text-2xl">
          Let&rsquo;s get you set up!
        </h2>

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="mx-auto w-full max-w-[200px]">
              <FormControl>
                <FileUpload
                  endPoint="image"
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  {...field}
                  placeholder="Your name"
                  type="text"
                  className="morph-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isLoading}
          type="submit"
          className="morph-md bg-green-500 text-black hover:bg-green-500 hover:bg-opacity-80"
        >
          Create new Account
        </Button>
      </form>
    </Form>
  );
};

export default SetupForm;
