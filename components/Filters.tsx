"use client";

import { useFilters } from "@/hooks/useFilters";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import qs from "query-string";
import { Form } from "./ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  filterFormSchema,
  type FilterFormType,
} from "@/lib/validators/filters";
import FilterHeader from "./Filters/FilterHeader";
import SearchAndSort from "./Filters/SearchAndSort";
import TagsAndCountry from "./Filters/TagsAndCountry";
import ResearchAndPostType from "./Filters/ResearchAndPostType";
import FilterFooter from "./Filters/FilterFooter";

interface FiltersProps {}

const filterVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const Filters: FC<FiltersProps> = () => {
  const { onClose, isOpen } = useFilters();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<FilterFormType>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      keyword: searchParams.get("keyword") || "",
      tags: [],
      sortBy: "latest",
      location: "",
      postType: null,
      question: "",
    },
  });

  const tags = form.watch("tags");
  const country = form.watch("location") || "";

  const handleSearch = (values: FilterFormType) => {
    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      keyword: values.keyword || null,
      sortBy: values.sortBy || null,
      tags: values.tags.length ? values.tags.join(",") : null,
      country: values.location === "any" ? null : values.location || null,
      postType: values.postType === "ANY" ? null : values.postType || null,
      question: values.question === "any" ? null : values.question || null,
    };

    const url = qs.stringifyUrl(
      {
        url: "/home",
        query: updatedQuery,
      },
      { skipNull: true },
    );

    router.push(url);
    onClose();
  };

  const onDeleteTag = (tag: string) => {
    form.setValue(
      "tags",
      tags.filter((t) => t !== tag),
    );
  };

  const handleReset = () => {
    form.reset();
    onClose();
  };

  return (
    <motion.section
      initial={{ height: 0, opacity: 0 }}
      variants={filterVariants}
      animate={isOpen ? "visible" : "hidden"}
      className={cn(
        "border-b border-background-surface bg-zinc-900/80 px-6 text-zinc-100 backdrop-blur-sm",
        {
          "pointer-events-none": !isOpen,
        },
      )}
    >
      <div className="mx-auto flex flex-row-reverse gap-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 pb-10 pt-8">
          <FilterHeader onClose={onClose} />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSearch)}
              className="flex flex-col gap-8"
            >
              <SearchAndSort
                control={form.control}
                getValues={form.getValues}
              />
              <TagsAndCountry
                control={form.control}
                tags={tags}
                country={country}
                onDeleteTag={onDeleteTag}
                setValue={form.setValue}
              />
              <ResearchAndPostType
                control={form.control}
                getValues={form.getValues}
              />
              <FilterFooter onReset={handleReset} />
            </form>
          </Form>
        </div>
      </div>
    </motion.section>
  );
};

export default Filters;
