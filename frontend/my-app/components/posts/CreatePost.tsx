"use client";
import React, { FormEvent, useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle the submission of your post data
    const res = await fetch("http://kxakta.com/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    console.log(await res.json());
  };

  return (
    <div className="flex items-center justify-center h-fit bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="p-10 bg-white rounded shadow-md w-96"
      >
        <h2 className="mb-5 text-lg font-semibold text-gray-700">
          Create Post
        </h2>
        <div className="mb-5 space-y-2">
          <label className="text-sm font-medium text-gray-600">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
