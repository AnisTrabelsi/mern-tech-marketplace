// frontend/src/components/ChatAssistant.jsx
import { useState, useRef, useEffect } from 'react';
import api from '../api/axios';

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour ! Comment puis-je vous aider à choisir un produit ?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // scroll auto en bas
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input.trim() };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await api.post('/ai/assistant', {
        messages: [...messages, userMsg]  // historique complet
      });
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '🤖 Désolé, le service est indisponible.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => e.key === 'Enter' && !e.shiftKey && send();

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-2xl flex flex-col max-h-[80vh]">
      {/* Header */}
      <div className="bg-purple-600 text-white text-center py-2 rounded-t-2xl">
        Assistant d’achat
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === 'user'
                ? 'text-right'
                : 'text-left bg-gray-100 p-2 rounded'
            }
          >
            {m.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Posez votre question..."
          className="flex-1 resize-none border rounded px-2 py-1 focus:outline-none"
        />
        <button
          onClick={send}
          disabled={loading}
          className="bg-purple-600 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          {loading ? '...' : 'Envoyer'}
        </button>
      </div>
    </div>
  );
}
