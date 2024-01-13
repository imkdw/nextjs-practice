import MainHeader from "./components/main-header/main-header";
import MainHeaderBackground from "./components/main-header/main-header-background";
import "./globals.css";

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

interface Params {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Params) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
