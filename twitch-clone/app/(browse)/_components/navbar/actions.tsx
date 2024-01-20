import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { Button } from "../../../../components/ui/button";
import { Clapperboard, Link } from "lucide-react";

export default async function Actions() {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <SignInButton>
          <Button size="sm" variant="primary">
            Login
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <Button className="text-muted-foreground hover:text-primary" size="sm" variant="ghost">
            <Link href={`u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
}
