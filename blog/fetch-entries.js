/**
 * Fetch and list blog entries
 *
 * This script fetches the list of blog entries and displays them on the blog index page.
 *
 * @async
 */
async function fetchAndListEntries() {
  const postsList = document.getElementById('posts-list');

  if (!postsList) {
    console.error('Posts list container not found');
    return;
  }

  try {
    // First try to fetch the generated list
    const response = await fetch('/blog/entries/list.json');
    console.log('response', response)

    if (!response.ok) {
      throw new Error('Failed to fetch list.json');
    }

    const data = await response.json();
    const files = data.files || [];

    if (files.length === 0) {
      postsList.innerHTML = '<p>No blog posts found.</p>';
      return;
    }

    // Parse all posts to extract metadata
    const posts = await Promise.all(files.map(async (file) => {
      try {
        // Extract post name from file path
        const postName = file.replace('blog/entries/', '').replace('.md', '');
        const postResponse = await fetch(`/blog/entries/${postName}.md`);
        if (!postResponse.ok) {
          return null;
        }

        const content = await postResponse.text();
        const { metadata } = parseMarkdown(content);

        return {
          name: postName,
          title: metadata.title || postName,
          date: metadata.date || 'Unknown Date',
          author: metadata.author || 'Unknown Author',
          tags: metadata.tags || []
        };
      } catch (error) {
        console.error(`Error fetching ${file}:`, error);
        return null;
      }
    }));

    // Filter out failed requests and sort by date (newest first)
    const validPosts = posts
      .filter(post => post !== null)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Display posts
    if (validPosts.length === 0) {
      postsList.innerHTML = '<p>No blog posts found.</p>';
      return;
    }

    const postsHtml = validPosts.map(post => `
      <div class="post-item">
        <h2><a href="/blog/${post.name}">${post.title}</a></h2>
        <p class="post-meta">${post.date} by ${post.author}</p>
        ${post.tags.length > 0 ? `<p class="post-tags">Tags: ${post.tags.join(', ')}</p>` : ''}
      </div>
    `).join('');

    postsList.innerHTML = postsHtml;
  } catch (error) {
    console.error('Error fetching blog entries:', error);
    postsList.innerHTML = '<p>Error loading blog posts.</p>';
  }
}

/**
 * Parse markdown content and extract frontmatter metadata
 *
 * @param {string} content - The markdown content with frontmatter
 * @returns {Object} Object containing metadata and body
 */
function parseMarkdown(content) {
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

// Run when the page loads
document.addEventListener('DOMContentLoaded', fetchAndListEntries);
