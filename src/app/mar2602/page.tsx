'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
                    page_path
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirecionar para a página de obrigado
                router.push('/obrigado');
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
        <main className="min-h-screen font-['Plus_Jakarta_Sans'] bg-white selection:bg-teal-500 selection:text-white">

            {/* BACKGROUND GRID (O SEGREDO DO DESIGN) */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] opacity-20"></div>

            {/* HEADER */}
            <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-slate-200' : 'bg-transparent border-transparent'}`}>
                <div className="container mx-auto flex h-16 items-center justify-between px-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 font-bold text-xl text-slate-900 cursor-pointer"
                        onClick={() => scrollToId('home')}
                    >
                        <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                            <Sparkles className="text-white w-5 h-5" />
                        </div>
                        Casa Organizada
                    </motion.div>

                    <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
                        <button onClick={() => scrollToId('problema')} className="hover:text-teal-600 transition-colors">Problemas</button>
                        <button onClick={() => scrollToId('aprender')} className="hover:text-teal-600 transition-colors">O que aprender</button>
                        <button onClick={() => scrollToId('historia')} className="hover:text-teal-600 transition-colors">Sobre Nós</button>
                    </nav>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToId('cta')}
                        className="bg-slate-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-slate-800 transition shadow-lg shadow-slate-900/20"
                    >
                        Inscrição Gratuita
                    </motion.button>
                </div>
            </header>

            {/* HERO SECTION */}
            <section id="home" className="py-12 md:py-20 text-center">
                <div className="container mx-auto px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block py-1.5 px-4 rounded-full bg-teal-50 border border-teal-100/50 text-teal-600 font-bold tracking-widest text-xs uppercase mb-8 shadow-sm"
                    >
                        Sua Casa Organizada
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-8"
                    >
                        Sua casa não precisa de mais <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">esforço</span>. <br />
                        Ela precisa de <span className="text-slate-900 italic font-serif">direção</span>.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-2xl mx-auto text-xl text-slate-500 mb-10 leading-relaxed"
                    >
                        Evento 100% online e gratuito com método inovador para organizar sua casa sem culpa.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 text-slate-400 font-bold tracking-widest text-sm uppercase"
                    >
                        <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-teal-500" /> 10/03/2026</div>
                        <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-teal-500" /> 20h00</div>
                        <div className="flex items-center gap-2"><Youtube className="w-5 h-5 text-red-500" /> YouTube</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <button
                            onClick={() => scrollToId('cta')}
                            className="bg-slate-900 text-white text-lg px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-slate-900/20 transition flex items-center justify-center gap-2"
                        >
                            Quero Organizar Minha Casa <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* PROBLEMA SECTION - BENTO GRID STYLE */}
            <section className="py-16 md:py-20 bg-slate-50/50 border-y border-slate-100" id="problema">
                <div className="container mx-auto px-6">
                    <motion.div {...fadeInUp} className="text-center mb-10 md:mb-14">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Se você sente que...</h2>
                        <div className="w-20 h-1.5 bg-teal-500 mx-auto rounded-full opacity-30"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-6 mb-16">
                        {[
                            { icon: ClipboardList, title: 'Faz muito', desc: 'e nunca termina' },
                            { icon: FireExtinguisher, title: 'Vive apagando', desc: 'incêndio em casa' },
                            { icon: Brain, title: 'Pensa na casa', desc: 'o dia inteiro' },
                            { icon: Dices, title: 'Improvisa a rotina', desc: 'todos os dias' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeInUp} transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                            >
                                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-6">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h3>
                                <p className="text-slate-500 leading-snug">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center p-10 bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <h3 className="text-2xl font-bold mb-4 text-slate-900">O problema NÃO é falta de vontade.</h3>
                        <p className="text-lg text-slate-600 mb-8">
                            É falta de <strong>método</strong>. Na Operação Casa Organizada, você aprenderá como organizar sua rotina doméstica com clareza, lógica e inteligência.
                        </p>
                        <button
                            onClick={() => scrollToId('cta')}
                            className="text-teal-600 font-bold hover:text-teal-700 hover:underline transition-all flex items-center justify-center gap-2 mx-auto"
                        >
                            Garantir minha vaga agora <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* APRENDER SECTION */}
            <section className="py-16 md:py-20" id="aprender">
                <div className="container mx-auto px-6">
                    <motion.div {...fadeInUp} className="text-center mb-10 md:mb-14">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">O que você vai aprender</h2>
                        <p className="text-slate-500 font-medium">Não é faxina. Não é dica solta. É método.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
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
                                className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                            >
                                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 font-bold text-lg">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HISTÓRIA SECTION */}
            <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden" id="historia">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col-reverse lg:flex-row gap-10 md:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <div className="relative rounded-2xl overflow-hidden border-4 border-slate-700 shadow-2xl max-w-md mx-auto">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/Luciane.jpeg"
                                    alt="Luciane Coutinho"
                                    className="w-full aspect-square object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </motion.div>

                        <motion.div {...fadeInUp} className="flex-1">
                            <span className="text-teal-400 font-bold tracking-widest text-sm uppercase mb-2 block">A Especialista</span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">A história de Luciane</h2>
                            <div className="space-y-6 text-lg text-slate-300 leading-relaxed mb-10 font-light">
                                <p>Por <strong className="text-white">mais de 23 anos</strong>, Luciane organizou, administrou e treinou rotinas em casas reais.</p>
                                <p>Casas com funcionária. Casas sem ajuda nenhuma. Casas onde a dona estava exausta, perdida e sobrecarregada.</p>
                                <p className="text-xl font-medium text-white pl-4 border-l-4 border-teal-500">
                                    &quot;O problema das casas não é limpeza. É falta de método.&quot;
                                </p>
                                <p>Assim nasceu um método <strong className="text-white">simples, possível e aplicável</strong> à vida real.</p>
                            </div>
                            <button
                                onClick={() => scrollToId('cta')}
                                className="bg-teal-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-400 transition hover:shadow-lg hover:shadow-teal-500/20"
                            >
                                Quero aprender com Luciane
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-12 md:py-16 border-b border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                        {[
                            { val: '20+', label: 'Anos de Experiência' },
                            { val: '2 MIL', label: 'Residências Transformadas' },
                            { val: '3 MIL', label: 'Profissionais Formados' }
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center py-4 px-4">
                                <div className="text-4xl font-extrabold text-slate-900 mb-2">{stat.val}</div>
                                <div className="text-xs font-bold tracking-widest uppercase text-slate-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BENEFÍCIOS SECTION */}
            <section className="py-16 md:py-20 bg-slate-50/50" id="beneficios">
                <div className="container mx-auto px-6">
                    <motion.div {...fadeInUp} className="text-center mb-10 md:mb-14">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Benefícios Reais</h2>
                        <p className="text-slate-500">O que você ganha ao aplicar o método</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
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
                                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md hover:shadow-lg hover:border-teal-100 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                            >
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4 text-slate-900">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-slate-900">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.h2 {...fadeInUp} className="text-3xl md:text-5xl font-bold text-center text-slate-900 mb-10 md:mb-14">
                        O que nossas alunas dizem
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            { name: 'Mariana S.', location: 'São Paulo, SP', avatar: 'M', text: 'Depois do método da Luciane, finalmente entendi por que minha casa nunca se mantinha. Agora tenho rotina, previsibilidade e paz mental!' },
                            { name: 'Paula R.', location: 'Rio de Janeiro, RJ', avatar: 'P', text: 'Não é faxina. Não é dica solta. É realmente um método que funciona. Minha vida mudou completamente!' },
                            { name: 'Fernanda M.', location: 'Belo Horizonte, MG', avatar: 'F', text: 'Trabalho fora e cuidava da casa sozinha. Estava exausta. O método da Luciane me ajudou sem sacrificar meu bem-estar.' }
                        ].map((dep, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeInUp} transition={{ delay: idx * 0.15 }}
                                className="bg-white p-8 rounded-3xl relative border border-slate-100 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <div className="absolute top-8 right-8 text-teal-200">
                                    <Star className="w-8 h-8 fill-current opacity-20" />
                                </div>
                                <p className="text-slate-600 italic mb-6 leading-relaxed">&quot;{dep.text}&quot;</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold">{dep.avatar}</div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">{dep.name}</div>
                                        <div className="text-xs text-slate-400 font-bold uppercase">{dep.location}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA FORM SECTION */}
            <section className="py-16 md:py-24 relative overflow-hidden" id="cta">
                <div className="absolute inset-0 bg-slate-900 -z-20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/40 via-slate-900 to-slate-900 -z-10"></div>

                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl"
                    >
                        <div className="text-center mb-10 md:mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Pronto para participar?</h2>
                            <p className="text-xl text-slate-400">Inscreva-se agora e garanta seu lugar no evento.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 text-center">
                            {[
                                { label: 'Data', val: '10 de Março' },
                                { label: 'Horário', val: '20h00' },
                                { label: 'Plataforma', val: 'YouTube' },
                                { label: 'Custo', val: '100% Grátis' }
                            ].map((info, idx) => (
                                <div key={idx} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-600/50 shadow-inner">
                                    <div className="text-[10px] text-teal-200/80 uppercase font-black tracking-widest mb-1">{info.label}</div>
                                    <div className="text-sm font-bold text-white">{info.val}</div>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-teal-100 uppercase tracking-widest ml-1">Nome Completo</label>
                                    <input
                                        type="text"
                                        placeholder="Digite seu nome"
                                        className="w-full h-14 bg-white border border-transparent rounded-xl px-6 focus:ring-4 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 shadow-sm"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-teal-100 uppercase tracking-widest ml-1">Email Principal</label>
                                    <input
                                        type="email"
                                        placeholder="seu@email.com"
                                        className="w-full h-14 bg-white border border-transparent rounded-xl px-6 focus:ring-4 focus:ring-teal-500/30 focus:border-teal-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 shadow-sm"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-teal-100 uppercase tracking-widest ml-1">WhatsApp</label>
                                <PhoneInputWithFlag
                                    value={formData.phone}
                                    onChange={(val, isValid) => setFormData({ ...formData, phone: val, phoneValid: isValid })}
                                    className="!border-transparent focus-within:!ring-4 focus-within:!ring-teal-500/30 w-full bg-white shadow-sm"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className={`w-full h-16 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xl font-bold hover:shadow-lg hover:shadow-teal-500/25 transition-all flex items-center justify-center gap-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Processando...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Garantir Minha Vaga</span>
                                        <ArrowRight className="w-6 h-6" />
                                    </>
                                )}
                            </motion.button>
                        </form>
                        <p className="text-center mt-6 text-slate-500 text-sm font-medium">Suas informações estão seguras. Política de zero spam.</p>
                    </motion.div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center">
                            <Sparkles className="text-white w-3 h-3" />
                        </div>
                        <span className="font-bold text-slate-900">Casa Organizada</span>
                    </div>

                    <div className="flex gap-6 text-sm font-bold text-slate-500">
                        <Link href="/privacidade" className="hover:text-teal-600 transition-colors">Privacidade</Link>
                        <Link href="/termos" className="hover:text-teal-600 transition-colors">Termos</Link>
                    </div>

                    <div className="text-slate-400 text-sm">
                        © 2024 Luciane Coutinho.
                    </div>
                </div>
            </footer>
        </main>
    );
}
