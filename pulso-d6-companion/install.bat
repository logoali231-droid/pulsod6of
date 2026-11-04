@echo off
echo ╔══════════════════════════════════════════╗
echo ║     PULSO d6 COMPANION - INSTALAÇÃO     ║
echo ╚══════════════════════════════════════════╝
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js não encontrado!
    echo    Por favor, instale Node.js 18+ em https://nodejs.org
    pause
    exit /b 1
)

echo ✓ Node.js encontrado
echo ✓ npm encontrado
echo.

echo 📦 Instalando dependências...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b 1
)
echo ✓ Dependências instaladas com sucesso
echo.

echo 🔨 Compilando aplicação...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erro ao compilar aplicação
    pause
    exit /b 1
)
echo ✓ Aplicação compilada com sucesso
echo.

echo ╔══════════════════════════════════════════╗
echo ║           INSTALAÇÃO CONCLUÍDA           ║
echo ╚══════════════════════════════════════════╝
echo.
echo Para iniciar em modo desenvolvimento:
echo   npm run dev
echo.
echo Para visualizar a build de produção:
echo   npm run preview
echo.
echo Os arquivos compilados estão em: ./dist/
echo.
echo Como PWA, você pode instalar diretamente pelo navegador
echo acessando a aplicação e clicando em 'Instalar'.
echo.
pause
