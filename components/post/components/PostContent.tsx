import { FC } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { cn } from "@/lib/utils";
import { openSans } from "@/app/fonts";

interface PostContentProps {
  contentType: string;
  postContent: string;
  description?: string | null;
  researchQuestions: string[];
}

const PostContent: FC<PostContentProps> = ({
  contentType,
  postContent,
  description,
  researchQuestions,
}) => {
  const content = contentType === "TEXT" ? postContent : description;

  return (
    <>
      {researchQuestions.length > 0 && (
        <div>
          <p className="mb-4 font-medium tracking-wide text-zinc-400 max-md:text-sm">
            This post addresses the following questions:
          </p>
          <ul>
            {researchQuestions.map((q) => (
              <li className="ml-6 list-disc text-white md:text-lg" key={q}>
                {q}
              </li>
            ))}
          </ul>
          <hr className="mt-4 border-zinc-800" />
        </div>
      )}

      <div className={cn(contentType !== "TEXT" && !description && "hidden")}>
        {content && (
          <ReactMarkdown
            className={cn(
              "prose-sm h-full max-w-full overflow-y-auto break-words rounded-md text-start tracking-wide text-zinc-50 md:prose-base xl:prose-lg prose-headings:font-semibold prose-headings:text-zinc-50 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-ol:list-decimal prose-ul:list-disc prose-img:rounded-md",
              openSans.className,
            )}
          >
            {content}
          </ReactMarkdown>
        )}
        <hr className="mb-2 mt-4 border-zinc-800" />
      </div>
    </>
  );
};

export default PostContent;
