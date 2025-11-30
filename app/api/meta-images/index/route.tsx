import { t } from "@/lib/translations";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

async function loadApplicationData(id: string) {
  try {
    const data = await import(`@/lib/data/${id}/application-data.json`);
    return data.default;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Missing id parameter", { status: 400 });
  }

  const data = await loadApplicationData(id);

  if (!data) {
    return new Response("Application data not found", { status: 404 });
  }

  const { personal, theme, lang } = data;
  const accentColor = theme.accentColor;
  const fullName = personal.fullName;
  const firstName = personal.fullName.split(" ")[0];
  const companyName = personal.companyName;
  const position = personal.workingTitle;

  // Build absolute URLs for images
  const baseUrl = request.nextUrl.origin;
  const avatarUrl = `${baseUrl}${personal.avatar}`;
  const companyLogoUrl = `${baseUrl}${personal.companyLogo}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${accentColor}15 0%, #fafaf9 50%, ${accentColor}15 100%)`,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: `linear-gradient(to right, ${accentColor}, ${accentColor}99, ${accentColor}33)`,
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "48px",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Animated ring effect */}
            <div
              style={{
                position: "absolute",
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}10)`,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: `0 0 0 6px white, 0 25px 50px -12px rgba(0, 0, 0, 0.2)`,
              }}
            >
              <img
                src={avatarUrl}
                alt={fullName}
                width={180}
                height={180}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            {/* Company logo badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                right: "-10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "white",
                boxShadow: `0 0 0 4px white, 0 10px 30px -8px rgba(0, 0, 0, 0.2)`,
              }}
            >
              <img
                src={companyLogoUrl}
                alt={companyName}
                width={70}
                height={70}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "56px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "56px",
              fontWeight: "800",
              color: "#1c1917",
              letterSpacing: "-0.03em",
            }}
          >
            {firstName} × {companyName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              fontWeight: "500",
              color: accentColor,
              marginTop: "12px",
              letterSpacing: "0.01em",
            }}
          >
            {position}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              fontWeight: "400",
              color: "#78716c",
              marginTop: "8px",
              letterSpacing: "0.02em",
            }}
          >
            {t(lang).metaTitles.index}
          </div>
        </div>

        {/* Wave emoji accent */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "120px",
            fontSize: "64px",
          }}
        >
          👋
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "4px",
              borderRadius: "2px",
              backgroundColor: accentColor,
            }}
          />
          <div
            style={{
              width: "30px",
              height: "4px",
              borderRadius: "2px",
              backgroundColor: `${accentColor}66`,
            }}
          />
          <div
            style={{
              width: "15px",
              height: "4px",
              borderRadius: "2px",
              backgroundColor: `${accentColor}33`,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
