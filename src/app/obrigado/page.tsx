'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, ArrowRight, Loader2 } from 'lucide-react';
import * as tracking from '@/lib/tracking';

// Link da Comunidade WhatsApp
const WHATSAPP_COMMUNITY_LINK = 'https://chat.whatsapp.com/FGrLBee4mej0mrfZfa8CSM';

function ThankYouContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('lid') || '';

    useEffect(() => {
        // Disparos Imediatos de Conversão
        tracking.pageview('/obrigado');
        tracking.fbEvent('PageView');

        tracking.event({ action: 'conversion_obrigado', category: 'Conversion', label: 'Page View Obrigado' });
        tracking.fbEvent('Lead', { content_name: 'Inscrição Confirmada', status: 'Success' }, leadId);

        // Redirecionamento automático após 3.5 segundos (tempo extra para garantir que os pixels disparem)
        const timer = setTimeout(() => {
            window.location.href = WHATSAPP_COMMUNITY_LINK;
        }, 3500);

        return () => clearTimeout(timer);
    }, [leadId]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl w-full glass p-8 md:p-16 rounded-[40px] md:rounded-[60px] text-center relative z-10 border-[#556B2F]/10"
        >
            {/* Ícone de Sucesso */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-24 h-24 bg-[#556B2F]/10 rounded-3xl flex items-center justify-center mx-auto mb-10 group-hover:bg-[#f0f2ed] transition-colors"
            >
                <CheckCircle2 className="w-12 h-12 text-[#556B2F]" />
            </motion.div>

            <h1 className="text-3xl md:text-5xl font-black text-[#2d2d2d] mb-6 leading-tight tracking-tight">
                Inscrição <span className="text-[#556B2F]">Confirmada</span>!
            </h1>

            <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto mb-12">
                <p>
                    Este foi o <strong>primeiro passo</strong> concluído para transformar sua casa.
                </p>
                <p className="bg-white/50 py-3 px-6 rounded-2xl border border-[#556B2F]/5 inline-block">
                    O <strong>segundo passo</strong> é entrar na comunidade e <span className="text-[#556B2F] font-black uppercase underline decoration-2 underline-offset-4">não sair</span>.
                </p>
            </div>

            {/* Botão de Redirecionamento */}
            <div className="space-y-6">
                <a
                    href={WHATSAPP_COMMUNITY_LINK}
                    className="w-full bg-[#556B2F] text-white px-8 py-6 rounded-2xl text-xl font-bold hover:bg-[#6B8E23] transition-all shadow-[0_20px_50px_rgba(85,107,47,0.3)] active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                    <span className="relative z-10">Entrar na Comunidade</span>
                    <MessageCircle className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" />
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </a>

                {/* Aviso de Redirecionamento Automático */}
                <div className="flex items-center justify-center gap-2 text-gray-400 font-medium animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm tracking-wide">Redirecionando automaticamente em instantes...</span>
                </div>
            </div>

            <p className="mt-12 text-gray-400 text-xs font-bold tracking-widest uppercase">
                © 2024 Luciane Coutinho. Operação Casa Organizada.
            </p>
        </motion.div>
    );
}

export default function ThankYouPage() {
    return (
        <main className="min-h-screen mesh-gradient flex items-center justify-center p-6 selection:bg-[#556B2F] selection:text-white">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#556B2F]/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#BDB76B]/10 rounded-full blur-[120px]"></div>
            </div>

            <Suspense fallback={<Loader2 className="animate-spin" />}>
                <ThankYouContent />
            </Suspense>
        </main>
    );
}
