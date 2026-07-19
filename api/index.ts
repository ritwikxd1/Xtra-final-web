import express from "express";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());

// For Vercel Serverless, /tmp is the only writable directory
const CACHE_FILE = path.join("/tmp", "status_cache.json");

const DEFAULT_STATUS = {
  servers: 218,
  users: 101568,
  latency: 17,
  status: "online",
  uptime: "45 hours, 39 minutes",
  bannerStatus: "Partial maintenance",
  bannerColor: "yellow"
};

function loadStatus() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const raw = fs.readFileSync(CACHE_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {}
  return DEFAULT_STATUS;
}

function saveStatus(data: any) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving status cache:", e);
  }
}

let currentStatus = loadStatus();

app.get("/api/status", (req, res) => {
  res.json(currentStatus);
});

app.post("/api/admin/verify", (req, res) => {
  const { email, password } = req.body;
  const expectedEmail = process.env.ADMIN_EMAIL || "xpertog@gmail.com";
  const expectedPassword = process.env.ADMIN_PASSWORD || "Xtra_dev_og67@xpert&&kaushik#22";
  
  if (email === expectedEmail && password === expectedPassword) {
    res.json({ success: true, token: "xtra_admin_valid_session_2026" });
  } else {
    res.status(401).json({ success: false, error: "Incorrect admin email or password" });
  }
});

app.post("/api/status/update", (req, res) => {
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.STATUS_API_TOKEN || "xtra_secret_token_123";

  if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
    return res.status(401).json({ error: "Unauthorized. Invalid or missing STATUS_API_TOKEN." });
  }

  const { servers, users, latency, status, uptime, bannerStatus, bannerColor } = req.body;

  if (servers !== undefined) currentStatus.servers = Number(servers);
  if (users !== undefined) currentStatus.users = Number(users);
  if (latency !== undefined) currentStatus.latency = Number(latency);
  if (status !== undefined) currentStatus.status = String(status);
  if (uptime !== undefined) currentStatus.uptime = String(uptime);
  if (bannerStatus !== undefined) currentStatus.bannerStatus = String(bannerStatus);
  if (bannerColor !== undefined) currentStatus.bannerColor = String(bannerColor);

  saveStatus(currentStatus);
  res.json({ success: true, message: "Status updated successfully!", data: currentStatus });
});

export default app;
