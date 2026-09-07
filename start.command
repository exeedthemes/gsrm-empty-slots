#!/usr/bin/env bash

# Resolve the directory of this script to handle execution from any directory/Finder double-click
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "======================================="
echo " GSRM Empty SOD Slots Launcher"
echo "======================================="
echo ""

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
  echo "[ERROR] Node.js is not installed."
  echo "Please download and install Node.js from: https://nodejs.org/"
  echo "Press any key to exit..."
  read -n 1
  exit 1
fi

# Stop any old/stale server process before starting
pkill -f "empty-slots-site/server.js" >/dev/null 2>&1 || true

# Run npm install if node_modules directory is missing
if [ ! -d "node_modules" ]; then
  echo "[INFO] Installing dependencies (npm install)..."
  npm install
fi

# Start the application
echo "[INFO] Starting empty slots server..."
npm start

