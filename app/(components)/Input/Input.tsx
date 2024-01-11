"use client";
import { NextResponse } from "next/server";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
type Props = {};
import { CiSun } from "react-icons/ci";
let url = "http://localhost:3000/api/todo";
const Input = (props: Props) => {
  const [todo, setTodo] = useState("");
  const router = useRouter();
  const handleTodo = async (e: FormEvent) => {
    if (todo.length < 5) {
      alert("Task must be 5 character long");
      return;
    }
    e.preventDefault();
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ todo }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        return NextResponse.json({ msg: "Failed to create todo" });
      }
      setTodo("");
      router.refresh();
    } catch (error) {
      return NextResponse.json({ msg: error });
    }
  };

  return (
    <section>
      <div className="flex items-center justify-end p-6">
        <button>
          <CiSun size={25} />
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 ">
        <form onSubmit={handleTodo} method="post">
          <div className="pt-5">
            <input
              type="text"
              name="titleName"
              id="titleId"
              className="py-2 w-80 rounded-md border-2 outline-none px-2"
              placeholder="Add task"
              value={todo}
              required
              onChange={(e) => setTodo(e.target.value)}
            />
            <button
              type="submit"
              className="py-2 px-9 rounded-md block bg-green-300 my-2 hover:bg-green-400 font-medium"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Input;
