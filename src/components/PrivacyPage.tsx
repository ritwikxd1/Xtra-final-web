import React from "react";
import { ArrowLeft } from "lucide-react";

interface PrivacyPageProps {
  isDarkMode: boolean;
  triggerToast: (msg: string) => void;
  navigateTo: (path: string) => void;
  currentPath: string;
}

export default function PrivacyPage({ isDarkMode, triggerToast, navigateTo, currentPath }: PrivacyPageProps) {
  const handleBackToHome = () => {
    navigateTo("/");
    triggerToast("Back to Home");
  };

  const sections = [
    {
      id: "collect",
      num: "1",
      title: "Information We Collect",
      content: "xtra collects minimal data necessary to function, including: your Discord User ID, Server (Guild) IDs where the Bot is active, and command usage data for analytics and improvement purposes. We do not collect personal information such as email addresses, passwords, or payment details."
    },
    {
      id: "use",
      num: "2",
      title: "How We Use Information",
      content: "The data we collect is used solely to: provide and maintain the Bot's core functionality, improve user experience and performance, generate aggregated, anonymized usage statistics, and troubleshoot issues and debug errors."
    },
    {
      id: "storage",
      num: "3",
      title: "Data Storage & Security",
      content: "We take reasonable measures to protect any stored data. Data is stored securely and is only accessible to the Bot's developers. We do not sell, trade, or share your data with any third parties."
    },
    {
      id: "retention",
      num: "4",
      title: "Data Retention",
      content: "Data is retained only for as long as necessary to provide the Bot's services. When the Bot is removed from a server, associated server data may be deleted. Users may request deletion of their data by contacting us through our support server."
    },
    {
      id: "thirdparty",
      num: "5",
      title: "Third-Party Services",
      content: "xtra interacts with third-party music platforms to stream audio content. We do not control and are not responsible for the privacy practices of these third-party services. Users are encouraged to review the privacy policies of any platforms they use with xtra."
    },
    {
      id: "children",
      num: "6",
      title: "Children's Privacy",
      content: "xtra is not intended for use by individuals under the age of 13 (or the minimum age required by Discord's Terms of Service in your jurisdiction). We do not knowingly collect data from children."
    },
    {
      id: "changes",
      num: "7",
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date. Continued use of the Bot constitutes acceptance of any changes."
    },
    {
      id: "contact",
      num: "8",
      title: "Contact",
      isContact: true,
      content: "For any privacy-related questions or data deletion requests, please contact us via our "
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto px-6 py-12 flex flex-col items-center animate-fade-in" id="privacy-page-container">
      {/* Header back navigation bar */}
      <div className="w-full flex items-center justify-start mb-8" id="privacy-back-bar">
        <button
          onClick={handleBackToHome}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 active:scale-95 border ${
            isDarkMode
              ? "bg-zinc-900/40 border-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-900"
              : "bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
          }`}
          id="privacy-back-button"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Main Title Section */}
      <div className="text-center mb-10" id="privacy-header-section">
        <h1
          className={`font-sans font-black text-4xl md:text-5xl tracking-tighter mb-2 transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-zinc-900"
          }`}
          id="privacy-main-title"
        >
          PRIVACY POLICY
        </h1>
        <p className={`text-xs font-bold tracking-widest uppercase ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`} id="privacy-last-updated">
          Last updated: July 18, 2026
        </p>
      </div>

      {/* Privacy Policy Content Cards */}
      <div className="flex flex-col gap-6 w-full mb-12" id="privacy-cards-wrapper">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className={`relative overflow-hidden p-6 rounded-[24px] border transition-all duration-300 text-left ${
              isDarkMode
                ? "bg-[#0d0d12] border-zinc-900/60 hover:border-brand-lilac/20"
                : "bg-white border-zinc-200/80 shadow-sm hover:border-brand-lilac/30"
            }`}
            id={`privacy-card-${sec.id}`}
          >
            <h2
              className={`font-sans font-bold text-lg md:text-xl tracking-tight mb-3 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-zinc-900"
              }`}
              id={`privacy-card-title-${sec.id}`}
            >
              {sec.num}. {sec.title}
            </h2>
            
            {sec.isContact ? (
              <p
                className={`font-sans font-medium text-sm leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
                id={`privacy-card-content-${sec.id}`}
              >
                {sec.content}
                <a
                  href="https://discord.gg/4QcgStSvex"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerToast("Opening Discord Support Server...")}
                  className="text-[#b29ced] hover:underline inline-flex items-center gap-1 font-semibold transition-colors"
                  id="privacy-discord-support-link"
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
                id={`privacy-card-content-${sec.id}`}
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
