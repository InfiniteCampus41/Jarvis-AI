import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import os from "os";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static(__dirname));
const appPaths = {
  "discord": "Put the path to discord.exe here"
};
app.post("/open-app", (req, res) => {
  let { appName } = req.body;
  if (!appName) return res.status(400).send("No App Name Provided.");
console.log("Received App Open Request:", req.body);
  appName = appName.toLowerCase().trim();
  if (!(appName in appPaths)) {
    return res.status(404).send(`App "${appName}" Not Found In App Map.`);
  }
  const exePath = appPaths[appName];
  try {
    const args = exePath === "explorer" ? [os.homedir()] : [];
    const child = spawn(exePath, args, { detached: true, stdio: "ignore" });
    child.unref();
    res.send(`Opened ${appName}`);
  } catch (err) {
    console.error(`Error Opening App ${appName}:`, err);
    res.status(500).send(`Failed To Open ${appName}`);
  }
});
app.listen(port, () => {
  console.log(`Server Running At http://localhost:${port}`);
  console.log(`This Ai Program Origiates From Hacker41`);
});
