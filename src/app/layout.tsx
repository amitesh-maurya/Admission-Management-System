import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import { ToastProvider } from "@/components/ToastProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: "University Admission Management System",
    template: "%s | University Admission Management System"
  },
  description: "A comprehensive university admission management system for students and administrators. Apply to programs, track applications, and manage admissions efficiently.",
  keywords: ["university", "admission", "college", "application", "education", "student portal", "academic"],
  authors: [{ name: "University Admission Team" }],
  creator: "University Admission Management System",
  publisher: "University",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ams.amiteshmaurya.com",
    siteName: "University Admission Management System",
    title: "University Admission Management System",
    description: "Apply to university programs and manage admissions efficiently with our comprehensive platform.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "University Admission Management System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@university",
    creator: "@university",
    title: "University Admission Management System",
    description: "Apply to university programs and manage admissions efficiently.",
    images: ["/og-image.svg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://ams.amiteshmaurya.com",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
    shortcut: "/favicon.svg",
  },
};

import React, { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta name="theme-color" content="#3b82f6" /> */}
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "University Admission Management System",
              "description": "A comprehensive university admission management system",
              "url": "https://ams.amiteshmaurya.com",
              "sameAs": [
                "https://facebook.com/university",
                "https://twitter.com/university",
                "https://linkedin.com/company/university"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <ToastProvider>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
