'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Erro capturado no Next.js:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Algo deu errado!</h2>
            <pre className="bg-gray-100 p-4 rounded text-xs mb-4 max-w-full overflow-auto">
                {error.message}
            </pre>
            <button
                onClick={() => reset()}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Tentar Novamente
            </button>
        </div>
    );
}
