'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    Youtube,
    CheckCircle2,
    ArrowRight,
    Home,
    Star,
    Layout
} from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
} as const;

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function CronogramaPage() {
    return (
        <div className="min-h-screen bg-[#F7F3EE] text-[#1E1812] font-sans selection:bg-[#C9A87A]/30">
            {/* Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 overflow-hidden">
                <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>

            {/* Header */}
            <header className="relative z-10 pt-16 pb-12 px-6 text-center border-b border-[#E8E0D5]">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 mb-6"
                >
                    <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#A0845C]">
                        Donna Domésticas · Método Casa com Direção
                    </span>
                </motion.div>

                <motion.h1
                    {...fadeInUp}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-[#1E1812] mb-6"
                >
                    Sua Casa<br />
                    <em className="italic text-[#A0845C] not-serif">Organizada</em>
                </motion.h1>

                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.2 }}
                    className="max-w-xl mx-auto text-lg text-[#8C7B6E] leading-relaxed mb-8"
                >
                    O evento ao vivo que vai mostrar como sair do improviso e ter uma rotina doméstica que realmente funciona.
                </motion.p>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="w-12 h-[1px] bg-[#A0845C] mx-auto"
                />
            </header>

            {/* Info Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative z-10 bg-[#5C4A3A] grid grid-cols-2 md:grid-cols-4"
            >
                {[
                    { label: 'Data', value: '10 de março', icon: Calendar },
                    { label: 'Horário', value: '20h00', icon: Clock },
                    { label: 'Formato', value: 'Ao vivo · YouTube', icon: Youtube },
                    { label: 'Acesso', value: 'Gratuito', icon: Star }
                ].map((item, idx) => (
                    <div key={idx} className="p-6 md:p-8 text-center border-r border-white/10 last:border-r-0 flex flex-col items-center justify-center gap-1 group overflow-hidden relative">
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-[#C9A87A] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="text-[9px] font-bold tracking-widest uppercase text-[#C9A87A] mb-1">{item.label}</span>
                        <span className="font-serif text-lg font-semibold text-white">{item.value}</span>
                    </div>
                ))}
            </motion.div>

            {/* Main Content */}
            <main className="relative z-10 max-w-3xl mx-auto px-6 py-20">

                {/* YouTube Video Section */}
                <section className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div className="relative w-full aspect-video bg-[#1E1812] shadow-2xl">
                            <iframe
                                src="https://www.youtube.com/embed/[ID_DO_VIDEO]"
                                title="Sua Casa Organizada — Ao vivo"
                                className="absolute inset-0 w-full h-full border-none"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <p className="text-[0.82rem] text-[#8C7B6E] leading-relaxed">
                            Depois de entrar no vídeo, clique em <strong className="text-[#5C4A3A] font-medium">Definir lembrete</strong> ou ative o 🔔 no canal para não perder o início ao vivo.
                        </p>
                    </motion.div>
                </section>

                {/* Pillars Section */}
                <section className="mb-20">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#C4B9AD] mb-8"
                    >
                        O que você vai aprender
                    </motion.p>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid gap-4"
                    >
                        {[
                            { id: '1', name: 'Pilar 1', title: 'Ordem antes da ação', desc: 'A base mental necessária antes de pegar na vassoura.' },
                            { id: '2', name: 'Pilar 2', title: 'Inteligência doméstica', desc: 'Como otimizar processos e parar de repetir tarefas.' },
                            { id: '3', name: 'Pilar 3', title: 'Rotina possível', desc: 'Um cronograma que sobrevive à vida real, não apenas ao papel.' }
                        ].map((pillar) => (
                            <motion.div
                                key={pillar.id}
                                variants={fadeInUp}
                                className="group flex items-start gap-6 p-8 bg-white border border-[#E8E0D5] border-l-4 border-l-[#A0845C] hover:shadow-xl hover:shadow-[#A0845C]/5 transition-all duration-300"
                            >
                                <span className="font-serif text-4xl font-bold text-[#C9A87A] leading-none">{pillar.id}</span>
                                <div className="space-y-1">
                                    <div className="text-[11px] font-bold tracking-widest uppercase text-[#8C7B6E]">{pillar.name}</div>
                                    <h3 className="font-serif text-2xl font-semibold text-[#1E1812] group-hover:text-[#A0845C] transition-colors">{pillar.title}</h3>
                                    <p className="text-[#8C7B6E] text-sm leading-relaxed max-w-md">{pillar.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* The Enemy Section */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 p-10 md:p-14 bg-[#1E1812] overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <span className="text-[9px] font-bold tracking-widest uppercase text-[#C4B9AD] mb-6 block">O inimigo que vamos eliminar</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
                            O <em className="italic text-[#C9A87A] not-serif">improviso diário</em> é o que impede sua casa de funcionar.
                        </h2>
                        <p className="text-[#C4B9AD] text-base leading-relaxed max-w-xl border-l-[1px] border-white/20 pl-6">
                            Não é falta de esforço. Não é falta de tempo. É falta de direção. O Método Casa com Direção resolve isso de forma prática e definitiva.
                        </p>
                    </div>
                </motion.section>

                {/* CTA Block */}
                <section className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="space-y-10"
                    >
                        <div className="space-y-4">
                            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E1812]">Pronta para entrar?</h2>
                            <p className="text-[#8C7B6E] text-lg">
                                O evento começa em 10 de março às 20h.<br />
                                <span className="font-semibold text-[#A0845C]">Clica no botão e acessa ao vivo pelo YouTube.</span>
                            </p>
                        </div>

                        <div className="inline-block relative group">
                            <div className="absolute inset-0 bg-[#A0845C] translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 opacity-20" />
                            <a
                                href="#"
                                className="relative z-10 flex items-center gap-4 bg-[#5C4A3A] text-white px-10 py-6 text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#A0845C] transition-colors duration-300"
                            >
                                <span>Assistir ao vivo agora</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        <div className="flex items-center justify-center gap-6 pt-4">
                            <span className="text-xs font-bold tracking-widest text-[#C4B9AD] uppercase">Gratuito</span>
                            <div className="w-1 h-1 bg-[#E8E0D5] rounded-full" />
                            <span className="text-xs font-bold tracking-widest text-[#C4B9AD] uppercase">Ao vivo</span>
                            <div className="w-1 h-1 bg-[#E8E0D5] rounded-full" />
                            <span className="text-xs font-bold tracking-widest text-[#C4B9AD] uppercase">YouTube</span>
                        </div>
                    </motion.div>
                </section>

            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-[#E8E0D5] bg-white py-16 px-6 text-center">
                <div className="max-w-xl mx-auto space-y-4">
                    <div className="font-serif text-2xl font-bold text-[#8C7B6E] tracking-tight">Donna Domésticas</div>
                    <div className="w-10 h-[1px] bg-[#E8E0D5] mx-auto" />
                    <p className="text-xs font-bold tracking-widest text-[#C4B9AD] uppercase leading-relaxed">
                        Luciane Coutinho · Método Casa com Direção<br />
                        23 anos simplificando a vida de casas reais
                    </p>
                </div>
            </footer>

            {/* Global Styles for Serif Font */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;700;800&display=swap');
                
                .font-serif {
                    font-family: 'Cormorant Garamond', serif;
                }
                
                .font-sans {
                    font-family: 'DM Sans', sans-serif;
                }

                .not-serif {
                    font-family: 'DM Sans', sans-serif;
                }
            `}</style>
        </div>
    );
}
