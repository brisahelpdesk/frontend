import { Skeleton } from "./ui/skeleton";

export function SelectSkeleton() {
  return (
    <div className="w-full space-y-2">
      <Skeleton className="h-[14px] w-1/2" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
