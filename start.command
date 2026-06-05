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
  echo "❌ Error: Node.js is not installed."
  echo "Please download and install Node.js from: https://nodejs.org/"
  echo "Press any key to exit..."
  read -n 1
  exit 1
fi

# Run npm install if node_modules directory is missing
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies (npm install)..."
  npm install
fi

# Open the local URL in the default browser after starting
(
  sleep 2
  echo "🌐 Opening http://localhost:4173 in your browser..."
  open "http://localhost:4173"
) &

# Start the application
echo "⚡ Starting empty slots server..."
npm start
