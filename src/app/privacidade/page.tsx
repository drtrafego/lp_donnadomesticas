'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#fdfdfb] selection:bg-[#556B2F] selection:text-white pb-20">
            {/* Header / Nav */}
            <nav className="p-6 max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-[#556B2F] font-bold hover:opacity-70 transition-opacity">
                    <ArrowLeft className="w-5 h-5" />
                    Voltar para a Página Inicial
                </Link>
            </nav>

            <section className="max-w-4xl mx-auto px-6 pt-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-8 md:p-16 rounded-[40px] border-[#556B2F]/10"
                >
                    <div className="w-16 h-16 bg-[#556B2F]/10 rounded-2xl flex items-center justify-center mb-8">
                        <Shield className="w-8 h-8 text-[#556B2F]" />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-[#2d2d2d] mb-8">Política de Privacidade</h1>

                    <div className="prose prose-slate prose-lg max-w-none text-gray-600 space-y-6">
                        <p>
                            A sua privacidade é importante para nós. É política do site <strong>Dona Doméstica</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site.
                        </p>

                        <h2 className="text-xl font-bold text-[#2d2d2d] mt-10">1. Coleta de Informações</h2>
                        <p>
                            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                        </p>

                        <h2 className="text-xl font-bold text-[#2d2d2d] mt-10">2. Uso das Informações</h2>
                        <p>
                            Os dados coletados (nome, e-mail e WhatsApp) são utilizados exclusivamente para entrar em contato com você sobre o evento <strong>Operação Casa Organizada</strong> e fornecer informações relevantes sobre nossos serviços de organização residencial.
                        </p>

                        <h2 className="text-xl font-bold text-[#2d2d2d] mt-10">3. Retenção de Dados</h2>
                        <p>
                            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                        </p>

                        <h2 className="text-xl font-bold text-[#2d2d2d] mt-10">4. Compartilhamento</h2>
                        <p>
                            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                        </p>

                        <h2 className="text-xl font-bold text-[#2d2d2d] mt-10">5. Seus Direitos</h2>
                        <p>
                            Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados. O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais.
                        </p>

                        <p className="pt-10 text-sm text-gray-400 font-medium">
                            Esta política é efetiva a partir de Fevereiro de 2024.
                        </p>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
