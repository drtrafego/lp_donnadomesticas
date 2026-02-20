'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Redirecionamento temporário para a versão original (mar2601)
        // Futuramente aqui pode entrar lógica de Teste A/B
        router.push('/mar2601');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdfdfb]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#556B2F]/20 border-t-[#556B2F] rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium">Carregando...</p>
            </div>
        </div>
    );
}
