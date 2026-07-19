import React from "react";
import { ArrowLeft, Bot, MessageSquare, ShieldAlert } from "lucide-react";

interface TosPageProps {
  isDarkMode: boolean;
  triggerToast: (msg: string) => void;
  navigateTo: (path: string) => void;
  currentPath: string;
}

export default function TosPage({ isDarkMode, triggerToast, navigateTo, currentPath }: TosPageProps) {
  const handleBackToHome = () => {
    navigateTo("/");
    triggerToast("Back to Home");
  };

  const sections = [
    {
      id: "acceptance",
      num: "1",
      title: "Acceptance of Terms",
      content: 'By using xtra ("the Bot"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use the Bot. These terms apply to all users who access or interact with xtra on Discord.'
    },
    {
      id: "description",
      num: "2",
      title: "Description of Service",
      content: "xtra is a Discord music bot that provides audio playback services within Discord voice channels. The Bot allows users to play, queue, and manage music from various supported platforms. We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice."
    },
    {
      id: "conduct",
      num: "3",
      title: "User Conduct",
      content: "You agree not to misuse the Bot, including but not limited to: attempting to exploit or abuse the Bot's functionality, using the Bot for any illegal activities, spamming commands or overloading the service intentionally, or attempting to reverse engineer or tamper with the Bot's code or infrastructure."
    },
    {
      id: "availability",
      num: "4",
      title: "Availability",
      content: 'xtra is provided on an "as-is" and "as-available" basis. We do not guarantee 100% uptime and are not liable for any downtime, data loss, or service interruptions. Maintenance and updates may temporarily affect availability.'
    },
    {
      id: "liability",
      num: "5",
      title: "Limitation of Liability",
      content: "To the fullest extent permitted by law, xtra and its developers shall not be held liable for any damages, losses, or claims arising from the use or inability to use the Bot."
    },
    {
      id: "changes",
      num: "6",
      title: "Changes to Terms",
      content: "We reserve the right to update these Terms of Service at any time. Continued use of the Bot after changes constitutes acceptance of the new terms. Users are encouraged to review this page periodically."
    },
    {
      id: "contact",
      num: "7",
      title: "Contact",
      isContact: true,
      content: "If you have any questions about these Terms, please reach out to us via our "
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto px-6 py-12 flex flex-col items-center animate-fade-in" id="tos-page-container">
      {/* Header back navigation bar */}
      <div className="w-full flex items-center justify-start mb-8" id="tos-back-bar">
        <button
          onClick={handleBackToHome}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 active:scale-95 border ${
            isDarkMode
              ? "bg-zinc-900/40 border-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-900"
              : "bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
          }`}
          id="tos-back-button"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Main Title Section */}
      <div className="text-center mb-10" id="tos-header-section">
        <h1
          className={`font-sans font-black text-4xl md:text-5xl tracking-tighter mb-2 transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-zinc-900"
          }`}
          id="tos-main-title"
        >
          TERMS OF SERVICE
        </h1>
        <p className={`text-xs font-bold tracking-widest uppercase ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`} id="tos-last-updated">
          Last updated: July 18, 2026
        </p>
      </div>

      {/* Terms of Service Content Cards */}
      <div className="flex flex-col gap-6 w-full mb-12" id="tos-cards-wrapper">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className={`relative overflow-hidden p-6 rounded-[24px] border transition-all duration-300 text-left ${
              isDarkMode
                ? "bg-[#0d0d12] border-zinc-900/60 hover:border-brand-lilac/20"
                : "bg-white border-zinc-200/80 shadow-sm hover:border-brand-lilac/30"
            }`}
            id={`tos-card-${sec.id}`}
          >
            <h2
              className={`font-sans font-bold text-lg md:text-xl tracking-tight mb-3 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-zinc-900"
              }`}
              id={`tos-card-title-${sec.id}`}
            >
              {sec.num}. {sec.title}
            </h2>
            
            {sec.isContact ? (
              <p
                className={`font-sans font-medium text-sm leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
                id={`tos-card-content-${sec.id}`}
              >
                {sec.content}
                <a
                  href="https://discord.gg/4QcgStSvex"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerToast("Opening Discord Support Server...")}
                  className="text-[#b29ced] hover:underline inline-flex items-center gap-1 font-semibold transition-colors"
                  id="tos-discord-support-link"
                >
                  Discord Support Server
                </a>
                .
              </p>
            ) : (
              <p
                className={`font-sans font-medium text-sm leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
                id={`tos-card-content-${sec.id}`}
              >
                {sec.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
