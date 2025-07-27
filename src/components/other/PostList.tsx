import { Link } from "react-router-dom";
import { Post } from "../../types/Post";
import { useNav } from "../../hooks/useNavigation";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  // Hooks
  const { go, nav } = useNav();
  return (
    <>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="border rounded p-4 shadow transition">
            <Link to={`${nav.editPost.path(post.id)}`}>
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default PostList;
