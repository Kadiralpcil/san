import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/api";
import Spinner from "../../components/ui/Spinner";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useEffect, useRef, useState } from "react";

const EditPostTab = () => {

  // Hooks
  const { id } = useParams();
  // States
  const [body, setBody] = useState("");
  // Ref
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post-edit"],
    queryFn: () =>
      getPostById(id).then((post) => {
        setBody(post.body);
        textAreaRef.current?.focus();
        return post;
      }),
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;
  if (!post) return <div>No posts found</div>;

  return (
    <Card title={post.title}>
      <textarea
        ref={textAreaRef}
        className="w-full min-h-36 bg-neutral-800 outline-0
      rounded resize-none p-4"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="flex justify-end">
        <Button>Save</Button>
      </div>
    </Card>
  );
};

export default EditPostTab;
