import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1" />

        <Skeleton className="h-14 w-28" />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {[1, 2, 3, 4, 5].map((item) => (
          <Card key={item} className="card-wrapper rounded-[10px] p-9 sm:px-11">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />

              <Skeleton className="h-4 w-1/2" />
            </CardHeader>

            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Loading;
