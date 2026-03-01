#!/usr/bin/env bash
# Record a demo GIF for the README.
# Supports two recorders: VHS (preferred) and Asciinema.
#
# Usage:
#   ./scripts/record-demo.sh          # uses VHS
#   ./scripts/record-demo.sh asciinema # uses asciinema + agg
#
# Prerequisites:
#   VHS:       brew install charmbracelet/tap/vhs  (or go install)
#   Asciinema: pip install asciinema && cargo install agg

set -euo pipefail
cd "$(dirname "$0")/.."

METHOD="${1:-vhs}"

case "$METHOD" in
  vhs)
    if ! command -v vhs &>/dev/null; then
      echo "❌ VHS not found. Install: https://github.com/charmbracelet/vhs"
      exit 1
    fi
    echo "🎬 Recording with VHS..."
    vhs demo.tape
    echo "✅ demo.gif created"
    ;;
  asciinema)
    if ! command -v asciinema &>/dev/null; then
      echo "❌ asciinema not found. Install: pip install asciinema"
      exit 1
    fi
    if ! command -v agg &>/dev/null; then
      echo "❌ agg not found (converts .cast → .gif). Install: cargo install agg"
      exit 1
    fi
    echo "🎬 Recording with asciinema..."
    echo "   Run 'npx go-touch-grass' inside the session, then type 'exit'."
    asciinema rec demo.cast --title "go-touch-grass demo"
    echo "🔄 Converting to GIF..."
    agg demo.cast demo.gif --theme mocha --font-size 16
    rm -f demo.cast
    echo "✅ demo.gif created"
    ;;
  *)
    echo "Usage: $0 [vhs|asciinema]"
    exit 1
    ;;
esac
