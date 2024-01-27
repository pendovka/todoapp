import { mongoClient } from "../services";

export default async (req: Request) => {
  if (req.method !== "GET") {
    return new Response("405", { status: 405 });
  }

  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("todoapp");
  const collection = database.collection("users");

  const results = await collection.find({}).toArray();
  mongoClient.close();
  return new Response(JSON.stringify(results));
};
