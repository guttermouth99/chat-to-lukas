import Image from "next/image";
import Link from "next/link";
import { FileText, Mail, MessageSquare } from "lucide-react";

const applications = [
  {
    id: "citylab",
    name: "CityLAB Berlin",
    logo: "/citylab_logo.jpg",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="flex min-h-screen w-full max-w-2xl flex-col items-center gap-12 py-24 px-8">
        {/* Avatar & Greeting */}
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/lukas_avatar.jpeg"
            alt="Lukas"
            width={120}
            height={120}
            className="rounded-full border-4 border-white shadow-lg dark:border-zinc-800"
            priority
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Hi, I&apos;m Lukas 👋
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Here are my job applications
            </p>
          </div>
        </div>

        {/* Applications */}
        <div className="w-full space-y-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-4 flex items-center gap-3">
                <Image
                  src={app.logo}
                  alt={app.name}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {app.name}
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Link
                  href={`/${app.id}/cv`}
                  className="flex flex-col items-center gap-2 rounded-xl bg-zinc-100 p-4 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  <FileText className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    CV
                  </span>
                </Link>

                <Link
                  href={`/${app.id}/cover-letter`}
                  className="flex flex-col items-center gap-2 rounded-xl bg-zinc-100 p-4 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  <Mail className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Cover Letter
                  </span>
                </Link>

                <Link
                  href={`/${app.id}/talk`}
                  className="flex flex-col items-center gap-2 rounded-xl bg-zinc-100 p-4 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  <MessageSquare className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Talk
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
