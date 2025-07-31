// pages/CreatePost.tsx

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/api";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ToastItem, { Toast } from "../../components/ui/Toast";
import { useNavigation } from "../../hooks/useNavigation";

const CreatePost = () => {
  //Hooks
  const {nav} = useNavigation()
  //States
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [toastMesseage, setToastMessage] = useState<Toast | null>(null);
  //Queries
  const { mutate, isPending } = useMutation({
    mutationFn: () => createPost(title, body),
    onSuccess: () => {
      setToastMessage({
        id: Math.random(),
        type: "success",
        message: "Post updated successfully",
      });
      nav.posts.go();
    },
    onError: () => {
      setToastMessage({
        id: Math.random(),
        type: "success",
        message: "Post updated successfully",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Card title="Create Post" className="p-6 space-y-4">
      {toastMesseage && (
        <ToastItem
          toast={toastMesseage}
          onRemove={() => setToastMessage(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full min-h-36 bg-neutral-800 outline-0 rounded resize-none p-4"
          placeholder="Post body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreatePost;
