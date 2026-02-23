import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Suspense } from "react";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Casa Organizada - Evento Online Gratuito",
    description: "Evento 100% online e gratuito com método inovador para organizar sua casa sem culpa.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </head>
            <body className={inter.className}>
                <Suspense fallback={null}>
                    <Analytics />
                </Suspense>
                {children}
            </body>
        </html>
    );
}
