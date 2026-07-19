import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const CACHE_FILE = path.join(process.cwd(), "status_cache.json");

// Default initial state
const DEFAULT_STATUS = {
  servers: 218,
  users: 101568,
  latency: 17,
  status: "online",
  uptime: "45 hours, 39 minutes",
  bannerStatus: "Partial maintenance",
  bannerColor: "yellow"
};

// Load status from local JSON file if exists
function loadStatus() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const raw = fs.readFileSync(CACHE_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error loading status cache, using defaults:", e);
  }
  return DEFAULT_STATUS;
}

// Save status to local JSON file
function saveStatus(data: any) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving status cache:", e);
  }
}

// Initialize in-memory state
let currentStatus = loadStatus();

// Middlewares
app.use(express.json());

// API: Get current status
app.get("/api/status", (req, res) => {
  res.json(currentStatus);
});

// API: Verify admin credentials (email and password)
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

// API: Update status (Secured with Authorization header token)
app.post("/api/status/update", (req, res) => {
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.STATUS_API_TOKEN || "xtra_secret_token_123";

  // Validate Authorization token
  if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
    return res.status(401).json({ error: "Unauthorized. Invalid or missing STATUS_API_TOKEN." });
  }

  const { servers, users, latency, status, uptime, bannerStatus, bannerColor } = req.body;

  // Update fields if provided
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

// Serve frontend with Vite middleware in development, statically in production
async function setupFrontend() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

setupFrontend().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[xtra Fullstack Server] Running on http://localhost:${PORT}`);
  });
});
