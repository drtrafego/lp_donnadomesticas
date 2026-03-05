"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────
   DESIGN DIRECTION
   Palette:  cream #F8F4EE · sand #E8DDD1 · dark #1A1412
             terracotta #C4714A · gold #B8975C · white #FFFFFF
   Type:     Serif (Playfair Display) headlines + Inter body
   Feel:     Premium editorial, warm luxury, lifestyle-first
───────────────────────────────────────────────────────── */

const bonuses = [
    {
        tag: "5 VAGAS",
        tagColor: "#B8975C",
        icon: "🥇",
        title: "Mentoria Individual",
        desc: "Uma sessão exclusiva com a Luciane, 1h a 1h30 aplicando o MÉTODO diretamente na sua casa, na sua rotina, na sua realidade. Sem fórmula genérica.",
        detail: "Apenas para as 5 primeiras vagas",
    },
    {
        tag: "6ª–25ª VAGA",
        tagColor: "#C4714A",
        icon: "🤝",
        title: "Mentoria em Grupo",
        desc: "2 encontros ao vivo com a Luciane em grupo reduzido. Aplicação prática, dúvidas respondidas, aprendizado coletivo.",
        detail: "Após a 25ª vaga, esse bônus encerra",
    },
    {
        tag: "ATÉ 23:59 HOJE",
        tagColor: "#8B5E3C",
        icon: "⏰",
        title: "Protocolo Anti-Sobrecarga",
        desc: "O Plano de Reorganização Rápida para o dia em que tudo sair do eixo. 1 aula inicial, Planner 30 dias, PDF de orientação e 4 áudios guiados.",
        detail: "Disponível apenas hoje",
    },
    {
        tag: "PRIMEIRAS 24H",
        tagColor: "#9B6B47",
        icon: "⚡",
        title: "Encontro de Implementação",
        desc: "Um encontro prático onde a Luciane mostra o Método sendo aplicado em casas reais. Você vai ver o MÉTODO funcionando, não só aprender sobre ele.",
        detail: "Encerra em 24 horas",
    },
];

const pillars = [
    {
        num: "01",
        title: "Ordem Antes da Ação",
        desc: "Antes de limpar, antes de organizar, existe uma ordem. Quem ignora esse pilar trabalha o dobro e colhe a metade. Você vai entender o que precisa acontecer primeiro.",
    },
    {
        num: "02",
        title: "Inteligência Doméstica",
        desc: "Casa não se gerencia no improviso. Existe uma inteligência por trás de um lar que funciona — e ela pode ser aprendida. Do modo reativo ao modo estratégico.",
    },
    {
        num: "03",
        title: "Rotina Possível",
        desc: "Não a rotina ideal. A rotina possível — que funciona na sua realidade, com a sua vida, nos seus dias. Uma rotina que não depende de motivação para acontecer.",
    },
];

const faqs = [
    { q: "Já tentei de tudo e nada funcionou.", a: "Você tentou dicas. Esse é um MÉTODO. A diferença é estrutura." },
    { q: "Não tenho tempo.", a: "O método foi criado para a rotina real, não para uma rotina com tempo sobrando." },
    { q: "Minha casa é diferente.", a: "23 anos de casas reais — grandes, pequenas, com filhos, sem ajuda, com diarista. O MÉTODO se adapta." },
    { q: "E se não funcionar para mim?", a: "7 dias de garantia total. Sem perguntas. Sem risco. 100% do seu dinheiro de volta." },
];

export default function CasaVoceMerece2Page() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-visible");
                    }
                });
            },
            { threshold: 0.12 }
        );
        document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { font-family: 'Inter', sans-serif; background: #F8F4EE; color: #1A1412; }

        .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.75s ease, transform 0.75s ease; }
        .fade-up.is-visible { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }

        .serif { font-family: 'Playfair Display', Georgia, serif; }

        /* HERO */
        .hero { position: relative; min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; }
        @media (max-width: 900px) { .hero { grid-template-columns: 1fr; } }

        .hero-text { display: flex; flex-direction: column; justify-content: center; padding: 80px 64px; position: relative; z-index: 2; background: #F8F4EE; }
        @media (max-width: 900px) { .hero-text { padding: 80px 32px 48px; order: 2; } }

        .hero-image { position: relative; overflow: hidden; }
        .hero-image::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, #F8F4EE 0%, transparent 30%); z-index: 1; pointer-events: none; }
        @media (max-width: 900px) { .hero-image { height: 55vw; min-height: 300px; order: 1; } .hero-image::after { background: linear-gradient(to top, #F8F4EE 0%, transparent 40%); } }

        .badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border: 1px solid #C4714A40; background: #C4714A10; border-radius: 40px; font-size: 11px; font-weight: 600; color: #C4714A; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 28px; }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #C4714A; animation: pulse 1.8s infinite; }
        @keyframes pulse { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.5; transform:scale(1.4); } }

        h1.hero-title { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 4.5vw, 4.2rem); font-weight: 900; line-height: 1.1; color: #1A1412; margin-bottom: 20px; }
        .hero-title em { font-style: italic; color: #C4714A; }

        .hero-sub { font-size: 1.05rem; color: #5C4E45; line-height: 1.7; margin-bottom: 36px; max-width: 480px; font-weight: 400; }

        .btn-primary { display: inline-flex; align-items: center; gap: 10px; background: #1A1412; color: #F8F4EE; font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 18px 36px; border-radius: 4px; text-decoration: none; transition: background 0.25s, transform 0.2s; }
        .btn-primary:hover { background: #C4714A; transform: translateY(-2px); }

        .btn-gold { display: block; width: 100%; text-align: center; background: #B8975C; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 20px 36px; border-radius: 4px; text-decoration: none; transition: background 0.25s, transform 0.2s; }
        .btn-gold:hover { background: #9B7D4A; transform: translateY(-2px); }

        .price-tag { display: flex; align-items: center; gap: 12px; margin-top: 20px; font-size: 0.82rem; color: #8B7A70; }
        .price-tag span { color: #1A1412; font-weight: 600; }

        /* DIVIDER */
        .section-divider { border: none; border-top: 1px solid #E8DDD1; margin: 0; }

        /* SECTION BASE */
        .section { padding: 100px 0; }
        .container { max-width: 1140px; margin: 0 auto; padding: 0 40px; }
        @media (max-width: 640px) { .container { padding: 0 24px; } .section { padding: 72px 0; } }

        /* LABEL */
        .section-label { font-size: 10px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #B8975C; margin-bottom: 16px; display: block; }

        /* TRANSITION */
        .transition-block { background: #1A1412; color: #F8F4EE; padding: 80px 0; }
        .transition-inner { max-width: 900px; margin: 0 auto; padding: 0 40px; }
        @media (max-width: 640px) { .transition-inner { padding: 0 24px; } }
        .transition-quote { font-family: 'Playfair Display', serif; font-size: clamp(1.6rem, 3vw, 2.8rem); font-weight: 600; line-height: 1.35; color: #F8F4EE; margin-bottom: 20px; }
        .transition-quote em { color: #B8975C; font-style: italic; }

        /* AGITATION */
        .agit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        @media (max-width: 840px) { .agit-grid { grid-template-columns: 1fr; gap: 40px; } }
        .agit-paragraph { font-size: 1.05rem; color: #5C4E45; line-height: 1.85; }
        .agit-callout { background: #F0EADE; border-left: 3px solid #C4714A; padding: 28px 32px; border-radius: 0 8px 8px 0; }
        .agit-callout p { font-family: 'Playfair Display', serif; font-size: 1.4rem; line-height: 1.4; color: #1A1412; font-style: italic; }
        .agit-callout strong { color: #C4714A; font-style: normal; font-weight: 700; }

        /* COURSE */
        .course-section { background: #FFFFFF; }
        .course-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: center; }
        @media (max-width: 840px) { .course-grid { grid-template-columns: 1fr; gap: 40px; } }
        .course-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 900; line-height: 1.15; color: #1A1412; margin-bottom: 20px; }
        .course-desc { font-size: 1rem; color: #5C4E45; line-height: 1.8; }

        /* PILLARS */
        .pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: #E8DDD1; border-radius: 12px; overflow: hidden; margin-top: 64px; }
        @media (max-width: 840px) { .pillars-grid { grid-template-columns: 1fr; } }
        .pillar-card { background: #F8F4EE; padding: 48px 36px; transition: background 0.3s; }
        .pillar-card:hover { background: #FFFFFF; }
        .pillar-num { font-family: 'Playfair Display', serif; font-size: 3.5rem; font-weight: 900; color: #E8DDD1; line-height: 1; margin-bottom: 16px; }
        .pillar-card:hover .pillar-num { color: #C4714A; }
        .pillar-title { font-weight: 600; font-size: 0.95rem; letter-spacing: 0.05em; text-transform: uppercase; color: #1A1412; margin-bottom: 14px; }
        .pillar-desc { font-size: 0.92rem; color: #6B5A52; line-height: 1.75; }

        /* TRANSFORMATION */
        .transform-list { list-style: none; display: flex; flex-direction: column; gap: 20px; margin-top: 48px; }
        .transform-item { display: flex; gap: 20px; align-items: flex-start; padding: 24px 28px; background: #FFFFFF; border-radius: 8px; border: 1px solid #E8DDD1; transition: border-color 0.2s, box-shadow 0.2s; }
        .transform-item:hover { border-color: #C4714A40; box-shadow: 0 4px 24px #C4714A10; }
        .transform-icon { flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%; background: #F0EADE; display: flex; align-items: center; justify-content: center; color: #C4714A; font-size: 1.1rem; }
        .transform-text { font-size: 1rem; color: #3A2E2B; line-height: 1.6; font-weight: 500; padding-top: 8px; }

        /* AUTHORITY */
        .authority-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        @media (max-width: 840px) { .authority-grid { grid-template-columns: 1fr; } }
        .authority-image { position: relative; aspect-ratio: 4/5; border-radius: 12px; overflow: hidden; }
        .authority-content h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 900; color: #1A1412; margin-bottom: 20px; line-height: 1.2; }
        .authority-content p { font-size: 1rem; color: #5C4E45; line-height: 1.8; margin-bottom: 16px; }
        .authority-quote { margin-top: 32px; padding: 28px 32px; background: #1A1412; border-radius: 8px; }
        .authority-quote p { font-family: 'Playfair Display', serif; font-size: 1.35rem; font-style: italic; color: #F8F4EE; line-height: 1.5; }
        .authority-quote cite { display: block; margin-top: 12px; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #B8975C; font-style: normal; }

        /* BONUSES */
        .bonus-section { background: #1A1412; }
        .bonus-header { text-align: center; margin-bottom: 64px; }
        .bonus-header h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 3vw, 3rem); color: #F8F4EE; font-weight: 700; margin-bottom: 16px; }
        .bonus-header p { color: #8B7A70; font-size: 1rem; }
        .bonus-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (max-width: 720px) { .bonus-grid { grid-template-columns: 1fr; } }
        .bonus-card { background: #231F1D; border: 1px solid #3A3330; border-radius: 12px; padding: 36px; position: relative; overflow: hidden; transition: border-color 0.3s; }
        .bonus-card:hover { border-color: #B8975C40; }
        .bonus-tag { display: inline-block; padding: 4px 12px; border-radius: 40px; font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 20px; }
        .bonus-icon { font-size: 2.2rem; margin-bottom: 12px; display: block; }
        .bonus-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: #F8F4EE; margin-bottom: 12px; }
        .bonus-desc { font-size: 0.9rem; color: #8B7A70; line-height: 1.7; margin-bottom: 16px; }
        .bonus-detail { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em; color: #B8975C; }

        /* TESTIMONIAL */
        .testimonial-section { background: #F0EADE; }
        .testimonial-card { max-width: 760px; margin: 0 auto; text-align: center; }
        .testimonial-stars { display: flex; justify-content: center; gap: 4px; margin-bottom: 28px; color: #B8975C; font-size: 1.3rem; }
        .testimonial-quote { font-family: 'Playfair Display', serif; font-size: clamp(1.3rem, 2.5vw, 1.9rem); font-style: italic; line-height: 1.55; color: #1A1412; margin-bottom: 28px; }
        .testimonial-author { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #8B7A70; }
        .testimonial-placeholder { border: 2px dashed #D4C4B4; border-radius: 12px; padding: 60px 40px; }

        /* OFFER */
        .offer-section { background: #FFFFFF; }
        .offer-card { max-width: 680px; margin: 0 auto; background: #F8F4EE; border-radius: 16px; overflow: hidden; border: 1px solid #E8DDD1; box-shadow: 0 20px 80px rgba(26,20,18,0.08); }
        .offer-header { background: #1A1412; padding: 36px 48px; text-align: center; }
        @media (max-width: 640px) { .offer-header { padding: 28px 24px; } }
        .offer-header-label { font-size: 10px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #B8975C; margin-bottom: 8px; display: block; }
        .offer-header h3 { font-family: 'Playfair Display', serif; font-size: 1.7rem; color: #F8F4EE; font-weight: 700; }
        .offer-body { padding: 48px; }
        @media (max-width: 640px) { .offer-body { padding: 28px 24px; } }
        .offer-price { text-align: center; margin-bottom: 36px; }
        .offer-price .from { font-size: 0.85rem; color: #8B7A70; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
        .offer-price .installments { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 900; color: #1A1412; }
        .offer-price .installments sup { font-size: 1.4rem; vertical-align: super; }
        .offer-price .or { font-size: 0.8rem; color: #8B7A70; margin: 8px 0; }
        .offer-price .full { font-size: 1.1rem; font-weight: 600; color: #C4714A; }
        .guarantee { display: flex; align-items: center; gap: 16px; padding: 20px 24px; background: #FFFFFF; border-radius: 8px; border: 1px solid #E8DDD1; margin-top: 24px; }
        .guarantee-icon { flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: #E8F4E8; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
        .guarantee-text h4 { font-weight: 600; font-size: 0.9rem; color: #1A1412; margin-bottom: 2px; }
        .guarantee-text p { font-size: 0.8rem; color: #8B7A70; }

        /* URGENCY */
        .urgency-section { background: #C4714A; }
        .urgency-inner { text-align: center; }
        .urgency-inner h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 2.8rem); color: #FFFFFF; margin-bottom: 40px; }
        .urgency-list { display: flex; flex-direction: column; gap: 16px; max-width: 520px; margin: 0 auto 40px; text-align: left; }
        .urgency-item { display: flex; align-items: center; gap: 16px; background: rgba(255,255,255,0.12); border-radius: 8px; padding: 16px 20px; }
        .urgency-item-icon { font-size: 1.4rem; flex-shrink: 0; }
        .urgency-item p { font-size: 0.95rem; color: #FFFFFF; line-height: 1.5; }
        .urgency-item strong { font-weight: 600; }
        .btn-white { display: inline-block; background: #FFFFFF; color: #1A1412; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 18px 40px; border-radius: 4px; text-decoration: none; transition: background 0.2s, transform 0.2s; }
        .btn-white:hover { background: #F8F4EE; transform: translateY(-2px); }

        /* FAQ */
        .faq-list { max-width: 780px; margin: 0 auto; }
        .faq-item { border-bottom: 1px solid #E8DDD1; }
        .faq-button { width: 100%; text-align: left; background: none; border: none; padding: 28px 0; display: flex; align-items: center; justify-content: space-between; cursor: pointer; gap: 20px; }
        .faq-button-q { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 600; color: #1A1412; line-height: 1.4; }
        .faq-arrow { flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%; border: 1px solid #E8DDD1; display: flex; align-items: center; justify-content: center; transition: transform 0.3s, background 0.2s; font-size: 0.85rem; color: #1A1412; background: #ffffff; }
        .faq-arrow.open { transform: rotate(180deg); background: #1A1412; color: #F8F4EE; border-color: #1A1412; }
        .faq-answer { overflow: hidden; transition: max-height 0.4s ease, padding 0.3s; max-height: 0; padding: 0 0; }
        .faq-answer.open { max-height: 200px; padding: 0 0 24px; }
        .faq-answer p { font-size: 1rem; color: #5C4E45; line-height: 1.75; }

        /* FINAL CTA */
        .final-cta { background: #1A1412; }
        .final-cta-inner { text-align: center; max-width: 720px; margin: 0 auto; }
        .final-cta h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.5rem); color: #F8F4EE; margin-bottom: 16px; line-height: 1.15; }
        .final-cta h2 em { color: #B8975C; font-style: italic; }
        .final-cta p { font-size: 1.05rem; color: #8B7A70; line-height: 1.75; margin-bottom: 40px; }

        /* FOOTER */
        .footer { background: #120F0E; padding: 40px 40px; text-align: center; }
        .footer p { font-size: 0.8rem; color: #4A3E3C; line-height: 2; }
        .footer a { color: #6B5A52; text-decoration: underline; }
        .footer a:hover { color: #B8975C; }
      `}</style>

            {/* ── HERO ── */}
            <div className="hero" ref={heroRef}>
                <div className="hero-text">
                    <div className="badge fade-up"><span className="badge-dot"></span> Método Casa com Direção</div>
                    <h1 className="hero-title fade-up delay-1">
                        Você acabou de descobrir<br />
                        por que sua casa<br />
                        <em>nunca se mantém organizada.</em>
                    </h1>
                    <p className="hero-sub fade-up delay-2">
                        O Método Casa com Direção, testado em 23 anos de casas reais, finalmente disponível para você aplicar na sua rotina, do jeito certo, com acompanhamento.
                    </p>
                    <div className="fade-up delay-3">
                        <a href="#oferta" className="btn-primary">
                            Quero entrar agora
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                        <div className="price-tag">
                            <span>12x de R$ 51,40</span> · <span>R$ 497 à vista</span> · 7 dias de garantia
                        </div>
                    </div>
                </div>
                <div className="hero-image">
                    <Image
                        src="/Luciane.png"
                        alt="Luciane – Fundadora da Donna Domésticas"
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="50vw"
                    />
                </div>
            </div>

            <hr className="section-divider" />

            {/* ── TRANSITION ── */}
            <div className="transition-block">
                <div className="transition-inner">
                    <span className="section-label fade-up" style={{ color: "#B8975C" }}>Você esteve no Sua Casa Organizada</span>
                    <p className="transition-quote fade-up delay-1">
                        O problema nunca foi esforço.<br />
                        <em>Foi falta de MÉTODO.</em>
                    </p>
                    <p className="fade-up delay-2" style={{ fontSize: "1rem", color: "#8B7A70", lineHeight: "1.75", maxWidth: "640px" }}>
                        Agora você tem duas escolhas. Voltar para a mesma rotina de improviso que te trouxe até aqui. Ou dar o próximo passo com MÉTODO, com estrutura e com quem já transformou centenas de casas reais.
                    </p>
                </div>
            </div>

            {/* ── AGITATION ── */}
            <section className="section">
                <div className="container">
                    <div className="agit-grid">
                        <div>
                            <span className="section-label fade-up">Sem método</span>
                            <h2 className="fade-up delay-1" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,2.8vw,2.4rem)", fontWeight: 700, marginBottom: "24px", lineHeight: 1.2, color: "#1A1412" }}>
                                O que continua acontecendo dia após dia
                            </h2>
                            <p className="agit-paragraph fade-up delay-2">
                                Você acorda já calculando o que precisa ser feito. Passa o dia fazendo e no final a sensação é que não fechou nada. No domingo à noite, a casa já está pedindo atenção de novo. Você improvisa segunda, improvisa terça, improvisa a semana inteira. A casa nunca sai da sua cabeça. Você cansa não de limpeza, mas de pensar.
                            </p>
                        </div>
                        <div className="agit-callout fade-up delay-3">
                            <p>
                                Isso não é falta de dedicação.<br /><br />
                                <strong>É falta de direção.</strong><br /><br />
                                E direção tem nome: Método Casa com Direção.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── COURSE ── */}
            <section className="section course-section">
                <div className="container">
                    <div className="course-grid">
                        <div>
                            <span className="section-label fade-up">Apresentando</span>
                            <h2 className="course-title fade-up delay-1">A Casa que<br /><em style={{ color: "#C4714A" }}>Você Merece</em></h2>
                            <p className="course-desc fade-up delay-2">
                                O curso completo baseado no Método Casa com Direção, para donas de casa que querem parar de improvisar e ter uma rotina doméstica que funciona na vida real, não numa vida ideal.
                            </p>
                        </div>
                        <div className="fade-up delay-2">
                            <p style={{ fontSize: "1.05rem", color: "#5C4E45", lineHeight: "1.85", padding: "40px", background: "#F8F4EE", borderRadius: "12px", borderLeft: "3px solid #C4714A" }}>
                                Não é uma coleção de dicas. Não é teoria. É um sistema estruturado, testado em <strong>23 anos de casas reais</strong>, construído para funcionar na sua rotina, com filhos, com marido, com ou sem diarista, nos dias bons e nos dias difíceis.
                            </p>
                            <div style={{ display: "flex", gap: "32px", marginTop: "32px", flexWrap: "wrap" }}>
                                {["23 anos de experiência", "Casas reais", "Método testado"].map((s, i) => (
                                    <div key={i}>
                                        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 900, color: "#1A1412" }}>{i === 0 ? "23" : i === 1 ? "100+" : "1"}</div>
                                        <div style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8B7A70", marginTop: "4px" }}>{s}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pillars */}
                    <div className="pillars-grid">
                        {pillars.map((p, i) => (
                            <div key={i} className={`pillar-card fade-up delay-${i + 1}`}>
                                <div className="pillar-num">{p.num}</div>
                                <div className="pillar-title">{p.title}</div>
                                <p className="pillar-desc">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TRANSFORMATION ── */}
            <section className="section">
                <div className="container" style={{ maxWidth: "880px" }}>
                    <span className="section-label fade-up" style={{ textAlign: "center", display: "block" }}>Transformação</span>
                    <h2 className="fade-up delay-1" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 900, textAlign: "center", color: "#1A1412", marginBottom: "8px" }}>O que muda na sua vida</h2>
                    <ul className="transform-list">
                        {[
                            { icon: "✦", text: "Você para de recomeçar do zero toda semana." },
                            { icon: "✦", text: "A casa para de ocupar espaço na sua cabeça." },
                            { icon: "✦", text: "Você descansa de verdade sem culpa, sem aquela lista mental rodando." },
                            { icon: "✦", text: "Sua rotina funciona nos dias difíceis, não só nos dias perfeitos." },
                            { icon: "✦", text: "Você para de improvisar e começa a ter direção." },
                        ].map((item, i) => (
                            <li key={i} className={`transform-item fade-up delay-${(i % 4) + 1}`}>
                                <div className="transform-icon">{item.icon}</div>
                                <p className="transform-text">{item.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── AUTHORITY ── */}
            <section className="section" style={{ background: "#FFFFFF" }}>
                <div className="container">
                    <div className="authority-grid">
                        <div className="authority-image fade-up">
                            <Image src="/Luciane.png" alt="Luciane" fill className="object-cover object-top" sizes="(max-width:840px) 100vw, 50vw" />
                        </div>
                        <div className="authority-content">
                            <span className="section-label fade-up">Quem vai te ensinar</span>
                            <h2 className="fade-up delay-1">Luciane<br />há 23 anos transformando lares</h2>
                            <p className="fade-up delay-2">
                                Não ensina o que parece certo — ensina o que foi testado, validado e funciona de verdade.
                            </p>
                            <p className="fade-up delay-3">
                                Fundou a Donna Domésticas com um propósito: levar MÉTODO e consciência para dentro dos lares brasileiros. 23 anos depois, centenas de casas transformadas confirmam o que ela sempre soube.
                            </p>
                            <div className="authority-quote fade-up delay-4">
                                <p>&ldquo;Casa alinhada não prende. Ela liberta.&rdquo;</p>
                                <cite>— Luciane, Donna Domésticas</cite>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BONUSES ── */}
            <section className="section bonus-section">
                <div className="container">
                    <div className="bonus-header fade-up">
                        <span className="section-label" style={{ color: "#B8975C", textAlign: "center", display: "block" }}>Bônus Exclusivos</span>
                        <h2>E tem mais — mas atenção aos prazos.</h2>
                        <p>Quando o prazo passa, passa. Sem exceções.</p>
                    </div>
                    <div className="bonus-grid">
                        {bonuses.map((b, i) => (
                            <div key={i} className={`bonus-card fade-up delay-${(i % 4) + 1}`}>
                                <div className="bonus-tag" style={{ background: `${b.tagColor}20`, color: b.tagColor }}>{b.tag}</div>
                                <span className="bonus-icon">{b.icon}</span>
                                <h3 className="bonus-title">{b.title}</h3>
                                <p className="bonus-desc">{b.desc}</p>
                                <p className="bonus-detail">{b.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIAL ── */}
            <section className="section testimonial-section">
                <div className="container">
                    <div className="testimonial-card fade-up">
                        <div className="testimonial-placeholder">
                            <div className="testimonial-stars">{"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}</div>
                            <p className="testimonial-quote">
                                &ldquo;O depoimento real de uma aluna entrará aqui antes da publicação oficial. Uma história de transformação real, contada pela própria.&rdquo;
                            </p>
                            <p className="testimonial-author">— Aluna do Método · Sua casa transformada</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── OFFER ── */}
            <section id="oferta" className="section offer-section">
                <div className="container">
                    <div className="fade-up" style={{ textAlign: "center", marginBottom: "48px" }}>
                        <span className="section-label">Investimento</span>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 900, color: "#1A1412" }}>Quanto vale sair do improviso de vez?</h2>
                    </div>
                    <div className="offer-card fade-up delay-1">
                        <div className="offer-header">
                            <span className="offer-header-label">A Casa que Você Merece</span>
                            <h3>Acesso imediato + todos os bônus</h3>
                        </div>
                        <div className="offer-body">
                            <div className="offer-price">
                                <p className="from">Por apenas</p>
                                <div className="installments">
                                    <sup>12× R$</sup>51<sup>,40</sup>
                                </div>
                                <p className="or">ou</p>
                                <p className="full">R$ 497 à vista</p>
                            </div>
                            <a href="#" className="btn-gold">Quero entrar agora e garantir meus bônus</a>
                            <div className="guarantee">
                                <div className="guarantee-icon">🛡</div>
                                <div className="guarantee-text">
                                    <h4>7 dias de garantia total</h4>
                                    <p>Sem perguntas, sem burocracia. 100% do seu dinheiro de volta, sem questionamentos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── URGENCY ── */}
            <section className="section urgency-section">
                <div className="container">
                    <div className="urgency-inner">
                        <span className="section-label fade-up" style={{ color: "rgba(255,255,255,0.6)", textAlign: "center", display: "block" }}>Lembra dos bônus?</span>
                        <h2 className="fade-up delay-1">Os prazos são reais.</h2>
                        <div className="urgency-list fade-up delay-2">
                            {[
                                { icon: "🥇", text: <>Mentoria individual: <strong>5 vagas. Estão sendo preenchidas.</strong></> },
                                { icon: "⏰", text: <>Protocolo Anti-Sobrecarga: <strong>encerra às 23:59 de hoje.</strong></> },
                                { icon: "⚡", text: <>Encontro de Implementação: <strong>encerra nas primeiras 24 horas.</strong></> },
                            ].map((u, i) => (
                                <div key={i} className="urgency-item">
                                    <span className="urgency-item-icon">{u.icon}</span>
                                    <p>{u.text}</p>
                                </div>
                            ))}
                        </div>
                        <a href="#oferta" className="btn-white fade-up delay-3">Garantir minha vaga com os bônus</a>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <span className="section-label fade-up">Ainda com dúvidas?</span>
                        <h2 className="fade-up delay-1" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 900, color: "#1A1412" }}>Deixa eu responder</h2>
                    </div>
                    <div className="faq-list">
                        {faqs.map((f, i) => (
                            <div key={i} className={`faq-item fade-up delay-${(i % 4) + 1}`}>
                                <button className="faq-button" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    <span className="faq-button-q">{f.q}</span>
                                    <span className={`faq-arrow ${openFaq === i ? "open" : ""}`}>▾</span>
                                </button>
                                <div className={`faq-answer ${openFaq === i ? "open" : ""}`}>
                                    <p>{f.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="section final-cta">
                <div className="container">
                    <div className="final-cta-inner">
                        <span className="section-label fade-up" style={{ color: "#B8975C", textAlign: "center", display: "block" }}>A escolha é sua</span>
                        <h2 className="fade-up delay-1">
                            Você pode continuar<br />
                            <em>improvisando.</em>
                        </h2>
                        <p className="fade-up delay-2">
                            Ou pode entrar agora, garantir seus bônus e começar a semana que vem com método, com direção e com a certeza de que dessa vez é diferente.
                        </p>
                        <div className="fade-up delay-3">
                            <a href="#oferta" className="btn-gold" style={{ display: "inline-block", maxWidth: "480px" }}>
                                Entrar agora em A Casa que Você Merece
                            </a>
                            <div className="price-tag" style={{ justifyContent: "center", color: "#4A3E3C" }}>
                                <span style={{ color: "#8B7A70" }}>12x de R$ 51,40</span> · <span style={{ color: "#8B7A70" }}>R$ 497 à vista</span> · <span style={{ color: "#8B7A70" }}>7 dias de garantia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="footer">
                <p>
                    <strong style={{ color: "#4A3E3C" }}>Donna Domésticas · Método Casa com Direção · 23 anos · Casas reais</strong><br />
                    Dúvidas? <a href="#">Entre em contato</a><br />
                    <a href="/termos">Termos de Uso</a> · <a href="/privacidade">Política de Privacidade</a>
                </p>
            </footer>
        </>
    );
}
