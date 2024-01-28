interface commentType {
  id: string;
  content: String;
}
type LoadCommentType = [commentType];
type idType = {
  id: string;
};
const LoadComments = async ({ id }: idType) => {
  try {
    const res = await fetch(`http://localhost:4000/posts/${id}/comments`);
    if (!res.ok) {
      throw new Error(`Failed to fetch comments for post ${id}`);
    }

    const data: LoadCommentType = await res.json();

    return (
      <div className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2>{data.length + " comments"}</h2>
        {data.map((comment: commentType) => (
          <div
            key={comment.id}
            className="p-4 bg-white rounded-lg shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105"
          >
            <p className="text-lg text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>No Comments found</div>;
  }
};

export default LoadComments;
