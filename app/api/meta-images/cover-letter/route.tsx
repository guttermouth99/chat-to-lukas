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

  const { personal, theme } = data;
  const accentColor = theme.accentColor;
  const fullName = personal.fullName.split(" ")[0]; // Just first name "Lukas"
  const companyName = personal.companyName;

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
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: `0 0 0 4px ${accentColor}40, 0 20px 40px -12px rgba(0, 0, 0, 0.15)`,
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

          {/* X connector */}
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: "300",
              color: accentColor,
            }}
          >
            ×
          </div>

          {/* Company Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "180px",
              height: "180px",
              borderRadius: "24px",
              overflow: "hidden",
              backgroundColor: "white",
              boxShadow: `0 0 0 4px ${accentColor}40, 0 20px 40px -12px rgba(0, 0, 0, 0.15)`,
            }}
          >
            <img
              src={companyLogoUrl}
              alt={companyName}
              width={160}
              height={160}
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "56px",
              fontWeight: "700",
              color: "#1c1917",
              letterSpacing: "-0.02em",
            }}
          >
            {fullName} × {companyName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              fontWeight: "500",
              color: accentColor,
              marginTop: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Anschreiben
          </div>
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

