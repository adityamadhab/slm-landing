import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://openslm.appopentechnologies.in"),
  title: "OpenSLM - Private AI That Never Leaves the Building",
  description: "Build and run language models fully inside your infrastructure. Your data, your model, your control.",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "512x512",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://openslm.appopentechnologies.in",
    siteName: "OpenSLM",
    title: "OpenSLM - Private AI That Never Leaves the Building",
    description: "Build and run language models fully inside your infrastructure. Your data, your model, your control.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "OpenSLM - Private AI That Never Leaves the Building",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenSLM - Private AI That Never Leaves the Building",
    description: "Build and run language models fully inside your infrastructure. Your data, your model, your control.",
    images: ["/og-image.jpg"],
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

