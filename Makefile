# Makefile for Project Development

# Default target
.PHONY: help
help:
	@echo "Project Development Makefile"
	@echo ""
	@echo "Usage:"
	@echo "  make dev     - Start development server with Eleventy on port 8080"
	@echo "  make build   - Build the site with Eleventy"
	@echo "  make help    - Show this help message"

# Start development server with Eleventy on port 8080
.PHONY: dev
dev:
	@echo "Starting development server with Eleventy on http://localhost:8080"
	@echo "Press Ctrl+C to stop"
	npx @11ty/eleventy --serve --port 8080

# Build the site with Eleventy
.PHONY: build
build:
	@echo "Building site with Eleventy..."
	npx @11ty/eleventy

# Install dependencies
.PHONY: install
install:
	@echo "Installing dependencies..."
	npm install

# Clean build artifacts
.PHONY: clean
clean:
	@echo "Cleaning build artifacts..."
	rm -rf _site/
