import { notFound } from "next/navigation";
import jobsToApply from "@/lib/data/jobs-to-apply.json";

interface JobPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params;
  const job = jobsToApply.find((j) => j.id === id);

  if (!job) {
    notFound();
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-stone-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-stone-900">
          Hello World
        </h1>
        <p className="mt-2 text-stone-600">
          Bewerbung für {job.position} @ {job.company}
        </p>
      </div>
    </div>
  );
}

