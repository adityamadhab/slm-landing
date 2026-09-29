import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenSLM - Private AI That Never Leaves the Building",
  description: "Build and run language models fully inside your infrastructure. Your data, your model, your control.",
  icons: {
    icon: [
      {
        url: "https://framerusercontent.com/images/KAxC6rSgYLCxgnUoSngI9JZOM8.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "https://framerusercontent.com/images/KAxC6rSgYLCxgnUoSngI9JZOM8.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "https://framerusercontent.com/images/sCubfodQX6d1T0DBTb5e2W9Sbkc.png",
  },
  openGraph: {
    type: "website",
    title: "OpenSLM - Private AI That Never Leaves the Building",
    description: "Build and run language models fully inside your infrastructure. Your data, your model, your control.",
    images: ["https://framerusercontent.com/images/Boj7qi54kWkJ9W0qdDbRSqaCjVQ.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenSLM - Private AI That Never Leaves the Building",
    description: "Build and run language models fully inside your infrastructure. Your data, your model, your control.",
    images: ["https://framerusercontent.com/images/Boj7qi54kWkJ9W0qdDbRSqaCjVQ.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://framerusercontent.com" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}

