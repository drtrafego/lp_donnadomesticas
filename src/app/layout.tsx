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
                {/* Google Tag Manager */}
                <script dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-ML8C22M5');`
                }} />
                {/* End Google Tag Manager */}
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
                                fbq('set', 'autoConfig', false, '${FB_PIXEL_ID}');
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
                {/* Google Tag Manager (noscript) */}
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-ML8C22M5"
                height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
                {/* End Google Tag Manager (noscript) */}
                <Suspense fallback={null}>
                    <Analytics />
                </Suspense>
                {children}
            </body>
        </html>
    );
}
