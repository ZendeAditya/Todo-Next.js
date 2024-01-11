import EditForm from "@/app/(components)/EditForm/EditForm";
import React from "react";

type Props = {
  params: any;
};

const getTodoById = async (id: any) => {
  try {
    const res = await fetch(`http://127.0.0.1:3000/api/todo/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.todo;
  } catch (error) {
    console.log("Failed to update data");
    return null;
  }
};

const Page = async ({ params }: Props) => {
  const { id } = params;
  const todo = await getTodoById(id);
  const { title } = todo;
  return <EditForm id={id} title={title} />;
};

export default Page;
