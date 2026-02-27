'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as tracking from '@/lib/tracking';
import {
    ArrowRight,
    Star,
    Calendar,
    Sparkles,
    RefreshCw,
    Flame,
    Brain,
    Zap,
    Youtube,
    Clock,
    Home as HomeIcon,
    Book,
    Smartphone,
    FireExtinguisher,
    Dices,
    Coffee,
    Lightbulb,
    Key,
    ListChecks,
    ClipboardList
} from 'lucide-react';
import PhoneInputWithFlag from '@/components/PhoneInputWithFlag';

export default function Home() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        phoneValid: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Scroll tracking (GA4/Meta standard)
            const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
            const milestones = [25, 50, 75, 90];
            milestones.forEach(m => {
                const key = `scroll_${m}`;
                if (scrollPercent >= m && !(window as any)[key]) {
                    (window as any)[key] = true;
                    tracking.event({ action: 'scroll', category: 'Engagement', label: `${m}%`, value: m });
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.phoneValid) {
            alert('Por favor, insira um número de telefone válido.');
            return;
        }

        setIsLoading(true);

        try {
            const params = new URLSearchParams(window.location.search);
            const utm_source = params.get('utm_source');
            const utm_medium = params.get('utm_medium');
            const utm_campaign = params.get('utm_campaign');
            const utm_term = params.get('utm_term');
            const page_path = window.location.pathname;

            // Ler fbc/fbp no cliente para garantir envio independente de cookies HTTP
            const fbclid = params.get('fbclid');
            const getCookieVal = (name: string) => {
                const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
                return match ? decodeURIComponent(match[2]) : undefined;
            };
            const fbc = fbclid
                ? `fb.1.${Math.floor(Date.now() / 1000)}.${fbclid}`
                : getCookieVal('_fbc');
            const fbp = getCookieVal('_fbp');

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    utm_source,
                    utm_medium,
                    utm_campaign,
                    utm_term,
                    page_path,
                    fbc,
                    fbp,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const leadId = data.lead?.id || '';
                // Tracking: disparar eventos ANTES de navegar (mais confiável que disparar na página de destino)
                tracking.event({ action: 'generate_lead', category: 'Conversion', label: 'LP Mar2601' });
                tracking.fbEvent('Lead', { content_name: 'Inscrição Casa Organizada', status: 'Success' }, leadId);
                tracking.fbEvent('CompleteRegistration', { content_name: 'Inscrição Casa Organizada', status: 'Success' }, `cr_${leadId}`);

                // Usar window.location.href (reload completo) em vez de router.push (SPA).
                // O reload garante que o Meta Pixel reinicialize e dispare PageView com a URL /obrigado,
                // permitindo que marcações por URL no Meta funcionem corretamente.
                window.location.href = `/obrigado?lid=${leadId}`;
            } else {
                alert('Erro ao enviar formulário: ' + (data.message || 'Tente novamente.'));
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao enviar formulário. Verifique sua conexão.');
        } finally {
            setIsLoading(false);
        }
    };

    const scrollToId = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <main className="min-h-screen selection:bg-[#556B2F] selection:text-white">
            {/* HERO SECTION */}
            <section id="home" className="relative pt-32 pb-20 md:pt-52 md:pb-32 mesh-gradient overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#556B2F]/10 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#BDB76B]/10 rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-xs font-black tracking-widest text-[#556B2F] mb-10 border-[#556B2F]/10"
                    >
                        <HomeIcon className="w-4 h-4" />
                        SUA CASA ORGANIZADA
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-[#2d2d2d] mb-8 leading-[1.2] tracking-tight"
                    >
                        Sua casa não precisa de mais <span className="text-[#556B2F]">esforço</span>. <br /> Ela precisa de <span className="text-[#556B2F] italic font-serif">direção</span>.
                    </motion.h1>

                    <motion.p
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        Evento 100% online e gratuito com método inovador para organizar sua casa sem culpa.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12 text-gray-500 font-bold tracking-widest text-sm uppercase"
                    >
                        <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-[#556B2F]" /> 10/03/2026</div>
                        <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-[#556B2F]" /> 20h00</div>
                        <div className="flex items-center gap-2"><Youtube className="w-5 h-5 text-red-600" /> YouTube</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                    >
                        <button
                            onClick={() => scrollToId('cta')}
                            className="w-full sm:w-auto bg-[#556B2F] text-white px-12 py-5 rounded-2xl text-xl font-bold hover:bg-[#6B8E23] transition-all shadow-[0_20px_50px_rgba(85,107,47,0.3)] active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group"
                        >
                            <span className="relative z-10">Quero Organizar Minha Casa</span>
                            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </motion.div>
                </div>
            </section >

            {/* PROBLEMA SECTION */}
            < section className="py-32 bg-white" id="problema" >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div {...fadeInUp} className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Se você sente que...</h2>
                        <div className="w-24 h-2 bg-[#556B2F] mx-auto rounded-full opacity-20"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
                        <motion.div
                            {...fadeInUp} transition={{ delay: 0.1 }}
                            className="p-10 bg-[#fdfdfb] border border-gray-100 rounded-[40px] premium-shadow flex flex-col items-center text-center gap-6 hover:border-[#556B2F]/30 transition-all group"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[#f0f2ed] transition-colors">
                                <ClipboardList className="w-8 h-8 text-[#556B2F]" />
                            </div>
                            <h3 className="text-xl font-bold leading-tight"><strong>Faz muito</strong><br /> e nunca termina</h3>
                        </motion.div>

                        <motion.div
                            {...fadeInUp} transition={{ delay: 0.2 }}
                            className="p-10 bg-[#fdfdfb] border border-gray-100 rounded-[40px] premium-shadow flex flex-col items-center text-center gap-6 hover:border-[#556B2F]/30 transition-all group"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[#f0f2ed] transition-colors">
                                <FireExtinguisher className="w-8 h-8 text-[#556B2F]" />
                            </div>
                            <h3 className="text-xl font-bold leading-tight"><strong>Vive apagando incêndio</strong><br /> dentro de casa</h3>
                        </motion.div>

                        <motion.div
                            {...fadeInUp} transition={{ delay: 0.3 }}
                            className="p-10 bg-[#fdfdfb] border border-gray-100 rounded-[40px] premium-shadow flex flex-col items-center text-center gap-6 hover:border-[#556B2F]/30 transition-all group"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[#f0f2ed] transition-colors">
                                <Brain className="w-8 h-8 text-[#556B2F]" />
                            </div>
                            <h3 className="text-xl font-bold leading-tight"><strong>Pensa na casa</strong><br /> o dia inteiro</h3>
                        </motion.div>

                        <motion.div
                            {...fadeInUp} transition={{ delay: 0.4 }}
                            className="p-10 bg-[#fdfdfb] border border-gray-100 rounded-[40px] premium-shadow flex flex-col items-center text-center gap-6 hover:border-[#556B2F]/30 transition-all group"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[#f0f2ed] transition-colors">
                                <Dices className="w-8 h-8 text-[#556B2F]" />
                            </div>
                            <h3 className="text-xl font-bold leading-tight"><strong>Improvisa a rotina</strong><br /> todos os dias</h3>
                        </motion.div>
                    </div>

                    <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center p-12 glass rounded-[50px] border-[#556B2F]/10">
                        <h3 className="text-2xl md:text-3xl font-black mb-6">O problema NÃO é falta de vontade.</h3>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                            É falta de <strong>método</strong>. Na Operação Casa Organizada, você aprenderá como organizar sua rotina doméstica com clareza, lógica e inteligência seja fazendo tudo sozinha ou trabalhando fora.
                        </p>
                        <button
                            onClick={() => scrollToId('cta')}
                            className="bg-[#556B2F] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[#6B8E23] transition-all active:scale-95"
                        >
                            Garantir minha vaga
                        </button>
                    </motion.div>
                </div>
            </section >

            {/* APRENDER SECTION */}
            < section className="py-32 bg-[#fdfdfb]" id="aprender" >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div {...fadeInUp} className="text-center mb-20 text-[#2d2d2d]">
                        <h2 className="text-4xl md:text-6xl font-black mb-4">O que você vai aprender</h2>
                        <p className="text-xl text-gray-500 font-bold tracking-widest uppercase mb-6">Não é faxina. Não é dica solta. É método.</p>
                        <div className="w-20 h-2 bg-[#556B2F] mx-auto rounded-full opacity-20"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Por que sua casa nunca se mantém organizada', desc: 'Mesmo quando você se esforça muito' },
                            { title: 'O erro invisível que custa tempo e energia', desc: 'E como você está gastando recursos sem resultado real' },
                            { title: 'Como parar de improvisar a rotina', desc: 'E começar a ter previsibilidade no seu dia a dia' },
                            { title: 'O que vem ANTES da limpeza', desc: 'Para a casa realmente funcionar por conta própria' },
                            { title: 'Como ter sua casa organizada SEM culpa', desc: 'Sem viver cansada ou pressionada, com fórmulas realistas' },
                            { title: 'O método passo a passo', desc: 'Simples, possível e aplicável à sua realidade' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeInUp} transition={{ delay: idx * 0.1 }}
                                className="bg-white p-10 rounded-[40px] border border-gray-100 premium-shadow group hover:border-[#556B2F]/30 transition-all flex flex-col items-center text-center"
                            >
                                <div className="w-12 h-12 bg-[#f0f2ed] text-[#556B2F] rounded-full flex items-center justify-center font-black text-xl mb-6">
                                    {idx + 1}
                                </div>
                                <h4 className="font-black text-lg text-[#556B2F] mb-4">{item.title}</h4>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* HISTÓRIA SECTION */}
            < section className="py-32 bg-white" id="historia" >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col-reverse lg:flex-row gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-6 bg-[#556B2F]/10 rounded-[60px] blur-3xl opacity-100"></div>
                                <div className="relative rounded-[50px] overflow-hidden border-[12px] border-[#fdfdfb] shadow-[0_40px_80px_rgba(0,0,0,0.08)] transform hover:scale-[1.01] transition-transform duration-500 max-w-md mx-auto">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/Luciane.png"
                                        alt="Luciane Coutinho"
                                        className="w-full aspect-square object-cover object-center"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div {...fadeInUp} className="flex-1">
                            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight text-[#2d2d2d]">A história de Luciane</h2>
                            <div className="space-y-6 text-xl text-gray-600 leading-relaxed mb-12">
                                <p>Por <strong>mais de 23 anos</strong>, Luciane organizou, administrou e treinou rotinas em casas reais.</p>
                                <p><strong>Casas com funcionária. Casas sem ajuda nenhuma. Casas onde a dona estava exausta, perdida e sobrecarregada.</strong></p>
                                <p>Ao longo desses anos, ela descobriu algo que <strong>ninguém falava</strong>:</p>
                                <p className="text-2xl font-black text-[#6B8E23] py-4 border-y border-gray-100">O problema das casas não é <strong>limpeza</strong>. É <strong>falta de método</strong>.</p>
                                <p>Assim nasceu um método <strong>simples, possível e aplicável</strong> à vida real, pensado para mulheres que cuidam da casa, da família e, muitas vezes, de <strong>tudo sozinhas</strong>.</p>
                                <p><strong>Este evento é seu primeiro passo para entender esse método.</strong></p>
                            </div>
                            <button
                                onClick={() => scrollToId('cta')}
                                className="bg-[#556B2F] text-white px-10 py-5 rounded-2xl font-black hover:bg-[#6B8E23] transition-all hover:translate-x-2"
                            >
                                Quero aprender com Luciane
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* STATS SECTION */}
            < section className="py-24 bg-[#556B2F] text-white" >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { val: '20+', label: 'Anos de Experiência na Área Residencial' },
                            { val: '2 MIL', label: 'Residências Transformadas' },
                            { val: '3 MIL', label: 'Profissionais Formados' }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeInUp} transition={{ delay: idx * 0.1 }}
                                className="bg-white/10 p-10 rounded-[40px] border border-white/20 text-center glass backdrop-blur-md"
                            >
                                <div className="text-5xl font-black mb-4">{stat.val}</div>
                                <div className="text-sm font-bold tracking-widest uppercase opacity-80">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* BENEFÍCIOS SECTION */}
            < section className="py-32 bg-white" id="beneficios" >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div {...fadeInUp} className="text-center mb-20 text-[#2d2d2d]">
                        <h2 className="text-4xl md:text-6xl font-black mb-6">Benefícios da Operação Casa Organizada</h2>
                        <div className="w-24 h-2 bg-[#556B2F] mx-auto rounded-full opacity-20"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Casa Organizada', desc: 'Uma casa que funciona por lógica, não por acaso', icon: HomeIcon },
                            { title: 'Mais Tempo', desc: 'Recupere horas preciosas na sua semana', icon: Clock },
                            { title: 'Menos Estresse', desc: 'Viva sem culpa e sem pressão constante.', icon: Coffee },
                            { title: 'Clareza Total', desc: 'Entenda exatamente como sua casa funciona', icon: Lightbulb },
                            { title: 'Autonomia', desc: 'Sua casa se mantém organizada sozinha', icon: Key },
                            { title: 'Método Simples', desc: 'Sem complicação, sem fórmulas irreais', icon: ListChecks }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeInUp} transition={{ delay: idx * 0.1 }}
                                className="p-10 bg-[#fdfdfb] border border-gray-100 rounded-[40px] premium-shadow hover:border-[#556B2F]/30 transition-all group flex flex-col items-center text-center"
                            >
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[#f0f2ed] transition-colors mb-6">
                                    <item.icon className="w-8 h-8 text-[#556B2F]" />
                                </div>
                                <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                                <p className="text-gray-500">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* TESTIMONIALS */}
            < section className="py-32 bg-[#f8f9f5]" >
                <div className="max-w-7xl mx-auto px-6 text-center mb-20">
                    <motion.h2 {...fadeInUp} className="text-4xl md:text-6xl font-black mb-4 text-[#2d2d2d]">O que nossas alunas dizem</motion.h2>
                    <div className="w-20 h-2 bg-[#556B2F] mx-auto rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { name: 'Mariana S.', location: 'São Paulo, SP', avatar: 'M', text: 'Depois do método da Luciane, finalmente entendi por que minha casa nunca se mantinha. Agora tenho rotina, previsibilidade e paz mental!' },
                            { name: 'Paula R.', location: 'Rio de Janeiro, RJ', avatar: 'P', text: 'Não é faxina. Não é dica solta. É realmente um método que funciona. Minha vida mudou completamente!' },
                            { name: 'Fernanda M.', location: 'Belo Horizonte, MG', avatar: 'F', text: 'Trabalho fora e cuidava da casa sozinha. Estava exausta. O método da Luciane me ajudou sem sacrificar meu bem-estar.' }
                        ].map((dep, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeInUp} transition={{ delay: idx * 0.15 }}
                                className="bg-white p-12 rounded-[50px] premium-shadow border border-gray-50 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500"
                            >
                                <div className="flex gap-1 text-yellow-500 mb-8">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                                </div>
                                <p className="text-[#666] italic leading-relaxed text-lg mb-10">&quot;{dep.text}&quot;</p>
                                <div className="w-16 h-16 bg-[#f0f2ed] rounded-full flex items-center justify-center text-[#556B2F] font-black text-2xl uppercase tracking-tighter mb-4 shadow-inner">{dep.avatar}</div>
                                <div className="font-bold text-gray-900 border-b-2 border-[#556B2F]/10 pb-1">{dep.name}</div>
                                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">{dep.location}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* CTA FORM SECTION */}
            < section className="py-32 relative" id="cta" >
                <div className="absolute inset-0 mesh-gradient opacity-60"></div>
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="glass p-10 md:p-20 rounded-[70px] shadow-[0_100px_100px_-50px_rgba(85,107,47,0.15)] border-white/40"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-[#2d2d2d]">Pronto para participar?</h2>
                            <p className="text-xl text-gray-800 font-bold">Inscreva-se agora e garanta seu lugar no evento.</p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-center">
                            {[
                                { label: 'Data', val: '10 de Março' },
                                { label: 'Horário', val: '20h00' },
                                { label: 'Plataforma', val: 'YouTube' },
                                { label: 'Investimento', val: '100% Grátis' }
                            ].map((info, idx) => (
                                <div key={idx} className="bg-white/60 p-4 rounded-2xl border border-white/50">
                                    <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">{info.label}</div>
                                    <div className="text-sm font-black text-[#556B2F]">{info.val}</div>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-[#2d2d2d] ml-1 tracking-widest uppercase">Seu nome completo</label>
                                    <input
                                        type="text"
                                        placeholder="Seu nome completo"
                                        className="w-full h-16 bg-white/80 border border-gray-100 rounded-2xl px-8 focus:ring-4 focus:ring-[#556B2F]/10 focus:border-[#556B2F] outline-none transition-all shadow-sm font-medium"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-[#2d2d2d] ml-1 tracking-widest uppercase">Seu melhor email</label>
                                    <input
                                        type="email"
                                        placeholder="Seu melhor email"
                                        className="w-full h-16 bg-white/80 border border-gray-100 rounded-2xl px-8 focus:ring-4 focus:ring-[#556B2F]/10 focus:border-[#556B2F] outline-none transition-all shadow-sm font-medium"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-black text-[#2d2d2d] ml-1 tracking-widest uppercase">Seu WhatsApp</label>
                                <PhoneInputWithFlag
                                    value={formData.phone}
                                    onChange={(val, isValid) => setFormData({ ...formData, phone: val, phoneValid: isValid })}
                                    className="!border-gray-100"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className={`w-full h-20 rounded-[2rem] bg-[#556B2F] text-white text-2xl font-black shadow-[0_20px_40px_rgba(85,107,47,0.3)] transition-all flex items-center justify-center gap-4 relative overflow-hidden group ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#6B8E23]'}`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Processando...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>SIM, QUERO PARTICIPAR!</span>
                                        <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                        <p className="text-center mt-8 text-gray-400 text-sm font-medium">Vagas limitadas. Inscrição garantida até 10/03</p>
                    </motion.div>
                </div>
            </section >

            {/* FOOTER */}
            < footer className="py-20 bg-white" >
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 justify-center md:justify-start mb-6">
                            <Sparkles className="w-6 h-6 text-[#556B2F]" />
                            <span className="text-2xl font-black tracking-tight">Casa Organizada</span>
                        </div>
                        <p className="text-gray-400 text-sm font-medium max-w-sm">
                            Por mais de 23 anos, Luciane Coutinho vem ajudando mulheres a transformar suas casas através de um método eficiente e possível.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
                        <div className="flex gap-8 text-sm font-black tracking-widest text-[#556B2F] uppercase">
                            <Link href="/privacidade" className="hover:opacity-70 transition-opacity">Privacidade</Link>
                            <Link href="/termos" className="hover:opacity-70 transition-opacity">Termos</Link>
                        </div>
                        <p className="text-gray-350 text-xs font-bold tracking-widest uppercase">© 2024 Luciane Coutinho. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer >
        </main >
    );
}
