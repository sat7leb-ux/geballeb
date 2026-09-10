"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to Gebal! How can we help you today?",
      sender: "admin",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      setStarted(true);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: `Hi, I'm ${name}. ${email}`,
          sender: "user",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Save message to Supabase
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: input,
        }),
      });
    } catch (error) {
      console.error("Failed to save message:", error);
    }

    // Simulate auto-reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your message! Our team will get back to you shortly. For immediate assistance, call us at +961 76 784 433.",
          sender: "admin",
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-saffron text-ink rounded-full shadow-lg hover:bg-saffronLight transition-all duration-300 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white border border-stone/20 shadow-2xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-ink text-parchment px-4 py-3">
            <h3 className="font-display text-lg">Chat with Us</h3>
            <p className="text-xs text-parchment/60">We typically reply within a few minutes</p>
          </div>

          {!started ? (
            /* Start Chat Form */
            <form onSubmit={handleStart} className="p-4 space-y-3">
              <p className="text-sm text-stone">Start a conversation with our team.</p>
              <div>
                <label className="text-xs text-stone">Your Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-xs text-stone">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-stone/20 px-3 py-2 mt-1 text-sm"
                  placeholder="john@example.com"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-saffron text-ink text-sm py-2 hover:bg-saffronLight transition-colors"
              >
                Start Chat
              </button>
            </form>
          ) : (
            /* Chat Messages */
            <>
              <div className="h-64 overflow-y-auto p-4 space-y-3 bg-paper">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                        msg.sender === "user"
                          ? "bg-saffron text-ink"
                          : "bg-white border border-stone/20 text-stone"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-3 border-t border-stone/10 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-stone/20 px-3 py-2 text-sm outline-none focus:border-saffron"
                />
                <button
                  type="submit"
                  className="p-2 bg-saffron text-ink hover:bg-saffronLight transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
