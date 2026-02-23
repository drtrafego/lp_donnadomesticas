export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

declare global {
    interface Window {
        gtag: any;
        fbq: any;
    }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
    if (typeof window.gtag !== 'undefined' && GA_TRACKING_ID) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: { action: string; category?: string; label?: string; value?: number }) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Facebook Pixel
export const fbEvent = (name: string, options = {}, eventId?: string) => {
    if (typeof window.fbq !== 'undefined' && FB_PIXEL_ID) {
        if (eventId) {
            window.fbq('track', name, options, { event_id: eventId });
        } else {
            window.fbq('track', name, options);
        }
    }
};
