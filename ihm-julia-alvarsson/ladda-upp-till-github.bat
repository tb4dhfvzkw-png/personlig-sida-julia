@echo off
chcp 65001 >nul
title Ladda upp till GitHub - personlig-sida-julia
echo ======================================================================
echo   Laddar upp ditt projekt till GitHub...
echo   Repo: https://github.com/tb4dhfvzkw-png/personlig-sida-julia
echo ======================================================================
echo.

set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%LOCALAPPDATA%\Programs\Git\ucrt64\bin;%PATH%"

cd /d "%~dp0"

echo 1. Sparar eventuella nya andringar...
git add .
git commit -m "Uppdatering av personlig sida" 2>nul

echo.
echo 2. Skickar upp till GitHub...
echo (Om en inloggningsruta dyker upp, valj 'Sign in with your browser')
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ======================================================================
    echo   Hurra! Projektet ar nu uppladdat till GitHub!
    echo ======================================================================
) else (
    echo.
    echo Nagot gick fel vid uppladdningen.
    echo Om ditt repo pa GitHub redan inneholl filer (t.ex. en README),
    echo kan du behova kora: git push -u origin main --force
)

echo.
pause
