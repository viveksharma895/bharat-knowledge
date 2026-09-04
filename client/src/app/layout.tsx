import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ea580c",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bharatknowledge.in"),
  title: "Bharat Knowledge | Open Knowledge Platform | Source-Backed & Open For All",
  description:
    "Bharat Knowledge is a national open knowledge repository with 142,800+ primary citations. Explore 28,400+ people, constitutional precedents, historical milestones, scientific institutions, and living cultures of India — 100% free, peer-reviewed, and open for all.",
  keywords: [
    "Bharat Knowledge",
    "Indian knowledge repository",
    "national archive",
    "open knowledge platform",
    "Indian history archive",
    "constitution of India",
    "Indian leaders dossiers",
    "biography of Indian scientists",
    "Dr. A.P.J. Abdul Kalam",
    "Mahatma Gandhi",
    "Dr. B.R. Ambedkar",
    "ISRO missions",
    "Indian freedom fighters",
    "constitutional law archive",
    "scheduled languages of India",
    "citation-verified dossiers",
    "primary sources archive",
    "Indian culture and heritage",
  ],
  authors: [{ name: "Bharat Knowledge Editorial Team" }],
  creator: "Bharat Knowledge",
  publisher: "Bharat Knowledge",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  applicationName: "Bharat Knowledge",
  appleWebApp: {
    capable: true,
    title: "Bharat Knowledge",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "https://bharatknowledge.in/",
    siteName: "Bharat Knowledge",
    title: "Bharat Knowledge | Open Knowledge Platform | Source-Backed & Open For All",
    description:
      "Impartial, structured, citation-verified dossiers documenting the leaders, institutions, history, constitutional precedents, and living cultures that shape the subcontinent. Explore 142,800+ primary citations across 28,400+ people.",
    images: [
      {
        url: "https://bharatknowledge.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bharat Knowledge — National Open Knowledge Repository",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BharatKnowledge",
    creator: "@BharatKnowledge",
    title: "Bharat Knowledge | Open Knowledge Platform | Source-Backed & Open For All",
    description:
      "Impartial, structured, citation-verified dossiers documenting the leaders, institutions, history, constitutional precedents, and living cultures that shape the subcontinent.",
    images: ["https://bharatknowledge.in/og-image.jpg"],
  },
  alternates: {
    canonical: "https://bharatknowledge.in/",
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased text-brand-navy selection:bg-brand-saffron selection:text-white relative bg-brand-cream">
        {children}
      </body>
    </html>
  );
}