"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "whatsapp">("chat");
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

  const handleWhatsApp = () => {
    const phone = "+96176784433";
    const message = encodeURIComponent("Hi Gebal! I'd like to make an inquiry.");
    window.open(`https://wa.me/${phone.replace("+", "")}?text=${message}`, "_blank");
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

          {/* Tabs */}
          <div className="flex border-b border-stone/10">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                activeTab === "chat" ? "text-saffron border-b-2 border-saffron" : "text-stone hover:text-ink"
              }`}
            >
              <MessageCircle size={14} className="inline mr-1" />
              Chat Online
            </button>
            <button
              onClick={() => setActiveTab("whatsapp")}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                activeTab === "whatsapp" ? "text-green-600 border-b-2 border-green-600" : "text-stone hover:text-ink"
              }`}
            >
              <Phone size={14} className="inline mr-1" />
              WhatsApp
            </button>
          </div>

          {activeTab === "whatsapp" ? (
            /* WhatsApp Tab */
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={32} className="text-green-600" />
              </div>
              <h4 className="font-display text-lg text-ink mb-2">Message us on WhatsApp</h4>
              <p className="text-sm text-stone mb-4">
                Tap the button below to start a conversation with our team on WhatsApp.
              </p>
              <p className="text-xs text-stone/60 mb-4">+961 76 784 433</p>
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 text-white text-sm py-3 hover:bg-green-600 transition-colors rounded"
              >
                Open WhatsApp
              </button>
            </div>
          ) : !started ? (
            /* Chat - Start Form */
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
            /* Chat - Messages */
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
