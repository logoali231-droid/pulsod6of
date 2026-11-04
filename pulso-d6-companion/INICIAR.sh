#!/bin/bash

# Script para iniciar o Pulso d6 Companion

cd "$(dirname "$0")"

# Verifica se já foi instalado
if [ ! -d "node_modules" ]; then
    echo "Primeira execução detectada. Instalando..."
    ./install.sh
    echo ""
fi

echo "Iniciando servidor de desenvolvimento..."
echo "Acesse: http://localhost:5173"
echo "Pressione Ctrl+C para parar"
echo ""

npm run dev -- --host
