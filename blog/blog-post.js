/**
 * Blog Post Custom Element
 * 
 * This custom element renders a markdown blog post with its frontmatter metadata.
 * 
 * @class BlogPost
 */
class BlogPost extends HTMLElement {
  /**
   * Constructor for BlogPost element
   */
  constructor() {
    super();
    // Don't use shadow DOM to allow wc-markdown to work properly
  }

  /**
   * Lifecycle method called when the element is added to the document
   * 
   * @async
   */
  async connectedCallback() {
    const postName = this.getAttribute('post');
    if (!postName) {
      this.innerHTML = '<p>Error: No post specified</p>';
      return;
    }

    try {
      const response = await fetch(`/blog/entries/${postName}.md`);
      if (!response.ok) {
        this.innerHTML = '<p>Error: Post not found</p>';
        return;
      }

      const content = await response.text();
      const { metadata, body } = this.parseMarkdown(content);
      this.render(metadata, body);
    } catch (error) {
      this.innerHTML = `<p>Error loading post: ${error.message}</p>`;
    }
  }

  /**
   * Parse markdown content and extract frontmatter metadata
   * 
   * @param {string} content - The markdown content with frontmatter
   * @returns {Object} Object containing metadata and body
   */
  parseMarkdown(content) {
    const metadata = {};
    let body = content;

    // Check if content starts with frontmatter
    if (content.startsWith('---')) {
      const parts = content.split('---', 3);
      if (parts.length >= 3) {
        const frontmatter = parts[1];
        body = parts[2];

        // Parse frontmatter lines
        const lines = frontmatter.trim().split('\n');
        lines.forEach(line => {
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
              value = value.substring(1, value.length - 1);
            }
            
            // Parse arrays
            if (value.startsWith('[') && value.endsWith(']')) {
              try {
                value = JSON.parse(value);
              } catch (e) {
                // If parsing fails, keep as string
              }
            }
            
            metadata[key] = value;
          }
        });
      }
    }

    return { metadata, body };
  }

  /**
   * Render the blog post with metadata and content
   * 
   * @param {Object} metadata - The frontmatter metadata
   * @param {string} body - The markdown body content
   */
  render(metadata, body) {
    const title = metadata.title || 'Untitled Post';
    const date = metadata.date || 'Unknown Date';
    const author = metadata.author || 'Unknown Author';
    
    // Use wc-markdown for rendering instead of custom conversion
    this.innerHTML = `
      <div class="blog-post-container">
        <div class="metadata">
          <h1>${title}</h1>
          <div class="date-author">${date} by ${author}</div>
        </div>
        <div class="content">
          <wc-markdown>${body}</wc-markdown>
        </div>
        <a href="/blog/" class="back-link">← Back to Blog</a>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('blog-post', BlogPost);