import { PostCreationForm } from "@/lib/types/form";
import { RefreshCcw, X } from "lucide-react";
import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import MultiSelect from "../MultiSelect";
import { cn } from "@/lib/utils";

interface TagSelectionSlideProps {
  form: PostCreationForm;
}

const TagSelectionSlide: FC<TagSelectionSlideProps> = ({ form }) => {
  const tags = form.watch("tags");

  return (
    <FormField
      control={form.control}
      name="tags"
      render={() => (
        <FormItem className="mx-auto grid max-w-screen-sm place-items-center gap-8 md:gap-12">
          <p className="text-center text-xl md:text-2xl">
            Pick the tags that best represent your content
          </p>
          <div className="space-y-4 w-full">
            <FormControl>
              <MultiSelect
                maxSelection={8}
                onChange={(values: string[]) => {
                  form.setValue("tags", values);
                }}
                options={allTags}
                selectedOptions={tags}
              />
            </FormControl>
            {tags.length < 1 && <FormMessage />}
            <ul className="flex flex-wrap gap-4 text-white">
              {form.getValues().tags.map((tag, index) => (
                <li
                  key={tag}
                  className={cn(
                    "text-bold flex items-center justify-between gap-1 rounded-md px-2.5 py-1 text-zinc-900",
                    {
                      "border-2 border-rose-500 text-rose-500": index === 0,
                      "border-2 border-lime-500 text-lime-500": index === 1,
                      "border-2 border-sky-500 text-sky-500": index === 2,
                      "border-2 border-amber-500 text-amber-500": index === 3,
                      "border-2 border-fuchsia-500 text-fuchsia-500":
                        index === 4,
                      "border-2 border-teal-400 text-teal-400": index === 5,
                      "border-2 border-red-400 text-red-400": index === 6,
                      "border-2 border-indigo-400 text-indigo-400": index === 7,
                    },
                  )}
                >
                  {tag}
                  <button
                    onClick={() =>
                      form.setValue(
                        "tags",
                        tags.filter((t) => t !== tag),
                      )
                    }
                    type="button"
                    className=""
                  >
                    <X size={15} />
                  </button>
                </li>
              ))}
              {!!tags.length && (
                <button
                  type="button"
                  onClick={() => form.setValue("tags", [])}
                  className="flex w-fit items-center gap-2 rounded-sm px-3 py-2 text-white transition hover:bg-zinc-800 max-md:text-sm md:text-base"
                >
                  Reset
                  <RefreshCcw size={16} />
                </button>
              )}
            </ul>
          </div>
        </FormItem>
      )}
    />
  );
};

export default TagSelectionSlide;

export const allTags = [
  "Planet",
  "Land",
  "Forest",
  "Ecosystem",
  "Biomimicry",
  "Human",
  "Community",
  "Wellbeing",
  "Mental Health",
  "Planetary Health",
  "Climate Change",
  "Age",
  "Aging",
  "Emotional Health",
  "Gen Z",
  "Millennials",
  "Gen Y",
  "Gen Alpha",
  "Spirit",
  "Spiritual Health",
  "Interconnectedness",
  "Generation",
  "Change",
  "Pollution",
  "Place",
  "Space",
  "Friends",
  "Time",
  "Family",
  "Toronto",
  "6ix",
  "Canada",
  "Digital",
  "Online",
  "Misinformation",
  "Disinformation",
  "Privacy",
  "Archive",
  "SDGs",
  "Sustainable",
  "School",
  "Dream",
  "Future",
  "Changing",
  "Everyday life",
  "Love",
  "Hate",
  "Live",
  "Moment",
  "Laugh",
  "YOLO",
  "Slay",
  "FOMO",
  "Fear",
  "Headspace",
  "Peace",
  "Yo",
  "Futurist",
  "Utopia",
  "Dystopia",
  "Systems",
  "Systemic Change",
  "Dance",
  "Experimentation",
  "Improvisation",
  "Reconnect",
  "Hello",
  "Me",
  "Hola",
  "Spanish",
  "French",
  "English",
  "Español",
  "Francais",
  "Wa Gwan",
  "Rastafarian",
  "Jah",
  "Quebecois",
  "News",
  "War",
  "Education",
  "Information",
  "Natural Disaster",
  "Children",
  "Renovation",
  "Evolve",
  "Thriving",
  "Flourishing",
  "Remembering",
  "Growth",
  "Green Space",
  "Water",
  "Air",
  "Indigenous",
  "Sovereignty",
  "Mississauga",
  "Mississauga of the Credit",
  "Anishinaabe",
  "Haudenosaunee",
  "Huron-Wendat",
  "Metis",
  "Inuit",
  "First Nations",
  "Immigrants",
  "Refugee",
  "First Generation",
  "Second Generation",
  "High School",
  "Secondary School",
  "University",
  "Diaspora",
  "Trades",
  "Elementary School",
  "College",
  "Employed",
  "Unemployed",
  "Inspiration",
  "Motivation",
  "Equity",
  "Diversity",
  "Inclusion",
  "Colonization",
  "Capitalism",
  "Patriarchy",
  "Matriarchy",
  "Thrift",
  "Eco-friendly",
  "NPC",
  "Safe",
  "Brave",
  "Justice",
  "Intergenerational",
  "Trauma",
  "Advocacy",
  "Television",
  "Phones",
  "TikTok",
  "Instagram",
  "Sugar",
  "Resource",
  "Need",
  "Want",
  "Desire",
  "Dream Future",
  "Happy",
  "Health",
  "Lifestyle",
  "Climate",
  "Environment",
  "Outdoor",
  "Outside",
  "Sunset",
  "Sunrise",
  "Sky",
];
