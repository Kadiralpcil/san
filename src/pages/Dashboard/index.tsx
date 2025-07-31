import { useQuery } from "@tanstack/react-query";
import { getPosts, getComments } from "../../services/api";
import Spinner from "../../components/ui/Spinner";
import Card from "../../components/ui/Card";
import CommentList from "../../components/other/CommentList";
import PostList from "../../components/other/PostList";

const Dashboard = () => {
  //Queries
  const { data: posts, isLoading: loadingPosts } = useQuery({
    queryKey: ["recent-po sts"],
    queryFn: () => getPosts(0,5),
  });

  const { data: comments, isLoading: loadingComments } = useQuery({
    queryKey: ["recent-comments"],
    queryFn: () => getComments(0,5),
  });

  if (loadingPosts || loadingComments) {
    return <Spinner />;
  }
  
  return (
    <div className=" md:p-4 lg:p-8 grid gap-8 md:grid-cols-2">
      <Card title="Recent Posts">
        <PostList posts={posts ?? []} />
      </Card>
      <Card title="Recent Comments">
        <CommentList comments={comments ?? []} />
      </Card>
    </div>
  );
};

export default Dashboard;
