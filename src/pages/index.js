import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import { Link } from 'gatsby'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlog.edges')
    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <h1>Recent articles</h1>
        <ul>
          {posts.map(({ node }) => {
            return (
              <li key={node.slug}>
                <h3>
                  <Link to={`/blog/${node.slug}`}>{node.title}</Link>
                </h3>
              </li>
            )
          })}
        </ul>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlog(sort: { fields: [title], order: DESC }) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`
