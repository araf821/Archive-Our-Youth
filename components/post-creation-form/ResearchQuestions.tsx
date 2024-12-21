import { TPostCreationForm } from "@/lib/types/form";
import { ChangeEvent, FC, useState } from "react";

interface ResearchQuestion {
  id: string;
  text: string;
  additionalInfo?: string;
}

const RESEARCH_QUESTIONS: ResearchQuestion[] = [
  {
    id: "q1",
    text: "Challenges or barriers",
  },
  {
    id: "q2",
    text: "What wellbeing means to you",
  },
  {
    id: "q3",
    text: "Advice to my older or younger self",
  },
  {
    id: "q4",
    text: "Practices, habits, and routines",
  },
  {
    id: "q5",
    text: "The impact of digital technology",
  },
  {
    id: "q6",
    text: "The future (fears, hopes, or dreams)",
  },
  {
    id: "q7",
    text: "Resources or groups that support wellbeing",
  },
];

interface ResearchQuestionsProps {
  form: TPostCreationForm;
}

const ResearchQuestions: FC<ResearchQuestionsProps> = ({ form }) => {
  const selected = form.watch("researchQuestions");

  // Dynamic checkbox states initialization
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>(
    {
      ...RESEARCH_QUESTIONS.reduce(
        (acc, q) => ({
          ...acc,
          [q.id]: selected.includes(q.text),
        }),
        {},
      ),
      none: selected.length === 0,
    },
  );

  // Reset all checkboxes
  const handleSelectNone = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckboxStates(
        RESEARCH_QUESTIONS.reduce(
          (acc, q) => ({
            ...acc,
            [q.id]: false,
          }),
          { none: true },
        ),
      );
      form.setValue("researchQuestions", []);
    } else {
      setCheckboxStates((prev) => ({ ...prev, none: false }));
    }
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    question: ResearchQuestion,
  ) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [question.id]: e.target.checked,
      none: false,
    }));

    if (e.target.checked) {
      form.setValue("researchQuestions", [...selected, question.text]);
    } else {
      form.setValue(
        "researchQuestions",
        selected.filter((q) => q !== question.text),
      );
    }
  };

  return (
    <div className="grid max-w-screen-md place-items-center gap-8 md:gap-12">
      <div className="text-center max-sm:max-w-[340px]">
        <p className="balance text-xl md:text-2xl">
          How does your post explore wellbeing?
        </p>
        <p className="balance text-zinc-500 max-md:text-sm">
          Wellbeing: Personal. Family. Community. Planetary. Other.{" "}
          <span className="font-semibold">(Choose all that apply)</span>
        </p>
      </div>
      <div className="w-full space-y-2">
        {RESEARCH_QUESTIONS.map((question) => (
          <label
            key={question.id}
            htmlFor={question.id}
            className="group relative flex items-center gap-2 rounded-sm bg-zinc-800 px-3 py-1.5 pl-10 md:text-lg"
          >
            <input
              type="checkbox"
              id={question.id}
              checked={checkboxStates[question.id]}
              onChange={(e) => handleCheckboxChange(e, question)}
              className="size-5 absolute left-2 top-2.5 appearance-none rounded-md border-2 border-zinc-600 bg-zinc-900 fill-pink-400 transition checked:border-zinc-900 checked:bg-green-500 group-hover:bg-zinc-700 group-hover:checked:bg-green-600"
            />
            <div>
              {question.text}
              {question.additionalInfo && (
                <span className="block text-sm text-zinc-400">
                  {question.additionalInfo}
                </span>
              )}
            </div>
          </label>
        ))}

        <label
          htmlFor="none"
          className="group relative flex items-center gap-2 rounded-sm bg-zinc-800 px-3 py-1.5 pl-10 md:text-lg"
        >
          <input
            type="checkbox"
            id="none"
            checked={checkboxStates.none}
            onChange={handleSelectNone}
            className="size-5 absolute left-2 top-2.5 appearance-none rounded-md border-2 border-zinc-600 bg-zinc-900 fill-pink-400 transition checked:border-zinc-900 checked:bg-green-500 group-hover:bg-zinc-700 group-hover:checked:bg-green-600"
          />
          None of the above
        </label>
      </div>
    </div>
  );
};

export default ResearchQuestions;
