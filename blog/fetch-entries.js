/**
 * Fetch and list blog entries
 *
 * This script fetches the list of blog entries and displays them on the blog index page.
 *
 * @async
 */
let isFetching = false;
async function fetchAndListEntries() {
  // Prevent multiple simultaneous calls
  if (isFetching) {
    console.log('fetchAndListEntries already running, skipping duplicate call');
    return;
  }

  isFetching = true;
  console.log('fetchAndListEntries started');
  const postsList = document.getElementById('posts-list');

  if (!postsList) {
    console.error('Posts list container not found');
    isFetching = false;
    return;
  }

  try {
    console.log('Fetching list.json...');
    // First try to fetch the generated list with cache busting
    const response = await fetch('/blog/entries/list.json?' + new Date().getTime());
    console.log('list.json response:', response);

    if (!response.ok) {
      console.error('Failed to fetch list.json, status:', response.status);
      throw new Error('Failed to fetch list.json');
    }

    const data = await response.json();
    console.log('list.json data:', data);
    const files = data.files || [];
    console.log('Files from list.json:', files);


    if (files.length === 0) {
      postsList.innerHTML = '<p>No blog posts found.</p>';
      isFetching = false;
      return;
    }

    console.log('Files to process:', files);

    // Parse all posts to extract metadata
    const posts = await Promise.all(files.map(async (file) => {
      try {
        // Extract post name from file path
        const postName = file.replace('blog/entries/', '').replace('.md', '');
        console.log(`Fetching post: ${postName}`);
        const postResponse = await fetch(`/blog/entries/${postName}.md?` + new Date().getTime());
        if (!postResponse.ok) {
          console.error(`Failed to fetch ${postName}, status: ${postResponse.status}`);
          return null;
        }

        const content = await postResponse.text();
        const { metadata } = parseMarkdown(content);
        console.log(`Parsed metadata for ${postName}:`, metadata);

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
    console.log('Promise.all completed, posts:', posts);

    // Filter out failed requests and sort by date (newest first)
    console.log('Posts before filtering:', posts);
    const validPosts = posts
      .filter(post => {
        const isValid = post !== null;
        console.log('Filtering post:', post, 'isValid:', isValid);
        return isValid;
      })
      .sort((a, b) => {
        console.log(`Comparing dates: ${a.date} (${new Date(a.date)}) vs ${b.date} (${new Date(b.date)})`);
        return new Date(b.date) - new Date(a.date);
      });
    console.log('Valid posts after filtering and sorting:', validPosts);

    // Display posts
    if (validPosts.length === 0) {
      postsList.innerHTML = '<p>No blog posts found.</p>';
      isFetching = false;
      return;
    }

    const postsHtml = validPosts.map(post => `
      <div class="post-item">
        <h2><a href="/blog/${post.name}">${post.title}</a></h2>
        <p class="post-meta">${post.date} by ${post.author}</p>
        ${post.tags.length > 0 ? `<p class="post-tags">Tags: ${post.tags.join(', ')}</p>` : ''}
      </div>
    `).join('');

    console.log('Generated HTML:', postsHtml);
    // Check if postsList still exists before updating
    if (document.getElementById('posts-list')) {
        postsList.innerHTML = postsHtml;
    } else {
        console.error('Posts list container disappeared during fetch');
    }
  } catch (error) {
    console.error('Error fetching blog entries:', error);
    postsList.innerHTML = '<p>Error loading blog posts.</p>';
  } finally {
    isFetching = false;
    console.log('fetchAndListEntries completed');
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
// document.addEventListener('DOMContentLoaded', fetchAndListEntries);
