import { MongoClient } from "mongodb";

export const mongoClient = new MongoClient(process.env.MONGODB_URI as string);
