@echo off
title GSRM Empty Slots Launcher
echo Starting GSRM Empty Slots...
if exist "GSRM-Empty-Slots-Windows.exe" (
    start "" "GSRM-Empty-Slots-Windows.exe"
) else (
    node empty-slots-site\server.js
)
