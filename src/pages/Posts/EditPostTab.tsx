import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPostById, updatePost } from "../../services/api";
import Spinner from "../../components/ui/Spinner";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useRef, useState } from "react";
import type { Toast } from "../../components/ui/Toast";
import ToastItem from "../../components/ui/Toast";

const EditPostTab = () => {
  const { id } = useParams();
  const [body, setBody] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const [toastMesseage, setToastMessage] = useState<Toast | null>(null);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () =>
      getPostById(id).then((post) => {
        setBody(post.body);
        textAreaRef.current?.focus();
        return post;
      }),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => updatePost(id!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      setToastMessage({
        id: Math.random(),
        type: "success",
        message: "Post updated successfully",
      });
    },
    onError: () => {
      setToastMessage({
        id: Math.random(),
        type: "error",
        message: "Failed to update post",
      });
    },
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;
  if (!post) return <div>No posts found</div>;

  return (
    <Card title={post.title}>
      {toastMesseage && (
        <ToastItem
          toast={toastMesseage}
          onRemove={() => setToastMessage(null)}
        />
      )}
      <textarea
        ref={textAreaRef}
        className="w-full min-h-36 bg-neutral-800 outline-0 rounded resize-none p-4"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="flex justify-end">
        <Button disabled={isPending} onClick={() => mutate()}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </Card>
  );
};

export default EditPostTab;
