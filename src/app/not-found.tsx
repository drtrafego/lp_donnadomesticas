'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 font-sans">
            <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Página Não Encontrada (Debug)</h1>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full border border-gray-200">
                <p className="text-gray-700 mb-4">
                    Este é o sistema de captura de erro da <strong>Donna Domestica</strong>.
                </p>
                <div className="text-sm bg-gray-100 p-3 rounded mb-4 overflow-auto">
                    <strong>Detalhes da Requisição:</strong><br />
                    URL: {typeof window !== 'undefined' ? window.location.href : 'Servidor'}<br />
                    Ambiente: {process.env.NODE_ENV}
                </div>
                <div className="flex flex-col gap-2">
                    <Link href="/mar2601" className="bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition">
                        Tentar ir para a Versão Original
                    </Link>
                    <Link href="/debug-probe.html" className="text-blue-600 text-center text-sm underline">
                        Verificar Probe Estático
                    </Link>
                </div>
            </div>
            <p className="mt-8 text-gray-400 text-xs">ID: {Date.now()}</p>
        </div>
    );
}
