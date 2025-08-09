#!/bin/bash

set -e

COMPOSE_FILE="docker-compose.yml"
DATA_DIR="data"

function usage() {
  echo "Usage: $0 {start|stop|build|clean|install|logs [app|mongo]}"
  exit 1
}

case "$1" in
  logs)
    case "$2" in
      app)
        docker compose -f "$COMPOSE_FILE" logs -f app
        ;;
      mongo)
        docker compose -f "$COMPOSE_FILE" logs -f mongo1 mongo2 mongo3 mongo-init-replica
        ;;
      "")
        docker compose -f "$COMPOSE_FILE" logs -f
        ;;
      *)
        echo "Unknown logs target: $2. Use 'app', 'mongo', or leave blank for all."
        exit 1
        ;;
    esac
    ;;
  install)
    TARGET="$HOME/bin/shelf"
    mkdir -p "$HOME/bin"
    cp "$0" "$TARGET"
    chmod +x "$TARGET"
    if ! echo "$PATH" | grep -q "$HOME/bin"; then
      echo "export PATH=\"$HOME/bin:\$PATH\"" >> "$HOME/.zshrc"
      echo "Added $HOME/bin to your PATH in .zshrc. Please restart your shell or run 'source ~/.zshrc'."
    fi
    echo "Installed shelf.sh as 'shelf' in $HOME/bin."
    ;;
  start)
    docker compose -f "$COMPOSE_FILE" up -d
    ;;
  stop)
    docker compose -f "$COMPOSE_FILE" down
    ;;
  build)
    docker compose -f "$COMPOSE_FILE" build
    ;;
  clean)
    docker compose -f "$COMPOSE_FILE" down -v
    echo "Removing MongoDB data volumes..."
    rm -rf "$DATA_DIR/27017" "$DATA_DIR/27018" "$DATA_DIR/27019" || echo "Warning: Failed to remove some data directories"
    echo "Cleaned up Docker containers and volumes."
    ;;
  *)
    usage
    ;;
esac
