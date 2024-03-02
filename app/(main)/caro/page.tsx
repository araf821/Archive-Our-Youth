import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselPageProps {}

const CarouselPage = ({}: CarouselPageProps) => {
  return (
    <Carousel
      orientation="vertical"
      className="mx-auto mt-16 max-h-[600px] max-w-screen-md bg-pink-600"
    >
      <CarouselContent>
        <CarouselItem className="aspect-square w-full max-w-screen-md">
          Hello everyone
        </CarouselItem>
        <CarouselItem className="aspect-square w-full max-w-screen-md">
          Hello everyone
        </CarouselItem>
        <CarouselItem className="aspect-square w-full max-w-screen-md">
          Hello everyone
        </CarouselItem>
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
};

export default CarouselPage;
