import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'
import Author from '../components/author'
import { BlockText, BlockSingleImage } from '../components/blocks'
import styles from './blog-post.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlog')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    return (
      <Layout location={this.props.location}>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <div className="wrapper">
          <div className={styles.contain}>
            <h1 className="section-headline">{post.title}</h1>
            <div className={styles.authors}>
              {post.authors.map(author => <Author author={author} key={author.id} />)}
            </div>
          </div>
          {post.contentBlocks.map(contentBlock => {
            switch (contentBlock.internal.type) {
              case 'ContentfulBlockText':
                return (
                  <div className={styles.contain} key={contentBlock.id}>
                    <BlockText contentBlock={contentBlock} />
                  </div>
                )
              case 'ContentfulBlockSingleImage':
                return (
                  <div
                    className={
                      contentBlock.style === 'boxed'
                        ? styles.contain
                        : undefined
                    }
                    key={contentBlock.id}
                  >
                    <BlockSingleImage contentBlock={contentBlock} />
                  </div>
                )
              default:
                return null
            }
          })}
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlog(slug: { eq: $slug }) {
      slug
      title
      authors {
        id
        name
        role
        image {
          fluid(maxWidth: 64, resizingBehavior: PAD, background: "rgb:000000") {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
      seo {
        seoTitle
        seoShortDescription
        seoImage {
          file {
            url
          }
        }
      }
      contentBlocks {
        ...blockText
        ...blockSingleImage
      }
    }
  }
  fragment blockText on ContentfulBlockText {
    id
    internal {
      type
    }
    text {
      childMarkdownRemark {
        html
      }
    }
  }
  fragment blockSingleImage on ContentfulBlockSingleImage {
    id
    internal {
      type
    }
    image {
      fluid(maxWidth: 1800, resizingBehavior: PAD, background: "rgb:000000") {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    imageDescription
    style
  }
`
