"use client";
import React from "react";
import { useRouter } from "next/navigation";

const RemoveBtn = ({ id }: any) => {
  const router = useRouter();

  const removeStudent = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      try {
        const res = await fetch(`/api/todo?id=${id}`, {
          method: "DELETE",
        });
        router.refresh();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <div>
      <button
        onClick={removeStudent}
        className="underline font-medium text-red-600 dark:text-red-500 hover:underline m-2"
      >
        Delete
      </button>
    </div>
  );
};

export default RemoveBtn;
