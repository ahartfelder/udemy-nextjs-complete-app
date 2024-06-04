import Image from "next/image";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import PostHeader from "./post-header";
import styles from "./post-content.module.css";

export default function PostContent(props) {
  const { post } = props;
  post.content = post.content.replace(/\\n/g, "\n");

  const markdownComponents = {
    p: (paragraph) => {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={styles.image}>
            <Image
              src={`/images/posts/${post.image}`}
              alt={post.title}
              height="400"
              width="500"
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code: (code) => {
      const { className, children } = code;

      return (
        <SyntaxHighlighter
          style={atomDark}
          language={className.split("-")[1]}
          children={children}
        />
      );
    },
  };

  return (
    <article className={styles.content}>
      <PostHeader title={post.title} image={`/images/posts/${post.image}`} />
      <Markdown children={post.content} components={markdownComponents} />
    </article>
  );
}
