# Agent Instructions

When working with this project, please follow these specific instructions:

## Development Server

**IMPORTANT**: Do NOT start the development server using `make dev` or any other command that would start a long-running process. This includes:
- `make dev`
- `npx @11ty/eleventy --serve`
- Any other command that starts a server

Instead, use the MCP (Mother Control Program) tool to navigate to `http://localhost:8080` for checking the site. The MCP tool can connect to the server without requiring you to start it manually.

## Navigation Tools

When testing or viewing changes to the site, always use the MCP browser navigation tools rather than starting local servers:
- Use `mcp_browser_navigate` to visit pages like `http://localhost:8080`
- Use `mcp_browser_click` to interact with links on the site
- Use `mcp_browser_fetch` to retrieve page content for inspection

These tools allow you to view and test the site without starting any long-running processes, which is the preferred approach for this project.

## Building the Site

To build the site, you can use:
```bash
make build
```

Or directly with Eleventy:
```bash
npx @11ty/eleventy
```

## Other Commands

All other commands in the Makefile are safe to use:
- `make help` - Show help message
- `make install` - Install dependencies
- `make clean` - Clean build artifacts

## Important Reminder

DO NOT start the development server or any long-running processes. Always check this file for instructions before running any commands that might start a server. Use navigation tools to view and test the site instead.
