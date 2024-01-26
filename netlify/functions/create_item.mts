import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI as string);

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("405", { status: 405 });
  }

  if (!req.body) {
    return new Response("body is required", { status: 400 });
  }

  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("todoapp");
  const collection = database.collection("todo_items");

  const attributes = await req.json();
  console.log(attributes);
  await collection.insertOne(attributes);

  const results = await collection.find({}).toArray();
  mongoClient.close();
  return new Response(JSON.stringify(results));
};
