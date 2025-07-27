import type { Post } from "../types/Post"
import type { Comment } from "../types/Comment"

export const fetchPosts = async (start: number = 0, limit: number = 10): Promise<Post[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
  if (!res.ok) throw new Error('Network error')
  return res.json()
}


export const fetchRecentComments = async (): Promise<Comment[]> =>{
  const res = await fetch('https://jsonplaceholder.typicode.com/comments?_start=0&_limit=5')
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

export const getPostById = async (id?: string): Promise<Post> => {
  if (!id) throw new Error('Id is required');

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if (!res.ok) throw new Error('Network error')
  return res.json()
}