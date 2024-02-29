import React, { ReactNode } from "react";
import { AuthContextProvider } from "@/context/AuthContext";
import Header from "./header";

import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
