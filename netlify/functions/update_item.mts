import { MongoClient, ObjectId } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI!);

export default async (req: Request) => {
  if (req.method !== "PUT") {
    return new Response("405", { status: 405 });
  }

  if (!req.body) {
    return new Response("body is required", { status: 400 });
  }

  const itemId = new URL(req.url).searchParams.get("id");

  if (!itemId) {
    return new Response("item id is required", { status: 400 });
  }

  if (!itemId) {
    return new Response("item id is required", { status: 400 });
  }

  const clientPromise = mongoClient.connect();
  const database = (await clientPromise).db("todoapp");
  const collection = database.collection("todo_items");

  const attributes = await req.json();
  console.log(attributes);

  await collection.updateOne(
    { _id: new ObjectId(itemId) },
    { $set: attributes }
  );

  const results = await collection.find({}).toArray();
  mongoClient.close();
  return new Response(JSON.stringify(results));
};
