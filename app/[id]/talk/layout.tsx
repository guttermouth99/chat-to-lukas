import { Metadata } from "next";
import jobsToApply from "@/lib/data/jobs-to-apply.json";
import profile from "@/lib/data/profile.json";

// Dynamic data loader
async function getApplicationData(id: string) {
  try {
    const data = await import(`@/lib/data/${id}/application-data.json`);
    return data.default;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = jobsToApply.find((j) => j.id === id);
  const data = await getApplicationData(id);

  if (!job || !data) {
    return {
      title: "Chat Not Found",
    };
  }

  const title = `${profile.name} × ${job.company} - Frag mich alles!`;
  const description = `Chat mit ${profile.name} über die Bewerbung als ${job.position} bei ${job.company}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: `/api/meta-images/talk?id=${id}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/meta-images/talk?id=${id}`],
    },
  };
}

interface TalkLayoutProps {
  children: React.ReactNode;
}

export default function TalkLayout({ children }: TalkLayoutProps) {
  return <>{children}</>;
}

