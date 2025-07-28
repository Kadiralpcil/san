import { Outlet, useParams, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../../services/api";
import Spinner from "../../components/ui/Spinner";
import Card from "../../components/ui/Card";
import { useNav } from "../../hooks/useNavigation";
import TabPanel from "../../components/ui/TabPanel";

const PostDetail = () => {
  const { id } = useParams();
  const { go, nav } = useNav();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;
  if (!post) return <div>No post found</div>;

  return (
    <Card>
      <div className="flex gap-4 border-b mb-4 h-auto">
        <TabPanel
          tabs={[
            {
              id: "edit",
              content: <Outlet />,
              label: "Edit",
              onClick: () => {
                go(nav.editPost.go({ id: post.id }));
              },
            },
            {
              id: "comments",
              content:  <Outlet />,
              label: "Comments",
              onClick: () => {
                go(nav.postComments.go({ id: post.id }));
              },
            },

          ]}
        />
      </div>
           

    </Card>
  );
};

export default PostDetail;
