/**
 * Server-Side Tracking Utility
 * Handles Meta Conversions API (CAPI) and GA4 Measurement Protocol
 */

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
export const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
export const GA_API_SECRET = process.env.GA_API_SECRET;

/**
 * Send event to Meta Conversions API (CAPI)
 */
export async function sendMetaCAPI(eventName: string, userData: any, customData: any = {}, eventId?: string) {
    if (!FB_PIXEL_ID || !FB_ACCESS_TOKEN) {
        console.warn('Meta CAPI: Missing FB_PIXEL_ID or FB_ACCESS_TOKEN');
        return;
    }

    try {
        const payload = {
            data: [
                {
                    event_name: eventName,
                    event_time: Math.floor(Date.now() / 1000),
                    event_id: eventId,
                    action_source: 'website',
                    event_source_url: userData.event_source_url,
                    user_data: {
                        em: userData.em ? [userData.em] : undefined,
                        ph: userData.ph ? [userData.ph] : undefined,
                        fn: userData.fn ? [userData.fn] : undefined,
                        ln: userData.ln ? [userData.ln] : undefined,
                        ct: userData.ct ? [userData.ct] : undefined,
                        st: userData.st ? [userData.st] : undefined,
                        zp: userData.zp ? [userData.zp] : undefined,
                        country: userData.country ? [userData.country] : undefined,
                        client_ip_address: userData.ip,
                        client_user_agent: userData.ua,
                        fbc: userData.fbc,
                        fbp: userData.fbp,
                        external_id: eventId ? [await hashData(eventId)] : undefined,
                    },
                    custom_data: customData,
                },
            ],
        };

        const response = await fetch(`https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log('Meta CAPI Result:', result);
        return result;
    } catch (error) {
        console.error('Error sending Meta CAPI event:', error);
    }
}

/**
 * Send event to GA4 Measurement Protocol
 */
export async function sendGA4MP(eventName: string, clientId: string, eventParams: any = {}) {
    if (!GA_MEASUREMENT_ID || !GA_API_SECRET) {
        console.warn('GA4 MP: Missing GA_MEASUREMENT_ID or GA_API_SECRET');
        return;
    }

    try {
        const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`;

        const payload = {
            client_id: clientId,
            events: [
                {
                    name: eventName,
                    params: {
                        ...eventParams,
                        engagement_time_msec: '100',
                    },
                },
            ],
        };

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        console.log('GA4 MP Sent:', response.status);
        return response.status;
    } catch (error) {
        console.error('Error sending GA4 MP event:', error);
    }
}

/**
 * SHA256 hashing for data privacy (Meta recommendation)
 */
export async function hashData(data: string) {
    if (!data) return null;
    const { createHash } = await import('crypto');
    return createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
}
