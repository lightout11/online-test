import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "react-hot-toast"

/* istanbul ignore next */
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Thi Online",
  description: "Thi Online"
}

export default async function RootLayout({ children }) {
  return (
    <html lang="vi" className="dark">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  )
}
