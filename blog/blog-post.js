// blog-post.js
class BlogPost extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.loadAndRenderPost();
  }

  async loadAndRenderPost() {
    // Get the source file from the src attribute
    const src = this.getAttribute("src");
    if (!src) {
      this.renderError("No source file specified");
      return;
    }

    try {
      // Load the markdown file
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(
          `Failed to load ${src}: ${response.status} ${response.statusText}`,
        );
      }

      const markdown = await response.text();

      // Parse frontmatter and content
      const { frontmatter, content } = this.parseFrontmatter(markdown);

      // Render the post
      this.renderPost(frontmatter, content);
    } catch (error) {
      console.error("Error loading markdown:", error);
      this.renderError(`Error loading ${src}: ${error.message}`);
    }
  }

  parseFrontmatter(markdown) {
    // Simple frontmatter parser
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    if (match) {
      const frontmatterRaw = match[1];
      const content = match[2];

      // Parse frontmatter as key-value pairs
      const frontmatter = {};
      const lines = frontmatterRaw.split("\n");
      lines.forEach((line) => {
        const colonIndex = line.indexOf(":");
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim();
          let value = line.substring(colonIndex + 1).trim();

          // Remove quotes if present
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          } else if (value.startsWith("[") && value.endsWith("]")) {
            // Parse arrays
            value = value
              .slice(1, -1)
              .split(",")
              .map((item) => {
                const trimmed = item.trim();
                return trimmed.startsWith('"') && trimmed.endsWith('"')
                  ? trimmed.slice(1, -1)
                  : trimmed;
              });
          }

          frontmatter[key] = value;
        }
      });

      return { frontmatter, content };
    }

    return { frontmatter: {}, content: markdown };
  }

  async renderPost(frontmatter, content) {
    // Load marked from jsDelivr
    await this.loadMarked();

    // Render the component
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .frontmatter {
          margin-bottom: 20px;
        }
        .frontmatter h2 {
          margin-top: 0;
        }
        .tags {
          margin-top: 10px;
        }
        .tag {
          display: inline-block;
          padding: 3px 8px;
          font-size: 0.8em;
          margin-right: 5px;
        }
        .back-button {
          border: 1px solid;
          padding: 10px 15px;
          cursor: pointer;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .content {
          line-height: 1.6;
        }
        .content code {
          padding: 2px 4px;
          font-family: monospace;
        }
        .content pre {
          padding: 10px;
          overflow-x: auto;
        }
      </style>
      <div class="container">
        <button class="back-button" id="backButton">← Back to Blog</button>
        <div class="frontmatter">
          ${frontmatter.title ? `<h2>${frontmatter.title}</h2>` : ""}
          ${
            frontmatter.date || frontmatter.author
              ? `
            <div class="meta">
              ${frontmatter.date ? `<p><strong>Date:</strong> ${frontmatter.date}</p>` : ""}
              ${frontmatter.author ? `<p><strong>Author:</strong> ${frontmatter.author}</p>` : ""}
            </div>
          `
              : ""
          }
          ${
            frontmatter.tags && Array.isArray(frontmatter.tags)
              ? `
            <div class="tags">
              <strong>Tags:</strong> 
              ${frontmatter.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
          `
              : ""
          }
        </div>
        <div class="content" id="content"></div>
      </div>
    `;

    // Render markdown content
    const contentElement = this.shadowRoot.getElementById("content");
    contentElement.innerHTML = marked.parse(content);

    // Add back button functionality
    const backButton = this.shadowRoot.getElementById("backButton");
    backButton.addEventListener("click", () => {
      if (window.location.hash) {
        window.location.hash = "";
      } else {
        window.history.back();
      }
    });
  }

  renderError(message) {
    this.shadowRoot.innerHTML = `
      <div style="color: red; padding: 20px; font-family: Arial, sans-serif;">
        <p>Error: ${message}</p>
      </div>
    `;
  }

  loadMarked() {
    return new Promise((resolve) => {
      // Check if marked is already loaded
      if (typeof marked !== "undefined") {
        resolve();
        return;
      }

      // Check if script is already being loaded
      const existingScript = document.querySelector('script[src*="marked"]');
      if (existingScript) {
        // If script is already being loaded, wait for it
        if (typeof marked !== "undefined") {
          resolve();
        } else {
          setTimeout(() => resolve(), 100);
        }
        return;
      }

      // Load marked from jsDelivr
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/marked@13.0.0/marked.min.js";
      script.onload = () => resolve();
      script.onerror = () => {
        console.warn("Failed to load marked from jsDelivr, using fallback");
        // Simple fallback for basic markdown
        window.marked = {
          parse: (content) => this.basicMarkdownToHTML(content),
        };
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  basicMarkdownToHTML(markdown) {
    // Basic markdown to HTML conversion as fallback
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");

    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Code blocks
    html = html.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      "<pre><code>$2</code></pre>",
    );
    html = html.replace(/`(.*?)`/g, "<code>$1</code>");

    // Lists
    html = html.replace(/^\- (.*$)/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");

    // Paragraphs
    html = html.replace(/^\s*$(?:\r\n?|\n)/gm, "</p><p>");
    html = "<p>" + html + "</p>";
    html = html.replace(/<p><\/p>/g, "");

    return html;
  }
}

customElements.define("blog-post", BlogPost);
