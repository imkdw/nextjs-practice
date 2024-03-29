import { notFound } from "next/navigation";
import { getUserByUsername } from "../../../lib/user-service";
import { isFollowingUser } from "../../../lib/follow-service";
import Actions from "./_components/actions";
import { isBlockedByUser } from "../../../lib/block-service";

interface Props {
  params: {
    username: string;
  };
}

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocking = await isBlockedByUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      <p>username : {user.username}</p>
      <p>userId : {user.id}</p>
      <p>isFollowing : {`${isFollowing}`}</p>
      <p>isBlocking : {`${isBlocking}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  );
}
