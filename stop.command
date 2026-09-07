#!/usr/bin/env bash

# Resolve the directory of this script to handle execution from any directory/Finder double-click
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "======================================="
echo " GSRM Empty SOD Slots - Stop Server"
echo "======================================="
echo ""

# Find and kill the server process
PID=$(pgrep -f "empty-slots-site/server.js")
if [ -n "$PID" ]; then
  echo "[INFO] Stopping server process (PID $PID)..."
  kill $PID
  echo "[OK] Server stopped successfully."
else
  echo "[INFO] No running GSRM server process was found."
fi

echo "This window will close in 3 seconds..."
sleep 3
