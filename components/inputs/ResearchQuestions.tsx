import { ChangeEvent, FC, FormEvent, useState } from "react";
import { FormControl, FormField } from "../ui/Form";
import { UseFormReturn } from "react-hook-form";

interface ResearchQuestionsProps {
  form: UseFormReturn<
    {
      title: string;
      contentType: "TEXT" | "IMAGE" | "VIDEO" | "AUDIO";
      content: string;
      tags: string[];
      researchQuestions: string[];
      description?: string | undefined;
    },
    any,
    undefined
  >;
}

const ResearchQuestions: FC<ResearchQuestionsProps> = ({ form }) => {
  const selected = form.watch("researchQuestions");
  const [checkboxStates, setCheckboxStates] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
  });
  console.log(selected);

  const handleSelectNone = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckboxStates({
        q1: false,
        q2: false,
        q3: false,
        q4: false,
        q5: true,
      });
      form.setValue("researchQuestions", []);
    } else {
      setCheckboxStates((prev) => ({ ...prev, q5: false }));
    }
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [id]: e.target.checked,
      q5: false,
    }));

    switch (id) {
      case "q1":
        if (e.target.checked) {
          form.setValue("researchQuestions", [
            ...selected,
            "What is the future that you dream of?",
          ]);
        } else {
          form.setValue(
            "researchQuestions",
            selected.filter(
              (q) => q !== "What is the future that you dream of?",
            ),
          );
        }
        break;

      case "q2":
        if (e.target.checked) {
          form.setValue("researchQuestions", [
            ...selected,
            "What does well-being mean to you right now?",
          ]);
        } else {
          form.setValue(
            "researchQuestions",
            selected.filter(
              (q) => q !== "What does well-being mean to you right now?",
            ),
          );
        }
        break;

      case "q3":
        if (e.target.checked) {
          form.setValue("researchQuestions", [
            ...selected,
            "What would you tell your younger or older self?",
          ]);
        } else {
          form.setValue(
            "researchQuestions",
            selected.filter(
              (q) => q !== "What would you tell your younger or older self?",
            ),
          );
        }
        break;

      case "q4":
        if (e.target.checked) {
          form.setValue("researchQuestions", [
            ...selected,
            "What groups, initiatives, projects, and resources support your wellbeing and the wellbeing of the planet? What more would be helpful and of value to you right now? You can share links to websites and socials, videos, photos, etc.",
          ]);
        } else {
          form.setValue(
            "researchQuestions",
            selected.filter(
              (q) =>
                q !==
                "What groups, initiatives, projects, and resources support your wellbeing and the wellbeing of the planet? What more would be helpful and of value to you right now? You can share links to websites and socials, videos, photos, etc.",
            ),
          );
        }
        break;

      default:
    }
  };

  const onSelect = (question: string) => {
    form.setValue("researchQuestions", [
      ...form.getValues("researchQuestions"),
      question,
    ]);
    console.log(form.getValues("researchQuestions"));
  };

  const onDeselect = (question: string) => {
    form.setValue(
      "researchQuestions",
      form.getValues("researchQuestions").filter((q) => q !== question),
    );
  };

  return (
    <div className="flex max-w-screen-md flex-col gap-2">
      <p className="text-xl text-zinc-300 md:text-2xl">
        What question does your submission answer?{" "}
        <span className="text-zinc-400">(Optional)</span>
      </p>
      <p className="text-zinc-400 max-md:text-sm">
        This question is for research purposes only.
      </p>
      <hr className="border-zinc-700" />
      <div className="space-y-2">
        <label
          htmlFor="q1"
          className="group relative flex items-center gap-2 rounded-sm bg-zinc-800 px-3 py-1.5 pl-10 md:text-lg"
        >
          <input
            type="checkbox"
            id="q1"
            checked={checkboxStates.q1}
            onChange={(e) => handleCheckboxChange(e, "q1")}
            className="absolute left-2 top-2.5 h-5 w-5 appearance-none rounded-md border-2 border-zinc-600 bg-zinc-900 fill-pink-400 transition checked:border-zinc-900 checked:bg-red-500 group-hover:bg-zinc-700 group-hover:checked:bg-red-600"
          />
          What&rsquo;s the future that you dream of?
        </label>

        <label
          htmlFor="q2"
          className="group relative flex items-center gap-2 rounded-sm bg-zinc-800 px-3 py-1.5 pl-10 md:text-lg"
        >
          <input
            type="checkbox"
            id="q2"
            checked={checkboxStates.q2}
            onChange={(e) => handleCheckboxChange(e, "q2")}
            className="absolute left-2 top-2.5 h-5 w-5 appearance-none rounded-md border-2 border-zinc-600 bg-zinc-900 fill-pink-400 transition checked:border-zinc-900 checked:bg-red-500 group-hover:bg-zinc-700 group-hover:checked:bg-red-600"
          />
          What does well-being mean to you right now?
        </label>

        <label
          htmlFor="q3"
          className="group relative flex items-center gap-2 rounded-sm bg-zinc-800 px-3 py-1.5 pl-10 md:text-lg"
        >
          <input
            type="checkbox"
            id="q3"
            checked={checkboxStates.q3}
            onChange={(e) => handleCheckboxChange(e, "q3")}
            className="absolute left-2 top-2.5 h-5 w-5 appearance-none rounded-md border-2 border-zinc-600 bg-zinc-900 fill-pink-400 transition checked:border-zinc-900 checked:bg-red-500 group-hover:bg-zinc-700 group-hover:checked:bg-red-600"
          />
          What would you tell your younger or older self?
        </label>

        <label
          htmlFor="q4"
          className="group relative flex items-center gap-2 rounded-sm bg-zinc-800 px-3 py-1.5 pl-10 md:text-lg"
        >
          <input
            type="checkbox"
            id="q4"
            checked={checkboxStates.q4}
            onChange={(e) => handleCheckboxChange(e, "q4")}
            className="absolute left-2 top-2.5 h-5 w-5 appearance-none rounded-md border-2 border-zinc-600 bg-zinc-900 fill-pink-400 transition checked:border-zinc-900 checked:bg-red-500 group-hover:bg-zinc-700 group-hover:checked:bg-red-600"
          />
          What groups, initiatives, projects, and resources support your
          wellbeing and the wellbeing of the planet? What more would be helpful
          and of value to you right now? You can share links to websites and
          socials, videos, photos, etc.
        </label>

        <label
          htmlFor="q5"
          className="group relative flex items-center gap-2 rounded-sm bg-zinc-800 px-3 py-1.5 pl-10 md:text-lg"
        >
          <input
            type="checkbox"
            id="q5"
            checked={checkboxStates.q5}
            onChange={(e) => handleSelectNone(e)}
            className="absolute left-2 top-2.5 h-5 w-5 appearance-none rounded-md border-2 border-zinc-600 bg-zinc-900 fill-pink-400 transition checked:border-zinc-900 checked:bg-red-500 group-hover:bg-zinc-700 group-hover:checked:bg-red-600"
          />
          None of the above
        </label>
      </div>
    </div>
  );
};

export default ResearchQuestions;