import type { Context } from "@netlify/functions";

import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI!);

// eslint-disable-next-line no-unused-vars
export default async (req: Request, context: Context) => {
  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("todoapp");
  const collection = database.collection("todo_items");
  const results = await collection.find({}).toArray();
  mongoClient.close();
  return new Response(JSON.stringify(results));
};
