import CreateComment from "../comments/CreateComment";
import LoadComments from "../comments/LoadComments";
type postType = {
  id: string;
  title: String;
};
type LoadPostType = [postType];

const LoadPosts = async () => {
  console.log("Loading Posts....");
  const res = await fetch(`http://localhost:4002/posts`, {
    method: "GET",
    cache: "no-cache",
  });
  const data = await res.json();
  console.log("Post Loaded dada again", data);
  return (
    <div className="space-y-6 bg-gray-100 p-6 grid grid-cols-3 gap-3 rounded-lg shadow-md">
      {data.posts.map((post: any) => (
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
