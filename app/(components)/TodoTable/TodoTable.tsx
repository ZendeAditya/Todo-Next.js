import Link from "next/link";
import React from "react";
import RemoveTodo from "../RemoveTodo/RemoveTodo";

const allTodos = async () => {
  try {
    const res = await fetch("/api/todo", {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data.allTodo;
  } catch (error) {
    console.log(error);
  }
};
const TodoTable: React.FC = async () => {
  const todo = await allTodos();
  return (
    <div>
      <div className="relative overflow-x-auto flex items-center justify-center pt-8 ">
        {todo && (
          <table className="w-[50rem]  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Todo
                </th>
                <th scope="col" className="px-6 py-3">
                  Date/Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {todo.map((todo: any) => (
                <tr
                  key={todo._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {todo.title}
                  </th>
                  <td className="px-6 py-4">{todo.createdAt}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/editTask/${todo._id}`}
                      className="underline text-blue-400"
                    >
                      edit
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <RemoveTodo id={todo._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TodoTable;
