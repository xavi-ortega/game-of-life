#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateCellWars } from "./patterns/generate-cell-wars.js";

function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach((arg) => {
    const [key, value] = arg.split("=");
    args[key.replace(/^--/, "")] =
      value && !isNaN(Number(value)) ? Number(value) : value;
  });
  return args;
}

const args = parseArgs();
const pattern = args.pattern;
const rows = args.rows ?? 100;
const cols = args.cols ?? 100;

if (!pattern) {
  console.error(
    "Error: You must specify a pattern with --pattern=<pattern_name>",
  );
  process.exit(1);
}

// Generate the requested pattern
let gameState = null;
switch (pattern.toLowerCase()) {
  case "cell-wars":
    gameState = generateCellWars(rows, cols);
    break;
  default:
    console.error(`Error: Unknown pattern "${pattern}".`);
    process.exit(1);
}

// Save the generated preset as a JSON file
if (gameState) {
  const dirPath = path.dirname(fileURLToPath(import.meta.url));
  const fileName = `${pattern}-${rows}x${cols}.json`;
  const filePath = path.resolve(dirPath, "generated", fileName);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(gameState, null, 2));
  console.log(`Preset "${pattern}" saved in "presets/generated/${filePath}"`);
}
