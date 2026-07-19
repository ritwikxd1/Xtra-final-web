import React, { useState } from "react";
import { ArrowRight, Save, RotateCcw, AlertTriangle, Shield, Check, Info, Lock, Eye, EyeOff } from "lucide-react";

interface StatusConfig {
  servers: number;
  users: number;
  latency: number;
  status: string;
  uptime: string;
  bannerStatus: string;
  bannerColor: string;
}

interface AdminPageProps {
  isDarkMode: boolean;
  triggerToast: (msg: string) => void;
  navigateTo: (path: string) => void;
  statusConfig: StatusConfig;
  onSaveConfig: (newConfig: StatusConfig) => void;
}

export default function AdminPage({
  isDarkMode,
  triggerToast,
  navigateTo,
  statusConfig,
  onSaveConfig
}: AdminPageProps) {
  const [localConfig, setLocalConfig] = useState<StatusConfig>({ ...statusConfig });
  
  // Security authentications states
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("xtra_admin_authenticated") === "true";
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleVerifyPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setAuthError("Email cannot be empty");
      return;
    }
    if (!password.trim()) {
      setAuthError("Password cannot be empty");
      return;
    }

    setIsVerifying(true);
    setAuthError("");

    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          sessionStorage.setItem("xtra_admin_authenticated", "true");
          setIsAuthenticated(true);
          triggerToast("Authorized successfully as administrator!");
          return;
        }
      }
      
      // If we reach here, server verification failed (either not 200 OK or success: false)
      // Check local fallback
      if (email === "xpertog@gmail.com" && password === "Xtra_dev_og67@xpert&&kaushik#22") {
        sessionStorage.setItem("xtra_admin_authenticated", "true");
        setIsAuthenticated(true);
        triggerToast("Authorized offline successfully!");
      } else {
        setAuthError("Invalid administrator credentials");
        triggerToast("Access denied!");
      }
    } catch (err) {
      console.error("Auth verify error:", err);
      // Fallback local verify for robustness in case server is entirely unreachable
      if (email === "xpertog@gmail.com" && password === "Xtra_dev_og67@xpert&&kaushik#22") {
        sessionStorage.setItem("xtra_admin_authenticated", "true");
        setIsAuthenticated(true);
        triggerToast("Authorized offline successfully!");
      } else {
        setAuthError("Server verification error. Check connection.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReset = () => {
    const defaults = {
      servers: 218,
      users: 101568,
      latency: 17,
      status: "online",
      uptime: "45 hours, 39 minutes",
      bannerStatus: "Partial maintenance",
      bannerColor: "yellow"
    };
    setLocalConfig(defaults);
    triggerToast("Reset inputs to standard defaults");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(localConfig);
    triggerToast("System status updated successfully!");
  };

  const toggleStatusPreset = (preset: string) => {
    if (preset === "maintenance") {
      setLocalConfig(prev => ({
        ...prev,
        bannerStatus: "Partial maintenance",
        bannerColor: "yellow",
        status: "online"
      }));
      triggerToast("Set preset: Partial maintenance");
    } else if (preset === "operational") {
      setLocalConfig(prev => ({
        ...prev,
        bannerStatus: "All systems operational",
        bannerColor: "green",
        status: "online"
      }));
      triggerToast("Set preset: All systems operational");
    } else if (preset === "outage") {
      setLocalConfig(prev => ({
        ...prev,
        bannerStatus: "Major system outage",
        bannerColor: "red",
        status: "maintenance"
      }));
      triggerToast("Set preset: Major outage");
    }
  };

  // 1. Secure Authentication Login Guard Screen
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-6 animate-fade-in" id="admin-auth-screen">
        <div className="w-full max-w-md pt-8 pb-4 flex flex-col items-center" id="admin-auth-hero">
          <button 
            onClick={() => navigateTo("/status")}
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#b29ced] hover:opacity-85 active:scale-95 transition-all mb-8 cursor-pointer"
            id="auth-back-to-status"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180 stroke-[2.5]" />
            <span>Back to status</span>
          </button>
        </div>

        {/* Security Lock Card */}
        <div 
          className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl flex flex-col items-center text-center transition-all duration-300 ${
            isDarkMode 
              ? "bg-[#0b0b10] border-zinc-900/90 text-zinc-200" 
              : "bg-white border-zinc-200 text-zinc-800"
          }`}
          id="admin-auth-card"
        >
          {/* Glowing Security Badge */}
          <div className="relative mb-6" id="auth-shield-container">
            <div className="absolute inset-0 rounded-full bg-red-500/10 blur-xl animate-pulse" />
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-tr from-red-500 to-amber-500 text-white shadow-lg relative z-10">
              <Lock className="w-7 h-7 stroke-[2.5]" />
            </div>
          </div>

          <h2 className={`font-sans font-black text-2xl tracking-widest mb-2 uppercase ${isDarkMode ? "text-white" : "text-zinc-950"}`}>
            SECURE ACCESS
          </h2>
          <p className={`font-mono text-[10px] tracking-widest uppercase mb-6 text-red-400`}>
            Restricted Admin Area
          </p>

          <p className={`font-sans text-xs md:text-sm leading-relaxed mb-6 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}>
            Please enter your administrator email and password to authenticate control access.
          </p>

          <form onSubmit={handleVerifyPassword} className="w-full flex flex-col gap-4">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setAuthError("");
                }}
                placeholder="Enter email..."
                className={`w-full px-4 py-3.5 rounded-xl text-sm font-sans font-semibold border focus:outline-none focus:border-[#b29ced] transition-all ${
                  isDarkMode 
                    ? "bg-[#060608] border-zinc-800 text-white placeholder-zinc-600" 
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                }`}
                disabled={isVerifying}
                autoFocus
                required
                id="admin-auth-email-input"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setAuthError("");
                }}
                placeholder="Enter password..."
                className={`w-full px-4 py-3.5 rounded-xl text-sm font-sans font-semibold border focus:outline-none focus:border-[#b29ced] transition-all pr-12 ${
                  isDarkMode 
                    ? "bg-[#060608] border-zinc-800 text-white placeholder-zinc-600" 
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                }`}
                disabled={isVerifying}
                required
                id="admin-auth-password-input"
              />
              
              {/* Visibility toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${
                  isDarkMode ? "text-zinc-500 hover:text-white" : "text-zinc-400 hover:text-zinc-800"
                }`}
                id="admin-auth-password-toggle"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {authError && (
              <span className="font-sans font-semibold text-xs text-red-500 block text-left bg-red-500/5 px-3.5 py-2.5 rounded-xl border border-red-500/10">
                {authError}
              </span>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className={`w-full py-3.5 bg-[#b29ced] hover:bg-[#a18ae0] text-[#060608] font-black text-xs tracking-widest rounded-xl text-center uppercase active:scale-98 transition-all duration-300 shadow-lg shadow-purple-900/10 flex items-center justify-center gap-2 cursor-pointer ${
                isVerifying ? "opacity-75 cursor-not-allowed" : ""
              }`}
              id="admin-auth-submit-btn"
            >
              {isVerifying ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#060608] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 stroke-[2.5]" />
                  <span>Authenticate</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Main Admin Dashboard Panel (Visible only when authorized)
  return (
    <div className="w-full flex flex-col items-center px-6 animate-fade-in" id="admin-page-view">
      
      {/* Top Breadcrumb Header and Title */}
      <div className="w-full max-w-md pt-12 pb-6 flex flex-col text-center items-center" id="admin-landing-hero">
        <button 
          onClick={() => navigateTo("/status")}
          className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#b29ced] hover:opacity-85 active:scale-95 transition-all mb-8 cursor-pointer"
          id="admin-back-to-status"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180 stroke-[2.5]" />
          <span>Back to status</span>
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <Shield className="w-7 h-7 text-[#b29ced]" />
          <h1 className={`font-sans font-black text-4xl tracking-widest uppercase select-none ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
            ADMIN PANEL
          </h1>
        </div>
        
        <p className={`font-mono text-[10px] tracking-widest uppercase mb-6 ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}>
          Control Room & Global Config
        </p>
      </div>

      {/* Main Admin Config Form */}
      <div className="w-full max-w-md pb-16" id="admin-config-frame">
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          
          {/* Section 1: BANNER STATUS */}
          <div 
            className={`p-5 rounded-2xl border ${
              isDarkMode ? "bg-[#0d0d12] border-zinc-900/60" : "bg-white border-zinc-200/80 shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className={`font-sans font-black text-sm tracking-wider uppercase ${isDarkMode ? "text-zinc-200" : "text-zinc-800"}`}>
                Status Banner Settings
              </h3>
            </div>

            {/* Presets Button Bar */}
            <div className="flex flex-col gap-2 mb-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Presets</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => toggleStatusPreset("maintenance")}
                  className={`py-1.5 px-2 rounded-lg text-xs font-sans font-bold transition-all border ${
                    localConfig.bannerStatus === "Partial maintenance"
                      ? "bg-[#b29ced]/10 border-[#b29ced] text-[#b29ced]"
                      : (isDarkMode ? "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800" : "bg-zinc-100 border-zinc-200 hover:border-zinc-300")
                  }`}
                >
                  Maintenance
                </button>
                <button
                  type="button"
                  onClick={() => toggleStatusPreset("operational")}
                  className={`py-1.5 px-2 rounded-lg text-xs font-sans font-bold transition-all border ${
                    localConfig.bannerStatus === "All systems operational"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                      : (isDarkMode ? "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800" : "bg-zinc-100 border-zinc-200 hover:border-zinc-300")
                  }`}
                >
                  Operational
                </button>
                <button
                  type="button"
                  onClick={() => toggleStatusPreset("outage")}
                  className={`py-1.5 px-2 rounded-lg text-xs font-sans font-bold transition-all border ${
                    localConfig.bannerStatus === "Major system outage"
                      ? "bg-red-500/10 border-red-500 text-red-400"
                      : (isDarkMode ? "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800" : "bg-zinc-100 border-zinc-200 hover:border-zinc-300")
                  }`}
                >
                  Major Outage
                </button>
              </div>
            </div>

            {/* Custom Input */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Custom Banner Status Message
              </label>
              <input
                type="text"
                value={localConfig.bannerStatus}
                onChange={e => setLocalConfig(prev => ({ ...prev, bannerStatus: e.target.value }))}
                className={`px-3 py-2 rounded-xl text-sm font-sans font-semibold border focus:outline-none focus:border-[#b29ced] transition-all ${
                  isDarkMode 
                    ? "bg-[#060608] border-zinc-800 text-white" 
                    : "bg-zinc-50 border-zinc-200 text-zinc-900"
                }`}
                placeholder="e.g. Partial maintenance"
                required
              />
            </div>

            {/* Banner Theme/Color Choice */}
            <div className="flex flex-col gap-2 mt-4">
              <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Banner Light Indicator Color
              </label>
              <div className="flex items-center gap-4 mt-1">
                {["green", "yellow", "red"].map(color => (
                  <label key={color} className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="bannerColor"
                      value={color}
                      checked={localConfig.bannerColor === color}
                      onChange={() => setLocalConfig(prev => ({ ...prev, bannerColor: color }))}
                      className="accent-[#b29ced] h-3.5 w-3.5"
                    />
                    <span className="font-sans font-bold text-xs uppercase text-zinc-400 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        color === "green" ? "bg-emerald-500" : color === "yellow" ? "bg-amber-500" : "bg-red-500"
                      }`} />
                      {color}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Section 2: QUANTITATIVE METRICS */}
          <div 
            className={`p-5 rounded-2xl border ${
              isDarkMode ? "bg-[#0d0d12] border-zinc-900/60" : "bg-white border-zinc-200/80 shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-[#b29ced]" />
              <h3 className={`font-sans font-black text-sm tracking-wider uppercase ${isDarkMode ? "text-zinc-200" : "text-zinc-800"}`}>
                Metrics Config
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Servers */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Servers</label>
                <input
                  type="number"
                  value={localConfig.servers}
                  onChange={e => setLocalConfig(prev => ({ ...prev, servers: parseInt(e.target.value) || 0 }))}
                  className={`px-3 py-2 rounded-xl text-sm font-sans font-semibold border focus:outline-none focus:border-[#b29ced] transition-all ${
                    isDarkMode 
                      ? "bg-[#060608] border-zinc-800 text-white" 
                      : "bg-zinc-50 border-zinc-200 text-zinc-900"
                  }`}
                  min="0"
                  required
                />
              </div>

              {/* Users */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Users count</label>
                <input
                  type="number"
                  value={localConfig.users}
                  onChange={e => setLocalConfig(prev => ({ ...prev, users: parseInt(e.target.value) || 0 }))}
                  className={`px-3 py-2 rounded-xl text-sm font-sans font-semibold border focus:outline-none focus:border-[#b29ced] transition-all ${
                    isDarkMode 
                      ? "bg-[#060608] border-zinc-800 text-white" 
                      : "bg-zinc-50 border-zinc-200 text-zinc-900"
                  }`}
                  min="0"
                  required
                />
              </div>

              {/* Latency */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Latency (ms)</label>
                <input
                  type="number"
                  value={localConfig.latency}
                  onChange={e => setLocalConfig(prev => ({ ...prev, latency: parseInt(e.target.value) || 0 }))}
                  className={`px-3 py-2 rounded-xl text-sm font-sans font-semibold border focus:outline-none focus:border-[#b29ced] transition-all ${
                    isDarkMode 
                      ? "bg-[#060608] border-zinc-800 text-white" 
                      : "bg-zinc-50 border-zinc-200 text-zinc-900"
                  }`}
                  min="1"
                  required
                />
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Overall Status</label>
                <select
                  value={localConfig.status}
                  onChange={e => setLocalConfig(prev => ({ ...prev, status: e.target.value }))}
                  className={`px-3 py-2 rounded-xl text-sm font-sans font-semibold border focus:outline-none focus:border-[#b29ced] transition-all ${
                    isDarkMode 
                      ? "bg-[#060608] border-zinc-800 text-white" 
                      : "bg-zinc-50 border-zinc-200 text-zinc-900"
                  }`}
                >
                  <option value="online">Online</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>

            {/* Uptime input */}
            <div className="flex flex-col gap-1.5 mt-4">
              <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Uptime phrase</label>
              <input
                type="text"
                value={localConfig.uptime}
                onChange={e => setLocalConfig(prev => ({ ...prev, uptime: e.target.value }))}
                className={`px-3 py-2 rounded-xl text-sm font-sans font-semibold border focus:outline-none focus:border-[#b29ced] transition-all ${
                  isDarkMode 
                    ? "bg-[#060608] border-zinc-800 text-white" 
                    : "bg-zinc-50 border-zinc-200 text-zinc-900"
                }`}
                placeholder="e.g. 45 hours, 39 minutes"
                required
              />
            </div>
          </div>

          {/* SECTION 3: ACTIONS */}
          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              onClick={handleReset}
              className={`flex-1 py-3 px-4 rounded-xl border font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 ${
                isDarkMode 
                  ? "bg-zinc-900/40 border-zinc-900 hover:bg-zinc-900 text-zinc-400 hover:text-white" 
                  : "bg-zinc-100 border-zinc-200 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset defaults
            </button>

            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-[#b29ced] hover:bg-[#a18ae0] text-[#060608] font-sans font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-900/20"
            >
              <Save className="w-4 h-4" />
              Save Config
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
