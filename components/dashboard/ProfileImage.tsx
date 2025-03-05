import { ProfileImageProps } from "@/types/dashboard";
import Image from "next/image";

const ProfileImage = ({ imageUrl }: ProfileImageProps) => {
  return (
    <div className="relative aspect-square w-40 shrink-0 overflow-hidden max-[450px]:w-full min-[450px]:h-40 lg:h-full lg:w-full">
      <Image
        src={
          imageUrl ||
          "https://utfs.io/f/611b7606-d2ed-4c74-aaff-7a4d5c66d365-9w6i5v.jpg"
        }
        alt="user profile picture"
        fill
        sizes="(max-width: 1024px) 150px, 300px"
        className="aspect-square w-full rounded-md object-cover"
      />
    </div>
  );
};

export default ProfileImage;
