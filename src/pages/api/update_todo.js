import { connectMongoDB } from "@/libs/MongoConnect";
import Todo from "@/models/TodoModel";
import { ObjectId } from "mongoose";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     res.status(405).send({ msg: "only post request are allowed" });
//     return;
//   }

//   const { todo } = req.body;

//   try {
//     await connectMongoDB();
//     Todo.create({ todo }).then((data) => {
//       console.log(data);
//       res.status(201).send(data);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).send({ err, msg: "something went wrong" });
//   }
// }

export default async function handler(req, res) {
    console.log("hellllll");
  if (req.method !== "PUT") {
    res.status(405).send({ msg: "only put request are allowed" });
    return;
  }
  const { id } = req.query;
  const { todo } = req.body;
  try {
    await connectMongoDB();
    Todo.updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          todo,
        },
      }
    ).then((data) => {
      console.log(data);
      res.status(201).send(data);
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ err, msg: "something went wrong" });
  }
}
