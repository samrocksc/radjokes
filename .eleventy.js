module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("*.jpg");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("service-worker.js");
  eleventyConfig.addPassthroughCopy("resume.html");
  eleventyConfig.addPassthroughCopy("resume.md");
  
  // Configure input and output directories
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["html", "md", "jpg", "css", "js"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid"
  };
};
