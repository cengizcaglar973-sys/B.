"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Send } from "lucide-react";

export default function KalpAISite() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Merhaba 💖 Ben KalpAI. Kalbinden geçeni yaz." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply || "💔 Cevap alınamadı" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Bağlantı hatası oldu." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-pink-100 via-white to-rose-100 flex items-center justify-center p-6 overflow-hidden">

      {/* 💖 UÇUŞAN KALPLER */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: -600, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.8 }}
          className="absolute bottom-0"
          style={{ left: `${10 + i * 10}%` }}
        >
          <Heart className="w-6 h-6 text-pink-400" />
        </motion.div>
      ))}

      {/* 💬 CHAT KUTUSU */}
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6 space-y-4 z-10">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Heart className="text-pink-500" />
          KalpAI Sohbet
        </div>

        <div className="h-[400px] overflow-y-auto space-y-2 border rounded-xl p-3 bg-white">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "ml-auto bg-pink-200"
                  : "bg-gray-100"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="bg-gray-100 p-2 rounded-xl w-fit">
              Yazıyor...
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            placeholder="Kalbine ne geliyorsa yaz..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-xl px-3 py-2"
          />
          <button
            onClick={sendMessage}
            className="bg-pink-500 text-white rounded-xl px-4"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* 👇 ALT İMZA */}
      <div className="absolute bottom-2 text-sm text-gray-500 w-full text-center">
        BY: CENGİZ ÇAĞLAR SARI
      </div>
    </div>
  );
}
