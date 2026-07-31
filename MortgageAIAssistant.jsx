import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Home,
  MessageSquare,
  History,
  UploadCloud,
  ScrollText,
  BookOpen,
  Settings as SettingsIcon,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  Send,
  Paperclip,
  Mic,
  FileText,
  File,
  X,
  Menu,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Sun,
  Moon,
  Globe,
  Check,
  Trash2,
  MoreVertical,
  Building2,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------
   DESIGN TOKENS
   Primary   #0F172A  (deep navy — nav / sidebar / headings)
   Secondary #2563EB  (banking blue — primary actions / links)
   Accent    #10B981  (emerald — success / positive signals)
   Surface   #F8FAFC  (app background)
   Card      #FFFFFF
   Text      #1E293B / #64748B
   Signature motif: a thin "amortization curve" — the crossing principal /
   interest lines of a mortgage schedule — used as an ambient watermark
   behind the hero and as a ring around the AI avatar. It's the one
   concretely "mortgage" shape in an otherwise restrained SaaS shell.
------------------------------------------------------------------- */
const COLORS = {
  primary: "#0F172A",
  primaryLight: "#1E293B",
  secondary: "#2563EB",
  secondaryLight: "#3B82F6",
  accent: "#10B981",
  surface: "#F8FAFC",
  card: "#FFFFFF",
  textMain: "#1E293B",
  textSub: "#64748B",
  border: "#E2E8F0",
};

/* Amortization-curve watermark — two intersecting bezier "paydown" lines */
function AmortWatermark({ className = "", opacity = 0.08 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 900 300"
      fill="none"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <path
        d="M0,40 C200,40 250,260 900,260"
        stroke={COLORS.secondary}
        strokeWidth="3"
      />
      <path
        d="M0,260 C250,260 300,40 900,40"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------
   NAVBAR
------------------------------------------------------------------- */
function Navbar({ onToggleSidebar, onOpenSearch, view }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Your rate-lock document was analyzed.", time: "2m ago" },
    { id: 2, text: "New knowledge base article: FHA vs. Conventional.", time: "1h ago" },
    { id: 3, text: "Weekly loan insights report is ready.", time: "Yesterday" },
  ];

  return (
    <header
      className="h-16 w-full flex items-center justify-between px-4 md:px-6 border-b sticky top-0 z-30"
      style={{ backgroundColor: COLORS.primary, borderColor: "#1E293B" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-white/10 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{ backgroundColor: COLORS.secondary }}
        >
          <Building2 size={18} className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-white font-semibold text-[15px] leading-tight tracking-tight truncate">
            MortgageAI
          </p>
          <p className="text-[11px] text-slate-400 leading-tight hidden sm:block">
            Intelligent Mortgage Assistant
          </p>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm text-slate-400 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <Search size={15} />
          <span>Search conversations, documents, policies…</span>
        </button>
      </div>

      <div className="flex items-center gap-1.5 md:gap-3">
        <button
          onClick={onOpenSearch}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-white/10 transition-colors"
        >
          <Search size={19} />
        </button>

        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((o) => !o);
              setProfileOpen(false);
            }}
            className="relative p-2 rounded-lg text-slate-300 hover:bg-white/10 transition-colors"
          >
            <Bell size={19} />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full ring-2"
              style={{ backgroundColor: COLORS.accent, ringColor: COLORS.primary }}
            />
          </button>
          {notifOpen && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-xl shadow-2xl border overflow-hidden animate-[fadeIn_.15s_ease-out]"
              style={{ backgroundColor: COLORS.card, borderColor: COLORS.border }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: COLORS.border }}>
                <p className="font-semibold text-sm" style={{ color: COLORS.textMain }}>
                  Notifications
                </p>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-3 border-b last:border-0 hover:bg-slate-50 cursor-pointer transition-colors"
                    style={{ borderColor: COLORS.border }}
                  >
                    <p className="text-sm" style={{ color: COLORS.textMain }}>
                      {n.text}
                    </p>
                    <p className="text-xs mt-1" style={{ color: COLORS.textSub }}>
                      {n.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((o) => !o);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
              style={{ backgroundColor: COLORS.accent }}
            >
              JS
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </button>
          {profileOpen && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl border overflow-hidden"
              style={{ backgroundColor: COLORS.card, borderColor: COLORS.border }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: COLORS.border }}>
                <p className="font-semibold text-sm" style={{ color: COLORS.textMain }}>
                  Jordan Silva
                </p>
                <p className="text-xs" style={{ color: COLORS.textSub }}>
                  Loan Officer · Premium
                </p>
              </div>
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors" style={{ color: COLORS.textMain }}>
                My Profile
              </button>
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors" style={{ color: COLORS.textMain }}>
                Preferences
              </button>
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 text-red-500 transition-colors border-t" style={{ borderColor: COLORS.border }}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------
   SIDEBAR
------------------------------------------------------------------- */
function Sidebar({ view, setView, sidebarOpen, setSidebarOpen }) {
  const items = [
    { id: "dashboard", label: "New Chat", icon: MessageSquare, primary: true },
    { id: "history", label: "Chat History", icon: History },
    { id: "upload", label: "Upload Documents", icon: UploadCloud },
    { id: "policies", label: "Mortgage Policies", icon: ScrollText },
    { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
  ];
  const bottomItems = [
    { id: "settings", label: "Settings", icon: SettingsIcon },
    { id: "help", label: "Help", icon: HelpCircle },
  ];

  const NavButton = ({ id, label, icon: Icon }) => {
    const active = view === id;
    return (
      <button
        onClick={() => {
          setView(id);
          setSidebarOpen(false);
        }}
        className={`group w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          active ? "shadow-sm" : "hover:bg-white/[0.06]"
        }`}
        style={{
          backgroundColor: active ? "rgba(37,99,235,0.15)" : "transparent",
          color: active ? "#93C5FD" : "#CBD5E1",
        }}
      >
        <Icon
          size={17}
          className="transition-transform duration-200 group-hover:scale-110"
          style={{ color: active ? COLORS.secondaryLight : "#94A3B8" }}
        />
        <span className="truncate">{label}</span>
        {active && (
          <span
            className="ml-auto w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: COLORS.secondaryLight }}
          />
        )}
      </button>
    );
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 left-0 h-screen lg:h-[calc(100vh-4rem)] w-72 z-50 lg:z-0 flex flex-col border-r transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ backgroundColor: COLORS.primary, borderColor: "#1E293B" }}
      >
        <div className="lg:hidden flex items-center justify-between px-4 h-16 border-b" style={{ borderColor: "#1E293B" }}>
          <span className="text-white font-semibold">Menu</span>
          <button onClick={() => setSidebarOpen(false)} className="p-2 text-slate-300">
            <X size={18} />
          </button>
        </div>

        <div className="p-3 pt-4">
          <button
            onClick={() => setView("dashboard")}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: COLORS.secondary }}
          >
            <Sparkles size={16} />
            New Conversation
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {items.map((it) => (
            <NavButton key={it.id} {...it} />
          ))}
        </nav>

        <div className="px-3 py-3 space-y-1 border-t" style={{ borderColor: "#1E293B" }}>
          {bottomItems.map((it) => (
            <NavButton key={it.id} {...it} />
          ))}
          <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/[0.06] hover:text-red-400 transition-colors">
            <LogOut size={17} />
            Logout
          </button>
        </div>

        <div className="p-3">
          <div
            className="rounded-xl p-3 flex items-center gap-2.5"
            style={{ backgroundColor: "rgba(16,185,129,0.1)" }}
          >
            <ShieldCheck size={16} style={{ color: COLORS.accent }} />
            <p className="text-[11px] leading-tight text-slate-300">
              Bank-grade encryption on all documents
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ------------------------------------------------------------------
   DASHBOARD
------------------------------------------------------------------- */
function Dashboard({ startChat }) {
  const features = [
    {
      icon: Home,
      title: "Mortgage Guidance",
      desc: "Get clear answers on rates, terms, and the right loan program for your goals.",
      color: COLORS.secondary,
    },
    {
      icon: FileText,
      title: "Document Analysis",
      desc: "Upload pay stubs, W-2s, and disclosures for instant, structured review.",
      color: COLORS.accent,
    },
    {
      icon: MessageSquare,
      title: "AI Chat",
      desc: "Ask questions in plain language and get grounded, cited responses.",
      color: COLORS.secondary,
    },
    {
      icon: BarChart3,
      title: "Loan Insights",
      desc: "Visualize amortization, payment breakdowns, and affordability at a glance.",
      color: COLORS.accent,
    },
  ];

  const prompts = [
    "What's the difference between a 15 and 30-year fixed loan?",
    "Estimate my monthly payment for a $450,000 home",
    "What documents do I need for pre-approval?",
    "Explain PMI and how to avoid it",
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="relative rounded-3xl overflow-hidden mb-12 px-6 md:px-12 py-12 md:py-16 text-center" style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}>
        <AmortWatermark className="absolute inset-0 w-full h-full" opacity={0.06} />
        <div className="relative">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ backgroundColor: "rgba(37,99,235,0.08)", color: COLORS.secondary }}
          >
            <Sparkles size={13} />
            Powered by conversational AI
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: COLORS.primary }}
          >
            Welcome to Mortgage AI
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: COLORS.textSub }}>
            Your intelligent mortgage assistant.
          </p>
          <button
            onClick={() => startChat()}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            style={{ backgroundColor: COLORS.secondary }}
          >
            Start a conversation
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {features.map((f) => (
          <div
            key={f.title}
            className="group rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
            }}
            onClick={() => startChat()}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${f.color}15` }}
            >
              <f.icon size={20} style={{ color: f.color }} />
            </div>
            <h3 className="font-semibold mb-1.5" style={{ color: COLORS.textMain }}>
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: COLORS.textSub }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-sm font-semibold mb-3" style={{ color: COLORS.textSub }}>
          Try asking
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prompts.map((p) => (
            <button
              key={p}
              onClick={() => startChat(p)}
              className="text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.textMain,
                boxShadow: "0 1px 2px rgba(15,23,42,0.03)",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   CHAT SCREEN
------------------------------------------------------------------- */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{
            backgroundColor: COLORS.secondary,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

function ChatScreen({ initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = useCallback(
    (text) => {
      const value = (text ?? input).trim();
      if (!value) return;
      setMessages((m) => [...m, { role: "user", text: value }]);
      setInput("");
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((m) => [
          ...m,
          {
            role: "ai",
            text: "Based on current guidelines, here's a concise breakdown for your scenario. I've factored in typical rate assumptions — let me know if you'd like this tailored to your exact credit profile or down payment.",
          },
        ]);
      }, 1400);
    },
    [input]
  );

  useEffect(() => {
    if (initialMessages.length === 1) {
      // auto-run a starter response for demo purposes
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setMessages((m) => [
          ...m,
          {
            role: "ai",
            text: "Great question. Let's walk through it together — I'll break down the key numbers and what they mean for your monthly payment.",
          },
        ]);
      }, 1200);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative"
                style={{
                  backgroundColor: m.role === "user" ? COLORS.primary : COLORS.secondary,
                }}
              >
                {m.role === "ai" && (
                  <span
                    className="absolute -inset-1 rounded-full"
                    style={{ boxShadow: `0 0 0 2px ${COLORS.accent}30` }}
                  />
                )}
                {m.role === "user" ? (
                  <span className="text-white text-[11px] font-semibold">JS</span>
                ) : (
                  <Sparkles size={14} className="text-white" />
                )}
              </div>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"
                }`}
                style={{
                  backgroundColor: m.role === "user" ? COLORS.secondary : COLORS.card,
                  color: m.role === "user" ? "#fff" : COLORS.textMain,
                  border: m.role === "ai" ? `1px solid ${COLORS.border}` : "none",
                  boxShadow: m.role === "ai" ? "0 1px 2px rgba(15,23,42,0.04)" : "none",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: COLORS.secondary }}
              >
                <Sparkles size={14} className="text-white" />
              </div>
              <div
                className="px-4 py-3.5 rounded-2xl rounded-tl-sm"
                style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
              >
                <TypingDots />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t px-4 md:px-6 py-4" style={{ borderColor: COLORS.border, backgroundColor: COLORS.card }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="flex items-end gap-2 rounded-2xl border px-3 py-2.5 transition-shadow focus-within:shadow-md"
            style={{ borderColor: COLORS.border, backgroundColor: COLORS.surface }}
          >
            <button className="p-2 rounded-lg hover:bg-slate-200/60 transition-colors flex-shrink-0" style={{ color: COLORS.textSub }}>
              <Paperclip size={18} />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Ask about rates, documents, or eligibility…"
              className="flex-1 bg-transparent resize-none outline-none text-sm py-1.5 max-h-32"
              style={{ color: COLORS.textMain }}
            />
            <button className="p-2 rounded-lg hover:bg-slate-200/60 transition-colors flex-shrink-0" style={{ color: COLORS.textSub }}>
              <Mic size={18} />
            </button>
            <button
              onClick={() => send()}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl text-white flex-shrink-0 transition-transform duration-150 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
              style={{ backgroundColor: COLORS.secondary }}
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-[11px] text-center mt-2" style={{ color: COLORS.textSub }}>
            MortgageAI can make mistakes. Verify important information with your loan officer.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   UPLOAD SCREEN
------------------------------------------------------------------- */
function UploadScreen() {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([
    { name: "Pay_Stub_June.pdf", size: "1.2 MB", type: "pdf", status: "Analyzed" },
    { name: "W2_2025.pdf", size: "840 KB", type: "pdf", status: "Analyzed" },
    { name: "Bank_Statement.docx", size: "2.1 MB", type: "docx", status: "Processing" },
  ]);

  const addDemoFile = () => {
    setFiles((f) => [
      { name: "Loan_Disclosure.pdf", size: "560 KB", type: "pdf", status: "Processing" },
      ...f,
    ]);
  };

  const removeFile = (idx) => setFiles((f) => f.filter((_, i) => i !== idx));

  const iconFor = (type) => (type === "docx" ? File : FileText);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.primary }}>
        Upload Documents
      </h2>
      <p className="text-sm mb-8" style={{ color: COLORS.textSub }}>
        Securely share your paperwork for instant AI-assisted review.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addDemoFile();
        }}
        onClick={addDemoFile}
        className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center py-14 px-6 cursor-pointer transition-colors duration-200"
        style={{
          borderColor: dragOver ? COLORS.secondary : COLORS.border,
          backgroundColor: dragOver ? "rgba(37,99,235,0.04)" : COLORS.card,
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{ backgroundColor: "rgba(37,99,235,0.08)" }}
        >
          <UploadCloud size={28} style={{ color: COLORS.secondary }} />
        </div>
        <p className="font-semibold mb-1" style={{ color: COLORS.textMain }}>
          Drag &amp; drop files here, or click to browse
        </p>
        <p className="text-sm mb-4" style={{ color: COLORS.textSub }}>
          Supported formats: PDF, DOCX, TXT · Max 25MB per file
        </p>
        <div className="flex gap-2">
          {["PDF", "DOCX", "TXT"].map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-xs font-medium"
              style={{ backgroundColor: COLORS.surface, color: COLORS.textSub, border: `1px solid ${COLORS.border}` }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold mb-3" style={{ color: COLORS.textSub }}>
          Uploaded documents ({files.length})
        </p>
        <div className="space-y-2.5">
          {files.map((f, i) => {
            const Icon = iconFor(f.type);
            return (
              <div
                key={i}
                className="flex items-center gap-3.5 rounded-xl px-4 py-3.5 transition-shadow hover:shadow-sm"
                style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(37,99,235,0.08)" }}
                >
                  <Icon size={18} style={{ color: COLORS.secondary }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate" style={{ color: COLORS.textMain }}>
                    {f.name}
                  </p>
                  <p className="text-xs" style={{ color: COLORS.textSub }}>
                    {f.size}
                  </p>
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor:
                      f.status === "Analyzed" ? "rgba(16,185,129,0.1)" : "rgba(37,99,235,0.1)",
                    color: f.status === "Analyzed" ? COLORS.accent : COLORS.secondary,
                  }}
                >
                  {f.status}
                </span>
                <button
                  onClick={() => removeFile(i)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
                  style={{ color: COLORS.textSub }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   HISTORY SCREEN
------------------------------------------------------------------- */
function HistoryScreen({ openChat }) {
  const conversations = [
    {
      title: "30-year fixed vs. ARM comparison",
      date: "Jul 29, 2026",
      preview: "For your risk tolerance, a fixed rate offers predictable payments while...",
    },
    {
      title: "Pre-approval document checklist",
      date: "Jul 27, 2026",
      preview: "You'll need two years of tax returns, recent pay stubs, and...",
    },
    {
      title: "Understanding PMI removal",
      date: "Jul 22, 2026",
      preview: "Once your loan-to-value ratio reaches 80%, you can request...",
    },
    {
      title: "Refinance break-even analysis",
      date: "Jul 15, 2026",
      preview: "Based on your closing costs of $4,200, the break-even point is...",
    },
    {
      title: "First-time buyer programs",
      date: "Jul 09, 2026",
      preview: "There are several state and federal assistance programs that...",
    },
    {
      title: "Jumbo loan eligibility",
      date: "Jun 30, 2026",
      preview: "Since the loan amount exceeds the conforming limit, you'll need...",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: COLORS.primary }}>
            Chat History
          </h2>
          <p className="text-sm" style={{ color: COLORS.textSub }}>
            {conversations.length} previous conversations
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {conversations.map((c, i) => (
          <button
            key={i}
            onClick={() => openChat(c.title)}
            className="text-left rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 group"
            style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}`, boxShadow: "0 1px 2px rgba(15,23,42,0.03)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgba(37,99,235,0.08)" }}
              >
                <MessageSquare size={16} style={{ color: COLORS.secondary }} />
              </div>
              <MoreVertical size={16} style={{ color: COLORS.textSub }} />
            </div>
            <h3 className="font-semibold mb-1.5 group-hover:underline" style={{ color: COLORS.textMain }}>
              {c.title}
            </h3>
            <p className="text-sm mb-3 line-clamp-2" style={{ color: COLORS.textSub }}>
              {c.preview}
            </p>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.textSub }}>
              <CalendarDays size={12} />
              {c.date}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   SETTINGS SCREEN
------------------------------------------------------------------- */
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-11 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0"
      style={{ backgroundColor: checked ? COLORS.secondary : "#CBD5E1" }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{ transform: checked ? "translateX(22px)" : "translateX(2px)" }}
      />
    </button>
  );
}

function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [language, setLanguage] = useState("English (US)");
  const [langOpen, setLangOpen] = useState(false);

  const Section = ({ title, children }) => (
    <div
      className="rounded-2xl p-5 md:p-6"
      style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
    >
      <h3 className="font-semibold mb-4" style={{ color: COLORS.textMain }}>
        {title}
      </h3>
      {children}
    </div>
  );

  const Row = ({ label, sub, children }) => (
    <div className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: COLORS.border }}>
      <div>
        <p className="text-sm font-medium" style={{ color: COLORS.textMain }}>
          {label}
        </p>
        {sub && (
          <p className="text-xs mt-0.5" style={{ color: COLORS.textSub }}>
            {sub}
          </p>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 space-y-6">
      <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
        Settings
      </h2>

      <Section title="Profile">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-semibold flex-shrink-0"
            style={{ backgroundColor: COLORS.accent }}
          >
            JS
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold" style={{ color: COLORS.textMain }}>
              Jordan Silva
            </p>
            <p className="text-sm truncate" style={{ color: COLORS.textSub }}>
              jordan.silva@mortgageai.com
            </p>
          </div>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0"
            style={{ backgroundColor: COLORS.surface, color: COLORS.textMain, border: `1px solid ${COLORS.border}` }}
          >
            Edit
          </button>
        </div>
      </Section>

      <Section title="Appearance">
        <Row label="Dark mode" sub="Switch between light and dark themes">
          <div className="flex items-center gap-2">
            <Sun size={15} style={{ color: COLORS.textSub }} />
            <Toggle checked={darkMode} onChange={setDarkMode} />
            <Moon size={15} style={{ color: COLORS.textSub }} />
          </div>
        </Row>
        <Row label="Language" sub="Interface display language">
          <div className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{ backgroundColor: COLORS.surface, color: COLORS.textMain, border: `1px solid ${COLORS.border}` }}
            >
              <Globe size={14} />
              {language}
              <ChevronDown size={13} />
            </button>
            {langOpen && (
              <div
                className="absolute right-0 mt-1.5 w-40 rounded-lg shadow-xl border overflow-hidden z-10"
                style={{ backgroundColor: COLORS.card, borderColor: COLORS.border }}
              >
                {["English (US)", "Español", "Français", "中文"].map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLanguage(l);
                      setLangOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2 text-sm hover:bg-slate-50 transition-colors"
                    style={{ color: COLORS.textMain }}
                  >
                    {l}
                    {language === l && <Check size={13} style={{ color: COLORS.accent }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Row>
      </Section>

      <Section title="Notifications">
        <Row label="Email notifications" sub="Receive updates about your documents and chats">
          <Toggle checked={emailNotif} onChange={setEmailNotif} />
        </Row>
      </Section>

      <Section title="Application Information">
        <div className="space-y-2 text-sm" style={{ color: COLORS.textSub }}>
          <div className="flex justify-between">
            <span>Version</span>
            <span style={{ color: COLORS.textMain }}>2.4.1</span>
          </div>
          <div className="flex justify-between">
            <span>Last updated</span>
            <span style={{ color: COLORS.textMain }}>July 28, 2026</span>
          </div>
          <div className="flex justify-between">
            <span>Support</span>
            <span style={{ color: COLORS.secondary }}>help@mortgageai.com</span>
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ------------------------------------------------------------------
   SIMPLE PLACEHOLDER SCREENS (Policies / Knowledge / Help)
------------------------------------------------------------------- */
function SimplePanel({ icon: Icon, title, desc, items }) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "rgba(37,99,235,0.08)" }}
        >
          <Icon size={19} style={{ color: COLORS.secondary }} />
        </div>
        <h2 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
          {title}
        </h2>
      </div>
      <p className="text-sm mb-8" style={{ color: COLORS.textSub }}>
        {desc}
      </p>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl px-5 py-4 transition-shadow hover:shadow-sm cursor-pointer"
            style={{ backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}` }}
          >
            <span className="text-sm font-medium" style={{ color: COLORS.textMain }}>
              {it}
            </span>
            <ChevronRight size={16} style={{ color: COLORS.textSub }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   SEARCH MODAL
------------------------------------------------------------------- */
function SearchModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4 bg-black/40" onClick={onClose}>
      <div
        className="w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: COLORS.card }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b" style={{ borderColor: COLORS.border }}>
          <Search size={17} style={{ color: COLORS.textSub }} />
          <input
            autoFocus
            placeholder="Search conversations, documents, policies…"
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: COLORS.textMain }}
          />
          <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100">
            <X size={16} style={{ color: COLORS.textSub }} />
          </button>
        </div>
        <div className="px-4 py-6 text-center text-sm" style={{ color: COLORS.textSub }}>
          Start typing to search across your workspace.
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   ROOT APP
------------------------------------------------------------------- */
export default function MortgageAIApp() {
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatSeed, setChatSeed] = useState([]);
  const [chatKey, setChatKey] = useState(0);

  const startChat = (prompt) => {
    setChatSeed(prompt ? [{ role: "user", text: prompt }] : [{ role: "user", text: "Hi, I'd like some help understanding my mortgage options." }]);
    setChatKey((k) => k + 1);
    setView("chat");
  };

  const openChat = (title) => {
    setChatSeed([{ role: "user", text: title }]);
    setChatKey((k) => k + 1);
    setView("chat");
  };

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: COLORS.surface, fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <Navbar onToggleSidebar={() => setSidebarOpen(true)} onOpenSearch={() => setSearchOpen(true)} view={view} />

      <div className="flex flex-1 min-h-0">
        <Sidebar view={view} setView={setView} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 min-w-0">
          {view === "dashboard" && <Dashboard startChat={startChat} />}
          {view === "chat" && <ChatScreen key={chatKey} initialMessages={chatSeed} />}
          {view === "upload" && <UploadScreen />}
          {view === "history" && <HistoryScreen openChat={openChat} />}
          {view === "settings" && <SettingsScreen />}
          {view === "policies" && (
            <SimplePanel
              icon={ScrollText}
              title="Mortgage Policies"
              desc="Current lending guidelines and program requirements."
              items={[
                "Conventional Loan Underwriting Guidelines",
                "FHA Program Requirements — 2026 Update",
                "VA Loan Eligibility & Entitlement Rules",
                "Jumbo Loan Reserve Requirements",
                "Escrow & Impound Account Policy",
              ]}
            />
          )}
          {view === "knowledge" && (
            <SimplePanel
              icon={BookOpen}
              title="Knowledge Base"
              desc="Articles and explainers curated for borrowers and loan officers."
              items={[
                "Fixed vs. Adjustable Rate Mortgages",
                "How Credit Scores Affect Your Rate",
                "Understanding Closing Costs",
                "The Pre-Approval Process, Step by Step",
                "Refinancing: When It Makes Sense",
              ]}
            />
          )}
          {view === "help" && (
            <SimplePanel
              icon={HelpCircle}
              title="Help & Support"
              desc="Get assistance with the platform or your application."
              items={[
                "Contact your loan officer",
                "Platform FAQs",
                "Report a document issue",
                "Schedule a consultation call",
                "Privacy & data security overview",
              ]}
            />
          )}
        </main>
      </div>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
