import { Nunito } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";
import "./globals.css";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import Navbar from "@/components/navbar/Navbar";
import Group from "@/components/Group";
import Section from "@/components/Section";
import ModalsProvider from "@/providers/ModalsProvider";

export const metadata = {
  title: "KeepDataOnline",
  description: "Nextjs App",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <ModalsProvider currentUser={currentUser} />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <main className="flex">
          <Group />
          <Section />
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
