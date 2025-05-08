#!/bin/bash
# CI/CD helper scripts for ClassConnect

# Make the script exit on any errors
set -e

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Print help message
function show_help {
  echo -e "${GREEN}ClassConnect CI/CD Helper Scripts${NC}"
  echo -e "Usage: ./ci-cd-scripts.sh [command]"
  echo ""
  echo "Commands:"
  echo "  test        - Run tests (vitest run)"
  echo "  test:watch  - Run tests in watch mode (vitest)"
  echo "  test:cov    - Run tests with coverage (vitest run --coverage)"
  echo "  lint        - Run linting checks"
  echo "  ci          - Run full CI sequence (check, lint, test, build)"
  echo "  help        - Show this help message"
}

# Run tests
function run_tests {
  echo -e "${GREEN}Running tests...${NC}"
  npx vitest run
}

# Run tests in watch mode
function run_tests_watch {
  echo -e "${GREEN}Running tests in watch mode...${NC}"
  npx vitest
}

# Run tests with coverage
function run_tests_coverage {
  echo -e "${GREEN}Running tests with coverage...${NC}"
  npx vitest run --coverage
}

# Run linting
function run_lint {
  echo -e "${GREEN}Running linting checks...${NC}"
  echo "No linting configured yet"
  # When you have ESLint configured, uncomment the next line
  # npx eslint . --ext .js,.jsx,.ts,.tsx
}

# Run full CI sequence
function run_ci {
  echo -e "${GREEN}Running full CI sequence...${NC}"
  
  echo -e "${YELLOW}Step 1: TypeScript check${NC}"
  npm run check
  
  echo -e "${YELLOW}Step 2: Linting${NC}"
  run_lint
  
  echo -e "${YELLOW}Step 3: Tests${NC}"
  run_tests
  
  echo -e "${YELLOW}Step 4: Build${NC}"
  npm run build
  
  echo -e "${GREEN}CI sequence completed successfully!${NC}"
}

# Main case statement to process commands
case "$1" in
  test)
    run_tests
    ;;
  test:watch)
    run_tests_watch
    ;;
  test:cov)
    run_tests_coverage
    ;;
  lint)
    run_lint
    ;;
  ci)
    run_ci
    ;;
  help|*)
    show_help
    ;;
esac