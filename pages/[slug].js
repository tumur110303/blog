import { Row, Col } from "react-bootstrap";
import Layout from "components/layout";
import { getPostBySlug, getAllPosts } from "lib/api";
import BlockContent from "@sanity/block-content-to-react";
import HighLightCode from "components/HighLightCode";

const serializers = {
  types: {
    code: (props) => (
      <HighLightCode language={props.node.language}>
        {props.node.code}
      </HighLightCode>
    ),
  },
};

export default ({ post }) => {
  return (
    <Layout>
      <Row>
        <Col md="12">
          <pre>{JSON.stringify(post, null, 2)}</pre>
          <div className="blog-detail-header">
            <p className="leab mb-0">
              <img
                src={post.publisher.picture}
                className="rounded-circle mr-3"
                height="50px"
                width="50px"
              />
              {post.publisher.title}, {post.date}
            </p>

            <h1 className="font-weight-bold blog-detail-header-title mb-0">
              {post.title}
            </h1>

            <h2 className="blog-detail-header-subtitle mb-3">
              {post.subtitle}
            </h2>

            <img className="img-fluid rounded" src={post.image} alt="" />
          </div>
          <br />
          <BlockContent
            blocks={post.content}
            serializers={serializers}
            imageOptions={{ w: 320, h: 240, fit: "max" }}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const post = await getPostBySlug(params.slug);
  return {
    props: {
      post: post[0],
    },
  };
};

export const getStaticPaths = async () => {
  const posts = await getAllPosts();

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};
