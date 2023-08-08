import { connectMongoDB } from "@/libs/MongoConnect";
import Todo from "@/models/TodoModel";

export default async function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })
  if (req.method !== "POST") {
    res.status(405).send({ msg: "only post request are allowed" });
    return;
  }

  const { todo } = req.body;

  try {
    await connectMongoDB();
    Todo.create({ todo }).then((data) => {
      console.log(data);
      res.status(201).send(data);
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "something went wrong" });
  }
}
