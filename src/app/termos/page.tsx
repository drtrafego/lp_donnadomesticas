'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
                        <FileText className="w-8 h-8 text-[#556B2F]" />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-[#2d2d2d] mb-8">Termos de Uso</h1>

                    <div className="prose prose-slate prose-lg max-w-none text-gray-600 space-y-6">
                        <p>
                            Ao acessar o site <strong>Dona Doméstica</strong>, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.
                        </p>

                        <h2 className="text-xl font-bold text-[#2d2d2d] mt-10">1. Licença de Uso</h2>
                        <p>
                            É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Dona Doméstica, apenas para visualização transitória pessoal e não comercial.
                        </p>

                        <h2 className="text-xl font-bold text-[#2d2d2d] mt-10">2. Isenção de Responsabilidade</h2>
                        <p>
                            Os materiais no site da Dona Doméstica são fornecidos &apos;como estão&apos;. Dona Doméstica não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
                        </p>

                        <h2 className="text-xl font-bold text-[#2d2d2d] mt-10">3. Limitações</h2>
                        <p>
                            Em nenhum caso a Dona Doméstica ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Dona Doméstica.
                        </p>

                        <h2 className="text-xl font-bold text-[#2d2d2d] mt-10">4. Precisão dos Materiais</h2>
                        <p>
                            Os materiais exibidos no site da Dona Doméstica podem incluir erros técnicos, tipográficos ou fotográficos. Dona Doméstica não garante que qualquer material em seu site seja preciso, completo ou atual.
                        </p>

                        <h2 className="text-xl font-bold text-[#2d2d2d] mt-10">5. Links</h2>
                        <p>
                            A Dona Doméstica não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Dona Doméstica do site. O uso de qualquer site vinculado é por conta e risco do usuário.
                        </p>

                        <p className="pt-10 text-sm text-gray-400 font-medium">
                            Estes termos são regidos e interpretados de acordo com as leis do Brasil.
                        </p>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
