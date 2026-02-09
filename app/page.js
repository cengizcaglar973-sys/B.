"use client";

import { useState } from "react";

export default function KalpAI() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Merhaba 💖 Ben KalpAI. Yaz bana." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userText = input;
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { role: "ai", text: data.reply }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "ai", text: "❌ Bağlantı hatası" }
      ]);
    }

    setLoading(false);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#ffd6e8,#fff)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    }}>

      <h1>💖 KalpAI</h1>

      <div style={{
        width: "100%",
        maxWidth: 500,
        background: "#fff",
        borderRadius: 12,
        padding: 10,
        height: 400,
        overflowY: "auto"
      }}>
        {messages.map((m, i) => (
          <div key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              margin: "6px 0"
            }}>
            <span style={{
              display: "inline-block",
              padding: "6px 10px",
              borderRadius: 10,
              background: m.role === "user" ? "#ffb3d9" : "#eee"
            }}>
              {m.text}
            </span>
          </div>
        ))}
        {loading && <div>Yazıyor...</div>}
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Kalbine ne geliyorsa yaz..."
          style={{ flex: 1, padding: 8 }}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Gönder</button>
      </div>

      <div style={{ marginTop: 20, fontSize: 12, color: "#555" }}>
            ❤️💗❤️
      </div>

    </div>
  );
}
