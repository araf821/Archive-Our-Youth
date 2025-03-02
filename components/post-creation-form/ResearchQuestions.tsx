import { TPostCreationForm } from "@/lib/types/form";
import { ChangeEvent, FC, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/Label";
import { RESEARCH_QUESTIONS, ResearchQuestion } from "@/lib/constants";

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
        <p className="mb-1 font-medium text-text-primary">Research Questions</p>
        <p className="text-sm text-text-secondary">
          How does your post explore wellbeing? <br />
          Wellbeing: Personal. Family. Community. Planetary. Other. (Choose all
          that apply)
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
