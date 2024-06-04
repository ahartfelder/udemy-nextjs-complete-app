import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/post-util";

export default function PostDetailsPage(props) {
  const { post } = props;

  return <PostContent post={post} />;
}

export function getStaticProps({ params }) {
  const { slug } = params;

  const post = getPostData(slug);

  return {
    props: {
      post,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const posts = getPostsFiles();

  const paths = posts.map((slug) => ({
    params: { slug: slug.replace(/\.md$/, "") },
  }));

  return {
    paths,
    fallback: false,
  };
}
