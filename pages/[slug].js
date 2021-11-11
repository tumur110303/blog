import { Row, Col } from "react-bootstrap";
import Layout from "components/layout";
import { getPostBySlug, getAllPosts } from "lib/api";

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
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus
          praesentium molestias accusamus accusantium asperiores, distinctio
          laborum, laudantium soluta illum aperiam nihil quam molestiae in enim
          amet omnis architecto. Quo laboriosam debitis molestias placeat
          maiores iste fuga ipsam consequatur temporibus non perferendis sequi,
          praesentium numquam rerum voluptate quisquam ratione officia dolore ut
          voluptates quos libero voluptatibus. Itaque molestias rem fugiat
          minima quis assumenda, praesentium nostrum dolores enim esse est
          possimus dolorum eius. Non aperiam expedita nisi facilis laborum,
          repellendus voluptates sunt, quasi ratione modi maiores quae
          temporibus obcaecati beatae officia molestias quam adipisci ea dolore
          illum animi, aut earum. Iste, inventore.
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
