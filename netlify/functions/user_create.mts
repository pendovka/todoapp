import { Context } from "@netlify/functions";
import { mongoClient } from "../services";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response("405", { status: 405 });
  }

  if (!req.body) {
    return new Response("body is required", { status: 400 });
  }

  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("todoapp");
  const collection = database.collection("users");

  const attributes = (await req.json()) as { name: string };

  const result = await collection.insertOne({
    ...attributes,
    geo: context.geo,
  });

  mongoClient.close();
  return new Response(JSON.stringify(result));
};
