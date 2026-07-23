/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, ArrowRight, Server, Users, Terminal, ExternalLink, Music, ShieldCheck, Gavel, Sparkles, Gamepad2, Bot, ChevronDown, Search, Globe } from "lucide-react";
import CommandsPage from "./components/CommandsPage";
import StatusPage from "./components/StatusPage";
import AdminPage from "./components/AdminPage";
import TosPage from "./components/TosPage";
import PrivacyPage from "./components/PrivacyPage";
import TeamPage from "./components/TeamSection";
import { translations, languages } from "./translations";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("xtra_language") || "EN";
  });
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["EN"]?.[key] || key;
  };

  const changeLanguage = (code: string) => {
    setLanguage(code);
    localStorage.setItem("xtra_language", code);
    setIsLangDropdownOpen(false);
    const langObj = languages.find(l => l.code === code);
    if (langObj) {
      triggerToast(`Language changed to ${langObj.name} ${langObj.flag}`);
    }
  };

  const getLocalizedFaqData = () => {
    return [
      { question: t("faq_q1"), answer: t("faq_a1") },
      { question: t("faq_q2"), answer: t("faq_a2") },
      { question: t("faq_q3"), answer: t("faq_a3") },
      { question: t("faq_q4"), answer: t("faq_a4") },
      { question: t("faq_q5"), answer: t("faq_a5") },
      { question: t("faq_q6"), answer: t("faq_a6") },
      { question: t("faq_q7"), answer: t("faq_a7") },
      { question: t("faq_q8"), answer: t("faq_a8") },
      { question: t("faq_q9"), answer: t("faq_a9") },
      { question: t("faq_q10"), answer: t("faq_a10") },
    ];
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Status configuration state
  const [statusConfig, setStatusConfig] = useState(() => {
    const saved = localStorage.getItem("xtra_status_config");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default if parse failed
      }
    }
    return {
      servers: 218,
      users: 101568,
      latency: 17,
      status: "online",
      uptime: "45 hours, 39 minutes",
      bannerStatus: "Partial maintenance",
      bannerColor: "yellow",
    };
  });

  // Fetch status dynamically from backend
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("/api/status");
        if (response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            setStatusConfig(data);
            localStorage.setItem("xtra_status_config", JSON.stringify(data));
          } else {
            console.warn("Expected JSON response from /api/status, but got non-JSON content. Server might be booting up.");
          }
        }
      } catch (err: any) {
        if (err?.message !== "Failed to fetch" && err?.name !== "TypeError") {
          console.error("Error fetching status from API:", err);
        }
      }
    };

    fetchStatus();
    // Poll status every 10 seconds
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveStatusConfig = async (newConfig: typeof statusConfig) => {
    setStatusConfig(newConfig);
    localStorage.setItem("xtra_status_config", JSON.stringify(newConfig));

    try {
      const response = await fetch("/api/status/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer xtra_secret_token_123" // Matches default STATUS_API_TOKEN
        },
        body: JSON.stringify(newConfig)
      });
      if (response.ok) {
        triggerToast("Saved & synced with backend successfully!");
      } else {
        const errData = await response.json().catch(() => ({}));
        console.error("Backend sync failed:", errData);
        triggerToast(`Failed to sync: ${errData.error || "Server offline or auth error"}`);
      }
    } catch (err) {
      console.error("Error updating status to API:", err);
      triggerToast("Server connection error. Saved locally instead.");
    }
  };

  // Router Path State supporting clean, direct routes:
  // "/" for Home, "/commands", "/status", "/admin", "/tos", "/privacy", "/team"
  const [currentPath, setCurrentPath] = useState(() => {
    let p = window.location.pathname;
    if (p.endsWith("/") && p.length > 1) {
      p = p.slice(0, -1);
    }
    if (p === "/home" || p === "") {
      return "/";
    }
    if (p === "/home/commands" || p === "/commands") {
      return "/commands";
    }
    if (p === "/home/status" || p === "/status") {
      return "/status";
    }
    if (p === "/home/admin" || p === "/admin") {
      return "/admin";
    }
    if (p === "/home/tos" || p === "/tos") {
      return "/tos";
    }
    if (p === "/home/privacy" || p === "/privacy") {
      return "/privacy";
    }
    if (p === "/home/team" || p === "/team") {
      return "/team";
    }
    return "/";
  });

  const navigateTo = (path: string) => {
    window.history.pushState(null, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let p = window.location.pathname;
    if (p.endsWith("/") && p.length > 1) {
      p = p.slice(0, -1);
    }

    if (p === "/home" || p === "") {
      window.history.replaceState(null, "", "/");
      setCurrentPath("/");
    } else if (p === "/home/commands") {
      window.history.replaceState(null, "", "/commands");
      setCurrentPath("/commands");
    } else if (p === "/home/status") {
      window.history.replaceState(null, "", "/status");
      setCurrentPath("/status");
    } else if (p === "/home/admin") {
      window.history.replaceState(null, "", "/admin");
      setCurrentPath("/admin");
    } else if (p === "/home/tos") {
      window.history.replaceState(null, "", "/tos");
      setCurrentPath("/tos");
    } else if (p === "/home/privacy") {
      window.history.replaceState(null, "", "/privacy");
      setCurrentPath("/privacy");
    } else if (p === "/home/team") {
      window.history.replaceState(null, "", "/team");
      setCurrentPath("/team");
    } else if (p === "/commands") {
      setCurrentPath("/commands");
    } else if (p === "/status") {
      setCurrentPath("/status");
    } else if (p === "/admin") {
      setCurrentPath("/admin");
    } else if (p === "/tos") {
      setCurrentPath("/tos");
    } else if (p === "/privacy") {
      setCurrentPath("/privacy");
    } else if (p === "/team") {
      setCurrentPath("/team");
    } else if (p !== "/") {
      window.history.replaceState(null, "", "/");
      setCurrentPath("/");
    }

    const handlePopState = () => {
      let currentP = window.location.pathname;
      if (currentP.endsWith("/") && currentP.length > 1) {
        currentP = currentP.slice(0, -1);
      }
      
      if (currentP === "/commands" || currentP === "/home/commands") {
        setCurrentPath("/commands");
      } else if (currentP === "/status" || currentP === "/home/status") {
        setCurrentPath("/status");
      } else if (currentP === "/admin" || currentP === "/home/admin") {
        setCurrentPath("/admin");
      } else if (currentP === "/tos" || currentP === "/home/tos") {
        setCurrentPath("/tos");
      } else if (currentP === "/privacy" || currentP === "/home/privacy") {
        setCurrentPath("/privacy");
      } else if (currentP === "/team" || currentP === "/home/team") {
        setCurrentPath("/team");
      } else {
        setCurrentPath("/");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const faqData = getLocalizedFaqData();

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    triggerToast(!isDarkMode ? "Switched to Dark Theme" : "Switched to Light Theme");
  };

  const handleMenuNavigation = (item: string) => {
    setIsMenuOpen(false);
    if (item === "SUPPORT") {
      window.open("https://discord.gg/4QcgStSvex", "_blank");
      triggerToast("Opening support server link...");
    } else if (item === "COMMANDS") {
      navigateTo("/commands");
      triggerToast("Navigating to Commands...");
    } else if (item === "FAQ") {
      if (currentPath !== "/") {
        navigateTo("/");
        setTimeout(() => {
          const el = document.getElementById("faq-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const el = document.getElementById("faq-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      triggerToast("Scrolled to FAQ...");
    } else if (item === "STATS") {
      navigateTo("/status");
      triggerToast("Opening stats dashboard...");
    } else if (item === "TEAM") {
      navigateTo("/team");
      triggerToast("Opening Team Page...");
    } else if (item === "TOS") {
      navigateTo("/tos");
      triggerToast("Opening Terms of Service...");
    } else if (item === "PRIVACY") {
      navigateTo("/privacy");
      triggerToast("Opening Privacy Policy...");
    } else if (item === "HOME") {
      if (currentPath !== "/") {
        navigateTo("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      triggerToast("Scrolled to top!");
    } else {
      triggerToast(`Showing ${item} Section...`);
    }
  };

  const renderFooter = () => (
    <footer className="w-full max-w-md mt-8 border-t border-zinc-900/10 dark:border-zinc-900/40 pt-16 pb-12 flex flex-col text-left" id="rich-footer">
      {/* Bot brand & description */}
      <div className="flex flex-col mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-purple/20 bg-[#0d0d12] flex items-center justify-center">
            <img 
              src="/xtralogo.png" 
              alt="xtra Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "/avatar.svg";
              }}
            />
          </div>
          <span className={`font-sans font-black text-2xl tracking-tight ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
            xtra
          </span>
        </div>
        
        <p className={`font-sans font-medium text-sm leading-relaxed mb-6 ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
          The ultimate Discord bot - delivering premium security, robust moderation, high-fidelity music, leveling systems, and over 1,099+ interactive commands.
        </p>

        {/* Social / action icons */}
        <div className="flex items-center gap-4">
          {/* Discord Button */}
          <a 
            href="https://discord.gg/4QcgStSvex" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => triggerToast("Opening Discord support...")}
            className={`p-2.5 rounded-xl border transition-all duration-300 active:scale-95 ${
              isDarkMode 
                ? "bg-zinc-900/30 border-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white" 
                : "bg-white border-zinc-200 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900"
            }`}
            aria-label="Discord Support"
            id="footer-discord-link"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,69.43,69.43,0,0,1-10.5-5c.88-.65,1.72-1.34,2.51-2a75.58,75.58,0,0,0,73,0c.79.71,1.63,1.4,2.51,2a69.43,69.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.06-18.83C129.54,50.12,123.63,27.27,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
            </svg>
          </a>

          {/* Top.gg Button */}
          <a 
            href="https://top.gg/bot/1048508657748430889" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => triggerToast("Opening Top.gg...")}
            className={`p-2.5 rounded-xl border transition-all duration-300 active:scale-95 flex items-center justify-center w-10 h-10 ${
              isDarkMode 
                ? "bg-zinc-900/30 border-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white" 
                : "bg-white border-zinc-200 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900"
            }`}
            aria-label="Vote on Top.gg"
            id="footer-topgg-link"
          >
            <span className="font-sans font-black text-sm tracking-tighter text-[#ff3366]">T</span>
          </a>
        </div>
      </div>

      {/* Footer links columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full" id="footer-links-grid">
        {/* QUICK LINKS */}
        <div className="flex flex-col gap-3">
          <h4 className={`font-sans font-black text-xs tracking-[0.2em] mb-2 uppercase ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
            QUICK LINKS
          </h4>
          <button 
            onClick={() => { navigateTo("/"); triggerToast("Navigated to Home"); }}
            className={`text-left font-sans font-semibold text-sm hover:text-[#b29ced] transition-colors cursor-pointer ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            id="footer-link-home"
          >
            Home
          </button>
          <button 
            onClick={() => { navigateTo("/commands"); triggerToast("Opening Commands menu..."); }}
            className={`text-left font-sans font-semibold text-sm hover:text-[#b29ced] transition-colors cursor-pointer ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            id="footer-link-commands"
          >
            Commands
          </button>
          <button 
            onClick={() => {
              navigateTo("/status");
              triggerToast("Viewing stats dashboard...");
            }}
            className={`text-left font-sans font-semibold text-sm hover:text-[#b29ced] transition-colors cursor-pointer ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            id="footer-link-stats"
          >
            Stats
          </button>
          <button 
            onClick={() => {
              navigateTo("/team");
              triggerToast("Meet the development team...");
            }}
            className={`text-left font-sans font-semibold text-sm hover:text-[#b29ced] transition-colors cursor-pointer ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            id="footer-link-team"
          >
            Team
          </button>
        </div>

        {/* RESOURCES */}
        <div className="flex flex-col gap-3">
          <h4 className={`font-sans font-black text-xs tracking-[0.2em] mb-2 uppercase ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
            RESOURCES
          </h4>
          <a 
            href="https://discord.gg/4QcgStSvex" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => triggerToast("Opening Support Server...")}
            className={`font-sans font-semibold text-sm hover:text-[#b29ced] transition-colors ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            id="footer-link-support"
          >
            Support Server
          </a>
          <a 
            href="https://discord.com/oauth2/authorize?client_id=1048508657748430889" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => triggerToast("Opening Bot Invite...")}
            className={`font-sans font-semibold text-sm hover:text-[#b29ced] transition-colors ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            id="footer-link-add"
          >
            Add to Discord
          </a>
          <a 
            href="https://top.gg/bot/1048508657748430889" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => triggerToast("Opening Vote Panel...")}
            className={`font-sans font-semibold text-sm hover:text-[#b29ced] transition-colors ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            id="footer-link-vote"
          >
            Vote on Top.gg
          </a>
        </div>

        {/* LEGAL */}
        <div className="flex flex-col gap-3">
          <h4 className={`font-sans font-black text-xs tracking-[0.2em] mb-2 uppercase ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
            LEGAL
          </h4>
          <button 
            onClick={() => { navigateTo("/tos"); triggerToast("Displaying Terms of Service..."); }}
            className={`text-left font-sans font-semibold text-sm hover:text-[#b29ced] transition-colors cursor-pointer ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            id="footer-link-tos"
          >
            Terms of Service
          </button>
          <button 
            onClick={() => { navigateTo("/privacy"); triggerToast("Displaying Privacy Policy..."); }}
            className={`text-left font-sans font-semibold text-sm hover:text-[#b29ced] transition-colors cursor-pointer ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            id="footer-link-privacy"
          >
            Privacy Policy
          </button>
        </div>
      </div>

      {/* Under lines and copyright / team attribution */}
      <div className="border-t border-zinc-900/10 dark:border-zinc-900/40 pt-8 flex flex-col items-center gap-4 text-center w-full">
        <span className={`font-sans font-semibold text-xs tracking-[0.15em] uppercase ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
          © 2026 xtra Bot. made by xtra devlopment team
        </span>
        
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#b29ced] hover:opacity-85 active:scale-95 transition-all mt-2 cursor-pointer"
          id="footer-back-to-top"
        >
          <span>Back to top</span>
          <ArrowRight className="w-3.5 h-3.5 -rotate-90 stroke-[2.5]" />
        </button>
      </div>
    </footer>
  );

  return (
    <div 
      className={`min-h-screen flex flex-col justify-between font-sans relative overflow-hidden transition-colors duration-500 selection:bg-brand-lilac/30 ${
        isDarkMode ? "bg-[#060608] text-white" : "bg-[#f4f4f7] text-zinc-900"
      }`}
    >
      {/* Welcome Pop-up Modal */}
      {showWelcome && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-md animate-fade-in"
          id="welcome-modal-overlay"
        >
          {/* Backdrop click to close */}
          <div 
            className="absolute inset-0 cursor-default" 
            onClick={() => {
              setShowWelcome(false);
              triggerToast("Welcome popup dismissed");
            }} 
          />

          {/* Modal Card */}
          <div 
            className={`relative w-full max-w-md rounded-3xl border p-8 shadow-2xl z-50 flex flex-col items-center text-center transition-all duration-300 scale-in ${
              isDarkMode 
                ? "bg-[#0b0b10] border-zinc-900/90 text-zinc-200" 
                : "bg-white border-zinc-200 text-zinc-800"
            }`}
            id="welcome-modal-card"
          >
            {/* Close Button (X icon on top-right) */}
            <button
              onClick={() => {
                setShowWelcome(false);
                triggerToast("Welcome popup closed");
              }}
              className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                isDarkMode 
                  ? "text-zinc-500 hover:text-white hover:bg-zinc-900" 
                  : "text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
              aria-label="Close welcome popup"
              id="welcome-modal-close-button"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Glowing Logo Circle */}
            <div className="relative mb-6" id="welcome-logo-container">
              <div className="absolute inset-0 rounded-full bg-brand-purple/20 blur-xl animate-pulse" />
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-brand-purple to-brand-lilac relative z-10 shadow-lg">
                <div className={`w-full h-full rounded-full overflow-hidden ${isDarkMode ? "bg-zinc-950" : "bg-white"}`}>
                  <img 
                    src="/xtralogo.png" 
                    alt="xtra Welcome Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "/avatar.svg";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 
              className={`font-sans font-black text-2xl md:text-3xl tracking-tight mb-4 uppercase ${
                isDarkMode ? "text-white" : "text-zinc-950"
              }`}
              id="welcome-modal-title"
            >
              {t("welcome_title")}
            </h2>

            {/* Description */}
            <p 
              className={`font-sans font-medium text-sm md:text-base leading-relaxed mb-8 ${
                isDarkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
              id="welcome-modal-description"
            >
              {t("welcome_subtitle")}
            </p>

            {/* CTA button to close and start exploration */}
            <button
              onClick={() => {
                setShowWelcome(false);
                triggerToast("Enjoy exploring xtra!");
              }}
              className="w-full py-4 bg-[#b29ced] hover:bg-[#a18ae0] text-[#060608] font-black text-sm tracking-widest rounded-2xl text-center uppercase active:scale-95 transition-all duration-300 shadow-xl shadow-purple-900/30"
              id="welcome-modal-cta-button"
            >
              {t("welcome_btn")}
            </button>
          </div>
        </div>
      )}

      {/* GLOBAL FIXED HEADER SECTION */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-center transition-all duration-300 border-b backdrop-blur-md ${
          isDarkMode 
            ? "bg-[#060608]/80 border-zinc-900/40 text-white" 
            : "bg-white/90 border-zinc-200/50 text-zinc-900 shadow-sm"
        }`} 
        id="global-header"
      >
        <div className="w-full max-w-md px-6 py-4 flex items-center justify-between">
          {/* Left: Avatar with elegant boundary ring */}
          <div 
            className="flex items-center justify-center cursor-pointer active:scale-95 transition-transform" 
            onClick={() => handleMenuNavigation("HOME")}
            id="avatar-frame"
          >
            <div className="w-12 h-12 rounded-full p-[1.5px] bg-gradient-to-tr from-brand-purple/40 to-brand-lilac/40 hover:from-brand-purple hover:to-brand-lilac transition-all duration-300">
              <div className={`w-full h-full rounded-full overflow-hidden ${isDarkMode ? "bg-zinc-950" : "bg-white"}`}>
                <img 
                  src="/xtralogo.png" 
                  alt="xtra Avatar Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "/avatar.svg";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right: Theme button and Hamburger menu */}
          <div className="flex items-center gap-2 md:gap-4" id="header-interactive-tools">
            {/* Language Selector Dropdown */}
            <div className="relative" id="language-selector-dropdown-wrapper">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer active:scale-90 border flex items-center justify-center gap-1.5 ${
                  isDarkMode 
                    ? "text-zinc-400 hover:text-white bg-zinc-900/40 border-zinc-900/60 hover:bg-zinc-900" 
                    : "text-zinc-800 hover:text-zinc-950 bg-white border-transparent hover:bg-zinc-50 shadow-md"
                }`}
                aria-label="Select Language"
                id="language-select-button"
              >
                <Globe className="w-4 h-4 stroke-[2]" />
                <span className="text-sm font-black tracking-tight" id="active-flag-display">
                  {languages.find(l => l.code === language)?.flag || "🇺🇸"}
                </span>
              </button>

              {isLangDropdownOpen && (
                <>
                  {/* Invisible Backdrop for easy close */}
                  <div 
                    className="fixed inset-0 z-40 cursor-default" 
                    onClick={() => setIsLangDropdownOpen(false)} 
                  />
                  
                  {/* Floating Menu Card */}
                  <div 
                    className={`absolute right-0 mt-2 w-40 rounded-2xl border p-1.5 shadow-2xl z-50 flex flex-col gap-1 transition-all animate-fade-in ${
                      isDarkMode 
                        ? "bg-[#0d0d12] border-zinc-900/80 text-zinc-200" 
                        : "bg-white border-zinc-200 text-zinc-800"
                    }`}
                    id="language-dropdown-menu"
                  >
                    {languages.map((lang) => {
                      const isActive = lang.code === language;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full text-left px-3.5 py-2 rounded-xl font-sans font-bold text-xs flex items-center justify-between transition-colors active:scale-98 ${
                            isActive
                              ? "bg-brand-purple/20 text-[#b29ced]"
                              : isDarkMode
                                ? "hover:bg-zinc-900/60 text-zinc-300 hover:text-white"
                                : "hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-sm leading-none">{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#b29ced]" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Theme Switcher Button */}
            <button 
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer active:scale-90 border ${
                isDarkMode 
                  ? "text-zinc-400 hover:text-white bg-zinc-900/40 border-zinc-900/60 hover:bg-zinc-900" 
                  : "text-zinc-800 hover:text-zinc-950 bg-white border-transparent hover:bg-zinc-50 shadow-md"
              }`}
              aria-label="Toggle theme mode"
              id="theme-switcher-button"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 stroke-[2] text-amber-400 fill-amber-400/10" />
              ) : (
                <Moon className="w-5 h-5 stroke-[2] text-indigo-600 fill-indigo-600/10" />
              )}
            </button>
            
            {/* Hamburger Menu Toggle Button */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer active:scale-90 border ${
                isDarkMode 
                  ? "text-zinc-400 hover:text-white bg-zinc-900/40 border-zinc-900/60 hover:bg-zinc-900" 
                  : "text-zinc-800 hover:text-zinc-950 bg-white border-transparent hover:bg-zinc-50 shadow-md"
              }`}
              aria-label="Open navigation menu"
              id="menu-toggle-button"
            >
              <Menu className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Dynamic Toast alert */}
      {showToast && (
        <div 
          className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full font-medium text-sm shadow-2xl flex items-center gap-2 border transition-all animate-fade-in ${
            isDarkMode 
              ? "bg-[#0e0e12] border-brand-lilac/30 text-brand-lilac" 
              : "bg-white border-zinc-200 text-brand-purple"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-brand-lilac animate-ping" />
          {toastMessage}
        </div>
      )}

      {/* MAIN BODY CONTENT */}
      <main className="flex-1 w-full flex flex-col items-center z-10 animate-fade-in pt-20" id="main-content">
        {currentPath === "/commands" ? (
          <>
            <CommandsPage 
              isDarkMode={isDarkMode}
              triggerToast={triggerToast}
              navigateTo={navigateTo}
              currentPath={currentPath}
              t={t}
            />
            <div className="w-full flex flex-col items-center px-6" id="commands-footer-section">
              {renderFooter()}
            </div>
          </>
        ) : currentPath === "/status" ? (
          <>
            <StatusPage 
              isDarkMode={isDarkMode}
              triggerToast={triggerToast}
              navigateTo={navigateTo}
              currentPath={currentPath}
              statusConfig={statusConfig}
            />
            <div className="w-full flex flex-col items-center px-6" id="status-footer-section">
              {renderFooter()}
            </div>
          </>
        ) : currentPath === "/admin" ? (
          <>
            <AdminPage 
              isDarkMode={isDarkMode}
              triggerToast={triggerToast}
              navigateTo={navigateTo}
              statusConfig={statusConfig}
              onSaveConfig={handleSaveStatusConfig}
            />
            <div className="w-full flex flex-col items-center px-6" id="admin-footer-section">
              {renderFooter()}
            </div>
          </>
        ) : currentPath === "/tos" ? (
          <>
            <TosPage 
              isDarkMode={isDarkMode}
              triggerToast={triggerToast}
              navigateTo={navigateTo}
              currentPath={currentPath}
            />
            <div className="w-full flex flex-col items-center px-6" id="tos-footer-section">
              {renderFooter()}
            </div>
          </>
        ) : currentPath === "/privacy" ? (
          <>
            <PrivacyPage 
              isDarkMode={isDarkMode}
              triggerToast={triggerToast}
              navigateTo={navigateTo}
              currentPath={currentPath}
            />
            <div className="w-full flex flex-col items-center px-6" id="privacy-footer-section">
              {renderFooter()}
            </div>
          </>
        ) : currentPath === "/team" ? (
          <>
            <TeamPage 
              isDarkMode={isDarkMode}
              triggerToast={triggerToast}
              navigateTo={navigateTo}
              currentPath={currentPath}
              t={t}
            />
            <div className="w-full flex flex-col items-center px-6" id="team-page-footer-section">
              {renderFooter()}
            </div>
          </>
        ) : (
          <>
            {/* FIRST SCREEN FOLD (Perfect 100dvh Viewport Layout) */}
        <section 
          className="w-full min-h-[100dvh] flex flex-col justify-between items-center relative"
          id="hero-landing-fold"
        >
          {/* HEADER PLACEHOLDER SPACER (to keep perfect vertical alignment balance) */}
          <div className="w-full h-[88px]" id="header-alignment-spacer" />

          {/* HERO CENTER CONTENT */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-4 w-full" id="hero-display-content">
            {/* lowercase title "xtra" */}
            <h1 
              className={`font-sans font-black text-7xl md:text-8xl lg:text-[100px] tracking-tighter mb-2 select-none cursor-default transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-zinc-900"
              }`}
              id="clone-title-heading"
            >
              xtra
            </h1>

            {/* description subtitle */}
            <p 
              className={`font-sans font-medium leading-relaxed text-sm md:text-base max-w-sm mb-6 md:mb-8 px-2 transition-colors duration-300 ${
                isDarkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
              id="clone-description-paragraph"
            >
              {t("hero_subtitle")}
            </p>

            {/* BUTTON ACTION CONTROLS */}
            <div className="flex flex-col items-center gap-3.5 w-full max-w-sm px-2" id="clone-action-buttons">
              
              {/* SUPPORT Button (Solid purple/lavender matching screenshot exactly) */}
              <a
                href="https://discord.gg/4QcgStSvex"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerToast("Opening support server link...")}
                className="w-full py-4 bg-[#b29ced] hover:bg-[#a18ae0] text-[#060608] font-bold text-sm tracking-[0.2em] rounded-2xl transition-all duration-300 text-center uppercase active:scale-95 shadow-lg shadow-purple-900/20"
                id="support-button"
              >
                {t("join_support")}
              </a>

              {/* ADD TO DISCORD Button with rotating border-line indicator */}
              <a
                href="https://discord.com/oauth2/authorize?client_id=1048508657748430889"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerToast("Connecting to Discord auth gateway...")}
                className="relative w-full p-[1.5px] overflow-hidden rounded-2xl group flex items-center justify-center hover:scale-[1.01] active:scale-95 transition-all duration-300"
                id="add-to-discord-button"
              >
                {/* Rotating boundary line layer behind the button content */}
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent,#b29ced,transparent,#7c3aed,transparent)] animate-border-spin" />
                
                {/* The inner foreground element filling the container */}
                <div className={`relative w-full py-3.5 rounded-[14px] font-black text-sm tracking-[0.2em] transition-colors duration-300 flex items-center justify-center gap-2 uppercase ${
                  isDarkMode 
                    ? "bg-[#060608] hover:bg-zinc-950 text-white" 
                    : "bg-[#f4f4f7] hover:bg-zinc-200 text-zinc-900"
                }`}>
                  <span>{t("add_to_discord")}</span>
                  <ArrowRight className="w-4 h-4 text-brand-lilac group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </div>
              </a>

            </div>
          </div>

          {/* STATS SECTION IN RAW ALIGNED ROW (At bottom of first fold) */}
          <div 
            className={`w-full max-w-md grid grid-cols-3 gap-4 border-t pt-8 pb-8 px-6 transition-colors duration-300 ${
              isDarkMode ? "border-zinc-900" : "border-zinc-200"
            }`} 
            id="clone-stats-panel"
          >
            {/* Servers */}
            <div className="flex flex-col items-center">
              <span className={`font-sans font-black text-3xl tracking-tight ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                {statusConfig.servers.toLocaleString()}
              </span>
              <span className="text-zinc-500 font-sans text-[10px] md:text-xs font-extrabold tracking-[0.18em] mt-1.5 uppercase">
                {t("stat_servers")}
              </span>
            </div>

            {/* Users */}
            <div className="flex flex-col items-center">
              <span className={`font-sans font-black text-3xl tracking-tight ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                {statusConfig.users.toLocaleString()}
              </span>
              <span className="text-zinc-500 font-sans text-[10px] md:text-xs font-extrabold tracking-[0.18em] mt-1.5 uppercase">
                {t("stat_users")}
              </span>
            </div>

            {/* Commands */}
            <div className="flex flex-col items-center">
              <span className={`font-sans font-black text-3xl tracking-tight ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                1,099
              </span>
              <span className="text-zinc-500 font-sans text-[10px] md:text-xs font-extrabold tracking-[0.18em] mt-1.5 uppercase">
                {t("stat_commands")}
              </span>
            </div>
          </div>

        </section>

        {/* SCROLLABLE SECONDARY SECTIONS */}
        <div className="w-full flex flex-col items-center px-6" id="secondary-scroll-content">

          {/* SOURCES USED IN XTRA HORIZONTAL MARQUEE PANEL */}
          <div 
            className="w-full max-w-md py-16 border-t border-zinc-900/10 dark:border-zinc-900/40 flex flex-col items-center justify-center overflow-hidden" 
            id="sources-used-panel"
          >
          {/* Static heading */}
          <h3 
            className={`font-sans text-xs font-black tracking-[0.25em] mb-8 text-center select-none uppercase transition-colors duration-300 ${
              isDarkMode ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            {t("sources_heading")}
          </h3>
          
          {/* Looping horizontal scrolling marquee */}
          <div className="relative w-full overflow-hidden flex items-center h-8 select-none">
            {/* Ambient gradients for smooth edge fading */}
            <div className={`absolute left-0 top-0 bottom-0 w-16 z-20 pointer-events-none bg-gradient-to-r transition-all duration-300 ${
              isDarkMode ? "from-[#060608] to-transparent" : "from-[#f4f4f7] to-transparent"
            }`} />
            <div className={`absolute right-0 top-0 bottom-0 w-16 z-20 pointer-events-none bg-gradient-to-l transition-all duration-300 ${
              isDarkMode ? "from-[#060608] to-transparent" : "from-[#f4f4f7] to-transparent"
            }`} />

            {/* Seamless marquee wrap */}
            <div className="flex gap-16 animate-scroll whitespace-nowrap">
              {/* Loop Item Block 1 */}
              <div className="flex gap-16 items-center">
                <span className={`text-sm font-black tracking-[0.18em] font-sans transition-colors duration-300 ${isDarkMode ? "text-zinc-600 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}>SPOTIFY</span>
                <span className={`text-sm font-black tracking-[0.18em] font-sans transition-colors duration-300 ${isDarkMode ? "text-zinc-600 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}>YOUTUBE</span>
                <span className={`text-sm font-black tracking-[0.18em] font-sans transition-colors duration-300 ${isDarkMode ? "text-zinc-600 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}>SOUNDCLOUD</span>
                <span className={`text-sm font-black tracking-[0.18em] font-sans transition-colors duration-300 ${isDarkMode ? "text-zinc-600 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}>DEEZER</span>
                <span className={`text-sm font-black tracking-[0.18em] font-sans transition-colors duration-300 ${isDarkMode ? "text-zinc-600 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}>JIOSAAVN</span>
                <span className={`text-sm font-black tracking-[0.18em] font-sans transition-colors duration-300 ${isDarkMode ? "text-zinc-600 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}>APPLE MUSIC</span>
              </div>
              {/* Loop Item Block 2 (Duplicate for flawless repeat) */}
              <div className="flex gap-16 items-center">
                <span className={`text-sm font-black tracking-[0.18em] font-sans transition-colors duration-300 ${isDarkMode ? "text-zinc-600 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}>SPOTIFY</span>
                <span className={`text-sm font-black tracking-[0.18em] font-sans transition-colors duration-300 ${isDarkMode ? "text-zinc-600 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}>YOUTUBE</span>
                <span className={`text-sm font-black tracking-[0.18em] font-sans transition-colors duration-300 ${isDarkMode ? "text-zinc-600 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}>SOUNDCLOUD</span>
                <span className={`text-sm font-black tracking-[0.18em] font-sans transition-colors duration-300 ${isDarkMode ? "text-zinc-600 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}>DEEZER</span>
                <span className={`text-sm font-black tracking-[0.18em] font-sans transition-colors duration-300 ${isDarkMode ? "text-zinc-600 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}>JIOSAAVN</span>
                <span className={`text-sm font-black tracking-[0.18em] font-sans transition-colors duration-300 ${isDarkMode ? "text-zinc-600 hover:text-white" : "text-zinc-400 hover:text-zinc-900"}`}>APPLE MUSIC</span>
              </div>
            </div>
          </div>
        </div>

        {/* CORE FEATURES SECTION */}
        <div 
          className="w-full max-w-md py-16 flex flex-col items-center border-t border-zinc-900/10 dark:border-zinc-900/40" 
          id="core-features-section"
        >
          {/* Main big bold centered title */}
          <h2 
            className={`font-sans font-black text-[32px] tracking-tight mb-10 text-center uppercase transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-zinc-900"
            }`}
          >
            {t("core_features")}
          </h2>

          {/* Vertically stacked cards with identical spacing gap-5 */}
          <div className="flex flex-col gap-5 w-full">
            
            {/* Card 1: Security & Antibot */}
            <div 
              className={`relative overflow-hidden p-8 rounded-[28px] border transition-all duration-300 text-left group ${
                isDarkMode 
                  ? "bg-[#0d0d12] border-zinc-900/60 hover:border-[#b29ced]/30" 
                  : "bg-white border-zinc-200/80 shadow-sm hover:border-[#b29ced]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 
                  className={`font-sans font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-zinc-900"
                  }`}
                >
                  {t("feature_security_title")}
                </h3>
              </div>
              <p 
                className={`font-sans font-medium text-sm md:text-base leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {t("feature_security_desc")}
              </p>
              {/* Subtle background icon watermark */}
              <div 
                className={`absolute bottom-0 right-0 p-4 transition-transform duration-500 pointer-events-none translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 ${
                  isDarkMode ? "text-zinc-800/10" : "text-zinc-300/15"
                }`}
                aria-hidden="true"
              >
                <ShieldCheck className="w-24 h-24 stroke-[1.2]" />
              </div>
            </div>

            {/* Card 2: Automod & Filters */}
            <div 
              className={`relative overflow-hidden p-8 rounded-[28px] border transition-all duration-300 text-left group ${
                isDarkMode 
                  ? "bg-[#0d0d12] border-zinc-900/60 hover:border-[#b29ced]/30" 
                  : "bg-white border-zinc-200/80 shadow-sm hover:border-[#b29ced]/50"
              }`}
            >
              <h3 
                className={`font-sans font-bold text-xl md:text-2xl tracking-tight mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-zinc-900"
                }`}
              >
                {t("feature_automod_title")}
              </h3>
              <p 
                className={`font-sans font-medium text-sm md:text-base leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {t("feature_automod_desc")}
              </p>
              {/* Subtle background icon watermark */}
              <div 
                className={`absolute bottom-0 right-0 p-4 transition-transform duration-500 pointer-events-none translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 ${
                  isDarkMode ? "text-zinc-800/10" : "text-zinc-300/15"
                }`}
                aria-hidden="true"
              >
                <Terminal className="w-24 h-24 stroke-[1.2]" />
              </div>
            </div>

            {/* Card 3: 24/7 Music Engine */}
            <div 
              className={`relative overflow-hidden p-8 rounded-[28px] border transition-all duration-300 text-left group ${
                isDarkMode 
                  ? "bg-[#0d0d12] border-zinc-900/60 hover:border-[#b29ced]/30" 
                  : "bg-white border-zinc-200/80 shadow-sm hover:border-[#b29ced]/50"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 
                  className={`font-sans font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-zinc-900"
                  }`}
                >
                  {t("feature_music_title")}
                </h3>
                {/* Lavender waveform dynamic indicator */}
                <div className="flex items-end gap-1 h-5 select-none" aria-hidden="true">
                  <span className="w-1.5 h-3 bg-[#b29ced] rounded-full animate-pulse" />
                  <span className="w-1.5 h-5 bg-[#b29ced] rounded-full animate-pulse [animation-delay:0.2s]" />
                  <span className="w-1.5 h-4 bg-[#b29ced]/80 rounded-full animate-pulse [animation-delay:0.4s]" />
                  <span className="w-1.5 h-5 bg-[#b29ced]/90 rounded-full animate-pulse [animation-delay:0.1s]" />
                  <span className="w-1.5 h-3 bg-[#b29ced]/70 rounded-full animate-pulse [animation-delay:0.3s]" />
                </div>
              </div>
              <p 
                className={`font-sans font-medium text-sm md:text-base leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {t("feature_music_desc")}
              </p>
              {/* Subtle background icon watermark */}
              <div 
                className={`absolute bottom-0 right-0 p-4 transition-transform duration-500 pointer-events-none translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 ${
                  isDarkMode ? "text-zinc-800/10" : "text-zinc-300/15"
                }`}
                aria-hidden="true"
              >
                <Music className="w-24 h-24 stroke-[1.2]" />
              </div>
            </div>

            {/* Card 4: Engagement & Leveling */}
            <div 
              className={`relative overflow-hidden p-8 rounded-[28px] border transition-all duration-300 text-left group ${
                isDarkMode 
                  ? "bg-[#0d0d12] border-zinc-900/60 hover:border-[#b29ced]/30" 
                  : "bg-white border-zinc-200/80 shadow-sm hover:border-[#b29ced]/50"
              }`}
            >
              <h3 
                className={`font-sans font-bold text-xl md:text-2xl tracking-tight mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-zinc-900"
                }`}
              >
                {t("feature_levels_title")}
              </h3>
              <p 
                className={`font-sans font-medium text-sm md:text-base leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {t("feature_levels_desc")}
              </p>
              {/* Subtle background icon watermark */}
              <div 
                className={`absolute bottom-0 right-0 p-4 transition-transform duration-500 pointer-events-none translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 ${
                  isDarkMode ? "text-zinc-800/10" : "text-zinc-300/15"
                }`}
                aria-hidden="true"
              >
                <Sparkles className="w-24 h-24 stroke-[1.2]" />
              </div>
            </div>

            {/* Card 5: Interactive & Fun */}
            <div 
              className={`relative overflow-hidden p-8 rounded-[28px] border transition-all duration-300 text-left group ${
                isDarkMode 
                  ? "bg-[#0d0d12] border-zinc-900/60 hover:border-[#b29ced]/30" 
                  : "bg-white border-zinc-200/80 shadow-sm hover:border-[#b29ced]/50"
              }`}
            >
              <h3 
                className={`font-sans font-bold text-xl md:text-2xl tracking-tight mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-zinc-900"
                }`}
              >
                {t("feature_logging_title")}
              </h3>
              <p 
                className={`font-sans font-medium text-sm md:text-base leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {t("feature_logging_desc")}
              </p>
              {/* Subtle background icon watermark */}
              <div 
                className={`absolute bottom-0 right-0 p-4 transition-transform duration-500 pointer-events-none translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 ${
                  isDarkMode ? "text-zinc-800/10" : "text-zinc-300/15"
                }`}
                aria-hidden="true"
              >
                <Gamepad2 className="w-24 h-24 stroke-[1.2]" />
              </div>
            </div>

            {/* Card 6: Utility & Tickets */}
            <div 
              className={`relative overflow-hidden p-8 rounded-[28px] border transition-all duration-300 text-left group ${
                isDarkMode 
                  ? "bg-[#0d0d12] border-zinc-900/60 hover:border-[#b29ced]/30" 
                  : "bg-white border-zinc-200/80 shadow-sm hover:border-[#b29ced]/50"
              }`}
            >
              <h3 
                className={`font-sans font-bold text-xl md:text-2xl tracking-tight mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-zinc-900"
                }`}
              >
                {t("feature_ticket_title")}
              </h3>
              <p 
                className={`font-sans font-medium text-sm md:text-base leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {t("feature_ticket_desc")}
              </p>
              {/* Subtle background icon watermark */}
              <div 
                className={`absolute bottom-0 right-0 p-4 transition-transform duration-500 pointer-events-none translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 ${
                  isDarkMode ? "text-zinc-800/10" : "text-zinc-300/15"
                }`}
                aria-hidden="true"
              >
                <Server className="w-24 h-24 stroke-[1.2]" />
              </div>
            </div>

          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="w-full max-w-md py-16 flex flex-col items-center border-t border-zinc-900/10 dark:border-zinc-900/40 animate-fade-in" id="faq-section">
          <h2 className={`font-sans font-black text-4xl md:text-5xl tracking-tight mb-10 text-center uppercase transition-colors duration-300 ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
            {t("faq")}
          </h2>
          <div className="flex flex-col gap-3.5 w-full">
            {faqData.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className={`p-5 rounded-[18px] border transition-all duration-300 cursor-pointer text-left select-none ${
                    isOpen 
                      ? (isDarkMode ? "bg-[#0d0d12] border-[#b29ced]/40" : "bg-white border-[#b29ced]/40 shadow-md")
                      : (isDarkMode ? "bg-[#0d0d12] border-zinc-900/60 hover:border-zinc-800" : "bg-white border-zinc-200/80 shadow-sm hover:border-zinc-300")
                  }`}
                  onClick={() => toggleFaq(index)}
                  id={`faq-item-${index}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={`font-sans font-bold text-sm md:text-base transition-colors duration-300 ${
                      isOpen 
                        ? (isDarkMode ? "text-white" : "text-zinc-900") 
                        : (isDarkMode ? "text-zinc-200" : "text-zinc-800")
                    }`}>
                      {item.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 shrink-0 text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#b29ced]" : ""}`} />
                  </div>
                  
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-zinc-900/40 dark:border-zinc-800/20" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className={`font-sans font-medium text-xs md:text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RICH FOOTER SECTION */}
        {renderFooter()}

        </div> {/* Close secondary-scroll-content */}
          </>
        )}
      </main>

      {/* CLONED FULL-SCREEN NAVIGATION MENU OVERLAY (MATCHES THE SECOND UPLOADED SCREENSHOT EXACTLY) */}
      {isMenuOpen && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col justify-between p-6 md:p-8 animate-fade-in transition-all duration-300 ${
            isDarkMode ? "bg-[#060608] text-white" : "bg-[#f4f4f7] text-zinc-900"
          }`}
          id="fullscreen-menu-overlay"
        >
          {/* Close button at the top right */}
          <div className="w-full flex justify-end">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className={`p-3 rounded-xl transition-all active:scale-90 border ${
                isDarkMode 
                  ? "text-zinc-400 hover:text-white bg-zinc-900/60 border-zinc-900/60" 
                  : "text-zinc-600 hover:text-zinc-900 bg-white border-zinc-200"
              }`}
              aria-label="Close menu"
              id="close-menu-button"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Large bold centered menu links */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-10" id="fullscreen-menu-links">
            <button 
              onClick={() => handleMenuNavigation("HOME")}
              className={`font-sans font-black text-4xl md:text-5xl tracking-wide hover:text-[#b29ced] transition-colors active:scale-95 ${
                currentPath === "/" 
                  ? "text-[#b29ced]" 
                  : (isDarkMode ? "text-white" : "text-zinc-900")
              }`}
            >
              {t("home")}
            </button>
            <button 
              onClick={() => handleMenuNavigation("COMMANDS")}
              className={`font-sans font-black text-4xl md:text-5xl tracking-wide hover:text-[#b29ced] transition-colors active:scale-95 ${
                currentPath === "/commands" 
                  ? "text-[#b29ced]" 
                  : (isDarkMode ? "text-white" : "text-zinc-900")
              }`}
            >
              {t("commands")}
            </button>
            <button 
              onClick={() => handleMenuNavigation("TEAM")}
              className={`font-sans font-black text-4xl md:text-5xl tracking-wide hover:text-[#b29ced] transition-colors active:scale-95 ${
                currentPath === "/team" 
                  ? "text-[#b29ced]" 
                  : (isDarkMode ? "text-white" : "text-zinc-900")
              }`}
            >
              {t("team")}
            </button>
            <button 
              onClick={() => handleMenuNavigation("STATS")}
              className={`font-sans font-black text-4xl md:text-5xl tracking-wide hover:text-[#b29ced] transition-colors active:scale-95 ${
                currentPath === "/status" 
                  ? "text-[#b29ced]" 
                  : (isDarkMode ? "text-white" : "text-zinc-900")
              }`}
            >
              {t("stats")}
            </button>
            <button 
              onClick={() => handleMenuNavigation("SUPPORT")}
              className={`font-sans font-black text-4xl md:text-5xl tracking-wide hover:text-[#b29ced] transition-colors active:scale-95 ${
                isDarkMode ? "text-white" : "text-zinc-900"
              }`}
            >
              {t("support")}
            </button>
            <button 
              onClick={() => handleMenuNavigation("TOS")}
              className={`font-sans font-black text-4xl md:text-5xl tracking-wide hover:text-[#b29ced] transition-colors active:scale-95 ${
                currentPath === "/tos" 
                  ? "text-[#b29ced]" 
                  : (isDarkMode ? "text-white" : "text-zinc-900")
              }`}
            >
              {t("tos")}
            </button>
            <button 
              onClick={() => handleMenuNavigation("PRIVACY")}
              className={`font-sans font-black text-4xl md:text-5xl tracking-wide hover:text-[#b29ced] transition-colors active:scale-95 ${
                currentPath === "/privacy" 
                  ? "text-[#b29ced]" 
                  : (isDarkMode ? "text-white" : "text-zinc-900")
              }`}
            >
              {t("privacy")}
            </button>
          </nav>

          {/* ADD TO DISCORD button at the bottom matching the reference layout */}
          <div className="w-full max-w-sm mx-auto mb-6" id="menu-bottom-action">
            <a
              href="https://discord.com/oauth2/authorize?client_id=1048508657748430889"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setIsMenuOpen(false);
                triggerToast("Redirecting to Discord authorization portal...");
              }}
              className="block w-full py-4 bg-[#b29ced] hover:bg-[#a18ae0] text-[#060608] font-black text-sm tracking-widest rounded-2xl text-center uppercase active:scale-95 transition-all duration-300 shadow-xl shadow-purple-900/30"
              id="menu-invite-btn"
            >
              {t("add_to_discord")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
