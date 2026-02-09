import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Send } from "lucide-react";

export default function KalpAISite() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Merhaba 💖 Gerçek kalp yapay zekasına bağlandın." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 GERÇEK AI BAĞLANTI (backend tarafında /api/chat endpoint olmalı)
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
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Bağlantı hatası oldu." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-pink-100 via-white to-rose-100 flex items-center justify-center p-6 overflow-hidden">
      {/* 💖 UÇUŞAN KALP ANİMASYONLARI */}
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

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl relative z-10"
      >
        <Card className="rounded-2xl shadow-xl backdrop-blur">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <Heart className="w-6 h-6 text-pink-500" />
              Kalp AI Sohbet
            </div>

            <div className="h-[400px] overflow-y-auto space-y-2 border rounded-xl p-3 bg-white/70">
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
              <Input
                value={input}
                placeholder="Kalbine ne geliyorsa yaz..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} className="rounded-xl">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
          {/* 👇 ALT YAZI */}
      <div className="absolute bottom-2 text-sm text-gray-500 w-full text-center">
        BY: CENGİZ ÇAĞLAR SARI
      </div>
    </div>
  );
}
