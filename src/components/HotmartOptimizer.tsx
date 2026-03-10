'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * HotmartOptimizer Component
 * Captures marketing parameters (UTMs, src, sck, scr) from the current URL
 * and appends them to all Hotmart checkout links on the page.
 */
export default function HotmartOptimizer() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const paramsToPass = [
            'utm_source',
            'utm_medium',
            'utm_campaign',
            'utm_term',
            'utm_content',
            'src',
            'sck',
            'scr'
        ];

        const updateLinks = () => {
            const links = document.querySelectorAll('a[href*="hotmart.com"]');
            links.forEach((link) => {
                const anchor = link as HTMLAnchorElement;
                try {
                    // Only process actual URLs
                    if (!anchor.href.startsWith('http')) return;

                    const url = new URL(anchor.href);
                    let changed = false;

                    paramsToPass.forEach((param) => {
                        const value = searchParams.get(param);
                        if (value) {
                            url.searchParams.set(param, value);
                            changed = true;
                        }
                    });

                    if (changed) {
                        anchor.href = url.toString();
                    }
                } catch (e) {
                    console.warn('Failed to process Hotmart link:', anchor.href);
                }
            });
        };

        // Initial run
        updateLinks();

        // Optional: Run again if the DOM changes extensively (MutationObserver)
        // or just rely on Next.js searchParams updates which trigger this useEffect.

    }, [searchParams]);

    return null;
}
