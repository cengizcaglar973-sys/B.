export async function POST(req) {

  // 1️⃣ Kullanıcının yazdığı mesajı alıyoruz
  const body = await req.json();
  const userMessage = body.message;

  // 2️⃣ Yapay zekaya soru soruyoruz
  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 🔑 gizli anahtar (birazdan anlatacağım)
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Sen kalp temalı, sıcak kanlı bir yapay zekasın."
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    }
  );

  // 3️⃣ Yapay zekanın cevabını alıyoruz
  const data = await response.json();

  // 4️⃣ Cevabı siteye geri gönderiyoruz
  return new Response(
    JSON.stringify({
      reply: data.choices[0].message.content
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
