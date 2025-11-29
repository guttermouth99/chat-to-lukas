import { AI } from "./ai";

export default function TalkToMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AI>{children}</AI>;
}

