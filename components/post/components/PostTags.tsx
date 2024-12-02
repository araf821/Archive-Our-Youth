import { FC } from "react";
import Tag from "../../Tag";

interface PostTagsProps {
  tags: string[];
}

const PostTags: FC<PostTagsProps> = ({ tags }) => {
  return (
    <ul className="-mb-4 flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Tag tag={tag} key={tag} index={index} />
      ))}
    </ul>
  );
};

export default PostTags;
