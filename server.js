"use strict";

const express = require("express");
const exphbs = require("express-handlebars");
const fs = require("fs");
const path = require("path");

// Requiring our models for syncing
const db = require("./models");

const PORT = process.env.PORT || 8080;
const APP_NAME = process.env.APP_NAME || "docker-epicbook";
const APP_LOG_DIR = process.env.APP_LOG_DIR || path.join(__dirname, "logs");
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "";

const app = express();

fs.mkdirSync(APP_LOG_DIR, { recursive: true });

function writeLog(level, message, meta = {}) {
  const line = JSON.stringify({
    timestamp: new Date().toISOString(),
    app: APP_NAME,
    level,
    message,
    ...meta
  });

  console.log(line);
  fs.appendFile(path.join(APP_LOG_DIR, "app.log"), line + "\n", () => {});
}

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  const startedAt = Date.now();

  if (ALLOWED_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  res.on("finish", () => {
    writeLog("info", "request_completed", {
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      remoteAddress: req.ip
    });
  });

  next();
});

app.get("/healthz", async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.status(200).json({ status: "ok", app: APP_NAME });
  } catch (error) {
    writeLog("error", "healthcheck_failed", { error: error.message });
    res.status(503).json({ status: "error", message: error.message });
  }
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/cart-api-routes")(app);

writeLog("info", "registering_routes");
app.use("/", require("./routes/html-routes"));
app.use("/cart", require("./routes/html-routes"));
app.use("/gallery", require("./routes/html-routes"));

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    writeLog("info", "server_started", { port: PORT });
  });
});
