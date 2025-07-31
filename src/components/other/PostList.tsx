import { Link } from "react-router-dom";
import { useNavigation } from "../../hooks/useNavigation";
import type { Post } from "../../types";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  const navigate = useNavigation()
  return (
    <>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="border rounded p-4 shadow transition">
            <Link to={`${navigate.nav.postDetail.get({ id: post.id })}`}>
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
