import Navbar from "./_components/navbar";

interface Props {
  children: React.ReactNode;
}

export default function BrowseLayout({ children }: Props) {
  return (
    <div className="flex h-full pt-20">
      <Navbar />
      {children}
    </div>
  );
}
