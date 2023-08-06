import { connectMongoDB } from "@/libs/MongoConnect";
import Todo from "@/models/TodoModel";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send({ msg: "only get request are allowed" });
    return;
  }

  try {
    await connectMongoDB();
    const todoList = await Todo.find()
    res.status(200).send(todoList)
  } catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "something went wrong" });
  }
}
