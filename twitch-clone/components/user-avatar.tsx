import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LiveBadge from "./live-badge";
import { Skeleton } from "./ui/skeleton";

interface Props extends VariantProps<typeof avatarSizes> {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  showBadge?: boolean;
}

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
      xl: "h-20 w-20",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export default function UserAvatar({ imageUrl, username, isLive, showBadge }: Props) {
  const canShowBadge = showBadge && isLive;

  return (
    <div className="relative">
      <Avatar className={cn(isLive && "ring-2 ring-rose-500 border border-background")}>
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};
