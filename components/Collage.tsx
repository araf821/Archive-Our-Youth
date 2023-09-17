import Image from "next/image";
import { FC, Fragment } from "react";

interface CollageProps {}

const Collage: FC<CollageProps> = ({}) => {
  return (
    <div className="grid grid-cols-8 grid-rows-2">
      {[...dummyItems, ...dummyItems, ...dummyItems].map((item, index) => (
        <Fragment key={index}>
          <div
            className={`relative ${
              index % 2 === 0 ? "row-span-2" : "aspect-square"
            } cursor-pointer overflow-hidden`}
          >
            <Image
              src={item.imageUrl}
              alt="collage item"
              fill
              className="object-cover transition duration-500 hover:scale-125"
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Collage;

const dummyItems = [
  {
    id: 1,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1694901555616-d7b2b33e6406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 2,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1694949043973-1b51337cb8ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 3,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1694813646545-2e791ec9d0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 4,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1693307418199-4af8f979e50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 5,
    title: "",
    description: "",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1684517010070-1a0ed98714cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 6,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1691394526534-2f0b6c7373da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 7,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1693331117274-0a66a87762e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 8,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1692877317051-5978643f752a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1MHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 9,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1693155119174-4b6e79a27814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 10,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1554777887-da11af2e7072?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5MHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 11,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1693850310514-13f160be0bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5M3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 12,
    title: "",
    description: "",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1676047258590-8a8a2a583050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 13,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1694231005456-5f0df60ae96f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 14,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1694239133245-061d61c299e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8eEh4WVRNSExnT2N8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 15,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1642364575782-b570e8a534b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDUwfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 16,
    title: "",
    description: "",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1693724097398-a8db943f5cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8SnBnNktpZGwtSGt8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 17,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1689576704883-36a4e08656c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 18,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1694081683120-17e1d5b308df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE1fHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 19,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1693146604593-f533da0f55ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 20,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1694901555616-d7b2b33e6406?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 21,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1693804815304-599945b5f611?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDUyfHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 22,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1693507941299-14bb8288b056?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDcyfHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 23,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1689419551614-fecae17eb916?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwMXxxUFlzRHp2Sk9ZY3x8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 24,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1694401460698-8b7b0489b27a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8YWV1NnJMLWo2ZXd8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
  {
    id: 25,
    title: "",
    description: "",
    imageUrl:
      "https://images.unsplash.com/photo-1599917074600-288c3700c33f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfGFldTZyTC1qNmV3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    href: "",
    postedBy: "",
  },
];
