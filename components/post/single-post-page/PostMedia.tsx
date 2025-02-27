import { FC } from "react";
import DynamicImage from "../../DynamicImage";
import PDFViewer from "../../PDFViewer";
import Link from "next/link";
import { isYouTubeUrl, getYouTubeVideoId } from "@/lib/utils";
import { AudioPlayer } from "../../ui/AudioPlayer";

interface PostMediaProps {
  contentType: string;
  postContent: string;
}

const PostMedia: FC<PostMediaProps> = ({ contentType, postContent }) => {
  if (contentType === "IMAGE") {
    return <DynamicImage src={postContent} />;
  }

  if (contentType === "VIDEO") {
    return (
      <div className="relative aspect-video w-full overflow-hidden border border-border-dark">
        {isYouTubeUrl(postContent) ? (
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(
              postContent,
            )}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video src={postContent} className="h-full w-full" controls />
        )}
      </div>
    );
  }

  if (contentType === "AUDIO") {
    return <AudioPlayer src={postContent} />;
  }

  if (contentType === "PDF") {
    return (
      <div className="space-y-2">
        <Link
          href={postContent}
          target="_blank"
          className="group relative w-fit text-zinc-400 transition hover:text-zinc-100"
        >
          View Externally
          <span className="absolute bottom-0 left-0 h-[1px] w-full origin-bottom-left scale-x-0 bg-zinc-400 transition group-hover:scale-x-100 group-hover:bg-zinc-100" />
        </Link>
        <PDFViewer url={postContent} />
      </div>
    );
  }

  return null;
};

export default PostMedia;
