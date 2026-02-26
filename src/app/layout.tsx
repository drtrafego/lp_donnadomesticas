import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Suspense } from "react";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

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
                {/* Meta Pixel - Installed directly in <head> per Meta's official documentation */}
                {FB_PIXEL_ID && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '${FB_PIXEL_ID}');
                                fbq('track', 'PageView');
                            `,
                        }}
                    />
                )}
                {/* Meta Pixel noscript fallback */}
                {FB_PIXEL_ID && (
                    <noscript>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            height="1"
                            width="1"
                            style={{ display: 'none' }}
                            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                            alt=""
                        />
                    </noscript>
                )}
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
