import { Nunito } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";
import "./globals.css";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import Navbar from "@/components/navbar/Navbar";
import Group from "@/components/Group";
import Section from "@/components/Section";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import CreateGroupModel from "@/components/modals/CreateGroupModel";
import AddLinkModel from "@/components/modals/AddLinkModel";

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
          <LoginModal />
          <RegisterModal />
          <CreateGroupModel />
          <AddLinkModel />
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
