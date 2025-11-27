# Makefile for Project Development

# Default target
.PHONY: help
help:
	@echo "Project Development Makefile"
	@echo ""
	@echo "Usage:"
	@echo "  make dev     - Start development server with Wrangler on port 8787"
	@echo "  make build   - Generate blog entries list"
	@echo "  make help    - Show this help message"

# Start development server with Wrangler on port 8787
.PHONY: dev
dev: build
	@echo "Starting development server with Wrangler on http://127.0.0.1:8787"
	@echo "Press Ctrl+C to stop"
	npx wrangler pages dev .

# Generate blog entries list
.PHONY: build
build:
	@echo "Generating blog entries list..."
	@mkdir -p blog/entries
	@find blog/entries -name "*.md" -type f | sed 's|^blog/entries/||' | awk '{ print "\"blog/entries/" $$1 "\"" }' | paste -sd "," - > blog/entries/files.tmp
	@echo "{ \"files\": [" > blog/entries/list.json
	@if [ -s blog/entries/files.tmp ]; then \
		cat blog/entries/files.tmp >> blog/entries/list.json; \
	fi
	@echo "] }" >> blog/entries/list.json
	@rm -f blog/entries/files.tmp
	@echo "Blog entries list generated at blog/entries/list.json"

# Install dependencies (if needed in the future)
.PHONY: install
install:
	@echo "No dependencies to install"

# Clean build artifacts (if any)
.PHONY: clean
clean:
	@echo "No build artifacts to clean"
