"use client";
import { NextResponse } from "next/server";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
type Props = {
  id: string;
  title: string;
};

const EditForm = ({ id, title }: Props) => {
  const [originalTitle, setOriginalTitle] = useState(title);
  const router = useRouter();
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/todo/${id}`, {
        cache: "no-store",
        method: "PUT",
        body: JSON.stringify({ title: originalTitle }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        return NextResponse.json({ msg: "Something went wrong" });
      }
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return (
    <>
      <div className="flex items-center justify-center p-4 flex-col">
        <h2 className="text-3xl font-semibold ">Update Todo Form</h2>
        <form onSubmit={handleUpdate}>
          <div className="pt-5">
            <label htmlFor="titleIdUpdate" className="sr-only">
              Task Title:
            </label>
            <input
              type="text"
              name="title"
              id="titleIdUpdate"
              className="py-2 w-80 rounded-md border-2 outline-none px-2"
              placeholder="Add task"
              required
              value={originalTitle}
              onChange={(e) => setOriginalTitle(e.target.value)}
            />
            <button
              type="submit"
              className="py-2 px-9 rounded-md block bg-green-300 my-2 hover:bg-green-400 font-medium"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;
