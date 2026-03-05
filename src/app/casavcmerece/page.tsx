import React from "react";
import { CheckCircle2, ChevronDown, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";

export default function CasaVoceMerecePage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
            {/* 
        PALETTE:
        Backgrounds: slate-50, white, slate-100
        Primary Trust Color: blue-900, blue-800 (for strong headings)
        Accents: amber-500, amber-600 (for high-ticket feel, buttons, highlights)
        Soft UI: Use subtle shadows and large padding
      */}

            {/* Hero Section */}
            <section className="relative px-6 pt-24 pb-32 text-center bg-gradient-to-b from-white to-slate-50 overflow-hidden">
                <div className="absolute top-0 left-1/2 -matrix-x-1/2 w-[800px] h-[400px] bg-blue-100/50 rounded-full blur-[100px] -z-10 pointer-events-none transform -translate-x-1/2"></div>
                <div className="max-w-4xl mx-auto z-10 relative">
                    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                        Apresentando: A Casa que Você Merece
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
                        Você acabou de descobrir por que sua casa <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">nunca se mantém organizada.</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-slate-600 mb-6">
                        Agora é hora de mudar isso de vez.
                    </p>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        O Método Casa com Direção, testado em 23 anos de casas reais, finalmente disponível para você aplicar na sua rotina, do jeito certo, com acompanhamento.
                    </p>
                    <a href="#oferta" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-gradient-to-r from-blue-600 to-blue-800 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 hover:from-blue-700 hover:to-blue-900 duration-300">
                        QUERO ENTRAR AGORA
                        <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
                    </a>
                </div>
            </section>

            {/* Section 1 & 2: Transition and Agitation */}
            <section className="py-20 px-6 bg-white border-y border-slate-100">
                <div className="max-w-3xl mx-auto space-y-16">
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                            Você esteve no Sua Casa Organizada e saiu de lá com uma certeza:
                        </h2>
                        <p className="text-xl text-blue-700 font-semibold border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                            O problema nunca foi esforço. Foi falta de MÉTODO.
                        </p>
                        <p className="text-lg text-slate-600">
                            Agora você tem duas escolhas. Voltar para a mesma rotina de improviso que te trouxe até aqui. Ou dar o próximo passo com MÉTODO, com estrutura e com quem já transformou centenas de casas reais.
                        </p>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Deixa eu te mostrar o que continua acontecendo sem MÉTODO:</h3>
                        <p className="text-slate-600 text-lg leading-relaxed mb-6">
                            Você acorda já calculando o que precisa ser feito. Passa o dia fazendo e no final a sensação é que não fechou nada. No domingo à noite, a casa já está pedindo atenção de novo. Você improvisa segunda, improvisa terça, improvisa a semana inteira. A casa nunca sai da sua cabeça. Você cansa não de limpeza, mas de pensar.
                        </p>
                        <div className="mt-8 p-6 bg-blue-900 rounded-2xl text-white text-center shadow-xl">
                            <p className="text-xl font-medium mb-2">Isso não é falta de dedicação.</p>
                            <p className="text-3xl font-extrabold text-amber-400">É falta de direção.</p>
                            <p className="mt-4 text-blue-100">E direção tem nome: Método Casa com Direção.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Course Presentation */}
            <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <p className="text-amber-400 font-bold uppercase tracking-wider mb-4">Apresentando</p>
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-8 text-white">A Casa que Você Merece</h2>
                    <p className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
                        O curso completo baseado no Método Casa com Direção, para donas de casa que querem parar de improvisar e ter uma rotina doméstica que funciona na vida real, não numa vida ideal.
                    </p>
                    <p className="mt-8 text-lg text-slate-400 max-w-2xl mx-auto">
                        Não é uma coleção de dicas. Não é teoria. É um sistema estruturado, testado em 23 anos de casas reais, construído para funcionar na sua rotina, com filhos, com marido, com ou sem diarista, nos dias bons e nos dias difíceis.
                    </p>
                </div>
            </section>

            {/* Section 4: 3 Pillars */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Os 3 Pilares do Método</h2>
                        <p className="text-xl text-slate-600">Como o curso é estruturado para garantir sua transformação</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "ORDEM ANTES DA AÇÃO",
                                desc: "Antes de limpar, antes de organizar, antes de qualquer coisa, existe uma ordem. Quem ignora esse pilar trabalha o dobro e colhe a metade. Você vai entender o que precisa acontecer primeiro para tudo o que vem depois funcionar."
                            },
                            {
                                title: "INTELIGÊNCIA DOMÉSTICA",
                                desc: "Casa não se gerencia no improviso. Existe uma inteligência por trás de um lar que funciona e ela pode ser aprendida. Você vai sair do modo reativo e entrar no modo estratégico."
                            },
                            {
                                title: "ROTINA POSSÍVEL",
                                desc: "Não a rotina ideal. A rotina possível, aquela que funciona na sua realidade, com a sua vida, nos seus dias. Uma rotina que não depende de motivação para acontecer."
                            }
                        ].map((pillar, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 relative group">
                                <div className="w-12 h-12 bg-blue-100 text-blue-700 flex items-center justify-center rounded-2xl font-bold text-xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    {i + 1}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{pillar.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 5: Transformation */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">O que muda na sua vida:</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            "Você para de recomeçar do zero toda semana.",
                            "A casa para de ocupar espaço na sua cabeça.",
                            "Você descansa de verdade sem culpa, sem aquela lista mental rodando.",
                            "Sua rotina funciona nos dias difíceis, não só nos dias perfeitos.",
                            "Você para de improvisar e começa a ter direção."
                        ].map((text, i) => (
                            <div key={i} className="flex items-start bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-0.5" />
                                <p className="text-lg text-slate-700 font-medium">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 6: Authority */}
            <section className="py-24 px-6 bg-slate-100">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <div className="aspect-square relative rounded-[2rem] overflow-hidden shadow-xl">
                            <Image
                                src="/Luciane.png"
                                alt="Luciane – Fundadora da Donna Domésticas"
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Quem vai te ensinar isso</h2>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            <strong>Luciane</strong> tem 23 anos de experiência em casas reais. Não ensina o que parece certo, ensina o que foi testado, validado e funciona de verdade.
                        </p>
                        <p className="text-lg text-slate-600">
                            Fundou a Donna Domésticas com um propósito: levar MÉTODO e consciência para dentro dos lares brasileiros.
                        </p>
                        <blockquote className="text-2xl font-bold text-blue-900 italic border-l-4 border-blue-600 pl-6 mt-8">
                            &ldquo;Casa alinhada não prende. Ela liberta.&rdquo;
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Section 7: Bonuses */}
            <section className="py-24 px-6 bg-slate-900 text-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">E tem mais...</h2>
                        <div className="inline-block px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full font-semibold">
                            Atenção aos prazos. Quando o prazo passa, passa.
                        </div>
                        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
                            Os bônus abaixo são por tempo e quantidade limitados.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Bonus 1 */}
                        <div className="bg-slate-800 p-8 rounded-3xl border border-amber-500/30 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-amber-500 text-slate-900 font-bold px-4 py-1 text-sm rounded-bl-xl z-10">
                                5 Vagas
                            </div>
                            <div className="absolute -right-10 -top-10 text-9xl opacity-5 group-hover:scale-110 transition-transform duration-500">🥇</div>
                            <h3 className="text-2xl font-bold text-amber-400 mb-2 relative z-10">🥇 MENTORIA INDIVIDUAL</h3>
                            <p className="text-sm font-semibold text-slate-300 mb-4 relative z-10">Exclusivo para as 5 primeiras vagas</p>
                            <p className="text-slate-400 relative z-10">
                                Uma sessão só sua com a Luciane, 1h a 1h30 aplicando o MÉTODO diretamente na sua casa, na sua rotina, na sua realidade. Sem fórmula genérica. Quando as 5 vagas forem, esse bônus não volta.
                            </p>
                        </div>

                        {/* Bonus 2 */}
                        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-blue-500 text-white font-bold px-4 py-1 text-sm rounded-bl-xl z-10">
                                6ª à 25ª Vaga
                            </div>
                            <div className="absolute -right-10 -top-10 text-9xl opacity-5 group-hover:scale-110 transition-transform duration-500">🤝</div>
                            <h3 className="text-2xl font-bold text-blue-400 mb-2 relative z-10">🤝 MENTORIA EM GRUPO</h3>
                            <p className="text-slate-400 relative z-10">
                                2 encontros ao vivo com a Luciane em grupo reduzido. Aplicação prática, dúvidas respondidas, aprendizado coletivo. Após a 25ª vaga, esse bônus encerra.
                            </p>
                        </div>

                        {/* Bonus 3 */}
                        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-red-500 text-white font-bold px-4 py-1 text-sm rounded-bl-xl z-10">
                                Até 23:59 Hoje
                            </div>
                            <div className="absolute -right-10 -top-10 text-9xl opacity-5 group-hover:scale-110 transition-transform duration-500">⏰</div>
                            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">⏰ PROTOCOLO ANTI-SOBRECARGA</h3>
                            <p className="text-slate-400 mb-4 relative z-10">
                                O Plano de Reorganização Rápida Casa com Direção, para o dia em que tudo sair do eixo.
                            </p>
                            <ul className="space-y-2 mb-4 text-sm text-slate-300 relative z-10">
                                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-400 mr-2" /> 1 aula inicial</li>
                                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-400 mr-2" /> Planner 30 primeiros dias</li>
                                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-400 mr-2" /> PDF de orientação</li>
                                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-400 mr-2" /> 4 áudios guiados</li>
                            </ul>
                            <p className="text-sm font-medium text-amber-300 relative z-10">
                                Para quando a vida acontecer e você precisar recuperar o controle com inteligência. Não com desespero.
                            </p>
                        </div>

                        {/* Bonus 4 */}
                        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-amber-600 text-white font-bold px-4 py-1 text-sm rounded-bl-xl z-10">
                                1ªs 24 Horas
                            </div>
                            <div className="absolute -right-10 -top-10 text-9xl opacity-5 group-hover:scale-110 transition-transform duration-500">⚡</div>
                            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">⚡ ENCONTRO DE IMPLEMENTAÇÃO</h3>
                            <p className="text-slate-400 relative z-10">
                                Um encontro prático onde a Luciane mostra o Método Casa com Direção sendo aplicado em casas reais. Você vai ver o MÉTODO funcionando, não só aprender sobre ele.
                                <br /><br />
                                <strong className="text-white">Você não vai fazer isso sozinha.</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 8: Testimonial placeholder */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 text-center relative">
                        <Star className="text-amber-400 w-12 h-12 mx-auto mb-6 fill-amber-400" />
                        <p className="text-2xl text-slate-700 italic font-light leading-relaxed mb-6">
                            &ldquo;O conteúdo real de depoimento entrará aqui antes da publicação oficial. Deve transmitir a transformação gerada pelo método de forma tocante e autêntica.&rdquo;
                        </p>
                        <div>
                            <p className="font-bold text-slate-900 text-lg">Aluna do Método</p>
                            <p className="text-slate-500">Transformou sua casa</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 9, 10, 11: Investment, Guarantee, CTA */}
            <section id="oferta" className="py-24 px-6 bg-gradient-to-b from-white to-blue-50/50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Quanto vale sair do improviso de vez?</h2>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-blue-100 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-500 via-blue-700 to-amber-500"></div>

                        <div className="flex flex-col items-center">
                            <p className="text-lg font-semibold text-blue-800 uppercase tracking-widest mb-6">A Casa que Você Merece</p>

                            <div className="text-center mb-8">
                                <span className="text-slate-500 font-medium text-xl block mb-2">Por apenas</span>
                                <div className="flex items-start justify-center text-slate-900">
                                    <span className="text-3xl font-bold mt-2 mr-1">12x de R$</span>
                                    <span className="text-7xl font-extrabold tracking-tighter">51</span>
                                    <span className="text-4xl font-bold mt-2">,40</span>
                                </div>
                                <p className="text-slate-500 mt-4 font-medium">Ou R$ 497 à vista</p>
                            </div>

                            <div className="w-full max-w-md">
                                <a
                                    href="#"
                                    className="block w-full text-center px-8 py-5 text-xl font-bold text-white transition-all bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-[0_0_40px_-10px_rgba(34,197,94,0.5)] hover:shadow-[0_0_60px_-10px_rgba(34,197,94,0.6)] hover:-translate-y-1 hover:from-green-400 hover:to-green-500 duration-300"
                                >
                                    QUERO ENTRAR AGORA E GARANTIR MEUS BÔNUS
                                </a>
                            </div>

                            <div className="mt-6 flex items-center text-sm font-medium text-slate-600">
                                <ShieldCheck className="w-5 h-5 text-green-500 mr-2" />
                                Compra 100% segura e acesso imediato
                            </div>
                        </div>

                        <div className="mt-12 pt-12 border-t border-slate-100 grid md:grid-cols-2 gap-8 items-center">
                            <div className="flex items-center justify-center md:justify-start space-x-4">
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="w-8 h-8 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg">7 dias de garantia total</h4>
                                    <p className="text-sm text-slate-600 font-medium">Sem perguntas, sem burocracia.</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed text-center md:text-left">
                                Se em 7 dias você sentir que não era para você, basta pedir o reembolso. 100% do seu dinheiro de volta, sem questionamentos. O risco é todo nosso.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 12: Urgency */}
            <section className="py-16 px-6 bg-slate-900 text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8">Lembra dos bônus?</h2>
                    <div className="space-y-4 text-lg font-medium text-slate-300 mb-10 max-w-xl mx-auto text-left">
                        <p className="flex items-center"><span className="text-2xl mr-3">🥇</span> Mentoria individual : <span className="text-white ml-2">5 vagas. Estão sendo preenchidas.</span></p>
                        <p className="flex items-center"><span className="text-2xl mr-3">⏰</span> Protocolo Anti-Sobrecarga:<span className="text-white ml-2">encerra às 23:59 de hoje.</span></p>
                        <p className="flex items-center"><span className="text-2xl mr-3">⚡</span> Encontro de Implementação:<span className="text-white ml-2">encerra nas primeiras 24 horas.</span></p>
                    </div>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                        Depois desses prazos, o curso continua disponível, mas os bônus não.
                    </p>
                    <a href="#oferta" className="inline-block px-8 py-4 text-lg font-bold text-slate-900 transition-all bg-amber-400 hover:bg-amber-300 rounded-full shadow-lg hover:-translate-y-1 duration-300">
                        GARANTIR MINHA VAGA COM OS BÔNUS
                    </a>
                </div>
            </section>

            {/* Section 13: Objections / FAQ */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Ainda com dúvidas?</h2>
                    <div className="space-y-6">
                        {[
                            { q: `"Já tentei de tudo e nada funcionou."`, a: "Você tentou dicas. Esse é um MÉTODO. A diferença é estrutura." },
                            { q: `"Não tenho tempo."`, a: "O método foi criado para a rotina real, não para uma rotina com tempo sobrando." },
                            { q: `"Minha casa é diferente."`, a: "23 anos de casas reais. Casas grandes, casas pequenas, com filhos, sem ajuda, com diarista. O MÉTODO se adapta." },
                            { q: `"E se não funcionar para mim?"`, a: "7 dias de garantia total. Sem perguntas. Sem risco." },
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{faq.q}</h3>
                                <p className="text-lg text-slate-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 14: Final CTA */}
            <section className="py-24 px-6 bg-blue-900 text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Você pode continuar improvisando.</h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Ou pode entrar agora, garantir seus bônus e começar a semana que vem com método, com direção e com a certeza de que dessa vez é diferente.
                    </p>
                    <a href="#oferta" className="inline-block w-full md:w-auto px-10 py-5 text-xl font-bold text-blue-900 transition-all bg-white rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:bg-slate-50 duration-300 mb-6">
                        ENTRAR AGORA EM A CASA QUE VOCÊ MERECE
                    </a>
                    <p className="text-blue-200 font-medium">
                        12x de R$ 51,40 · R$ 497 à vista · 7 dias de garantia
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-500 py-12 px-6 text-center text-sm">
                <div className="max-w-4xl mx-auto space-y-4">
                    <div className="font-semibold text-slate-400">Donna Domésticas · Método Casa com Direção · 23 anos · Casas reais</div>
                    <p>
                        Dúvidas? <a href="#" className="underline hover:text-white transition-colors">Entre em contato</a>
                    </p>
                    <div className="flex justify-center space-x-4 mt-8 pt-8 border-t border-slate-800">
                        <a href="/termos" className="hover:text-white transition-colors">Termos de Uso</a>
                        <a href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
