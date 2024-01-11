import Todo from "@/app/models/TodoModel";
import { connectdb } from "@/app/utils/connectdb";
import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    await connectdb();
    const allTodo = await Todo.find();
    return NextResponse.json({ allTodo: allTodo });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};

export const POST = async (req: Request) => {
  try {
    const { todo } = await req.json();
    const todos = await Todo.create({
      title: todo,
    });

    return NextResponse.json({ todos });
  } catch (error) {
    return NextResponse.json(
      { error: "Faild to save the data" },
      { status: 501 }
    );
  }
};

export const DELETE = async (request: any) => {
  const id = request.nextUrl.searchParams.get("id");
  console.log("id", id);
  await connectdb();
  const deletedTodo = await Todo.findByIdAndDelete(id);
  console.log(deletedTodo);
  return NextResponse.json({ msg: "Topic deleted!" });
};
