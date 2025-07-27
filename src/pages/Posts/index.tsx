import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getPosts } from "../../services/api";
import { Post } from "../../types/Post";
import { useNav } from "../../hooks/useNavigation";
import PostList from "../../components/other/PostList";

const POSTS_PER_PAGE = 10;

const Posts = () => {
  // States
  const [page, setPage] = useState(1);
  // Queries
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ["posts", page],
    queryFn: () => getPosts((page - 1) * POSTS_PER_PAGE, POSTS_PER_PAGE),
  });

  const hasNextPage = useMemo(() => {
    return posts && posts.length === POSTS_PER_PAGE;
  }, [posts]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;
  if (!posts || posts.length === 0) return <div>No posts found</div>;

  return (
    <Card className="p-6 space-y-4">
      <PostList posts={posts} />
      <div className="flex gap-2 justify-end pt-4">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <Button
          disabled={!hasNextPage}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </Card>
  );
};

export default Posts;
