#!/bin/bash

# Pulso d6 Companion - Installation Script
# This script installs dependencies and builds the application

echo "╔══════════════════════════════════════════╗"
echo "║     PULSO d6 COMPANION - INSTALAÇÃO     ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo "   Por favor, instale Node.js 18+ em https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js versão $NODE_VERSION detectada. Recomendado Node.js 18+"
fi

echo "✓ Node.js $(node -v) encontrado"
echo "✓ npm $(npm -v) encontrado"
echo ""

# Install dependencies
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✓ Dependências instaladas com sucesso"
echo ""

# Build the application
echo "🔨 Compilando aplicação..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro ao compilar aplicação"
    exit 1
fi

echo "✓ Aplicação compilada com sucesso"
echo ""

echo "╔══════════════════════════════════════════╗"
echo "║           INSTALAÇÃO CONCLUÍDA           ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "Para iniciar em modo desenvolvimento:"
echo "  npm run dev"
echo ""
echo "Para visualizar a build de produção:"
echo "  npm run preview"
echo ""
echo "Os arquivos compilados estão em: ./dist/"
echo ""
echo "Como PWA, você pode instalar diretamente pelo navegador"
echo "acessando a aplicação e clicando em 'Instalar'."
echo ""
