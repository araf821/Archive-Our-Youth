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
import { RefreshCcw } from "lucide-react";
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
    transition: { duration: 0.2 },
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
      className={cn("border-b border-background-surface px-6 text-zinc-100", {
        "pointer-events-none": !isOpen,
      })}
    >
      <div className="mx-auto flex flex-row-reverse gap-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 pb-10 pt-8">
          <div className="space-y-4">
            <p className="text-2xl font-medium md:text-3xl">Search & Filter</p>
            <hr className="border-background-surface" />
          </div>

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
                      <FormLabel>Search by Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Title"
                          className="morph-sm border border-background-surface bg-zinc-800 px-4 py-3 outline-none focus-visible:outline-background-surface"
                        />
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
                      <FormLabel>Sort By</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="morph-sm border border-background-surface bg-zinc-800 py-5 text-zinc-100 outline-none">
                            <SelectValue placeholder="Sort by..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-sm border-background-surface bg-zinc-800 text-zinc-100">
                          <SelectItem
                            className={cn("py-3 hover:bg-background-surface", {
                              "bg-background-muted":
                                form.getValues().sortBy === "latest",
                            })}
                            value="latest"
                          >
                            Latest Posts
                          </SelectItem>
                          <SelectItem
                            className={cn("py-2 hover:bg-background-surface", {
                              "bg-background-muted":
                                form.getValues().sortBy === "oldest",
                            })}
                            value="oldest"
                          >
                            Oldest Posts
                          </SelectItem>
                          <SelectItem
                            className={cn("py-2 hover:bg-background-surface", {
                              "bg-background-muted":
                                form.getValues().sortBy === "most-popular",
                            })}
                            value="most-popular"
                          >
                            Most Popular
                          </SelectItem>
                          <SelectItem
                            className={cn("py-2 hover:bg-background-surface", {
                              "bg-background-muted":
                                form.getValues().sortBy === "least-popular",
                            })}
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
                      <p className="mb-2 text-sm font-medium">Tags</p>
                      <FormControl className="pt-2">
                        <MultiSelect
                          onChange={field.onChange}
                          maxSelection={5}
                          options={allTags}
                          selectedOptions={tags}
                        />
                      </FormControl>
                      <FormMessage />
                      {!!tags.length && (
                        <ul className="mt-4 flex flex-wrap items-center gap-4">
                          {tags.map((tag, index) => (
                            <Tag
                              key={tag}
                              tag={tag}
                              index={index}
                              onDelete={onDeleteTag}
                            />
                          ))}
                          <button
                            onClick={() => form.setValue("tags", [])}
                            className="morph-sm rounded-md border border-background-surface bg-zinc-800 px-4 py-2 text-zinc-300 transition duration-200 hover:bg-background-surface hover:text-zinc-100"
                          >
                            Clear
                          </button>
                        </ul>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  name="location"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[30%]">
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="morph-sm border border-background-surface bg-zinc-800 py-5 text-zinc-100 outline-none">
                            <SelectValue
                              className="placeholder-zinc-400"
                              placeholder="Select a country"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[400px] overflow-y-auto rounded-sm border-background-surface bg-zinc-800 text-zinc-100">
                          <SelectItem
                            className={cn(
                              "py-3 hover:bg-background-surface focus:bg-background-surface",
                              {
                                "bg-background-muted focus:bg-background-muted":
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
                                "py-3 hover:bg-background-surface focus:bg-background-surface",
                                {
                                  "bg-background-muted focus:bg-background-muted":
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
                      <FormLabel>Research Question</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="morph-sm h-fit border border-background-surface bg-zinc-800 text-zinc-100 outline-none">
                            <SelectValue
                              className="placeholder-zinc-400"
                              placeholder="Search by a question"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[400px] max-w-[510px] rounded-sm border-background-surface bg-zinc-800 text-zinc-100">
                          <SelectItem
                            className={cn(
                              "py-3 hover:bg-background-surface focus:bg-background-surface",
                              {
                                "bg-background-muted focus:bg-background-muted":
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
                                "py-3 hover:bg-background-surface focus:bg-background-surface",
                                {
                                  "bg-background-muted focus:bg-background-muted":
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
                      <FormLabel>Post Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="morph-sm border border-background-surface bg-zinc-800 py-5 text-zinc-100 outline-none">
                            <SelectValue
                              className="placeholder-zinc-400"
                              placeholder="Select a media"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[400px] rounded-sm border-background-surface bg-zinc-800 text-zinc-100">
                          <SelectItem
                            className={cn(
                              "py-3 hover:bg-background-surface focus:bg-background-surface",
                              {
                                "bg-background-muted focus:bg-background-muted":
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
                                "py-3 hover:bg-background-surface focus:bg-background-surface",
                                {
                                  "bg-background-muted focus:bg-background-muted":
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

              <hr className="my-4 border-background-surface" />

              <div className="flex items-center gap-4">
                <Button
                  onClick={() => {
                    form.reset();
                    onClose();
                  }}
                  type="button"
                  className="morph-sm w-fit border border-background-surface bg-zinc-800 hover:bg-zinc-800"
                >
                  Reset
                  <RefreshCcw className="ml-2 size-4" />
                </Button>
                <Button className="morph-md w-fit bg-primary tracking-wider text-black hover:bg-primary-dark">
                  Search
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
