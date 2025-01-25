"use client";

import { Post } from "@prisma/client";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../ui/Form";
import { Button } from "../ui/button";

import { TagsInput } from "./edit-post-form/TagsInput";
import { z } from "zod";
import { PostEditValidator } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DescriptionField } from "./edit-post-form/DescriptionField";
import DynamicImage from "../DynamicImage";
import PostContentField from "./edit-post-form/PostContentField";
import ThumbnailField from "./edit-post-form/ThumbnailField";

interface EditPostProps {
  post: Post;
}

const EditPost: FC<EditPostProps> = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof PostEditValidator>>({
    resolver: zodResolver(PostEditValidator),
    defaultValues: {
      content: post.postContent || "",
      tags: post.tags || [],
      description: post.description || "",
      thumbnail: post.thumbnail || "",
      location: post.location || "",
      researchQuestions: post.researchQuestions || [],
    },
  });

  const onSubmit = async (values: z.infer<typeof PostEditValidator>) => {
    try {
      setIsLoading(true);

      console.log("researchQuestions", values.researchQuestions);
      console.log("post.researchQuestions", post.researchQuestions);

      if (
        values.content === post.postContent &&
        values.description === post.description &&
        values.tags.toString() == post.tags.toString() &&
        values.thumbnail === post.thumbnail &&
        values.researchQuestions.toString() ==
          post.researchQuestions.toString() &&
        values.location === post.location
      ) {
        toast.error("No changes have been made.");
      } else {
        await axios.put(`/api/post/${post.id}`, values);
        toast.success("Post updated successfully!");
        router.push(`/post/${post.slug}`);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-y-6">
      <div className="rounded-lg border p-4 md:p-6">
        <div className="space-y-2">
          <p className="text-lg font-medium">Title</p>
          <p className="text-sm text-zinc-400">This cannot be edited</p>
          <p className="rounded-md border bg-zinc-800 px-3 py-2 text-sm">
            {post.title}
          </p>
        </div>
      </div>

      <div className="rounded-lg border p-4 md:p-6">
        <div className="space-y-2">
          <p className="text-lg font-medium text-text-primary">Content Type</p>
          <p className="text-sm text-text-secondary">This cannot be edited</p>
          <p className="rounded-md border border-border bg-zinc-800 px-3 py-2 text-sm text-text-primary">
            {post.contentType}
          </p>
          {post.contentType === "IMAGE" && (
            <DynamicImage src={post.postContent} alt={post.title} />
          )}
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* -------------------- THUMBNAIL ----------------------- */}
          {post.contentType !== "IMAGE" && <ThumbnailField form={form} />}

          {/* -------------------- POST CONTENT ----------------------- */}
          <PostContentField form={form} post={post} />

          {/* -------------------- DESCRIPTION ----------------------- */}
          {post.contentType !== "TEXT" && <DescriptionField form={form} />}

          {/* -------------------- TAGS ----------------------- */}
          <TagsInput form={form} />

          {/* TODO: Uncomment these once the backend to update them is ready */}
          {/* <ResearchQuestions form={form} />
          <LocationSelect form={form} /> */}

          <div className="mt-6 border-y border-background-surface">
            <p className="py-4 text-neutral-400 max-md:text-sm">
              Note: Some fields on this form are intentionally non-editable to
              prevent misuse or unintended alterations. If you require changes
              to information not available for editing on this form, please
              contact us at{" "}
              <a
                className="text-blue-400 underline"
                href="mailto:dmacd@yorku.ca"
              >
                dmacd@yorku.ca
              </a>{" "}
              with the details of the requested modifications. We appreciate
              your understanding and cooperation in maintaining the accuracy and
              integrity of our data.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Button
              onClick={() => router.back()}
              type="button"
              disabled={isLoading}
              className="morph-md bg-zinc-800 hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} variant="outline">
              Confirm Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditPost;
