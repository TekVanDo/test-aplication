import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@test-app/ui-kit/ui';
import { useUser } from '../../../hooks/use-user.hook';

export default function DashboardPage() {
  const { user } = useUser();
  return (
    <div className="w-full">
      <div className="flex min-h-[350px] w-full justify-center p-10 items-center">
        <Carousel className="w-full max-w-sm">
          <CarouselContent className="-ml-1">
            {user?.photos?.map((photo, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <img src={photo.url} className="w-full h-full"/>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>
      </div>
    </div>
  );
}
