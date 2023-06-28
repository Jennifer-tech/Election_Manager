import "@/styles/globals.css";
import { Inter } from "next/font/google";
// import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Election Manager App",
  description: "An Election Management Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="relative">
          <Navbar />
          <section>{children}</section>
          {/* <Footer /> */}
        </main>
      </body>
    </html>
  );
}
