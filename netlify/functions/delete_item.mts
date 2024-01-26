import type { Context } from "@netlify/functions";

import { MongoClient, ObjectId } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI as string);

// eslint-disable-next-line no-unused-vars
export default async (req: Request, context: Context) => {
  if (req.method !== "DELETE") {
    return new Response("405", { status: 405 });
  }

  const itemId = new URL(req.url).searchParams.get("id");

  if (!itemId) {
    return new Response("item id is required", { status: 400 });
  }

  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("todoapp");
  const collection = database.collection("todo_items");

  await collection.deleteOne({ _id: new ObjectId(itemId) });

  const results = await collection.find({}).toArray();
  mongoClient.close();
  return new Response(JSON.stringify(results));
};
