import { z } from "zod";

import { allCountries, postTypes, RESEARCH_QUESTIONS } from "@/lib/constants";

const SortByOptions = [
  "latest",
  "oldest",
  "most-popular",
  "least-popular",
] as const;

export const filterFormSchema = z.object({
  keyword: z
    .string()
    .max(100, "Search keyword cannot exceed 100 characters")
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  sortBy: z
    .enum(SortByOptions, {
      errorMap: () => ({ message: "Please select a valid sort option" }),
    })
    .default("latest"),
  tags: z.string().array().max(5, "You can select up to 5 tags").default([]),
  location: z
    .string()
    .refine(
      (val) =>
        !val ||
        val === "any" ||
        allCountries.map((c) => c.toLowerCase()).includes(val.toLowerCase()),
      "Please select a valid country",
    )
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  question: z
    .string()
    .refine(
      (val) =>
        !val ||
        val === "any" ||
        RESEARCH_QUESTIONS.map((q) => q.text).includes(val),
      "Please select a valid research question",
    )
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  postType: z
    .enum(["ANY", ...postTypes.map((t) => t.toUpperCase())] as const, {
      errorMap: () => ({ message: "Please select a valid post type" }),
    })
    .nullable()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
});

export type FilterFormType = z.infer<typeof filterFormSchema>;
