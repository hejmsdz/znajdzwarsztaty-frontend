import { getImageUrl } from '#/api/images';
import type { Instructor } from '#/api/instructors';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

function nameToInitials(fullName: string) {
  return fullName
    .split(' ')
    .map((word) => word[0])
    .filter((letter) => letter.toLocaleUpperCase() === letter)
    .slice(0, 2)
    .join('');
}

type InstructorInfoProps = {
  instructor: Instructor;
};

export function InstructorInfo({ instructor }: InstructorInfoProps) {
  return (
    <div className="flex gap-2 items-center" data-testid="instructor-info">
      <Avatar>
        <AvatarImage
          src={getImageUrl(
            instructor.collectionId,
            instructor.id,
            instructor.photo,
            '32x32',
          )}
          srcSet={`${getImageUrl(
            instructor.collectionId,
            instructor.id,
            instructor.photo,
            '64x64',
          )} 2x`}
        />
        <AvatarFallback aria-hidden>
          {nameToInitials(instructor.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium">{instructor.name}</span>
        <span className="text-muted-foreground text-xs line-clamp-1">
          {instructor.specialization}
        </span>
      </div>
    </div>
  );
}

export function InstructorInfoSkeleton() {
  return (
    <div
      className="flex gap-2 items-center"
      data-testid="instructor-info-skeleton"
    >
      <Skeleton className="size-9 shrink-0 rounded-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}
