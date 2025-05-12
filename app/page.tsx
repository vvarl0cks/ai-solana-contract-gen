'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCode = async () => {
    setLoading(true);
    setCode('');

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setCode(data.code || '// No output');
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-green-400 font-vt323 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl space-y-6">
        <h1 className="text-5xl text-green-400 text-center">
          Solana Smart Contract Generator
        </h1>

        <div className="flex flex-col md:flex-row gap-4 items-start">
          <textarea
            className="flex-1 min-h-[200px] bg-black border-2 border-cyan-400 text-green-400 p-4 resize-y outline-none focus:ring-2 focus:ring-cyan-300"
            placeholder="Describe your Solana smart contract..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={generateCode}
            disabled={loading}
            className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-2 text-lg border-none transition-all disabled:opacity-50 h-fit"
          >
            {loading ? 'Generating...' : 'GENERATE CONTRACT'}
          </button>
        </div>

        <pre className="w-full border-2 border-green-500 text-green-400 p-4 text-sm overflow-auto whitespace-pre-wrap min-h-[150px]">
          {code || '// No output'}
        </pre>

        <p className="text-sm text-green-500 text-right">Content Script</p>
      </div>
    </main>
  );
}
