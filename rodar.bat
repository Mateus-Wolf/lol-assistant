@echo off
title Assistente de Composicao LoL - React + Vite
chcp 65001 > nul
cd /d "%~dp0"

echo ===================================================
echo    Assistente de Composicao para League of Legends
echo              (React + Vite + Tailwind)
echo ===================================================
echo.
echo [1/2] Abrindo o navegador em http://localhost:5173...
start http://localhost:5173

echo [2/2] Iniciando o servidor de desenvolvimento Vite...
echo.

call npm run dev

pause
