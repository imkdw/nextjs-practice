"use client";

import { useTransition } from "react";
import { onFollow } from "../../../../actions/follow";
import { Button } from "../../../../components/ui/button";
import { toast } from "sonner";

interface Props {
  isFollowing: boolean;
  userId: string;
}

export default function Actions({ isFollowing, userId }: Props) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      try {
        const follow = await onFollow(userId);
        toast.success(`You now followed ${follow.following.username}`);
      } catch {
        toast.error("Failed to follow");
      }
    });
  };

  return (
    <Button variant="primary" onClick={onClick} disabled={isFollowing || isPending}>
      Follow
    </Button>
  );
}
