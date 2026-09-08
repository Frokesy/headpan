"use client";

import { FormEvent, useMemo, useState } from "react";

type Conversation = {
  id: number;
  name: string;
  initials: string;
  color: string;
  message: string;
  time: string;
  unread: number;
  online?: boolean;
  typing?: boolean;
};

type ChatMessage = {
  id: number;
  body: string;
  time: string;
  sent: boolean;
  read?: boolean;
};

const conversations: Conversation[] = [
  { id: 1, name: "Amaka Johnson", initials: "AJ", color: "bg-[#D8EDE0] text-[#346739]", message: "Perfect, I'll send the measurements today.", time: "10:42 AM", unread: 2, online: true },
  { id: 2, name: "Tunde Balogun", initials: "TB", color: "bg-[#F7E7CD] text-[#9A622D]", message: "Typing...", time: "10:18 AM", unread: 1, typing: true, online: true },
  { id: 3, name: "Kemi Adebayo", initials: "KA", color: "bg-[#E8E1F7] text-[#7354A3]", message: "Thank you. The dress looks beautiful!", time: "Yesterday", unread: 0 },
  { id: 4, name: "Chidi Okafor", initials: "CO", color: "bg-[#DCEAF8] text-[#416E9B]", message: "Can it be ready before Saturday?", time: "Yesterday", unread: 0 },
  { id: 5, name: "Fatima Bello", initials: "FB", color: "bg-[#F7DFE6] text-[#A3546C]", message: "Photo", time: "Monday", unread: 0 },
  { id: 6, name: "David Emmanuel", initials: "DE", color: "bg-[#E1EAE3] text-[#536B58]", message: "I'll get back to you shortly.", time: "Sunday", unread: 0 },
];

const initialMessages: ChatMessage[] = [
  { id: 1, body: "Hello! I found your profile while looking for a tailor for an upcoming event.", time: "10:24 AM", sent: false },
  { id: 2, body: "Hi Amaka 👋 Thank you for reaching out. What kind of outfit do you have in mind?", time: "10:27 AM", sent: true, read: true },
  { id: 3, body: "I need two native outfits for my sister's wedding. One Ankara and one lace. The event is in three weeks.", time: "10:31 AM", sent: false },
  { id: 4, body: "That timeline works. Please share your preferred styles and fabric photos, then I can prepare an accurate quote for you.", time: "10:35 AM", sent: true, read: true },
  { id: 5, body: "Great! What measurements would you need from me?", time: "10:39 AM", sent: false },
  { id: 6, body: "Bust, waist, hip, shoulder and full length. I can send you a simple measurement guide too.", time: "10:41 AM", sent: true, read: true },
  { id: 7, body: "Perfect, I'll send the measurements today.", time: "10:42 AM", sent: false },
];

function Icon({ name, className = "" }: { name: "search" | "more" | "phone" | "video" | "back" | "attach" | "smile" | "send" | "check"; className?: string }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    more: <><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>,
    video: <><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></>,
    back: <><path d="m15 18-6-6 6-6"/><path d="M9 12h11"/></>,
    attach: <path d="m21.4 11.6-8.9 8.9a6 6 0 0 1-8.5-8.5l9.5-9.5a4 4 0 0 1 5.7 5.7l-9.5 9.5a2 2 0 0 1-2.8-2.8l8.8-8.8"/>,
    smile: <><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
    check: <path d="m7 12 3 3 7-7"/>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{paths[name]}</svg>;
}

function Avatar({ conversation, size = "large" }: { conversation: Conversation; size?: "small" | "large" }) {
  return (
    <span className={`relative flex shrink-0 items-center justify-center rounded-full font-bold ${conversation.color} ${size === "large" ? "h-12 w-12 text-sm" : "h-10 w-10 text-xs"}`}>
      {conversation.initials}
      {conversation.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#25A244]" />}
    </span>
  );
}

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(1);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const active = conversations.find((item) => item.id === activeId) ?? conversations[0];
  const filtered = useMemo(() => conversations.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())), [search]);

  function sendMessage(event: FormEvent) {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setMessages((current) => [...current, { id: Date.now(), body, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), sent: true, read: false }]);
    setDraft("");
  }

  return (
    <section className="h-full w-full overflow-hidden bg-white">
      <div className="flex h-full">
        <aside className={`${mobileChatOpen ? "hidden" : "flex"} w-full min-w-0 flex-col border-r border-[#E2E9E3] md:flex md:w-[38%] lg:w-[350px] xl:w-[390px]`}>
          <div className="border-b border-[#E7ECE8] px-4 pb-3 pt-4 sm:px-5">
            <label className="flex h-11 items-center gap-2.5 rounded-xl bg-[#F2F5F3] px-3 text-[#718076] focus-within:ring-2 focus-within:ring-[#346739]/15">
              <Icon name="search" className="h-[18px] w-[18px]" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search conversations" className="min-w-0 flex-1 bg-transparent text-sm text-[#293A2D] outline-none placeholder:text-[#96A098]" />
            </label>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {filtered.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => { setActiveId(conversation.id); setMobileChatOpen(true); }}
                className={`relative flex w-full gap-3 px-4 py-3.5 text-left transition sm:px-5 ${activeId === conversation.id ? "bg-[#EAF7EF] after:absolute after:inset-y-0 after:left-0 after:w-1 after:bg-[#346739]" : "hover:bg-[#F7FAF8]"}`}
              >
                <Avatar conversation={conversation} />
                <span className="min-w-0 flex-1 border-b border-[#EDF1EE] pb-3">
                  <span className="flex items-start justify-between gap-2">
                    <span className="truncate text-sm font-bold text-[#293A2D]">{conversation.name}</span>
                    <span className={`shrink-0 text-[10px] ${conversation.unread ? "font-bold text-[#258740]" : "text-[#929B94]"}`}>{conversation.time}</span>
                  </span>
                  <span className="mt-1.5 flex items-center justify-between gap-3">
                    <span className={`truncate text-xs ${conversation.typing ? "font-semibold text-[#258740]" : "text-[#7C8980]"}`}>{conversation.message}</span>
                    {!!conversation.unread && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2E9B4B] px-1.5 text-[10px] font-bold text-white">{conversation.unread}</span>}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <div className={`${mobileChatOpen ? "flex" : "hidden"} min-w-0 flex-1 flex-col md:flex`}>
          <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-[#E3E9E4] bg-white px-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-2.5">
              <button type="button" onClick={() => setMobileChatOpen(false)} aria-label="Back to conversations" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#536158] hover:bg-[#F1F5F2] md:hidden"><Icon name="back" className="h-5 w-5" /></button>
              <Avatar conversation={active} size="small" />
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-[#293A2D]">{active.name}</h3>
                <p className="mt-0.5 text-[11px] font-medium text-[#32A552]">{active.typing ? "typing..." : active.online ? "online" : "last seen recently"}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[#536158]">
              <button type="button" aria-label="Video call" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F1F5F2]"><Icon name="video" className="h-[19px] w-[19px]" /></button>
              <button type="button" aria-label="Voice call" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F1F5F2]"><Icon name="phone" className="h-[18px] w-[18px]" /></button>
              <button type="button" aria-label="Chat options" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F1F5F2]"><Icon name="more" className="h-5 w-5" /></button>
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto bg-[#F4F0E8] bg-[radial-gradient(rgba(52,103,57,0.055)_1px,transparent_1px)] [background-size:18px_18px] px-3 py-5 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-[820px]">
              <div className="mb-5 flex justify-center"><span className="rounded-lg bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-[#718076] shadow-sm">TODAY</span></div>
              <div className="space-y-2.5">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sent ? "justify-end" : "justify-start"}`}>
                    <div className={`relative max-w-[84%] rounded-xl px-3.5 pb-2 pt-2.5 text-[13px] leading-5 shadow-[0_1px_2px_rgba(27,48,31,0.12)] sm:max-w-[72%] sm:text-sm ${message.sent ? "rounded-tr-sm bg-[#DDF5E4] text-[#243629]" : "rounded-tl-sm bg-white text-[#334438]"}`}>
                      <p>{message.body}</p>
                      <span className="ml-3 inline-flex translate-y-1 items-center gap-0.5 whitespace-nowrap text-[9px] text-[#849087]">
                        {message.time}
                        {message.sent && <span className={message.read ? "text-[#2595C7]" : "text-[#7E8D82]"}><Icon name="check" className="h-3.5 w-3.5" /></span>}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={sendMessage} className="flex shrink-0 items-end gap-2 border-t border-[#E1E7E2] bg-[#F7F9F7] p-2.5 sm:px-4 sm:py-3">
            <button type="button" aria-label="Add emoji" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#6E7D72] hover:bg-[#EAF0EB]"><Icon name="smile" className="h-5 w-5" /></button>
            <button type="button" aria-label="Attach file" className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#6E7D72] hover:bg-[#EAF0EB] sm:flex"><Icon name="attach" className="h-5 w-5" /></button>
            <label className="flex min-h-11 min-w-0 flex-1 items-center rounded-2xl border border-[#E1E7E2] bg-white px-4 shadow-sm focus-within:border-[#9FC5A5]">
              <span className="sr-only">Type a message</span>
              <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type a message" className="h-10 min-w-0 flex-1 bg-transparent text-sm text-[#293A2D] outline-none placeholder:text-[#9AA39C]" />
            </label>
            <button type="submit" aria-label="Send message" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#346739] text-white shadow-sm transition hover:bg-[#28552E] active:scale-95"><Icon name="send" className="h-5 w-5" /></button>
          </form>
        </div>
      </div>
    </section>
  );
}
