import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import Spinner from '../../components/ui/Spinner'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { fetchPosts } from '../../services/api'
import { Post } from '../../types/Post'

const POSTS_PER_PAGE = 10

const Posts = () => {
  const [page, setPage] = useState(1)

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts((page - 1) * POSTS_PER_PAGE, POSTS_PER_PAGE),
  })

  const hasNextPage = posts && posts.length === POSTS_PER_PAGE
  const hasPreviousPage = page > 1

  if (isLoading) return <Spinner />
  if (error) return <div>Something went wrong</div>
  if (!posts || posts.length === 0) return <div>No posts found</div>

  return (
    <Card className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Posts (Page {page})</h1>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="border rounded p-4 shadow transition">
            <Link to={`/posts/${post.id}`}>
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.body}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 justify-end pt-4">
        <Button
          disabled={!hasPreviousPage}
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
  )
}

export default Posts
