module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets/");
  
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
