import CreatePost from "@/components/posts/CreatePost";
import LoadPosts from "@/components/posts/LoadPost";

export default function Home() {
  return (
    <>
      <main className=" text-black">
        <CreatePost />
        <LoadPosts />
      </main>
    </>
  );
}
