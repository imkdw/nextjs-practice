import { Sidebar } from "lucide-react";
import Navbar from "./_components/navbar";

interface Props {
  children: React.ReactNode;
}

export default function BrowseLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
