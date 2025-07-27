import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getPostById } from "../../services/api";
import Spinner from "../../components/ui/Spinner";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const PostDetail = () => {
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post"],
    queryFn: () => getPostById(id),
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;
  if (!post) return <div>No posts found</div>;

  return (
    <Card title={post.title}>
      <div>{post.body}</div>
      <div className="flex justify-end gap-2">
        <Button onClick={() => navigate(`/posts/${id}/edit`)} variant="link">
          Edit
        </Button>
          <Button onClick={() => navigate(`/posts/${id}/comments`)} variant="link">
          Comments
        </Button>
      </div>
    </Card>
  );
};

export default PostDetail;
