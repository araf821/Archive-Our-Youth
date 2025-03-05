import { useFilters } from "@/hooks/useFilters";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import qs from "query-string";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Filter, RefreshCcw, Search, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import MultiSelect from "./MultiSelect";
import Tag from "./Tag";
import { allTags } from "./post-creation-form/TagSelectionSlide";
import { allCountries, postTypes, RESEARCH_QUESTIONS } from "@/lib/constants";
import {
  filterFormSchema,
  type FilterFormType,
} from "@/lib/validators/filters";

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

const Filters: FC<FiltersProps> = ({}) => {
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
  const country = form.watch("location");

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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="h-6 w-6 text-primary" />
              <h2 className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-2xl font-medium text-transparent md:text-3xl">
                Search & Filter
              </h2>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-zinc-800/50"
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </Button>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSearch)}
              className="flex flex-col gap-8"
            >
              <div className="flex gap-6 max-md:flex-col md:gap-8">
                <FormField
                  name="keyword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[70%]">
                      <FormLabel className="text-zinc-300">
                        Search by Title
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter title keywords..."
                            className="morph-sm border border-zinc-700/50 bg-zinc-800/80 py-6 pl-10 pr-4 outline-none transition-all duration-200 focus-visible:ring-1 focus-visible:ring-primary/50"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="sortBy"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[30%]">
                      <FormLabel className="text-zinc-300">Sort By</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="morph-sm border border-zinc-700/50 bg-zinc-800/80 py-6 text-zinc-100 outline-none transition-all duration-200 focus:ring-1 focus:ring-primary/50">
                            <SelectValue placeholder="Sort by..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-md border-zinc-700 bg-zinc-800/95 text-zinc-100 backdrop-blur-md">
                          <SelectItem
                            className={cn(
                              "py-3 transition-colors hover:bg-zinc-700/50",
                              {
                                "bg-zinc-700/70 text-primary":
                                  form.getValues().sortBy === "latest",
                              },
                            )}
                            value="latest"
                          >
                            Latest Posts
                          </SelectItem>
                          <SelectItem
                            className={cn(
                              "py-3 transition-colors hover:bg-zinc-700/50",
                              {
                                "bg-zinc-700/70 text-primary":
                                  form.getValues().sortBy === "oldest",
                              },
                            )}
                            value="oldest"
                          >
                            Oldest Posts
                          </SelectItem>
                          <SelectItem
                            className={cn(
                              "py-3 transition-colors hover:bg-zinc-700/50",
                              {
                                "bg-zinc-700/70 text-primary":
                                  form.getValues().sortBy === "most-popular",
                              },
                            )}
                            value="most-popular"
                          >
                            Most Popular
                          </SelectItem>
                          <SelectItem
                            className={cn(
                              "py-3 transition-colors hover:bg-zinc-700/50",
                              {
                                "bg-zinc-700/70 text-primary":
                                  form.getValues().sortBy === "least-popular",
                              },
                            )}
                            value="least-popular"
                          >
                            Least Popular
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-6 max-md:flex-col md:gap-8">
                <FormField
                  name="tags"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="z-40 w-full space-y-0 md:w-[70%]">
                      <FormLabel className="text-zinc-300">Tags</FormLabel>
                      <FormControl className="pt-2">
                        <div className="relative">
                          <MultiSelect
                            onChange={field.onChange}
                            maxSelection={5}
                            options={allTags}
                            selectedOptions={tags}
                            className="border border-zinc-700/50 bg-zinc-800/80 py-6 text-zinc-100 outline-none transition-all duration-200 focus:ring-1 focus:ring-primary/50"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      {!!tags.length && (
                        <div className="mt-4 rounded-md border border-zinc-700/50 bg-zinc-800/50 p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <p className="text-sm text-zinc-400">
                              Selected Tags ({tags.length}/5)
                            </p>
                            <button
                              onClick={() => form.setValue("tags", [])}
                              className="text-xs text-zinc-400 transition-colors hover:text-primary"
                            >
                              Clear All
                            </button>
                          </div>
                          <ul className="flex flex-wrap items-center gap-2">
                            {tags.map((tag, index) => (
                              <Tag
                                key={tag}
                                tag={tag}
                                index={index}
                                onDelete={onDeleteTag}
                              />
                            ))}
                          </ul>
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  name="location"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[30%]">
                      <FormLabel className="text-zinc-300">Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="morph-sm border border-zinc-700/50 bg-zinc-800/80 py-6 text-zinc-100 outline-none transition-all duration-200 focus:ring-1 focus:ring-primary/50">
                            <SelectValue
                              className="placeholder-zinc-400"
                              placeholder="Select a country"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[400px] overflow-y-auto rounded-md border-zinc-700 bg-zinc-800/95 text-zinc-100 backdrop-blur-md">
                          <SelectItem
                            className={cn(
                              "py-3 transition-colors hover:bg-zinc-700/50",
                              {
                                "bg-zinc-700/70 text-primary":
                                  country === "any",
                              },
                            )}
                            value="any"
                          >
                            Any
                          </SelectItem>
                          {allCountries.map((c) => (
                            <SelectItem
                              className={cn(
                                "py-3 transition-colors hover:bg-zinc-700/50",
                                {
                                  "bg-zinc-700/70 text-primary":
                                    country === c.toLowerCase(),
                                },
                              )}
                              key={c}
                              value={c.toLowerCase()}
                            >
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-6 max-md:flex-col md:gap-8">
                <FormField
                  name="question"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[70%]">
                      <FormLabel className="text-zinc-300">
                        Research Question
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="morph-sm h-fit border border-zinc-700/50 bg-zinc-800/80 py-3.5 text-zinc-100 outline-none transition-all duration-200 focus:ring-1 focus:ring-primary/50">
                            <SelectValue
                              className="placeholder-zinc-400"
                              placeholder="Search by a question"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[400px] max-w-[510px] rounded-md border-zinc-700 bg-zinc-800/95 text-zinc-100 backdrop-blur-md">
                          <SelectItem
                            className={cn(
                              "py-3 transition-colors hover:bg-zinc-700/50",
                              {
                                "bg-zinc-700/70 text-primary":
                                  form.getValues().question === "any",
                              },
                            )}
                            value={"any"}
                          >
                            Any
                          </SelectItem>
                          {RESEARCH_QUESTIONS.map(({ id, text }) => (
                            <SelectItem
                              className={cn(
                                "py-3 transition-colors hover:bg-zinc-700/50",
                                {
                                  "bg-zinc-700/70 text-primary":
                                    form.getValues().question === text,
                                },
                              )}
                              key={id}
                              value={text}
                            >
                              {text}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="postType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[30%]">
                      <FormLabel className="text-zinc-300">Post Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="morph-sm border border-zinc-700/50 bg-zinc-800/80 py-6 text-zinc-100 outline-none transition-all duration-200 focus:ring-1 focus:ring-primary/50">
                            <SelectValue
                              className="placeholder-zinc-400"
                              placeholder="Select a media"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[400px] rounded-md border-zinc-700 bg-zinc-800/95 text-zinc-100 backdrop-blur-md">
                          <SelectItem
                            className={cn(
                              "py-3 transition-colors hover:bg-zinc-700/50",
                              {
                                "bg-zinc-700/70 text-primary":
                                  form.getValues().postType === "ANY",
                              },
                            )}
                            value={"ANY"}
                          >
                            Any
                          </SelectItem>
                          {postTypes.map((type) => (
                            <SelectItem
                              className={cn(
                                "py-3 transition-colors hover:bg-zinc-700/50",
                                {
                                  "bg-zinc-700/70 text-primary":
                                    form.getValues().postType ===
                                    type.toUpperCase(),
                                },
                              )}
                              key={type}
                              value={type.toUpperCase()}
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>

              <div className="flex items-center gap-6 pt-2">
                <Button
                  onClick={() => {
                    form.reset();
                    onClose();
                  }}
                  type="button"
                  variant="outline"
                  className="group relative overflow-hidden rounded-full border-zinc-700/50 bg-zinc-800/50 px-6 py-6 text-zinc-300 backdrop-blur-sm hover:border-zinc-600 hover:text-zinc-100"
                >
                  <span className="absolute inset-0 -translate-y-full bg-gradient-to-b from-zinc-700/0 to-zinc-700/20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"></span>
                  <span className="relative z-10 flex items-center">
                    Reset
                    <RefreshCcw className="ml-2 size-4 transition-transform duration-300 group-hover:rotate-180" />
                  </span>
                </Button>
                <Button className="group relative overflow-hidden rounded-full bg-primary px-8 py-6 text-black shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
                  <span className="absolute inset-0 -translate-y-full bg-gradient-to-b from-black/0 to-black/10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"></span>
                  <span className="relative z-10 flex items-center font-medium tracking-wider">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </motion.section>
  );
};

export default Filters;
