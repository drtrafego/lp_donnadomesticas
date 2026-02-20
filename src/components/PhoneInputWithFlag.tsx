'use client';

import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { getExampleNumber, getCountryCallingCode, CountryCode } from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';

interface PhoneInputWithFlagProps {
    value: string;
    onChange: (value: string, isValid: boolean) => void;
    className?: string;
}

export default function PhoneInputWithFlag({ value, onChange, className }: PhoneInputWithFlagProps) {
    const [countryCode, setCountryCode] = useState<string>('br');
    const [placeholder, setPlaceholder] = useState<string>('(11) 99999-9999');

    const updatePlaceholder = (iso2: string) => {
        try {
            if (!iso2) return;
            // libphonenumber-js expects uppercase ISO2
            const phoneNumber = getExampleNumber(iso2.toUpperCase() as CountryCode, examples);
            if (phoneNumber) {
                setPlaceholder(phoneNumber.formatNational());
            } else {
                setPlaceholder('DDD + Whatsapp');
            }
        } catch (e) {
            console.error('Error generating placeholder:', e);
            setPlaceholder('DDD + Whatsapp');
        }
    };

    useEffect(() => {
        // Detect user country via IP
        fetch('https://ipapi.co/json/')
            .then((res) => res.json())
            .then((data) => {
                if (data && data.country_code) {
                    const code = data.country_code.toLowerCase();
                    setCountryCode(code);
                    updatePlaceholder(code);
                }
            })
            .catch((err) => console.error('Error fetching country code:', err));
    }, []);

    const handleOnChange = (val: string, data: { dialCode?: string; countryCode?: string; format?: string }) => {
        // Ensure value includes country code (DDI)
        // When disableCountryCode is true, sometimes val might miss the DDI depending on user input
        // We also check if val is just the dialCode (initial state or cleared), in which case we don't force it yet
        let phoneValue = val;
        if (data && data.dialCode) {
            // If the value DOES NOT start with the dial code, we prepend it.
            // But we must be careful: if disableCountryCode is true, 'val' usually comes WITHOUT dialCode.
            // So we almost always want to prepend it, UNLESS 'val' is empty.
            if (val && !val.startsWith(data.dialCode)) {
                phoneValue = data.dialCode + val;
            }
        }

        // Update placeholder ONLY if country changed manually (via dropdown)
        // disableCountryGuess={true} prevents auto-switching while typing
        if (data && data.countryCode && data.countryCode !== countryCode) {
            setCountryCode(data.countryCode);
            updatePlaceholder(data.countryCode);
        }

        // Basic validation: Check if the length of the formatted value matches the mask format length
        // This is a heuristic because formats can vary, but it's better than nothing.
        // react-phone-input-2 'data' object contains the format (e.g. "+55 (..) .....-....")

        let isValid = false;

        if (data && data.format) {
            const digitsOnly = phoneValue.replace(/\D/g, '');
            // data.dialCode is the DDI.
            const dialCode = data.dialCode || '';
            const ddiLength = dialCode.length;
            const numberLength = digitsOnly.length - ddiLength;

            // Most countries have 8 to 11 digits for mobile/landline.
            if (numberLength >= 8) {
                isValid = true;
            }
        } else {
            // Fallback
            isValid = phoneValue.length > 10;
        }

        onChange(phoneValue, isValid);
    };

    // Calculate display value (strip DDI)
    let displayValue = value;
    try {
        if (countryCode && value) {
            const dialCode = getCountryCallingCode(countryCode.toUpperCase() as CountryCode);
            if (value.startsWith(dialCode)) {
                displayValue = value.substring(dialCode.length);
            }
        }
    } catch (error) {
        // Ignore invalid country code errors
        // If value doesn't start with DDI, displayValue remains as value, which is fine
        console.warn('Invalid country code or formatting error:', error);
    }

    return (
        <div className={`phone-input-container ${className}`}>
            <PhoneInput
                country={countryCode}
                value={displayValue}
                onChange={handleOnChange}
                inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: false,
                }}
                containerClass="!w-full"
                inputClass="!w-full !h-12 !bg-white/5 !text-white !border-white/20 !rounded-xl !pl-[48px] focus:!border-purple-500 focus:!ring-purple-500"
                buttonClass="!bg-white/5 !border-white/20 !rounded-l-xl hover:!bg-white/10"
                dropdownClass="!bg-slate-800 !text-white !border-slate-700"
                searchClass="!bg-slate-700 !text-white"
                specialLabel=""
                placeholder={placeholder}
                enableSearch={true}
                disableSearchIcon={false}
                autoFormat={true}
                preferredCountries={['br', 'us', 'pt']}
                disableCountryCode={true}
                disableCountryGuess={true}
                preserveOrder={['onlyCountries', 'preferredCountries']}
                masks={{ br: '(..) .....-....', ar: '... ..-....-....' }}
            />
            {/* 
                STYLES REMOVED: 
                Global styles were forcing the Sage Green theme. 
                Now we rely on class overrides passed via 'className' or global css files per page.
                The default styles should be handled in globals.css or specific page modules.
            */}
        </div>
    );
}
