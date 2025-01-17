import { TPostCreationForm } from "@/lib/types/form";
import { ChangeEvent, FC, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/Label";

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
    <div className="w-full space-y-4 rounded-lg border p-4 md:p-6">
      <div>
        <p className="font-medium text-text-primary">Research Questions</p>
        <p className="text-sm text-text-secondary">
          How does your post explore wellbeing? (Choose all that apply)
        </p>
      </div>
      <div className="w-full">
        {RESEARCH_QUESTIONS.map((question) => (
          <div
            key={question.id}
            className="flex items-center gap-3 rounded-md px-2 transition-colors hover:bg-background-elevated"
          >
            <Checkbox
              id={question.id}
              checked={checkboxStates[question.id]}
              onCheckedChange={(checked) => {
                handleCheckboxChange(
                  {
                    target: { checked: !!checked },
                  } as ChangeEvent<HTMLInputElement>,
                  question,
                );
              }}
            />
            <Label
              htmlFor={question.id}
              className="w-full cursor-pointer py-3 text-sm  text-text-primary"
            >
              {question.text}
              {question.additionalInfo && (
                <span className="block text-xs text-text-secondary">
                  {question.additionalInfo}
                </span>
              )}
            </Label>
          </div>
        ))}

        <div className="flex items-center gap-3 rounded-md px-2 transition-colors hover:bg-background-elevated">
          <Checkbox
            id="none"
            checked={checkboxStates.none}
            onCheckedChange={(checked) => {
              handleSelectNone({
                target: { checked: !!checked },
              } as ChangeEvent<HTMLInputElement>);
            }}
          />
          <Label
            htmlFor="none"
            className="w-full cursor-pointer py-3 text-sm text-text-primary"
          >
            None of the above
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ResearchQuestions;
