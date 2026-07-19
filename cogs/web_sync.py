import discord
from discord.ext import commands, tasks
import aiohttp
import asyncio
import time

class WebSync(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.start_time = time.time()
        
        # Web dashboard configuration
        self.api_url = "https://xtra.visiblemc.xyz/api/status/update"
        self.api_token = "xtra_secret_token_123" # Must match STATUS_API_TOKEN in your web environment
        
        self.sync_stats.start()

    def cog_unload(self):
        self.sync_stats.cancel()

    def get_uptime(self):
        current_time = time.time()
        uptime_seconds = int(current_time - self.start_time)
        days = uptime_seconds // 86400
        hours = (uptime_seconds % 86400) // 3600
        minutes = (uptime_seconds % 3600) // 60
        
        if days > 0:
            return f"{days} days, {hours} hours"
        elif hours > 0:
            return f"{hours} hours, {minutes} minutes"
        else:
            return f"{minutes} minutes"

    @tasks.loop(seconds=15) # Syncs every 15 seconds
    async def sync_stats(self):
        # Wait until the bot is completely ready before fetching stats
        await self.bot.wait_until_ready()
        
        # Calculate stats
        servers_count = len(self.bot.guilds)
        # Sum member count across all servers
        users_count = sum(guild.member_count for guild in self.bot.guilds if guild.member_count)
        # Latency is in seconds, convert to milliseconds
        latency_ms = round(self.bot.latency * 1000)
        uptime_str = self.get_uptime()

        # Prepare JSON payload
        payload = {
            "servers": servers_count,
            "users": users_count,
            "latency": latency_ms,
            "status": "online",
            "uptime": uptime_str
        }

        # Set headers with Bearer token
        headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json"
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(self.api_url, json=payload, headers=headers, timeout=5) as response:
                    if response.status == 200:
                        # Success - keeping it silent to prevent console spam
                        if hasattr(self, "error_logged"):
                            print(f"[WebSync] Connection restored successfully.")
                            delattr(self, "error_logged")
                    elif response.status == 429:
                        # Rate limited - actual backoff
                        if not hasattr(self, "rate_limit_logged"):
                            print(f"[WebSync] Rate limited. Backing off for 60 seconds.")
                            self.rate_limit_logged = True
                        await asyncio.sleep(45) # 45 + 15 = 60 seconds backoff
                    else:
                        if not hasattr(self, "error_logged"):
                            print(f"[WebSync] Failed to sync. Code {response.status}. Muting further errors to prevent spam.")
                            self.error_logged = True
        except Exception as e:
            if not hasattr(self, "error_logged"):
                print(f"[WebSync] Connection error: {e}. Muting further errors.")
                self.error_logged = True

async def setup(bot):
    await bot.add_cog(WebSync(bot))
