"use client";

import { useTransition } from "react";
import { onFollow, onUnFollow } from "../../../../actions/follow";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";
import { onBlock } from "../../../../actions/block";

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

  const handleBlock = () => {
    startTransition(async () => {
      try {
        await onBlock(userId);
        toast.success("User blocked");
      } catch {
        toast.error("Failed to block user");
      }
    });
  };

  return (
    <>
      <Button variant="primary" onClick={onClick} disabled={isPending}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button variant="destructive" disabled={isPending} onClick={handleBlock}>
        Block User
      </Button>
    </>
  );
}
