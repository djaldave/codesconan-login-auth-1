"use client";
import './globals.css'
import {Inter} from 'next/font/google'
import Navbar from "@/app/components/Navbar";
import {AuthContextProvider} from "@/app/context/AuthContext";
import {ReactNode} from "react";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
            <Navbar />
            {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
