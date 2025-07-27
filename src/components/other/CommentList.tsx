import { Comment } from "../../types/Comment";

interface CommentsProps{
    comments : Comment[]
}
const CommentList = ({comments} :CommentsProps) => {
  return (
    <ul className="space-y-4">
      {comments?.map((c) => (
        <li key={c.id} className="border-l-4 border-gray-200 pl-4">
          <p className="text-gray-600 italic">"{c.body}"</p>
          <p className="text-right text-sm text-gray-500 mt-1">- {c.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
