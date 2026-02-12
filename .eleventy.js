export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/index.css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/data');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
