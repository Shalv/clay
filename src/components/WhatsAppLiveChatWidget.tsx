import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import {
  Send,
  X,
  RotateCcw,
  Maximize2,
  Minimize2,
  CheckCheck,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export interface LiveChatMessage {
  id: string;
  sessionId: string;
  sender: "visitor" | "consultant" | "bot";
  senderName: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  whatsappUrl?: string;
}

interface WhatsAppLiveChatWidgetProps {
  consultantPhone?: string;
  displayPhone?: string;
}

const DEFAULT_SESSION_KEY = "coreenact_live_session_id";
const DEFAULT_NAME_KEY = "coreenact_visitor_name";
const DEFAULT_PHONE_KEY = "coreenact_visitor_phone";

export const WhatsAppLiveChatWidget: React.FC<WhatsAppLiveChatWidgetProps> = ({
  consultantPhone = "918448796169",
  displayPhone = "+91 84487 96169",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Visitor identity
  const [sessionId, setSessionId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(DEFAULT_SESSION_KEY);
      if (stored) return stored;
      const gen = `WS-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
      localStorage.setItem(DEFAULT_SESSION_KEY, gen);
      return gen;
    } catch {
      return `WS-${Date.now().toString(36).toUpperCase()}`;
    }
  });

  const [visitorName, setVisitorName] = useState<string>(() => {
    try {
      return localStorage.getItem(DEFAULT_NAME_KEY) || "Website Visitor";
    } catch {
      return "Website Visitor";
    }
  });

  const [visitorPhone, setVisitorPhone] = useState<string>(() => {
    try {
      return localStorage.getItem(DEFAULT_PHONE_KEY) || "";
    } catch {
      return "";
    }
  });

  const [messages, setMessages] = useState<LiveChatMessage[]>([
    {
      id: "initial-welcome",
      sessionId: "",
      sender: "bot",
      senderName: "Coreenact Support",
      content: `👋 **Welcome to Coreenact!**\n\nSend your message below to connect with us on WhatsApp. When we reply on WhatsApp, our response will appear right here on your screen automatically.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "read",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setIsConnected] = useState(false);
  const [directWhatsAppUrl, setDirectWhatsAppUrl] = useState<string>(
    `https://wa.me/${consultantPhone}?text=${encodeURIComponent(
      `Hello Coreenact, I am visiting coreenact.com and would like to inquire about Dynamics 365 solutions.`
    )}`
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // Auto-scroll when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Real-time WebSocket connection + HTTP Polling fallback
  useEffect(() => {
    let isCancelled = false;

    const connectWebSocket = () => {
      try {
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const wsUrl = `${protocol}//${window.location.host}/live-chat-ws?sessionId=${sessionId}`;
        const ws = new WebSocket(wsUrl);
        socketRef.current = ws;

        ws.onopen = () => {
          if (!isCancelled) setIsConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "new_message" && data.message) {
              setMessages((prev) => {
                if (prev.some((m) => m.id === data.message.id)) return prev;
                return [...prev, data.message];
              });
            } else if (data.type === "init" && Array.isArray(data.messages) && data.messages.length > 0) {
              setMessages((prev) => {
                const combined = [...prev];
                data.messages.forEach((m: LiveChatMessage) => {
                  if (!combined.some((ex) => ex.id === m.id)) {
                    combined.push(m);
                  }
                });
                return combined;
              });
            }
          } catch (e) {
            console.warn("WS parse error:", e);
          }
        };

        ws.onclose = () => {
          if (!isCancelled) {
            setIsConnected(false);
            // Reconnect after 3s
            setTimeout(connectWebSocket, 3000);
          }
        };

        ws.onerror = () => {
          ws.close();
        };
      } catch (e) {
        console.warn("WebSocket init fallback:", e);
      }
    };

    connectWebSocket();

    // Secondary HTTP Polling (every 2.5s) to guarantee zero dropped messages
    const pollInterval = setInterval(async () => {
      if (!sessionId) return;
      try {
        const res = await fetch(`/api/live-chat/session/${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.messages) && data.messages.length > 0) {
            setMessages((prev) => {
              const ids = new Set(prev.map((p) => p.id));
              const missing = data.messages.filter((m: LiveChatMessage) => !ids.has(m.id));
              if (missing.length > 0) {
                return [...prev, ...missing];
              }
              return prev;
            });
          }
        }
      } catch {}
    }, 2500);

    return () => {
      isCancelled = true;
      clearInterval(pollInterval);
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [sessionId]);

  // Send Visitor Message
  const handleSendMessage = async (textOverride?: string) => {
    const text = (textOverride || inputValue).trim();
    if (!text || isLoading) return;

    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/live-chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          visitorName: visitorName || "Website Visitor",
          visitorPhone,
          content: text,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.whatsappDirectUrl) {
          setDirectWhatsAppUrl(data.whatsappDirectUrl);
        }
        // Append messages if not already arrived via WebSocket
        setMessages((prev) => {
          const next = [...prev];
          if (data.message && !next.some((m) => m.id === data.message.id)) {
            next.push(data.message);
          }
          if (data.botReply && !next.some((m) => m.id === data.botReply.id)) {
            next.push(data.botReply);
          }
          return next;
        });
      }
    } catch (e) {
      console.error("Failed to send message:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSession = () => {
    const newSession = `WS-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
    setSessionId(newSession);
    try {
      localStorage.setItem(DEFAULT_SESSION_KEY, newSession);
    } catch {}

    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sessionId: newSession,
        sender: "bot",
        senderName: "Coreenact Support",
        content: `👋 **New chat started!** Your messages are routed to our WhatsApp. When we reply on WhatsApp, our response will appear right here on your screen automatically.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "read",
      },
    ]);
  };

  const quickPrompts = [
    "Estimate Dynamics NAV to Business Central cloud migration",
    "How does India GST e-invoicing integrate in Business Central?",
    "EdCore Education ERP pricing and demo for colleges",
    "Difference between Business Central Essential and Premium",
    "Can we schedule an architecture discovery call this week?",
  ];

  return (
    <>
      {/* 1. Floating WhatsApp Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-semibold shadow-lg backdrop-blur-md border border-white/10 animate-fade-in">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Chat on WhatsApp</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open WhatsApp Live Chat"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ring-4 ring-emerald-400/30 p-2.5"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-emerald-500 blur-md opacity-50 group-hover:opacity-80 transition duration-300 -z-10" />

            {/* Official WhatsApp Icon */}
            <svg
              className="w-7 h-7 fill-current drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M12.031 2C6.494 2 2 6.494 2 12.031c0 1.83.493 3.555 1.353 5.048L2 22l5.064-1.328A9.97 9.97 0 0 0 12.031 22C17.568 22 22 17.506 22 12.031 22 6.494 17.568 2 12.031 2zm0 18.286c-1.574 0-3.07-.42-4.38-1.156l-.314-.176-3.007.788.803-2.93-.194-.31a8.26 8.26 0 0 1-1.258-4.471c0-4.57 3.717-8.286 8.35-8.286 4.632 0 8.35 3.716 8.35 8.286 0 4.57-3.718 8.286-8.35 8.286zm4.58-6.19c-.25-.125-1.48-.73-1.71-.813-.23-.083-.396-.125-.563.125-.166.25-.646.813-.792.98-.146.166-.292.187-.542.062-.25-.125-1.053-.388-2.006-1.238-.742-.662-1.243-1.48-1.388-1.73-.146-.25-.016-.385.11-.51.114-.114.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.02-.438-.063-.125-.563-1.354-.77-1.854-.203-.487-.41-.42-.563-.428l-.48-.008c-.166 0-.437.062-.666.312-.23.25-.875.854-.875 2.083 0 1.23.896 2.417 1.021 2.583.125.167 1.764 2.695 4.274 3.78.597.258 1.064.413 1.428.529.6.19 1.147.163 1.58.098.481-.072 1.48-.604 1.688-1.188.208-.583.208-1.083.146-1.188-.063-.104-.23-.166-.48-.291z" />
            </svg>

            {/* Online Indicator Dot */}
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white border-2 border-[#25D366]" />
            </span>
          </button>
        </div>
      )}

      {/* 2. WhatsApp Live Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isExpanded
              ? "inset-2 sm:inset-6 md:inset-10"
              : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[460px] md:w-[480px] h-[640px] max-h-[90vh]"
          } flex flex-col bg-[#efeae2] dark:bg-[#0b141a] border border-slate-300 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden font-sans`}
        >
          {/* WhatsApp Header */}
          <div className="bg-[#075E54] dark:bg-[#1f2c34] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-[#054c44] shrink-0 shadow-md">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md shrink-0 ring-2 ring-white/30">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 2C6.494 2 2 6.494 2 12.031c0 1.83.493 3.555 1.353 5.048L2 22l5.064-1.328A9.97 9.97 0 0 0 12.031 22C17.568 22 22 17.506 22 12.031 22 6.494 17.568 2 12.031 2zm0 18.286c-1.574 0-3.07-.42-4.38-1.156l-.314-.176-3.007.788.803-2.93-.194-.31a8.26 8.26 0 0 1-1.258-4.471c0-4.57 3.717-8.286 8.35-8.286 4.632 0 8.35 3.716 8.35 8.286 0 4.57-3.718 8.286-8.35 8.286zm4.58-6.19c-.25-.125-1.48-.73-1.71-.813-.23-.083-.396-.125-.563.125-.166.25-.646.813-.792.98-.146.166-.292.187-.542.062-.25-.125-1.053-.388-2.006-1.238-.742-.662-1.243-1.48-1.388-1.73-.146-.25-.016-.385.11-.51.114-.114.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.02-.438-.063-.125-.563-1.354-.77-1.854-.203-.487-.41-.42-.563-.428l-.48-.008c-.166 0-.437.062-.666.312-.23.25-.875.854-.875 2.083 0 1.23.896 2.417 1.021 2.583.125.167 1.764 2.695 4.274 3.78.597.258 1.064.413 1.428.529.6.19 1.147.163 1.58.098.481-.072 1.48-.604 1.688-1.188.208-.583.208-1.083.146-1.188-.063-.104-.23-.166-.48-.291z" />
                </svg>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
              </div>

              <div className="min-w-0">
                <span className="font-bold text-sm sm:text-base tracking-tight truncate block">
                  Coreenact Support
                </span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-100/90">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>Online</span>
                </div>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open directly in WhatsApp"
                className="px-2 py-1 rounded bg-[#25D366] hover:bg-[#20ba5a] text-slate-900 font-semibold text-xs flex items-center gap-1 transition mr-1"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={handleResetSession}
                title="New chat session"
                className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Collapse" : "Expand"}
                className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition cursor-pointer hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Visitor Quick Profile Bar */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs px-4 py-1.5 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 shrink-0">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Your Info:</span>
            <input
              type="text"
              placeholder="Name"
              value={visitorName}
              onChange={(e) => {
                setVisitorName(e.target.value);
                try {
                  localStorage.setItem(DEFAULT_NAME_KEY, e.target.value);
                } catch {}
              }}
              className="bg-transparent border-b border-slate-300 dark:border-slate-700 px-1 py-0.5 text-xs text-slate-900 dark:text-white outline-none w-24 sm:w-28 focus:border-emerald-500"
            />
            <input
              type="tel"
              placeholder="Phone (Optional)"
              value={visitorPhone}
              onChange={(e) => {
                setVisitorPhone(e.target.value);
                try {
                  localStorage.setItem(DEFAULT_PHONE_KEY, e.target.value);
                } catch {}
              }}
              className="bg-transparent border-b border-slate-300 dark:border-slate-700 px-1 py-0.5 text-xs text-slate-900 dark:text-white outline-none w-28 sm:w-32 focus:border-emerald-500"
            />
          </div>

          {/* Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
            {messages.map((msg) => {
              const isVisitor = msg.sender === "visitor";
              const isConsultant = msg.sender === "consultant";

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isVisitor ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Bubble */}
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm relative ${
                      isVisitor
                        ? "bg-[#d9fdd3] dark:bg-[#005c4b] text-slate-900 dark:text-white rounded-tr-xs"
                        : isConsultant
                        ? "bg-white dark:bg-[#202c33] text-slate-900 dark:text-white rounded-tl-xs border-l-4 border-[#25D366]"
                        : "bg-white/90 dark:bg-[#182229] text-slate-800 dark:text-slate-200 rounded-tl-xs border border-emerald-300/60 dark:border-emerald-800/60"
                    }`}
                  >
                    {/* Header line for sender */}
                    <div className="flex items-center justify-between gap-2 mb-1 pb-1 border-b border-black/5 dark:border-white/5 text-[10px]">
                      <span
                        className={`font-bold flex items-center gap-1 ${
                          isVisitor
                            ? "text-emerald-800 dark:text-emerald-300"
                            : isConsultant
                            ? "text-[#128C7E] dark:text-[#25D366]"
                            : "text-blue-700 dark:text-sky-300"
                        }`}
                      >
                        {msg.senderName}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 text-[10px]">
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Markdown Content */}
                    <div className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none break-words">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-4 mb-1.5 space-y-0.5">{children}</ol>,
                          li: ({ children }) => <li className="leading-snug">{children}</li>,
                          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>

                    {/* Footer read receipts */}
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                      {isVisitor && (
                        <span title="Delivered">
                          <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                        </span>
                      )}
                      {isConsultant && (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5">
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                          <span>WhatsApp</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="rounded-2xl rounded-tl-xs p-3 bg-white dark:bg-[#202c33] text-xs text-slate-500 dark:text-slate-400 shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Sending message to WhatsApp...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          {messages.length <= 4 && (
            <div className="px-3.5 py-2 bg-white/90 dark:bg-[#202c33]/90 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>Suggested Inquiries:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p)}
                    disabled={isLoading}
                    className="text-[11px] text-left px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition cursor-pointer truncate max-w-full"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 sm:p-4 bg-white dark:bg-[#202c33] border-t border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex items-end gap-2 bg-[#f0f2f5] dark:bg-[#2a3942] rounded-2xl p-2 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-[#25D366] transition">
              <textarea
                ref={inputRef}
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 bg-transparent resize-none border-0 focus:outline-none text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 max-h-28 py-1 px-1.5"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className={`p-2.5 rounded-xl font-bold transition flex items-center justify-center shrink-0 cursor-pointer ${
                  inputValue.trim() && !isLoading
                    ? "bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md"
                    : "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-2 px-1">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>WhatsApp Live Chat</span>
              </div>
              <span className="font-mono">Shift+Enter for new line</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
