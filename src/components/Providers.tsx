"use client";
import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
    </SessionProvider>
  );
}