export interface commentType {
  id: string;
  content: String;
  status: String;
}
export type LoadCommentType = { comments: [commentType] };

const LoadComments = async ({ comments }: LoadCommentType) => {
  try {
    return (
      <div className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2>{comments.length + " comments"}</h2>
        {comments.map((comment: commentType) => (
          <div
            key={comment.id}
            className="p-4  bg-purple-200 rounded-lg shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105"
          >
            <p className={`text-lg ${getStatusColor(comment.status)}`}>
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    return <div>0 Comments found</div>;
  }
};

const getStatusColor = (status: String) => {
  switch (status) {
    case "approved":
      return "text-green-700";
    case "rejected":
      return "text-red-700";
    case "pending":
      return "text-yellow-700";
    default:
      return "text-gray-700";
  }
};

export default LoadComments;
