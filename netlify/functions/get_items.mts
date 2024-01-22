import type { Context } from "@netlify/functions";

import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI as string);

const clientPromise = mongoClient.connect();

export default async (req: Request, context: Context) => {
  const database = (await clientPromise).db("todoapp");
  const collection = database.collection("todo_items");
  const results = await collection.find({}).limit(10).toArray();
  return new Response(JSON.stringify(results));
};
