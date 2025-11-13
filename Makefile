# Makefile for Project Development

# Default target
.PHONY: help
help:
	@echo "Project Development Makefile"
	@echo ""
	@echo "Usage:"
	@echo "  make dev     - Start development server on port 4200"
	@echo "  make help    - Show this help message"

# Start development server on port 4300
.PHONY: dev
dev:
	@echo "Starting development server on http://localhost:4200"
	@echo "Press Ctrl+C to stop"
	python3 -m http.server 4200

# Install dependencies (if needed in the future)
.PHONY: install
install:
	@echo "No dependencies to install"

# Clean build artifacts (if any)
.PHONY: clean
clean:
	@echo "No build artifacts to clean"
