import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const baseUrl = request.nextUrl.origin;
  const avatarUrl = `${baseUrl}/lukas_avatar.jpeg`;
  const accentColor = "#3b82f6"; // A nice blue

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
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: `0 0 0 6px ${accentColor}40, 0 25px 50px -12px rgba(0, 0, 0, 0.2)`,
            }}
          >
            <img
              src={avatarUrl}
              alt="Lukas"
              width={200}
              height={200}
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "72px",
                fontWeight: "800",
                color: "#1c1917",
                letterSpacing: "-0.03em",
              }}
            >
              HireLukas
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "32px",
                fontWeight: "500",
                color: "#52525b",
                letterSpacing: "0.01em",
              }}
            >
              Lernt mich jetzt besser kennen
            </div>
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

