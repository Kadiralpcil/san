import type { Post } from "../types/Post"
import type { Comment } from "../types/Comment"

export const getPosts = async (start: number = 0, limit: number = 10): Promise<Post[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

export const getComments = async (start: number = 0, limit: number = 10): Promise<Comment[]> =>{
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_start=${start}&_limit=${limit}}`)
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

export const getPostById = async (id?: string): Promise<Post> => {
  if (!id) throw new Error('Id is required');

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

export const updatePost = async (id: number | string, body: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ body }),
  });

  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
};

export const createPost = async (title: string, body: string) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
};
