import type { Context } from "@netlify/functions";

import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI as string);

export default async (req: Request, context: Context) => {
  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("todoapp");
  const collection = database.collection("todo_items");
  const results = await collection.find({}).limit(10).toArray();
  mongoClient.close();
  return new Response(JSON.stringify(results));
};
