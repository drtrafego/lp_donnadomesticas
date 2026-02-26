'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import * as tracking from '@/lib/tracking';

// This component handles GA4 page tracking on route changes.
// The Meta Pixel is installed separately in layout.tsx <head> per Meta's official docs.
export default function Analytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname) {
            // Fire GA4 pageview on each route change
            tracking.pageview(pathname);
            // Fire fbq PageView on each route change (SPA navigation)
            // The initial PageView is already fired by the <head> script.
            if (typeof window !== 'undefined' && typeof window.fbq !== 'undefined') {
                window.fbq('track', 'PageView');
            }
        }
    }, [pathname, searchParams]);

    if (!tracking.GA_TRACKING_ID) {
        return null;
    }

    return (
        <>
            {/* Google Analytics */}
            {tracking.GA_TRACKING_ID && (
                <>
                    <Script
                        strategy="afterInteractive"
                        src={`https://www.googletagmanager.com/gtag/js?id=${tracking.GA_TRACKING_ID}`}
                    />
                    <Script
                        id="gtag-init"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${tracking.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
                        }}
                    />
                </>
            )}
        </>
    );
}
