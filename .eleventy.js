const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets/");
  eleventyConfig.addPassthroughCopy("src/service-worker.js");
  
  // Create a collection for blog posts
  eleventyConfig.addCollection("blogPosts", function(collectionApi) {
    return collectionApi.getFilteredByTag("blog").reverse();
  });
  
  // Add a date filter
  eleventyConfig.addFilter("date", function(value) {
    // If value is a string, convert it to a Date object
    if (typeof value === 'string') {
      value = new Date(value);
    }
    return value.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });
  
  // Add a filter to remove "blog" tag
  eleventyConfig.addFilter("removeBlogTag", function(tags) {
    return tags.filter(tag => tag !== "blog");
  });

  // RFC 3339 date filter for RSS feed
  eleventyConfig.addFilter("dateToRfc3339", function(value) {
    if (typeof value === 'string') {
      value = new Date(value);
    }
    return value.toISOString();
  });

  // Configure markdown-it with anchor links on headings
  const md = markdownIt({ html: true, linkify: true, typographer: true })
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.linkInsideHeader({
        symbol: "#",
        placement: "before"
      }),
      level: [2, 3]
    });
  eleventyConfig.setLibrary("md", md);
  
  // Configure input and output directories
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["html", "md", "njk", "jpg", "css", "js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
