const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogData = await graphql(
    `
      {
        allContentfulBlog {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `
  );

  const blogPages = blogData.data.allContentfulBlog.edges.forEach(
    (blogPage) => {
      createPage({
        path: `/blog/${blogPage.node.slug}/`,
        component: path.resolve('./src/templates/blog-post.js'),
        context: {
          slug: blogPage.node.slug,
        },
      })
    },
  );

  return blogPages;
}
