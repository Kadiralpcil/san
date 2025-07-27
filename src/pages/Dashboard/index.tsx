import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchRecentComments } from "../../services/api";
import Spinner from "../../components/ui/Spinner";
import Card from "../../components/ui/Card";

const Dashboard = () => {
  //Queries
  const { data: posts, isLoading: loadingPosts } = useQuery({
    queryKey: ["recent-posts"],
    queryFn: ()=> fetchPosts(),
  });

  const { data: comments, isLoading: loadingComments } = useQuery({
    queryKey: ["recent-comments"],
    queryFn: fetchRecentComments,
  });

  if (loadingPosts || loadingComments) {
    return <Spinner />;
  }
//TODO divider kullan
  return (
    <div className="p-8 grid gap-8 md:grid-cols-2">
      <Card title="Recent Posts"> 
        <ul className="space-y-3">
          {posts?.map((p) => (
            <li key={p.id} className="transition-colors duration-200 cursor-pointer">
              {p.title}
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Recent Comments">
        <ul className="space-y-4">
          {comments?.map((c) => (
            <li key={c.id} className="border-l-4 border-gray-200 pl-4">
              <p className="text-gray-600 italic">"{c.body}"</p>
              <p className="text-right text-sm text-gray-500 mt-1">- {c.name}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Dashboard;
