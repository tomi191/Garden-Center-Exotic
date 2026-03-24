"use client";

import { useState, useEffect } from "react";
import { Mail, MailOpen, Reply, Sparkles, Loader2, Trash2, Archive, Clock, MapPin, Tag, Phone, ChevronDown, ChevronUp, Send, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  location: string;
  inquiry_type: string;
  message: string;
  status: string;
  admin_reply: string | null;
  replied_at: string | null;
  replied_by: string | null;
  created_at: string;
}

const statusLabels: Record<string, { label: string; color: string; icon: typeof Mail }> = {
  new: { label: "Ново", color: "bg-blue-100 text-blue-700", icon: Mail },
  read: { label: "Прочетено", color: "bg-gray-100 text-gray-700", icon: MailOpen },
  replied: { label: "Отговорено", color: "bg-green-100 text-green-700", icon: Reply },
  archived: { label: "Архивирано", color: "bg-amber-100 text-amber-700", icon: Archive },
};

const inquiryLabels: Record<string, string> = {
  general: "Обща информация",
  b2b: "B2B услуги",
  delivery: "Доставка",
  "plant-care": "Грижи за растения",
  complaint: "Оплакване",
};

const locationLabels: Record<string, string> = {
  varna: "Варна",
  "nova-zagora": "Нова Загора",
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/admin/messages?status=${filter}`);
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
    } catch {
      toast.error("Грешка при зареждане");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
      );
      toast.success(`Маркирано като ${statusLabels[status]?.label || status}`);
    } catch {
      toast.error("Грешка");
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете това съобщение?")) return;
    try {
      await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success("Изтрито");
    } catch {
      toast.error("Грешка при изтриване");
    }
  };

  const generateAiReply = async (id: string) => {
    setAiLoading(true);
    try {
      const res = await fetch(`/api/admin/messages/${id}/ai-reply`, { method: "POST" });
      const data = await res.json();
      if (data.reply) {
        setReplyText(data.reply);
        setReplyingTo(id);
        toast.success("AI генерира предложение");
      } else {
        toast.error(data.error || "Грешка");
      }
    } catch {
      toast.error("Грешка при AI генериране");
    } finally {
      setAiLoading(false);
    }
  };

  const sendReply = async (id: string) => {
    if (!replyText.trim()) return;
    setSendingReply(true);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_reply: replyText }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id
              ? { ...m, status: "replied", admin_reply: replyText, replied_at: new Date().toISOString() }
              : m
          )
        );
        setReplyText("");
        setReplyingTo(null);
        toast.success("Отговорът е изпратен по имейл!");
      } else {
        toast.error(data.error || "Грешка");
      }
    } catch {
      toast.error("Грешка при изпращане");
    } finally {
      setSendingReply(false);
    }
  };

  const expand = (msg: ContactMessage) => {
    if (expandedId === msg.id) {
      setExpandedId(null);
      setReplyingTo(null);
    } else {
      setExpandedId(msg.id);
      if (msg.status === "new") {
        updateStatus(msg.id, "read");
      }
    }
  };

  const newCount = messages.filter((m) => m.status === "new").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Съобщения
            {newCount > 0 && (
              <span className="ml-2 px-2.5 py-0.5 bg-blue-500 text-white text-sm rounded-full">
                {newCount} нови
              </span>
            )}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Запитвания от контактната форма</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: "all", label: "Всички" },
          { value: "new", label: "Нови" },
          { value: "read", label: "Прочетени" },
          { value: "replied", label: "Отговорени" },
          { value: "archived", label: "Архивирани" },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => { setFilter(f.value); setLoading(true); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-[var(--color-primary)] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Mail className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>Няма съобщения</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => {
            const st = statusLabels[msg.status] || statusLabels.new;
            const isExpanded = expandedId === msg.id;
            const isReplying = replyingTo === msg.id;

            return (
              <div
                key={msg.id}
                className={`bg-white rounded-xl border transition-all ${
                  msg.status === "new"
                    ? "border-blue-200 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                {/* Message header - clickable */}
                <button
                  onClick={() => expand(msg)}
                  className="w-full p-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors rounded-xl"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    msg.status === "new" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    {msg.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 truncate">{msg.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${st.color}`}>
                        {st.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{msg.message}</p>
                  </div>

                  <div className="hidden sm:flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {inquiryLabels[msg.inquiry_type] || msg.inquiry_type}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {locationLabels[msg.location] || msg.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(msg.created_at).toLocaleDateString("bg-BG")}
                    </span>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                    {/* Contact info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">
                        {msg.email}
                      </a>
                      {msg.phone && (
                        <a href={`tel:${msg.phone}`} className="flex items-center gap-1 text-gray-600">
                          <Phone className="w-3.5 h-3.5" />
                          {msg.phone}
                        </a>
                      )}
                      <span className="text-gray-400">
                        {new Date(msg.created_at).toLocaleString("bg-BG")}
                      </span>
                    </div>

                    {/* Full message */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                    </div>

                    {/* Previous reply */}
                    {msg.admin_reply && (
                      <div className="bg-green-50 rounded-lg p-4 mb-4 border-l-4 border-green-400">
                        <p className="text-xs text-green-600 font-medium mb-2">
                          Отговор от {msg.replied_by} • {msg.replied_at && new Date(msg.replied_at).toLocaleString("bg-BG")}
                        </p>
                        <p className="text-gray-700 whitespace-pre-wrap">{msg.admin_reply}</p>
                      </div>
                    )}

                    {/* Reply area */}
                    {isReplying && (
                      <div className="mb-4 space-y-3">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
                          placeholder="Напишете отговор..."
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => sendReply(msg.id)}
                            disabled={sendingReply || !replyText.trim()}
                            className="bg-[var(--color-primary)] text-sm"
                          >
                            {sendingReply ? (
                              <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Изпращане...</>
                            ) : (
                              <><Send className="w-4 h-4 mr-1" /> Изпрати по имейл</>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => { setReplyingTo(null); setReplyText(""); }}
                            className="text-sm"
                          >
                            <X className="w-4 h-4 mr-1" /> Отказ
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setReplyingTo(msg.id);
                          setReplyText(msg.admin_reply || "");
                        }}
                        className="text-xs"
                      >
                        <Reply className="w-3.5 h-3.5 mr-1" /> Отговори
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateAiReply(msg.id)}
                        disabled={aiLoading}
                        className="text-xs text-purple-600 border-purple-200 hover:bg-purple-50"
                      >
                        {aiLoading ? (
                          <><Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> AI генерира...</>
                        ) : (
                          <><Sparkles className="w-3.5 h-3.5 mr-1" /> AI отговор</>
                        )}
                      </Button>
                      {msg.status !== "archived" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateStatus(msg.id, "archived")}
                          className="text-xs"
                        >
                          <Archive className="w-3.5 h-3.5 mr-1" /> Архивирай
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMessage(msg.id)}
                        className="text-xs text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" /> Изтрий
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
