"use client";

import { Form } from "@/components/ui/Form";
import { UserSetupValidator } from "@/lib/validators/user-setup";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface SetupFormProps {
  user: User;
}

const SetupForm: FC<SetupFormProps> = ({ user }) => {
  const form = useForm<z.infer<typeof UserSetupValidator>>({
    resolver: zodResolver(UserSetupValidator),
    defaultValues: {
      name: user.name,
      imageUrl: user.imageUrl || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserSetupValidator>) => {
    try {
      toast.success("You're good to go!");
    } catch (error) {
      console.error(error);
      toast.error(
        "Something went wrong. Account could not be created at this time.",
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}></form>
    </Form>
  );
};

export default SetupForm;
