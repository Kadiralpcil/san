import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../services/api";
import CommentList from "../../components/other/CommentList";
import Button from "../../components/ui/Button";
import { useMemo, useState } from "react";
import Spinner from "../../components/ui/Spinner";
import Card from "../../components/ui/Card";

const COMMENTS_PER_PAGE = 10;

const PostCommentsTab = () => {
  // States
  const [page, setPage] = useState(1);
  // Queries
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recent-comments", page],
    queryFn: () =>
      getComments((page - 1) * COMMENTS_PER_PAGE, COMMENTS_PER_PAGE),
  });

  const hasNextPage = useMemo(() => {
    return comments && comments.length === COMMENTS_PER_PAGE;
  },[comments])


  if (isLoading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;
  if (!comments || comments.length === 0) return <div>No comments found</div>;

  return (
    <Card className="p-6 space-y-4">
      <CommentList comments={comments ?? []} />
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

export default PostCommentsTab;
