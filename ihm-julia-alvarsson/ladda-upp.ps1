Set-Location -LiteralPath "c:\Users\Julia\OneDrive - Reach for the Stars AB\Skrivbordet\ihm-julia-alvarsson"
$env:Path = "$env:LOCALAPPDATA\Programs\Git\cmd;$env:LOCALAPPDATA\Programs\Git\ucrt64\bin;$env:Path"
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "   Laddar upp ditt projekt till GitHub..." -ForegroundColor Cyan
Write-Host "   Repo: https://github.com/tb4dhfvzkw-png/personlig-sida-julia" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Green
Write-Host ""
git push -u origin main
Write-Host ""
Write-Host "Fardigt! Tryck pa valfri tangent for att stanga detta fonster..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
