# Agent Guide for Radjokes Repository

This guide provides essential information for agents working with this codebase.

## Project Overview

This is a simple static website featuring:

- Random joke display with interactive elements
- Blog functionality with markdown support
- Responsive design with CSS animations

## Project Structure

```
.
├── index.html           # Main website with jokes
├── blog/                # Blog section
│   ├── index.html       # Blog listing page
│   ├── styles.css       # Blog-specific styling
│   ├── INSTRUCTIONS.md  # Blog implementation requirements
│   └── entries/         # Blog posts directory
│       ├── post-1.md    # First sample blog post in markdown
│       ├── blog-2.md    # Second sample blog post in markdown
│       └── media/       # Media files for blog posts
├── *.jpg                # Joke-related images (1.jpg through 8.jpg)
├── resume.md            # Resume in markdown format
├── resume.html          # Resume in HTML format
├── Makefile             # Development commands
├── update-blog-list.sh  # Script to update blog entries list
├── .github/workflows/   # GitHub Actions CI/CD
└── CNAME                # Custom domain configuration
```

## Essential Commands

### Development

```bash
make dev     # Start development server on port 4200
make build   # Generate blog entries list
```

Alternative to make build:

```bash
./update-blog-list.sh  # Update blog entries list
```

### Blog Management

To add a new blog post:

1. Create a new markdown file in `blog/entries/` directory
2. Add frontmatter metadata at the top:

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

## Code Patterns and Conventions

### JavaScript Documentation

All JavaScript files should use JSDoc comments:

- Classes have `@class` or module-level documentation
- Methods have `@function` documentation with parameters and return values
- Parameters are documented with `@param {type} name - description`
- Return values are documented with `@returns {type} description`
- Async functions are marked with `@async`

Example JSDoc format:

```javascript
/**
 * Brief description of the function
 *
 * More detailed description if needed
 *
 * @param {string} param1 - Description of param1
 * @param {number} param2 - Description of param2
 * @returns {boolean} Description of return value
 */
function exampleFunction(param1, param2) {
  // Implementation
}
```

### Blog System Implementation

The blog system follows these requirements from INSTRUCTIONS.md:

1. Uses routing so `/blog/post-1` renders the markdown file from `post-1.md`
2. Uses frontmatter from each markdown file to generate and order blog posts
3. `/blog` lists all blog posts based on title and date
4. Each blog can be loaded individually based on routing
5. Rendered in a simple black and white minimalist style
6. Code should be clean and concise

### Code Quality Process

When cleaning or improving code:

1. Convert inline comments to proper JSDoc format
2. Ensure all functions have documentation explaining their purpose
3. Document all parameters and return values
4. Add module-level documentation for files
5. Use consistent formatting and indentation
6. Remove any unused or dead code

## Testing Approach

This is a static website with no formal testing framework. Testing involves:

1. Verifying the development server works: `make dev`
2. Checking that the joke display functions correctly
3. Ensuring blog posts render properly
4. Validating that new blog posts appear in the listing after running `make build`

## Important Gotchas

1. **Missing JavaScript Files**: The blog references `blog-post.js` and `fetch-entries.js` in `blog/index.html` but these files don't exist in the repository
2. **Blog Listing Generation**: The blog entries list needs to be manually updated by running `make build` or `./update-blog-list.sh` when adding new posts
3. **Duplicated Resume**: Resume exists in both markdown and HTML formats
4. **Hardcoded Image References**: The jokes section uses hardcoded image references that need to be updated when adding new images

## Deployment

- Custom domain configured via CNAME file

## Common Tasks

### Adding a New Joke

1. Edit `index.html`
2. Add new entry to the `jokes` array in the JavaScript section

### Adding a New Blog Post

1. Create a new markdown file in the `blog/entries/` directory
2. Add frontmatter metadata (title, date, author, tags)
3. Add content in markdown format
4. Run `make build` or `./update-blog-list.sh` to update the blog entries list
5. The post will automatically appear in the blog listing

### Adding New Images

1. Add image files to the root directory
2. Update the `swapImage()` function in `index.html` to include the new image in the rotation

### Modifying Styles

1. Edit CSS styles in the `<style>` section of the relevant HTML file
2. For blog styles, modify the CSS in `blog/styles.css`

## Future Improvements Needed

1. Implement the missing `blog-post.js` and `fetch-entries.js` files for the blog system
2. Add actual API functionality to dynamically scan the entries directory
3. Implement proper image loading for the jokes section
4. Add more blog posts and improve blog navigation
5. Implement proper SEO tags
6. Add analytics or monitoring
7. Create a more robust build script that automatically generates the blog post list

