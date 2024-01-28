import CreateComment from "../comments/CreateComment";
import LoadComments from "../comments/LoadComments";
type postType = {
  id: string;
  title: String;
};
type LoadPostType = [postType];

const LoadPosts = async () => {
  const res = await fetch(`http://localhost:4001/posts`);
  const data: LoadPostType = await res.json();

  return (
    <div className="space-y-6 bg-gray-100 p-6 grid grid-cols-3 gap-3 rounded-lg shadow-md">
      {data.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <LoadComments id={post.id} />
          <CreateComment id={post.id} />
        </div>
      ))}
    </div>
  );
};

export default LoadPosts;
