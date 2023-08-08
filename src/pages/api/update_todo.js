import { connectMongoDB } from "@/libs/MongoConnect";
import Todo from "@/models/TodoModel";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(405).send({ msg: "only put request are alloweddddd" });
    return;
  }

  const { id, todo } = req.body;
  try {
    await connectMongoDB();
    Todo.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          todo
        },
      }
    ).then((data) => {
      res.status(201).send(data);
    });
  } catch (err) {
    res.status(400).send({ err, msg: "something went wrong" });
  }
}
