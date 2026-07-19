import React from "react";
import { Crown, Terminal, User, ExternalLink, ArrowLeft } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  roleType: "owner" | "owner_sisu" | "developer";
  profileUrl: string;
  pfpPath: string;
}

interface TeamSectionProps {
  isDarkMode: boolean;
  triggerToast: (msg: string) => void;
  navigateTo: (path: string) => void;
  currentPath: string;
  t: (key: string) => string;
}

export default function TeamPage({ isDarkMode, triggerToast, navigateTo, currentPath, t }: TeamSectionProps) {
  const handleBackToHome = () => {
    navigateTo("/");
    triggerToast(t("backToHome"));
  };

  const members: TeamMember[] = [
    {
      name: "Kaushik",
      role: "Owner 1",
      roleType: "owner",
      profileUrl: "https://discord.com/users/1008243358902263929",
      pfpPath: "/Kaushik.png"
    },
    {
      name: "Xpert",
      role: "Owner 2",
      roleType: "owner",
      profileUrl: "https://discord.com/users/1410904623618855042",
      pfpPath: "/Xpert.png"
    },
    {
      name: "Rossie",
      role: "Owner Sisu",
      roleType: "owner_sisu",
      profileUrl: "https://discord.com/users/1485514225764798590",
      pfpPath: "/Rossie.png"
    },
    {
      name: "Lakshaya",
      role: "Developer",
      roleType: "developer",
      profileUrl: "https://discord.com/users/931798026933133312",
      pfpPath: "/Lakshaya.png"
    }
  ];

  const getRoleIcon = (type: string) => {
    switch (type) {
      case "owner":
        return <Crown className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />;
      case "owner_sisu":
        return <Crown className="w-3.5 h-3.5 text-purple-400 stroke-[2.5]" />;
      default:
        return <Terminal className="w-3.5 h-3.5 text-blue-400 stroke-[2.5]" />;
    }
  };

  const getRoleBadgeStyle = (type: string) => {
    switch (type) {
      case "owner":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "owner_sisu":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-12 flex flex-col items-center animate-fade-in" id="team-page-container">
      {/* Header back navigation bar */}
      <div className="w-full flex items-center justify-start mb-8" id="team-back-bar">
        <button
          onClick={handleBackToHome}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 active:scale-95 border ${
            isDarkMode
              ? "bg-zinc-900/40 border-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-900"
              : "bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
          }`}
          id="team-back-button"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("backToHome")}</span>
        </button>
      </div>

      <h1 
        className={`font-sans font-black text-3xl md:text-4xl tracking-tight mb-2 text-center uppercase transition-colors duration-300 ${
          isDarkMode ? "text-white" : "text-zinc-900"
        }`}
        id="team-section-title"
      >
        XTRA DEVELOPMENT TEAM
      </h1>
      <p 
        className={`font-sans font-medium text-xs tracking-wider mb-10 text-center uppercase transition-colors duration-300 ${
          isDarkMode ? "text-zinc-500" : "text-zinc-400"
        }`}
        id="team-section-subtitle"
      >
        Meet the creators behind the ultimate Discord bot experience
      </p>

      {/* Grid of Team Cards */}
      <div className="flex flex-col gap-5 w-full mb-12" id="team-members-list">
        {members.map((member) => (
          <div 
            key={member.name}
            className={`relative overflow-hidden p-5 rounded-[24px] border transition-all duration-300 flex items-center justify-between group ${
              isDarkMode 
                ? "bg-[#0d0d12] border-zinc-900/60 hover:border-[#b29ced]/30" 
                : "bg-white border-zinc-200/80 shadow-sm hover:border-[#b29ced]/50"
            }`}
            id={`team-member-card-${member.name.replace(".", "_")}`}
          >
            {/* Left side: Avatar & Info */}
            <div className="flex items-center gap-4">
              {/* Profile Image container with standard fallback */}
              <div 
                className="w-14 h-14 rounded-2xl overflow-hidden border border-[#b29ced]/20 bg-[#060608] flex items-center justify-center shadow-md relative"
                id={`team-avatar-container-${member.name.replace(".", "_")}`}
              >
                <img
                  src={member.pfpPath}
                  alt={`${member.name} Profile`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fallbackIcon = parent.querySelector('.team-avatar-fallback');
                      if (fallbackIcon) {
                        fallbackIcon.classList.remove('hidden');
                      }
                    }
                  }}
                />
                {/* Fallback component shown on error */}
                <div 
                  className="team-avatar-fallback hidden absolute inset-0 bg-gradient-to-tr from-brand-purple/20 to-brand-lilac/10 flex items-center justify-center font-sans font-black text-xl text-[#b29ced] select-none uppercase"
                  id={`team-avatar-fallback-${member.name.replace(".", "_")}`}
                >
                  {member.name.substring(0, 2)}
                </div>
              </div>

              {/* Name & Role Text info */}
              <div className="flex flex-col text-left">
                {/* Role Badge */}
                <div className="flex items-center gap-1.5 mb-1">
                  <span 
                    className={`font-sans font-extrabold text-[10px] tracking-wider px-2 py-0.5 rounded-md border uppercase flex items-center gap-1 ${getRoleBadgeStyle(member.roleType)}`}
                    id={`team-role-badge-${member.name.replace(".", "_")}`}
                  >
                    {getRoleIcon(member.roleType)}
                    {member.role}
                  </span>
                </div>

                {/* Name */}
                <span 
                  className={`font-sans font-extrabold text-sm md:text-base tracking-tight transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-zinc-900"
                  }`}
                  id={`team-member-name-${member.name.replace(".", "_")}`}
                >
                  {member.name}
                </span>
              </div>
            </div>

            {/* Right side: External profile action button */}
            <a 
              href={member.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerToast(`Opening ${member.name}'s Discord Profile...`)}
              className={`p-3 rounded-xl transition-all duration-300 active:scale-90 border flex items-center justify-center ${
                isDarkMode 
                  ? "bg-zinc-900/30 border-zinc-900/60 hover:bg-zinc-900 hover:border-[#b29ced]/30 text-zinc-400 hover:text-white" 
                  : "bg-zinc-100 border-zinc-200 hover:bg-zinc-200 hover:border-[#b29ced]/40 text-zinc-600 hover:text-zinc-900"
              }`}
              aria-label={`View ${member.name}'s Discord profile`}
              id={`team-member-link-${member.name.replace(".", "_")}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
