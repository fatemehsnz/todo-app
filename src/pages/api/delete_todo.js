import { connectMongoDB } from "@/libs/MongoConnect";
import Todo from "@/models/TodoModel";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).send({ msg: "only delete request are alloweddddd" });
    return;
  }

  try {
    const { id } = req.body;
    await connectMongoDB();
    Todo.deleteOne({ _id: id }).then((data) => {
      res.status(200).send(data);
    });
  } catch (err) {
    res.status(400).send({ err, msg: "something went wrong" });
  }
}
