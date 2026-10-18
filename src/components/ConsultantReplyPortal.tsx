import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, MessageSquare, ArrowLeft, RefreshCw, User, Phone } from "lucide-react";
import { LiveChatMessage } from "./WhatsAppLiveChatWidget";

interface ConsultantReplyPortalProps {
  sessionId: string;
  onClose: () => void;
}

export const ConsultantReplyPortal: React.FC<ConsultantReplyPortalProps> = ({
  sessionId,
  onClose,
}) => {
  const [messages, setMessages] = useState<LiveChatMessage[]>([]);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [visitorName, setVisitorName] = useState("Visitor");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const fetchSession = async () => {
    try {
      const res = await fetch(`/api/live-chat/session/${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.session) {
          setVisitorName(data.session.visitorName || "Visitor");
          setVisitorPhone(data.session.visitorPhone || "");
          setMessages(data.session.messages || []);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch session:", e);
    }
  };

  useEffect(() => {
    fetchSession();
    const interval = setInterval(fetchSession, 2500);
    return () => clearInterval(interval);
  }, [sessionId]);

  const handleSendReply = async () => {
    if (!replyText.trim() || isSending) return;
    setIsSending(true);
    try {
      const res = await fetch("/api/whatsapp/revert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          content: replyText.trim(),
          consultantName: "Coreenact Support",
        }),
      });

      if (res.ok) {
        setReplyText("");
        setSentSuccess(true);
        setTimeout(() => setSentSuccess(false), 3000);
        await fetchSession();
      }
    } catch (e) {
      console.error("Failed to send reply:", e);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#efeae2] dark:bg-[#0b141a] rounded-2xl w-full max-w-lg shadow-2xl border border-slate-300 dark:border-slate-800 flex flex-col h-[85vh] max-h-[700px] overflow-hidden">
        {/* Header */}
        <div className="bg-[#075E54] dark:bg-[#1f2c34] text-white p-4 flex items-center justify-between shrink-0 shadow">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition cursor-pointer"
              title="Close portal"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base">Reply to {visitorName}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-[11px] text-emerald-100/90 font-mono flex items-center gap-2">
                <span>Session #{sessionId.slice(-8)}</span>
                {visitorPhone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {visitorPhone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={fetchSession}
            className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-800/40 px-4 py-2 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2 shrink-0">
          <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Any reply you submit here appears on the visitor's screen in real time over live WebSocket.</span>
        </div>

        {/* Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500">Loading conversation...</div>
          ) : (
            messages.map((msg) => {
              const isConsultant = msg.sender === "consultant";
              const isVisitor = msg.sender === "visitor";

              return (
                <div
                  key={msg.id}
                  className={`flex ${isConsultant ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm shadow-sm ${
                      isConsultant
                        ? "bg-[#d9fdd3] dark:bg-[#005c4b] text-slate-900 dark:text-white rounded-tr-xs"
                        : isVisitor
                        ? "bg-white dark:bg-[#202c33] text-slate-900 dark:text-white rounded-tl-xs border-l-4 border-[#25D366]"
                        : "bg-white/90 dark:bg-[#182229] text-slate-800 dark:text-slate-200 rounded-tl-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                      <span className="font-bold">{msg.senderName}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Success toast */}
        {sentSuccess && (
          <div className="bg-emerald-600 text-white text-xs py-1.5 px-4 text-center flex items-center justify-center gap-1.5 shrink-0 animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Reply delivered to visitor's screen!</span>
          </div>
        )}

        {/* Input box */}
        <div className="p-3 bg-white dark:bg-[#202c33] border-t border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendReply()}
              placeholder={`Type your reply to ${visitorName}...`}
              className="flex-1 bg-[#f0f2f5] dark:bg-[#2a3942] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#25D366]"
            />
            <button
              onClick={handleSendReply}
              disabled={!replyText.trim() || isSending}
              className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-bold rounded-xl transition disabled:opacity-50 flex items-center gap-1.5 cursor-pointer text-xs sm:text-sm"
            >
              <span>{isSending ? "Sending..." : "Send"}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
