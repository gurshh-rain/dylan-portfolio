
import "./globals.css";
import Nav from "./components/Nav";
import PageTransition from "./components/PageTransition";

export const metadata = {
  title: "Dylan Ngo",
  description: "Portfolio created by Gurshaan Gill",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PageTransition>
          <Nav />
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
