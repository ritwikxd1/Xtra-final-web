export interface BotCommand {
  name: string;
  desc: string;
  cat: string;
  vote?: boolean;
}

export const commandsData: BotCommand[] = [
  // MUSIC
  { name: "?play <link/query>", desc: "Play high-fidelity music from Spotify, YouTube, SoundCloud, or JioSaavn.", cat: "MUSIC" },
  { name: "?skip", desc: "Skip the currently playing song to the next in queue.", cat: "MUSIC" },
  { name: "?stop", desc: "Stop playback, disconnect from voice channel, and clear active queue.", cat: "MUSIC" },
  { name: "?pause", desc: "Pause the currently active audio session.", cat: "MUSIC" },
  { name: "?resume", desc: "Resume paused audio session in voice channel.", cat: "MUSIC" },
  { name: "?queue", desc: "Show upcoming track list in the current music queue.", cat: "MUSIC" },
  { name: "?nowplaying", desc: "Display real-time playing song status and progress bar.", cat: "MUSIC" },
  { name: "?join", desc: "Summon the bot to join your active voice channel.", cat: "MUSIC" },
  { name: "?leave", desc: "Disconnect the bot from the voice channel.", cat: "MUSIC" },
  { name: "?loop", desc: "Set repeat mode for single track, queue, or disable.", cat: "MUSIC" },
  { name: "?autoplay", desc: "Automatically queue relevant songs when list ends.", cat: "MUSIC" },
  { name: "?grab", desc: "Direct message (DM) full details of the currently playing track.", cat: "MUSIC", vote: true },
  { name: "?clear", desc: "Wipe all upcoming songs from the queue instantly.", cat: "MUSIC" },
  { name: "?volume <1-150>", desc: "Adjust music audio level of the bot.", cat: "MUSIC" },

  // FILTERS
  { name: "?bassboost <low/medium/high>", desc: "Apply heavy low-frequency bass amplification.", cat: "FILTERS" },
  { name: "?nightcore", desc: "Enable energetic fast-tempo and high-pitch mode.", cat: "FILTERS" },
  { name: "?vaporwave", desc: "Slow down and stretch audio with rich ambient reverb.", cat: "FILTERS" },
  { name: "?8d", desc: "Simulate spatial rotating 36D audio soundstage.", cat: "FILTERS" },
  { name: "?slowed", desc: "Drop playback rate for a super relaxed, chill atmosphere.", cat: "FILTERS" },
  { name: "?speed <0.5x-2.0x>", desc: "Fine-tune audio speed rate scale.", cat: "FILTERS" },
  { name: "?pitch <0.5-2.0>", desc: "Customize output pitch frequencies.", cat: "FILTERS" },
  { name: "?resetfilters", desc: "Wipe clean all active audio effects and filters.", cat: "FILTERS" },

  // LEVELING
  { name: "?level", desc: "View, configure, and manage all available leveling and ranking commands.", cat: "LEVELING", vote: true },
  { name: "?rank <@member>", desc: "Display another server member's level details.", cat: "LEVELING" },
  { name: "?leaderboard", desc: "Display server's most active members ordered by rank.", cat: "LEVELING" },
  { name: "?xp-multiplier <rate>", desc: "Configure custom experience rate buffs (Admin only).", cat: "LEVELING" },
  { name: "?level-rewards <level> <@role>", desc: "Link automated role rewards to leveling milestones.", cat: "LEVELING" },

  // TICKETS
  { name: "?ticket", desc: "Launch and configure an interactive button-based support ticket panel.", cat: "TICKETS" },
  { name: "?ticket setup", desc: "Setup default channel, categories, and helpers for support ticket system.", cat: "TICKETS" },
  { name: "?ticket close", desc: "Close the active ticket panel and archive logs.", cat: "TICKETS" },
  { name: "?ticket add <@member>", desc: "Manually add a member to the current private ticket channel.", cat: "TICKETS" },
  { name: "?ticket remove <@member>", desc: "Manually exclude a member from a support ticket.", cat: "TICKETS" },

  // WELCOMER
  { name: "?greet", desc: "Design and customize beautiful welcome & leave greetings or embed cards.", cat: "WELCOMER" },
  { name: "?greet channel <#channel>", desc: "Designate greeting post destination in your server.", cat: "WELCOMER" },
  { name: "?greet message <text>", desc: "Draft custom greeting template with member placeholders.", cat: "WELCOMER" },
  { name: "?greet test", desc: "Simulate and preview newly configured welcome greeting embeds.", cat: "WELCOMER" },

  // PREMIUM (Included in MUSIC)
  { name: "?247 enable", desc: "Stay in your voice channel permanently (Premium-only feature).", cat: "MUSIC", vote: true },

  // UTILITY
  { name: "?help", desc: "Receive comprehensive list of commands and direct guidelines.", cat: "UTILITY" },
  { name: "?ping", desc: "Check live network latency and Discord heartbeat response times.", cat: "UTILITY" },
  { name: "?stats", desc: "Monitor technical health, server counts, and uptime charts of xtra bot.", cat: "UTILITY" },
  { name: "?invite", desc: "Generate a premium secure bot invitation link.", cat: "UTILITY" },
  { name: "?support", desc: "Retrieve support gateway invitation to our help desk.", cat: "UTILITY" },
  { name: "?vote", desc: "Vote on Top.gg to earn premium credits and level buffs.", cat: "UTILITY" },

  // SETTINGS
  { name: "?settings prefix <char>", desc: "Customize prefix character for server commands (Default is ?).", cat: "SETTINGS" },
  { name: "?settings modlogs <#channel>", desc: "Direct moderation audit trail alerts to a specific channel.", cat: "SETTINGS" },

  // VOICEMASTER
  { name: "?voice setup", desc: "Create a 'Join to Create' voice dynamic channel system.", cat: "VOICEMASTER", vote: true },
  { name: "?voice limit <num>", desc: "Set active member cap on your temporary voice channel.", cat: "VOICEMASTER" },
  { name: "?voice lock", desc: "Turn temporary voice channel access private.", cat: "VOICEMASTER" },
  { name: "?voice claim", desc: "Gain ownership of an orphaned temporary voice channel.", cat: "VOICEMASTER" }
];
