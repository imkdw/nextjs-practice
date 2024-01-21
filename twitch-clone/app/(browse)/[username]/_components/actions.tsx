"use client";

import { useTransition } from "react";
import { onFollow, onUnFollow } from "../../../../actions/follow";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";

interface Props {
  isFollowing: boolean;
  userId: string;
}

export default function Actions({ isFollowing, userId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(async () => {
      try {
        const follow = await onFollow(userId);
        toast.success(`You now followed ${follow.following.username}`);
      } catch {
        toast.error("Failed to follow");
      }
    });
  };

  const handleUnfollow = () => {
    startTransition(async () => {
      try {
        const follow = await onUnFollow(userId);
        toast.success(`You now unfollowed ${follow.following.username}`);
      } catch {
        toast.error("Failed to unfollow");
      }
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button variant="primary" onClick={onClick} disabled={isPending}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
