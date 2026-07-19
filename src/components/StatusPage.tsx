import React, { useState, useEffect } from "react";
import { ArrowRight, Server, Users, Activity, CheckCircle, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";

interface StatusConfig {
  servers: number;
  users: number;
  latency: number;
  status: string;
  uptime: string;
  bannerStatus: string;
  bannerColor: string;
}

interface StatusPageProps {
  isDarkMode: boolean;
  triggerToast: (msg: string) => void;
  navigateTo: (path: string) => void;
  currentPath: string;
  statusConfig: StatusConfig;
}

// Helper to parse uptime string into total seconds
function parseUptimeToSeconds(str: string): number {
  if (!str) return 0;
  
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  // Match expressions
  const dayMatch = str.match(/(\d+)\s*(?:day|d)/i);
  const hourMatch = str.match(/(\d+)\s*(?:hour|hr|h)/i);
  const minMatch = str.match(/(\d+)\s*(?:minute|min|m)/i);
  const secMatch = str.match(/(\d+)\s*(?:second|sec|s)/i);

  if (dayMatch) days = parseInt(dayMatch[1], 10);
  if (hourMatch) hours = parseInt(hourMatch[1], 10);
  if (minMatch) minutes = parseInt(minMatch[1], 10);
  if (secMatch) seconds = parseInt(secMatch[1], 10);

  // If no units were found but we have numbers
  if (!dayMatch && !hourMatch && !minMatch && !secMatch) {
    const numbers = str.match(/\d+/g);
    if (numbers) {
      if (numbers.length === 1) {
        minutes = parseInt(numbers[0], 10);
      } else if (numbers.length === 2) {
        hours = parseInt(numbers[0], 10);
        minutes = parseInt(numbers[1], 10);
      } else if (numbers.length >= 3) {
        days = parseInt(numbers[0], 10);
        hours = parseInt(numbers[1], 10);
        minutes = parseInt(numbers[2], 10);
      }
    }
  }

  return (days * 86400) + (hours * 3600) + (minutes * 60) + seconds;
}

// Helper to format total seconds into a styled uptime string
function formatSecondsToUptime(totalSeconds: number, originalStr: string): string {
  if (totalSeconds <= 0) return "0 seconds";

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Detect style
  const isShortHr = originalStr.toLowerCase().includes("hr");
  const isShortMin = originalStr.toLowerCase().includes("min");
  const isShortH = originalStr.toLowerCase().includes("h") && !originalStr.toLowerCase().includes("hour");
  const isShortM = originalStr.toLowerCase().includes("m") && !originalStr.toLowerCase().includes("minute");
  const isCommaSeparated = originalStr.includes(",");

  let parts: string[] = [];

  if (isShortHr || isShortMin || isShortH || isShortM) {
    const dUnit = isShortH || isShortM ? "d" : " days";
    const hUnit = isShortH ? "h" : (isShortHr ? "hr" : " hours");
    const mUnit = isShortM ? "m" : (isShortMin ? "min" : " minutes");
    const sUnit = isShortM ? "s" : "sec";

    if (days > 0) parts.push(`${days}${dUnit}`);
    if (hours > 0 || days > 0) parts.push(`${hours}${hUnit}`);
    parts.push(`${minutes}${mUnit}`);
    parts.push(`${seconds}${sUnit}`);
    
    return parts.join(" ");
  } else {
    const dUnit = days === 1 ? "day" : "days";
    const hUnit = hours === 1 ? "hour" : "hours";
    const mUnit = minutes === 1 ? "minute" : "minutes";
    const sUnit = seconds === 1 ? "second" : "seconds";

    if (days > 0) parts.push(`${days} ${dUnit}`);
    if (hours > 0 || days > 0) parts.push(`${hours} ${hUnit}`);
    parts.push(`${minutes} ${mUnit}`);
    parts.push(`${seconds} ${sUnit}`);

    return parts.join(isCommaSeparated ? ", " : " ");
  }
}

export default function StatusPage({
  isDarkMode,
  triggerToast,
  navigateTo,
  currentPath,
  statusConfig
}: StatusPageProps) {
  const [isGraphExpanded, setIsGraphExpanded] = useState(true);
  const [systemState, setSystemState] = useState<StatusConfig>({
    servers: 218,
    users: 101568,
    latency: 17,
    status: "online",
    uptime: "45 hours, 39 minutes",
    bannerStatus: "Partial maintenance",
    bannerColor: "yellow",
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveUptimeSeconds, setLiveUptimeSeconds] = useState(0);
  const [originalUptimeStr, setOriginalUptimeStr] = useState("");

  // Sync state with parent props if updated by admin
  useEffect(() => {
    setSystemState(statusConfig);
    const secs = parseUptimeToSeconds(statusConfig.uptime);
    setLiveUptimeSeconds(secs);
    setOriginalUptimeStr(statusConfig.uptime);
  }, [statusConfig]);

  // Real-time ticking of uptime
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveUptimeSeconds(prev => {
        const next = prev + 1;
        setSystemState(current => ({
          ...current,
          uptime: formatSecondsToUptime(next, originalUptimeStr || current.uptime)
        }));
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [originalUptimeStr]);

  // Dynamic simulation of status check update
  const handleRefresh = () => {
    setIsRefreshing(true);
    triggerToast("Checking system status...");
    setTimeout(() => {
      setIsRefreshing(false);
      // Slightly fluctuate metrics for dynamic realism
      setSystemState(prev => ({
        ...prev,
        servers: prev.servers + (Math.random() > 0.5 ? 1 : 0),
        users: prev.users + Math.floor(Math.random() * 5),
        latency: Math.floor(15 + Math.random() * 5),
      }));
      triggerToast("Systems updated in real-time!");
    }, 800);
  };

  // Autorefresh simulation every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemState(prev => ({
        ...prev,
        servers: prev.servers + (Math.random() > 0.8 ? 1 : 0),
        users: prev.users + Math.floor(Math.random() * 2),
        latency: Math.floor(16 + Math.random() * 3),
      }));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Compute banner style classes based on color selection
  const getBannerStyles = () => {
    const color = systemState.bannerColor || "yellow";
    if (color === "green") {
      return {
        frame: isDarkMode 
          ? "bg-[#091510] border-emerald-950 text-emerald-400" 
          : "bg-emerald-50/50 border-emerald-100 text-emerald-800",
        ping: "bg-emerald-400",
        dot: "bg-emerald-500",
        time: isDarkMode ? "text-emerald-500/80" : "text-emerald-600/80"
      };
    } else if (color === "red") {
      return {
        frame: isDarkMode 
          ? "bg-[#190909] border-red-950/80 text-red-400" 
          : "bg-red-50/50 border-red-100 text-red-800",
        ping: "bg-red-400",
        dot: "bg-red-500",
        time: isDarkMode ? "text-red-500/80" : "text-red-600/80"
      };
    } else {
      // yellow / maintenance
      return {
        frame: isDarkMode 
          ? "bg-[#181105] border-amber-950/80 text-amber-400" 
          : "bg-amber-50/50 border-amber-100 text-amber-850",
        ping: "bg-amber-450",
        dot: "bg-amber-500",
        time: isDarkMode ? "text-amber-500/80" : "text-amber-600/80"
      };
    }
  };

  const bannerStyle = getBannerStyles();

  return (
    <div className="w-full flex flex-col items-center px-6 animate-fade-in" id="status-page-view">
      
      {/* Top Breadcrumb Header and Title */}
      <div className="w-full max-w-md pt-12 pb-6 flex flex-col text-center items-center" id="status-landing-hero">
        {/* Back to Home Link */}
        <button 
          onClick={() => navigateTo("/")}
          className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#b29ced] hover:opacity-85 active:scale-95 transition-all mb-8 cursor-pointer"
          id="status-back-to-home"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180 stroke-[2.5]" />
          <span>Back to home</span>
        </button>

        <h1 className={`font-sans font-black text-5xl md:text-6xl tracking-widest mb-2 uppercase select-none ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
          STATUS
        </h1>
        
        <p className={`font-mono text-[10px] tracking-widest uppercase mb-6 flex items-center gap-2 ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
          System Heartbeat
          <button 
            onClick={handleRefresh} 
            className={`hover:text-[#b29ced] transition-colors cursor-pointer ${isRefreshing ? "animate-spin text-[#b29ced]" : ""}`}
            title="Refresh System Status"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </p>
      </div>

      {/* Main Stats and Graph Board */}
      <div className="w-full max-w-md flex flex-col gap-5 pb-12" id="status-dashboard-workspace">
        
        {/* DEGRADED PERFORMANCE / PARTIAL MAINTENANCE BANNER (Match screenshot design perfectly) */}
        <div 
          className={`relative overflow-hidden w-full p-4 rounded-2xl border flex items-center justify-between transition-all duration-300 ${bannerStyle.frame}`}
          id="status-banner-frame"
        >
          {/* Pulsing indicator & Status text */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${bannerStyle.ping}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${bannerStyle.dot}`}></span>
            </div>
            <span className="font-sans font-extrabold text-sm tracking-tight">
              {systemState.bannerStatus}
            </span>
          </div>

          {/* Time indicator */}
          <span className={`font-mono text-[10px] uppercase tracking-wider ${bannerStyle.time}`}>
            Just now
          </span>
        </div>

        {/* STATS GRID - 4 BEAUTIFUL CARDS */}
        <div className="grid grid-cols-2 gap-4 w-full" id="status-grid-board">
          
          {/* Card 1: Servers */}
          <div 
            className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode 
                ? "bg-[#0d0d12] border-zinc-900/60 hover:border-zinc-800" 
                : "bg-white border-zinc-200/80 hover:border-zinc-300 shadow-sm"
            }`}
            id="status-card-servers"
          >
            <div className="flex items-center gap-2 mb-4 text-zinc-500">
              <Server className="w-4 h-4 stroke-[2]" />
              <span className="font-sans font-bold text-xs tracking-wider uppercase">Servers</span>
            </div>
            <span className={`font-sans font-black text-3xl tracking-tight select-all ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
              {systemState.servers}
            </span>
          </div>

          {/* Card 2: Users */}
          <div 
            className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode 
                ? "bg-[#0d0d12] border-zinc-900/60 hover:border-zinc-800" 
                : "bg-white border-zinc-200/80 hover:border-zinc-300 shadow-sm"
            }`}
            id="status-card-users"
          >
            <div className="flex items-center gap-2 mb-4 text-zinc-500">
              <Users className="w-4 h-4 stroke-[2]" />
              <span className="font-sans font-bold text-xs tracking-wider uppercase">Users</span>
            </div>
            <span className={`font-sans font-black text-3xl tracking-tight select-all ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
              {systemState.users.toLocaleString()}
            </span>
          </div>

          {/* Card 3: Average Latency */}
          <div 
            className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode 
                ? "bg-[#0d0d12] border-zinc-900/60 hover:border-zinc-800" 
                : "bg-white border-zinc-200/80 hover:border-zinc-300 shadow-sm"
            }`}
            id="status-card-latency"
          >
            <div className="flex items-center gap-2 mb-4 text-zinc-500">
              <Activity className="w-4 h-4 stroke-[2]" />
              <span className="font-sans font-bold text-xs tracking-wider uppercase">Average Latency</span>
            </div>
            <span className={`font-sans font-black text-3xl tracking-tight select-all ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
              {systemState.latency}ms
            </span>
          </div>

          {/* Card 4: Status */}
          <div 
            className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode 
                ? "bg-[#0d0d12] border-zinc-900/60 hover:border-zinc-800" 
                : "bg-white border-zinc-200/80 hover:border-zinc-300 shadow-sm"
            }`}
            id="status-card-online"
          >
            <div className="flex items-center gap-2 mb-4 text-zinc-500">
              <CheckCircle className="w-4 h-4 stroke-[2]" />
              <span className="font-sans font-bold text-xs tracking-wider uppercase">Status</span>
            </div>
            <span className="font-sans font-black text-3xl tracking-tight text-emerald-400 uppercase select-none">
              {systemState.status}
            </span>
          </div>

        </div>

        {/* LATENCY GRAPH CARD - 12 HOURS (Matches screenshots perfectly) */}
        <div 
          className={`rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden ${
            isDarkMode 
              ? "bg-[#0d0d12] border-zinc-900/60" 
              : "bg-white border-zinc-200/80 shadow-sm"
          }`}
          id="status-graph-card"
        >
          {/* Expandable Header block */}
          <button
            onClick={() => setIsGraphExpanded(!isGraphExpanded)}
            className="w-full p-5 flex items-center justify-between text-left cursor-pointer outline-none select-none hover:bg-zinc-900/10 dark:hover:bg-zinc-950/20 transition-colors"
            id="status-graph-header-btn"
          >
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-zinc-500 stroke-[2.2]" />
              <span className={`font-sans font-bold text-sm md:text-base tracking-wide uppercase ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                average latency (12 hours)
              </span>
            </div>
            {isGraphExpanded ? (
              <ChevronUp className="w-4 h-4 text-zinc-400 stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-zinc-400 stroke-[2.5]" />
            )}
          </button>

          {/* Graph Content (Collapsible) */}
          {isGraphExpanded && (
            <div className="px-5 pb-6 flex flex-col animate-fade-in" id="status-graph-content">
              {/* Latency Plot Board */}
              <div className="h-44 w-full relative flex mt-2" id="status-graph-chart">
                
                {/* Y-Axis Label Indicators */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-mono text-zinc-500 select-none pointer-events-none">
                  <span>50ms</span>
                  <span>40ms</span>
                  <span>30ms</span>
                  <span>20ms</span>
                </div>

                {/* Grid guidelines and the line */}
                <div className="flex-1 ml-10 h-full relative border-l border-b border-zinc-900/10 dark:border-zinc-800/40">
                  {/* Grid Lines */}
                  <div className="absolute inset-x-0 top-0 border-t border-zinc-900/[0.04] dark:border-zinc-800/20 h-0" />
                  <div className="absolute inset-x-0 top-1/3 border-t border-zinc-900/[0.04] dark:border-zinc-800/20 h-0" />
                  <div className="absolute inset-x-0 top-2/3 border-t border-zinc-900/[0.04] dark:border-zinc-800/20 h-0" />
                  <div className="absolute inset-x-0 bottom-0 border-t border-zinc-900/[0.04] dark:border-zinc-800/20 h-0" />

                  {/* Horizontal flat-ish latency line with circles at the ends - exactly as shown in screenshot */}
                  <div className="absolute left-4 right-4 bottom-[20%] h-[3px] flex items-center justify-between" id="sparkline-container">
                    {/* The line itself */}
                    <div className="absolute left-0 right-0 h-[2.5px] bg-[#b29ced] shadow-md shadow-[#b29ced]/30" />
                    
                    {/* Start marker dot */}
                    <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-[#b29ced] shadow-sm z-10" />

                    {/* End marker dot */}
                    <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-[#b29ced] shadow-sm z-10 animate-pulse" />
                  </div>

                  {/* Subtle pulsing glow overlay under the line */}
                  <div className="absolute left-4 right-4 bottom-0 h-[20%] bg-gradient-to-t from-transparent to-[#b29ced]/5 rounded-t-sm pointer-events-none" />
                </div>

              </div>

              {/* Uptime and details text at bottom */}
              <div className="mt-5 pt-4 border-t border-zinc-900/10 dark:border-zinc-900/40 flex items-center justify-center" id="status-uptime-frame">
                <span className="font-sans font-medium text-xs text-zinc-500">
                  uptime: <span className={isDarkMode ? "text-zinc-300" : "text-zinc-700"}>{systemState.uptime}</span>
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
