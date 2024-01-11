import Todo from "@/app/models/TodoModel";
import { connectdb } from "@/app/utils/connectdb";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
  try {
    const { id } = params;
    await connectdb();
    const todo = await Todo.findOne({ _id: id });
    return NextResponse.json({ todo }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

export const PUT = async (req: any, { params }: any) => {
  const { id } = params;
  const { title } = await req.json();
  try {
    const updateTodo = await Todo.findByIdAndUpdate(id, { title });
    console.log(updateTodo);
    if (!updateTodo) {
      return NextResponse.json({ msg: "Todo not found" });
    }
    return NextResponse.json({ updateTodo });
  } catch (error) {
    return NextResponse.json({ error: "unable to update the data" });
  }
};

// export const DELETE = async (request: any, { params }: any) => {
//   try {
//     const { id } = params;
//     await connectdb();

//     const deletedTodo = await Todo.findByIdAndDelete(id);
//     return NextResponse.json({ msg: "todo deleted!", deletedTodo });
//   } catch (error) {
//     return NextResponse.json({ msg: "Failed Todo Deleted" });
//   }
// };
