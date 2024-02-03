import CreateComment from "../comments/CreateComment";
import LoadComments from "../comments/LoadComments";
import { commentType } from "../comments/LoadComments";

type postType = {
  id: string;
  title: String;
  comments: [commentType];
};

type LoadPostType = [postType];

const LoadPosts = async () => {
  console.log("Loading Posts....");
  try {
    const res = await fetch(`http://kxakta.com/posts`, {
      method: "GET",
      cache: "no-cache",
    });
    const data = await res.json();
    const finalData: LoadPostType = data.posts;
    return (
      <div className="space-y-6 bg-gray-100 p-6 grid grid-cols-3 gap-3 rounded-lg shadow-md">
        {finalData.length > 0 &&
          finalData.map((post: postType) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              {/* post and comment loading is done by the backend query service */}
              <LoadComments comments={post.comments} />
              <CreateComment id={post.id} />
            </div>
          ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to load posts:", error);
    // You can return a user-friendly error message here
    return (
      <div className=" text-blue-300">
        Failed to load posts. Please try again later.
      </div>
    );
  }
};

export default LoadPosts;
