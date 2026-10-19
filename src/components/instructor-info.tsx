import { getImageUrl } from '#/api/images';
import type { Instructor } from '#/api/instructors';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage
          src={getImageUrl(
            instructor.collectionId,
            instructor.id,
            instructor.photo,
          )}
        />
        <AvatarFallback>{nameToInitials(instructor.name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium">{instructor.name}</span>
        <span className="text-muted-foreground text-xs">
          {instructor.specialization}
        </span>
      </div>
    </div>
  );
}
