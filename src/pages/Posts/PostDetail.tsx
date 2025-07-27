import { Outlet, useParams, NavLink } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getPostById } from "../../services/api"
import Spinner from "../../components/ui/Spinner"
import Card from "../../components/ui/Card"
import { useNav } from "../../hooks/useNavigation"

const PostDetail = () => {
  const { id } = useParams()
  const {go, nav} = useNav()
  

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  })

  if (isLoading) return <Spinner />
  if (error) return <div>Something went wrong</div>
  if (!post) return <div>No post found</div>

  return (
    <Card title={post.title}>
      <div className="mb-4">{post.body}</div>
      <div className="flex gap-4 border-b mb-4">
        <NavLink to="edit" className={({ isActive }) => (isActive ? "font-bold underline" : "")}>
          Edit
        </NavLink>
        <NavLink to="comments" className={({ isActive }) => (isActive ? "font-bold underline" : "")}>
          Comments
        </NavLink>
      </div>
      <Outlet />
    </Card>
  )
}

export default PostDetail
