@echo off
setlocal
title GSRM Empty Slots Launcher
cd /d "%~dp0"
echo Starting GSRM Empty Slots...
set "APP_EXE=GSRM-Empty-Slots-Windows.exe"
if /i "%PROCESSOR_ARCHITECTURE%"=="ARM64" if exist "GSRM-Empty-Slots-Windows-arm64.exe" set "APP_EXE=GSRM-Empty-Slots-Windows-arm64.exe"
if /i "%PROCESSOR_ARCHITEW6432%"=="ARM64" if exist "GSRM-Empty-Slots-Windows-arm64.exe" set "APP_EXE=GSRM-Empty-Slots-Windows-arm64.exe"

if exist "%APP_EXE%" (
    echo Using %APP_EXE%
    "%APP_EXE%"
) else (
    where node >nul 2>&1
    if errorlevel 1 (
        echo.
        echo ERROR: GSRM-Empty-Slots-Windows.exe is missing and Node.js is not installed.
        pause
        exit /b 1
    )
    node "empty-slots-site\server.js"
)

if errorlevel 1 (
    echo.
    echo GSRM Empty Slots stopped with an error. Please copy the message above.
    pause
)
endlocal
