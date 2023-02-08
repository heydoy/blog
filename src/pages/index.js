import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"



class IndexPage extends React.Component {
  render() {
    const siteTitle = "KIMDEE"
  


    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="KIMDEE"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
    
        <h1>
          환영합니다{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <p> 개발하고 고양이{" "}
	<span role="img" aria-label="cat emoji">
	🐈
	</span>
	키우는 이야기를 올립니다. 블로그를 이전하였습니다. 2023년 이후 글은{" "}
	<a href="https://doy.oopy.io/" target="_blank">
	doy.oopy.io
	</a>
	에서 확인해보세요.  
        </p>
        <Link to="/blog/">
          <Button marginTop="35px">Go to Blog</Button>
        </Link>
      </Layout>
    )
  }
}

export default IndexPage
