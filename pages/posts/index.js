import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/post-util";

export default function PostsList(props) {
  return <AllPosts posts={props.posts} />;
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}
