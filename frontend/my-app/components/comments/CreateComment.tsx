"use client";
import React, { FormEvent, useState } from "react";
type idType = {
  id: string;
};
const CreateComment = ({ id }: idType) => {
  const [comment, setComment] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: comment }),
    });
    console.log(await res.json());
  };
  return (
    <div className="flex items-center justify-center h-fit bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="p-10 bg-white rounded shadow-md w-96"
      >
        <div className="mb-5 space-y-2">
          <label className="text-sm font-medium text-gray-600">Comment</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
