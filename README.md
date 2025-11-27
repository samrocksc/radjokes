# Overview

I got a joke about sausage....it's the wurst

## Blog System

This website features a dynamic blog system that automatically discovers and displays markdown blog posts from the `blog/entries` directory.

### How It Works

1. The `blog/fetch-entries.js` script dynamically fetches all markdown files in the `blog/entries` directory
2. It parses frontmatter metadata (title, date, author, tags) from each post
3. Blog posts are displayed as an expandable list sorted by date (newest first)

### Adding New Blog Posts

1. Create a new markdown file in the `blog/entries/` directory
2. Add frontmatter metadata at the top of the file:

   ```markdown
   ---
   title: "Your Post Title"
   date: "YYYY-MM-DD"
   author: "Your Name"
   tags: ["tag1", "tag2"]
   ---

   Your post content here...
   ```

3. Run `make build` or `./update-blog-list.sh` to update the blog entries list
4. The new post will automatically appear in the blog listing

### Development Commands

- `make dev` - Start development server on port 4200
- `make build` - Generate blog entries list
- `./update-blog-list.sh` - Update blog entries list (alternative to make build)

## Sources Cited
