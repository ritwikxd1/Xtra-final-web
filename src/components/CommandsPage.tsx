import React, { useState } from "react";
import { ArrowRight, Search, Terminal } from "lucide-react";
import { commandsData } from "../data/commands";

interface CommandsPageProps {
  isDarkMode: boolean;
  triggerToast: (msg: string) => void;
  navigateTo: (path: string) => void;
  currentPath: string;
  t: (key: string) => string;
}

export default function CommandsPage({
  isDarkMode,
  triggerToast,
  navigateTo,
  currentPath,
  t
}: CommandsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = [
    "ALL", 
    "MUSIC", 
    "FILTERS", 
    "LEVELING", 
    "TICKETS", 
    "WELCOMER", 
    "SETTINGS", 
    "VOICEMASTER", 
    "UTILITY"
  ];

  // Filter commands by search query and category
  const filteredCommands = commandsData.filter((cmd) => {
    const matchesSearch = 
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === "ALL") {
      return matchesSearch;
    }
    return matchesSearch && cmd.cat === selectedCategory;
  });

  return (
    <div className="w-full flex flex-col items-center px-6 animate-fade-in" id="commands-page-view">
      
      {/* Header / Sub-Header inside the commands page */}
      <div className="w-full max-w-md py-12 flex flex-col text-left border-b border-zinc-900/10 dark:border-zinc-900/40" id="commands-landing-hero">
        {/* Back to Home Link */}
        <button 
          onClick={() => navigateTo("/")}
          className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#b29ced] hover:opacity-85 active:scale-95 transition-all mb-4 self-start cursor-pointer"
          id="commands-back-to-home"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180 stroke-[2.5]" />
          <span>{t("backToHome")}</span>
        </button>

        <h1 className={`font-sans font-black text-4xl md:text-5xl tracking-tight mb-3 uppercase ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
          Bot Commands
        </h1>
        
        <p className={`font-sans font-medium text-sm leading-relaxed ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}>
          Search and explore over 1,099+ interactive features. Use the search bar below or select a category pill to filter command guides.
        </p>
      </div>

      {/* COMMANDS INTERACTIVE BOARD */}
      <div className="w-full max-w-md py-8 flex flex-col gap-6" id="commands-explorer-workspace">
        
        {/* Search Bar Input Container */}
        <div className="relative w-full" id="commands-search-bar-frame">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commands (e.g. play, bassboost, level)..."
            className={`w-full py-4 pl-12 pr-4 rounded-2xl font-sans font-medium text-sm border outline-none transition-all duration-300 ${
              isDarkMode 
                ? "bg-[#0d0d12] border-zinc-900/60 hover:border-zinc-800 focus:border-[#b29ced]/50 text-white placeholder-zinc-500" 
                : "bg-white border-zinc-200 hover:border-zinc-300 focus:border-[#b29ced]/50 text-zinc-900 placeholder-zinc-400 shadow-sm"
            }`}
            id="commands-search-input"
          />
          <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-[#b29ced] hover:opacity-85 transition-opacity active:scale-90 cursor-pointer"
              id="commands-search-clear"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Category Pills Scrolling Row */}
        <div className="w-full" id="commands-category-scroller">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none" id="commands-pills-container">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    triggerToast(`Filtering: ${cat}`);
                  }}
                  className={`px-4 py-2 rounded-xl font-sans font-black text-xs tracking-wider uppercase transition-all duration-300 shrink-0 select-none cursor-pointer active:scale-95 border ${
                    isSelected
                      ? "bg-[#b29ced] border-[#b29ced] text-[#060608] shadow-md shadow-purple-900/20"
                      : isDarkMode
                        ? "bg-[#0d0d12] border-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                        : "bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 shadow-sm"
                  }`}
                  id={`category-pill-${cat}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counts indicator */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 px-1" id="commands-counts-indicator">
          <span>CATEGORY: {selectedCategory}</span>
          <span>FOUND {filteredCommands.length} COMMANDS</span>
        </div>

        {/* Commands List Cards */}
        <div className="flex flex-col gap-3.5 w-full min-h-[250px]" id="commands-cards-list">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-[18px] border transition-all duration-300 hover:scale-[1.01] flex flex-col text-left group relative overflow-hidden ${
                  isDarkMode
                    ? "bg-[#0d0d12] border-zinc-900/60 hover:border-zinc-800"
                    : "bg-white border-zinc-200/80 shadow-sm hover:border-zinc-300"
                }`}
                id={`command-card-${idx}`}
              >
                {/* Top Row: Command Trigger Name */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <span className={`font-mono font-bold text-sm md:text-base tracking-tight select-all transition-colors duration-300 group-hover:text-[#b29ced] ${
                    isDarkMode ? "text-white" : "text-zinc-900"
                  }`}>
                    {cmd.name}
                  </span>
                  
                  {/* Tags or badges */}
                  <div className="flex items-center gap-1.5">
                    {cmd.vote && (
                      <span className="font-sans font-extrabold text-[9px] tracking-widest px-2 py-0.5 rounded-md bg-[#ff3366]/10 text-[#ff3366] uppercase border border-[#ff3366]/20">
                        Vote
                      </span>
                    )}
                    <span className={`font-sans font-black text-[9px] tracking-widest px-2 py-0.5 rounded-md uppercase border ${
                      isDarkMode
                        ? "bg-zinc-900/50 border-zinc-800 text-zinc-400"
                        : "bg-zinc-100 border-zinc-200 text-zinc-500"
                    }`}>
                      {cmd.cat}
                    </span>
                  </div>
                </div>

                {/* Middle Row: Description */}
                <p className={`font-sans font-medium text-xs md:text-sm leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}>
                  {cmd.desc}
                </p>

                {/* Accent highlight strip on left of card */}
                <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r bg-[#b29ced] scale-y-50 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-300" />
              </div>
            ))
          ) : (
            // Empty State Placeholder
            <div className={`py-12 px-6 rounded-2xl border border-dashed flex flex-col items-center justify-center text-center gap-4 ${
              isDarkMode ? "border-zinc-900 bg-zinc-950/20" : "border-zinc-200 bg-white shadow-inner"
            }`} id="commands-empty-state">
              <Terminal className="w-10 h-10 text-zinc-500 stroke-[1.5]" />
              <div className="flex flex-col gap-1">
                <span className={`font-sans font-bold text-sm ${isDarkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                  No matching commands found
                </span>
                <span className="font-sans font-medium text-xs text-zinc-500 max-w-xs">
                  Try checking your spelling, looking in a different category, or resetting the search filter.
                </span>
              </div>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("ALL"); triggerToast("Reset filters!"); }}
                className="mt-2 px-4 py-2 rounded-xl bg-brand-purple/10 hover:bg-brand-purple/20 text-[#b29ced] font-sans font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                id="commands-reset-filters-btn"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
