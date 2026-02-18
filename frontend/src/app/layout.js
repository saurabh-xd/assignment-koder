import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Task Manager',
  description: 'Manage your daily tasks',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black min-h-screen text-white selection:bg-sky-500/30`}
      >
        <Toaster 
            position="top-right"
            toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                },
            }}
        />
        {children}
      </body>
    </html>
  );
}